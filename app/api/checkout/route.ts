import { NextResponse } from "next/server";
import { createBooking } from "@/lib/data";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Map service prices realistically 
    let amount = 450000; // default to Basic Grooming
    if (body.service.includes("Full Spa")) amount = 850000;
    if (body.service.includes("Anti-Flea")) amount = 600000;
    if (body.service.includes("Kitten")) amount = 350000;
    if (body.service.includes("Senior")) amount = 750000;

    // 1. Send it to Supabase via our createBooking method
    // In a real application, you'd match service_id to the database uuid. 
    // Here we use a nullable one or static string for simplicity.
    const booking = await createBooking({
      ownerName: body.ownerName,
      phone: body.phone,
      catName: body.catName,
      catBreed: body.catBreed,
      serviceId: "d2b7de9c-d49d-4e98-bd06-d2bc502f6a29", // default uuid from seed
      serviceName: body.service,
      date: body.date,
      notes: body.notes,
    });

    // 2. Mayar Integration (Invoice Create)
    const mayarPayload = {
      name: body.ownerName || "Cat Owner",
      email: body.email || "customer@purrfectspa.com", // Mayar requires email for invoices typically
      mobile: body.phone || "081234567890",
      description: `Grooming Service for ${body.catName} (${body.service})`,
      amount: amount,
      items: [
        {
          name: body.service,
          quantity: 1,
          rate: amount,
          description: "Cat Grooming Service"
        }
      ],
      redirect_url: `${process.env.APP_URL || "http://localhost:3000"}/booking?success=true`
    };

    // Replace with valid domain and API Key later
    const MAYAR_API_KEY = process.env.MAYAR_API_KEY || "YOUR_MAYAR_API_KEY";

    // We try to ping the actual API
    const mayarRes = await fetch("https://api.mayar.id/hl/v1/invoice/create", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${MAYAR_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(mayarPayload)
    });

    const mayarData = await mayarRes.json();
    console.log("MAYAR RESPONSE:", mayarData);

    return NextResponse.json({
      success: true,
      booking: booking || { id: "BKG-MOCK" },
      paymentLink: mayarData.data?.link || `${process.env.APP_URL || "http://localhost:3000"}/booking?success=true`
    });

  } catch (error: any) {
    console.error("Booking Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
