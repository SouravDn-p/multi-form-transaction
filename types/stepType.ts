import { User } from "./authType";
import { TransactionFormData } from "./types";

export interface StepProps {
  user?: User | null;
  formData: TransactionFormData;
  updateFormData: (newData: Partial<TransactionFormData>) => void;
  fieldErrors?: Record<string, string>;
}
