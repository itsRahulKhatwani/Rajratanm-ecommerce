import { NextResponse } from "next/server";
// import crypto from "crypto";

/*
 * ACTIVATE RAZORPAY: replace with live keys when domain is ready
 *
 * This route verifies a Razorpay payment signature. Currently inactive.
 */

export async function POST(request: Request) {
  return NextResponse.json(
    {
      error: "Razorpay verification is inactive.",
      message: "ACTIVATE RAZORPAY: replace with live keys when domain is ready",
    },
    { status: 503 }
  );

  /*
  // UNCOMMENT BELOW WHEN RAZORPAY IS READY:
  try {
    const body = await request.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generated_signature === razorpay_signature) {
      // Payment verified — update order status in database
      return NextResponse.json({ verified: true });
    } else {
      return NextResponse.json({ verified: false, error: "Invalid signature" }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
  */
}
