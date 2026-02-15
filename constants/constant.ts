// types.ts

import { StepConfig } from "@/types/types";
import { CreditCard, Wallet, Globe, ShoppingCart } from "lucide-react";

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

export const PAYMENT_ICON_MAP: Record<string, React.ElementType> = {
  Paypal: Wallet,
  Stripe: CreditCard,
  "Google Pay": Globe,
  "Amazon Pay": ShoppingCart,
};

export const BENEFICIARIES = [
  { userID: "4385304098", nprenom: "Chris Cherubin", phone: "2345", cpt: 1212 },
  { userID: "92314525606", nprenom: "Haris Sultan", phone: "2345", cpt: 1214 },
] as const;

export type Coupon = {
  code: string;
  discount: number;
  type: "fixed" | "percentage";
  description: string;
};

export const COUPONS: Coupon[] = [
  { code: "SAVE10", discount: 10, type: "fixed", description: "$10 off" },
  { code: "SAVE20", discount: 20, type: "fixed", description: "$20 off" },
  { code: "SAVE50", discount: 50, type: "fixed", description: "$50 off" },
  {
    code: "WELCOME10",
    discount: 10,
    type: "percentage",
    description: "10% off",
  },
  {
    code: "WELCOME20",
    discount: 20,
    type: "percentage",
    description: "20% off",
  },
  {
    code: "HOLIDAY25",
    discount: 25,
    type: "percentage",
    description: "25% off",
  },
];
