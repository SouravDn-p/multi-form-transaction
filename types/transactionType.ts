export interface PaymentInstancePayload {
  userID: number | undefined;
  benId: number | string | undefined;
  amount: number | undefined;
  coupon: string | undefined;
}

export interface PaymentInstanceResponse {
  payment_intent_id: string;
  final_amount: number;
  discount_applied: number;
  status: string;
}

// payment submit

export interface PaymentSubmitPayload {
  payment_intent_id: string;
}
