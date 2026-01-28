import { PAYMENT_METHODS, TRANSACTION_TYPES } from "@/constants/constant";

export type StepConfig = {
  id: number;
  title: string;
  fields: readonly string[];
};

export type TransactionType = (typeof TRANSACTION_TYPES)[number];
export type PaymentMethod = (typeof PAYMENT_METHODS)[number];

export type Beneficiary = {
  id: string;
  name: string;
};

export type TransactionFormData = {
  transactionType?: TransactionType;
  beneficiary?: Beneficiary;
  paymentMethod?: PaymentMethod;
  amount?: number;
  couponCode?: string;
  discountAmount?: number;
  finalAmount?: number;
};
