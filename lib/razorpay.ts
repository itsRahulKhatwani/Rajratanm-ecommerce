/*
 * =====================================================
 * RAZORPAY CLIENT — INACTIVE
 * =====================================================
 * ACTIVATE RAZORPAY: replace with live keys when domain is ready
 *
 * This module is intentionally inactive. The payment flow is
 * structured and wired up, but no real transactions will process
 * until live API keys are added to .env and the commented code
 * in api/payment/ routes is uncommented.
 * =====================================================
 */

// import Razorpay from "razorpay";

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID!,
//   key_secret: process.env.RAZORPAY_KEY_SECRET!,
// });

// export default razorpay;

/**
 * Placeholder export so this module can be imported without errors.
 * Replace with the real Razorpay instance above when keys are ready.
 */
export const RAZORPAY_ACTIVE = false;
