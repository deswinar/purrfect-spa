-- Seed file for initializing mock data directly drawn from the spa app states

-- Insert services
INSERT INTO public.services (id, title, description, price, icon, color, popular, features)
VALUES
    ('d2b7de9c-d49d-4e98-bd06-d2bc502f6a29', 'Basic Grooming', 'Essential care to keep your cat clean and comfortable.', '$45', 'Droplets', 'bg-blue-100 text-blue-600', false, '["Bath with premium shampoo", "Nail trimming", "Ear cleaning", "Gentle brushing", "Eye cleaning"]'),
    ('baba099d-83b3-4f9e-a0e2-63bfa24feffd', 'Full Spa Treatment', 'The ultimate pampering session for your feline friend.', '$85', 'Scissors', 'bg-primary-100 text-primary-600', true, '["Everything in Basic", "De-shedding treatment", "Deep conditioning", "Blow dry & fur styling", "Paw pad trim"]'),
    ('e6c5332f-bda5-4f40-9a2c-e1a1291b9206', 'Anti-Flea Treatment', 'Safe and effective flea removal and prevention.', '$60', 'Bug', 'bg-accent-100 text-accent-600', false, '["Flea bath", "Tick removal", "Soothing skin treatment", "Preventative application", "Home care advice"]'),
    ('4b9ef7ea-566d-4d76-80db-efb68d9fbbfa', 'Kitten First Groom', 'A gentle introduction to grooming for kittens under 6 months.', '$35', 'Heart', 'bg-pink-100 text-pink-600', false, '["Gentle water introduction", "Soft brushing", "Nail tipping", "Lots of treats & play", "Owner education"]'),
    ('c473ed7b-2856-4c4c-bbc5-89f5bc32ad40', 'Senior Cat Care', 'Specialized, low-stress grooming for older cats.', '$75', 'Sparkles', 'bg-purple-100 text-purple-600', false, '["Waterless bath option", "Sanitary trim", "Mat removal", "Extra gentle handling", "Joint-friendly setup"]');

-- Insert add ons
INSERT INTO public.add_ons (name, price, description)
VALUES
    ('Teeth Brushing', '$15', 'Enzymatic toothpaste application'),
    ('Nail Caps Application', '$25', 'Soft claws applied to front paws'),
    ('Lion Cut', '$40', 'Full body shave leaving mane, boots, and tail tip'),
    ('De-matting', '$20+', 'Gentle removal of severe mats (price varies by severity)');

-- Insert Gallery Images
INSERT INTO public.gallery_images (src, category, alt)
VALUES
    ('https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&q=80&w=800', 'Spa Day', 'Calm cat in a soft towel after grooming'),
    ('https://images.unsplash.com/photo-1548546738-8502ce9a3d06?auto=format&fit=crop&q=80&w=800', 'Before & After', 'Professional brushing session for maximum fluff'),
    ('https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&q=80&w=800', 'Fluffy Clients', 'Majestic long-haired cat showing off its coat'),
    ('https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=800', 'Spa Day', 'Gentle pampering and relaxation for kittens'),
    ('https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=800', 'Before & After', 'Transformation of a well-groomed domestic cat'),
    ('https://images.unsplash.com/photo-1513245543132-31f507417b26?auto=format&fit=crop&q=80&w=800', 'Fluffy Clients', 'Sweet kitten feeling fresh and clean'),
    ('https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&q=80&w=800', 'Spa Day', 'Peaceful nap after a full spa treatment'),
    ('https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&q=80&w=800', 'Before & After', 'Self-grooming cat with a perfectly maintained coat'),
    ('https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?auto=format&fit=crop&q=80&w=800', 'Fluffy Clients', 'Aesthetic portrait of a happy groomed client');


-- Insert initial mock bookings
INSERT INTO public.bookings (id, owner_name, phone, cat_name, cat_breed, service_name, date, status)
VALUES
    ('BKG-001', 'Sarah L.', '', 'Luna', 'Persian', 'Full Spa Treatment', 'Today, 10:00 AM', 'In Progress'),
    ('BKG-002', 'Daniel T.', '', 'Oliver', 'Tabby', 'Basic Grooming', 'Today, 1:00 PM', 'Upcoming'),
    ('BKG-003', 'Emily R.', '', 'Bella', 'Maine Coon', 'Anti-Flea Treatment', 'Today, 3:30 PM', 'Upcoming'),
    ('BKG-004', 'Michael B.', '', 'Simba', 'Bengal', 'Full Spa Treatment', 'Tomorrow, 9:00 AM', 'Upcoming'),
    ('BKG-005', 'Jessica W.', '', 'Milo', 'Ragdoll', 'Kitten First Groom', 'Tomorrow, 11:30 AM', 'Upcoming');
