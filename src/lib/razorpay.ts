import Razorpay from "razorpay";

const keyId = typeof process !== 'undefined' ? process.env.RAZORPAY_KEY_ID : '';
const keySecret = typeof process !== 'undefined' ? process.env.RAZORPAY_KEY_SECRET : '';

if (!keyId && typeof window === 'undefined') {
  console.warn("RAZORPAY_KEY_ID is missing from environment variables.");
}

if (!keySecret && typeof window === 'undefined') {
  console.warn("RAZORPAY_KEY_SECRET is missing from environment variables.");
}

const razorpay = typeof window === 'undefined'
  ? new Razorpay({
      key_id: keyId || "rzp_test_mock",
      key_secret: keySecret || "mock_secret",
    })
  : (null as any);

export default razorpay;
