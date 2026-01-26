import { TransactionFormData } from "./types";

export interface StepProps {
  formData: TransactionFormData;
  updateFormData: (newData: Partial<TransactionFormData>) => void;
  fieldErrors?: Record<string, string>;
}