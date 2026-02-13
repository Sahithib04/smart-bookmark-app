"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function Dashboard() {
  const [bookmarks, setBookmarks] = useState<any[]>([])
  const [user, setUser] = useState<any>(null)
  const [title, setTitle] = useState("")
  const [url, setUrl] = useState("")

  const fetchData = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    setUser(user)

    if (user) {
      const { data } = await supabase
        .from("bookmarks")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })

      setBookmarks(data || [])
    }
  }

  useEffect(() => {
    fetchData()

    const channel = supabase
      .channel("bookmarks-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "bookmarks",
        },
        () => {
          fetchData()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const addBookmark = async () => {
    if (!user) return

    await supabase.from("bookmarks").insert([
      {
        title,
        url,
        user_id: user.id,
      },
    ])

    setTitle("")
    setUrl("")
  }

  const deleteBookmark = async (id: string) => {
    await supabase.from("bookmarks").delete().eq("id", id)
  }

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Your Bookmarks</h1>

      <input
        className="border p-2 w-full mb-2"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        className="border p-2 w-full mb-2"
        placeholder="URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <button
        className="bg-black text-white px-4 py-2 mb-4"
        onClick={addBookmark}
      >
        Add Bookmark
      </button>

      {bookmarks.map((bookmark) => (
        <div
          key={bookmark.id}
          className="flex justify-between border p-2 mb-2"
        >
          <a href={bookmark.url} target="_blank">
            {bookmark.title}
          </a>
          <button
            className="text-red-500"
            onClick={() => deleteBookmark(bookmark.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  )
}
