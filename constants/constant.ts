// types.ts

import { StepConfig } from "@/types/types";

export const STEPS: readonly StepConfig[] = [
  { id: 1, title: "Transaction Type", fields: ["transactionType"] },
  { id: 2, title: "Select Beneficiary", fields: ["beneficiary"] },
  { id: 3, title: "Payment Method", fields: ["paymentMethod"] },
  { id: 4, title: "Summary & Confirm", fields: [] },
] as const;

export const TRANSACTION_TYPES = [
  "Depot Mobile",
  "Depot Banqueire",
  "Depot International",
  "Depot Topup",
  "Depot Invoice",
  "Depot Cashin",
] as const;

export const PAYMENT_METHODS = [
  "Paypal",
  "Stripe",
  "Google Pay",
  "Amazon Pay",
] as const;

export const BENEFICIARIES = [
  { id: "4385304098", name: "Chris Cherubin" },
  { id: "92314525606", name: "Haris Sultan" },
] as const;
