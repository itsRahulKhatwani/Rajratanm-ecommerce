import { NextResponse } from "next/server";

// Cart is managed entirely client-side via localStorage.
// This route exists as a stub for future server-side cart features.

export async function GET() {
  return NextResponse.json({
    message: "Cart is managed client-side via localStorage. No server-side cart implemented.",
  });
}
