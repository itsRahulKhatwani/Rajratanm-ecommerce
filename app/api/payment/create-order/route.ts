import { NextResponse } from "next/server";
// import razorpay from "@/lib/razorpay";

/*
 * ACTIVATE RAZORPAY: replace with live keys when domain is ready
 *
 * This route creates a Razorpay order. It is currently inactive.
 * To activate:
 * 1. Add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET to .env
 * 2. Uncomment the razorpay import above
 * 3. Uncomment the code below
 */

export async function POST(request: Request) {
  return NextResponse.json(
    {
      error: "Razorpay integration is inactive. Pay on Delivery is the current payment method.",
      message: "ACTIVATE RAZORPAY: replace with live keys when domain is ready",
    },
    { status: 503 }
  );

  /*
  // UNCOMMENT BELOW WHEN RAZORPAY IS READY:
  try {
    const body = await request.json();
    const options = {
      amount: Math.round(body.amount * 100), // amount in paise
      currency: "INR",
      receipt: `order_${Date.now()}`,
    };
    const order = await razorpay.orders.create(options);
    return NextResponse.json(order);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create Razorpay order" }, { status: 500 });
  }
  */
}
