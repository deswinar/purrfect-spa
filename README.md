<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally, now integrated with **Supabase**.

View your app in AI Studio: https://ai.studio/apps/e8d34eeb-c768-4dae-85f5-80f6d4b7e2d0

## Prerequisites

- Node.js
- Supabase Account / Database

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure environment variables in `.env.local`:
   Set `GEMINI_API_KEY` to your Gemini API key.
   Set Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL="https://qxuyyewyexdbhmapfmpb.supabase.co"
   NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
   DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.qxuyyewyexdbhmapfmpb.supabase.co:5432/postgres"
   ```

3. **Database Migration & Seeding:**
   The `supabase/migrations/20260308000000_init_schema.sql` contains the initial schema setup. 
   Apply it to your Supabase instance via pgAdmin, psql, or Supabase UI.
   Optionally, the `supabase/seed.sql` contains the initial mock data based on the app's current state.

4. Run the app:
   ```bash
   npm run dev
   ```
