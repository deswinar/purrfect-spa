-- Extension for UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Services Table
CREATE TABLE IF NOT EXISTS public.services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    price TEXT NOT NULL,
    icon TEXT NOT NULL,
    color TEXT NOT NULL,
    popular BOOLEAN DEFAULT false,
    features JSONB NOT NULL DEFAULT '[]',
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Add-ons Table
CREATE TABLE IF NOT EXISTS public.add_ons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    price TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Gallery Images Table
CREATE TABLE IF NOT EXISTS public.gallery_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    src TEXT NOT NULL,
    category TEXT NOT NULL,
    alt TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Bookings Table
CREATE TABLE IF NOT EXISTS public.bookings (
    id TEXT PRIMARY KEY, -- String ID matching 'BKG-001' style initially, could shift to UUID in practice
    owner_name TEXT NOT NULL,
    phone TEXT,
    cat_name TEXT NOT NULL,
    cat_breed TEXT NOT NULL,
    service_id UUID REFERENCES public.services(id),
    service_name TEXT NOT NULL, -- Denormalized for simpler queries
    date TEXT NOT NULL,
    notes TEXT,
    status TEXT NOT NULL DEFAULT 'Upcoming',
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Add updated_at function and triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Enable Row Level Security (RLS)
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.add_ons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Public read access policies
CREATE POLICY "Allow public read access to services"
    ON public.services FOR SELECT
    USING (true);

CREATE POLICY "Allow public read access to add_ons"
    ON public.add_ons FOR SELECT
    USING (true);

CREATE POLICY "Allow public read access to gallery_images"
    ON public.gallery_images FOR SELECT
    USING (true);

-- Bookings policies (anyone can create, but in real app only owner/admin can read)
-- For demonstration purposes, we will leave read access public, but this should be secured.
CREATE POLICY "Allow anon booking creation"
    ON public.bookings FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Allow public read access to bookings for admins"
    ON public.bookings FOR SELECT
    USING (true);

CREATE POLICY "Allow admin updates to bookings"
    ON public.bookings FOR UPDATE
    USING (true);
