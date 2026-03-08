import { supabase } from './supabase'

export type Service = {
  id: string;
  title: string;
  description: string;
  price: string;
  icon: string;
  color: string;
  popular: boolean;
  features: string[]; // This will actually be returned via related table or jsonb
}

export type AddOn = {
  id: string;
  name: string;
  price: string;
  description: string;
}

export type GalleryImage = {
  id: string;
  src: string;
  category: string;
  alt: string;
}

export type Booking = {
  id: string;
  ownerName: string;
  phone: string;
  catName: string;
  catBreed: string;
  serviceId: string;
  serviceName: string; // denormalized for simplicity or relational
  date: string;
  notes?: string;
  status: 'Upcoming' | 'In Progress' | 'Completed' | 'Cancelled';
}

// Data fetching helper methods using Supabase
export const getServices = async () => {
  const { data, error } = await supabase.from('services').select('*').order('created_at', { ascending: true });
  if (error) throw error;
  return data;
}

export const getAddOns = async () => {
  const { data, error } = await supabase.from('add_ons').select('*').order('created_at', { ascending: true });
  if (error) throw error;
  return data;
}

export const getGalleryImages = async () => {
  const { data, error } = await supabase.from('gallery_images').select('*').order('created_at', { ascending: true });
  if (error) throw error;
  return data;
}

export const getBookings = async (): Promise<Booking[]> => {
  const { data, error } = await supabase.from('bookings').select('*').order('date', { ascending: true });
  if (error) throw error;
  return data.map((b: any) => ({
    id: b.id,
    ownerName: b.owner_name,
    phone: b.phone,
    catName: b.cat_name,
    catBreed: b.cat_breed,
    serviceId: b.service_id,
    serviceName: b.service_name,
    date: b.date,
    notes: b.notes,
    status: b.status
  }));
}

export const createBooking = async (booking: Omit<Booking, 'id' | 'status'>) => {
  const { data, error } = await supabase.from('bookings').insert({
    id: `BKG-${Math.floor(1000 + Math.random() * 9000).toString()}`,
    owner_name: booking.ownerName,
    phone: booking.phone,
    cat_name: booking.catName,
    cat_breed: booking.catBreed,
    service_id: booking.serviceId,
    service_name: booking.serviceName,
    date: booking.date,
    notes: booking.notes,
    status: 'Upcoming'
  }).select().single();
  if (error) throw error;
  return data;
}

export const updateBookingStatus = async (id: string, status: string) => {
  const { data, error } = await supabase.from('bookings').update({ status }).eq('id', id).select().single();
  if (error) throw error;
  return data;
}
