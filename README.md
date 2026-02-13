📌 Smart Bookmark App

A simple full-stack bookmark manager built using Next.js (App Router) and Supabase.

This project was built as part of a Fullstack/GenAI screening task.

# Live Demo

🔗 Live URL: https://smart-bookmark-app-ashy.vercel.app/

# Tech Stack

Next.js 14 (App Router)

Supabase

Authentication (Google OAuth)

Postgres Database

Realtime

Tailwind CSS

Vercel (Deployment)

# Features Implemented

Google OAuth login (no email/password)

Add bookmarks (title + URL)

Delete bookmarks

Bookmarks are private per user

Dashboard route protection

Live deployment on Vercel

# How It Works

Users authenticate via Google OAuth using Supabase Auth.

Each bookmark is stored in Supabase with the user_id.

Database queries filter bookmarks using the logged-in user’s session.

Dashboard checks session before rendering.

The app is deployed on Vercel with environment variables configured securely.


Users can only access their own bookmarks.

# Challenges Faced & How I Solved Them
1. Google OAuth Redirect Issues (Production vs Localhost)

Initially, authentication worked on localhost but failed after deployment.
The issue was caused by incorrect redirect URLs in:

Supabase Auth URL configuration

Google Cloud OAuth settings

Next.js redirectTo option

I fixed this by:

Updating Supabase Site URL to the Vercel production URL

Adding the Vercel domain in Authorized JavaScript origins

Ensuring the callback URL was correctly set in Google Cloud Console

Updating redirectTo to the production URL before deploying

2️. Environment Variables Not Working on Vercel

The app initially failed to connect to Supabase after deployment.

Root cause:
Environment variables were not configured in Vercel.

Solution:

Added NEXT_PUBLIC_SUPABASE_URL

Added NEXT_PUBLIC_SUPABASE_ANON_KEY

Redeployed the app

3️. Route Protection

The dashboard page was accessible without authentication if the URL was entered manually.

Solution:

Used supabase.auth.getSession() inside useEffect

Redirected unauthenticated users to the homepage

4️. OAuth Returning to Root Instead of Dashboard

After login, users were redirected to / instead of /dashboard.

Solution:

Configured redirectTo correctly inside signInWithOAuth

Ensured redirect URL was added in Supabase settings

# Final Thoughts

This project helped me strengthen my understanding of:

OAuth flow (especially production configuration)

Supabase RLS policies

Next.js App Router authentication patterns

Deploying full-stack apps on Vercel

It was a great hands-on experience working with authentication, database security, and deployment issues in a real-world setup.
