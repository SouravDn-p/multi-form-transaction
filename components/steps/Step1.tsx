// Step1.tsx
import { StepProps } from "@/types/stepType";
import { ArrowRightLeft } from "lucide-react";
import { TRANSACTION_TYPES } from "@/constants/constant";

export default function Step1({
  formData,
  updateFormData,
  fieldErrors,
}: StepProps) {
  return (
    <div className="space-y-6">
      <div className="bg-white py-6 px-6 rounded-xl  border-orange-200  shadow-[0_0_4px_rgba(255,134,138,0.4)] ">
        <div className="md:flex items-start space-x-4 space-y-4">
          <div className="flex-shrink-0 flex gap-4 justify-center items-center">
            <div className="w-12 h-12 rounded-xl bg-linear-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-md">
              <ArrowRightLeft className="h-6 w-6 text-white" />
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-xl">
              Transaction Type
            </h3>
            <p className="text-base text-gray-600 pt-2">
              Select the type of transaction you want to perform. This will
              determine how your funds are processed.
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-6">
          {/* Transaction Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4 z-10">
              Transaction Type
            </label>
            <div className="grid grid-cols-1 gap-3 space-y-2">
              {TRANSACTION_TYPES.map((type) => (
                <button
                  key={type}
                  type="button"
                  className={`p-4 rounded-lg border text-left transition-all duration-200 ${
                    formData.transactionType === type
                      ? "border-orange-500 bg-orange-50 text-orange-700 hover:cursor-pointer"
                      : "  border border-gray-200  hover:bg-gray-100 hover:cursor-pointer"
                  }`}
                  onClick={() =>
                    updateFormData({
                      ...formData,
                      transactionType: type,
                    })
                  }
                >
                  <div className="font-medium">{type}</div>
                </button>
              ))}
            </div>
            {fieldErrors?.transactionType && (
              <p className="mt-2 text-sm text-red-600">
                {fieldErrors.transactionType}
              </p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
