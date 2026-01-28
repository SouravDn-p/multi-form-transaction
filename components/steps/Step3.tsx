import { StepProps } from "@/types/stepType";
import { CreditCard } from "lucide-react";
import { PAYMENT_METHODS } from "@/constants/constant";
import { PAYMENT_ICON_MAP } from "@/constants/constant";

export default function Step3({
  formData,
  updateFormData,
  fieldErrors,
}: StepProps) {
  return (
    <div className="space-y-6">
      <div className="bg-white py-6 px-6 rounded-xl border border-gray-200 shadow-sm">
        {/* Header */}
        <div className="md:flex items-start gap-4 space-y-4">
          <div className="w-12 h-12 rounded-xl mx-auto bg-linear-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-md">
            <CreditCard className="h-6 w-6 text-white" />
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

        {/* Options */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Payment Method
          </label>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {PAYMENT_METHODS.map((method) => {
              const Icon = PAYMENT_ICON_MAP[method];

              return (
                <button
                  key={method}
                  type="button"
                  onClick={() =>
                    updateFormData({
                      ...formData,
                      paymentMethod: method,
                    })
                  }
                  className={`flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition-all duration-200
                    ${
                      formData.paymentMethod === method
                        ? "border-purple-500 bg-purple-50 text-purple-700"
                        : "border-gray-200 hover:border-purple-300 hover:bg-purple-50"
                    }
                  `}
                >
                  <div className="w-10 h-10 flex items-center justify-center rounded-md bg-purple-100">
                    {Icon && <Icon className="w-5 h-5 text-purple-600" />}
                  </div>

                  <span className="font-medium">{method}</span>
                </button>
              );
            })}
          </div>

          {fieldErrors?.paymentMethod && (
            <p className="mt-2 text-sm text-red-600">
              {fieldErrors.paymentMethod}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
