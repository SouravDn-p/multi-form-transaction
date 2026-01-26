// Step4.tsx
import { StepProps } from "@/types/stepType";
import { FileText } from "lucide-react";

export default function Step4({ formData, updateFormData }: StepProps) {
  return (
    <div className="space-y-6">
      <div className="bg-white py-6 px-6 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-xl bg-linear-to-br from-green-500 to-green-600 flex items-center justify-center shadow-md">
              <FileText className="h-6 w-6 text-white" />
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-xl">
              Summary & Confirm
            </h3>
            <p className="text-base text-gray-600 pt-2">
              Review all transaction details carefully before confirming. Make
              sure everything is accurate.
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h4 className="font-medium text-gray-900 mb-3">
              Transaction Details
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Transaction Type:</span>
                <span className="font-medium text-gray-900">
                  {formData.transactionType || "Not specified"}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Beneficiary:</span>
                <span className="font-medium text-gray-900">
                  {formData.beneficiary?.name || "Not specified"}
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Payment Method:</span>
                <span className="font-medium text-gray-900">
                  {formData.paymentMethod || "Not specified"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
