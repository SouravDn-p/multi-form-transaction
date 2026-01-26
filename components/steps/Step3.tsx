// Step3.tsx
import { StepProps } from "@/types/stepType";
import { CreditCard } from "lucide-react";
import { PAYMENT_METHODS } from "@/constants/constant";

export default function Step3({
  formData,
  updateFormData,
  fieldErrors,
}: StepProps) {
  return (
    <div className="space-y-6">
      <div className="bg-white py-6 px-6 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-xl bg-linear-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-md">
              <CreditCard className="h-6 w-6 text-white" />
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-xl">
              Payment Method
            </h3>
            <p className="text-base text-gray-600 pt-2">
              Select your preferred payment method to complete this transaction
              securely.
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment Method
            </label>
            <div className="grid grid-cols-2 gap-3">
              {PAYMENT_METHODS.map((method) => (
                <button
                  key={method}
                  type="button"
                  className={`p-4 rounded-lg border text-center transition-all duration-200 hover:cursor-pointer ${
                    formData.paymentMethod === method
                      ? "border-purple-500 bg-purple-50 text-purple-700"
                      : "border-gray-200 hover:border-purple-300 hover:bg-purple-50"
                  }`}
                  onClick={() =>
                    updateFormData({
                      ...formData,
                      paymentMethod: method,
                    })
                  }
                >
                  <div className="font-medium">{method}</div>
                </button>
              ))}
            </div>
            {fieldErrors?.paymentMethod && (
              <p className="mt-2 text-sm text-red-600">
                {fieldErrors.paymentMethod}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
