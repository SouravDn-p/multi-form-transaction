// Step4.tsx
import { StepProps } from "@/types/stepType";
import {
  FileText,
  DollarSign,
  Tag,
  Percent,
  Info,
  ChevronDown,
} from "lucide-react";
import { COUPONS } from "@/constants/constant";
import Button from "../ui/Button";

export default function Step4({
  formData,
  updateFormData,
  fieldErrors,
}: StepProps) {
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const amount = parseFloat(e.target.value) || 0;
    updateFormData({
      ...formData,
      amount,
      finalAmount: calculateFinalAmount(amount, formData.couponCode),
    });
  };

  const handleCouponApply = () => {
    const finalAmount = calculateFinalAmount(
      formData.amount || 0,
      formData.couponCode,
    );
    updateFormData({
      ...formData,
      finalAmount,
      discountAmount: (formData.amount || 0) - finalAmount,
    });
  };

  const calculateFinalAmount = (
    amount: number,
    couponCode?: string,
  ): number => {
    if (!couponCode || !amount) return amount;

    const coupon = COUPONS.find((c) => c.code === couponCode.toUpperCase());
    if (!coupon) return amount;

    if (coupon.type === "fixed") {
      return Math.max(0, amount - coupon.discount);
    } else {
      return amount * (1 - coupon.discount / 100);
    }
  };

  const getCouponDescription = (code: string) => {
    const coupon = COUPONS.find((c) => c.code === code.toUpperCase());
    return coupon ? coupon.description : "Invalid coupon";
  };

  return (
    <div className="space-y-6">
      <div className="bg-white py-6 px-6 rounded-xl border border-gray-200 shadow-sm">
        <div className="md:flex items-start space-x-4 space-y-4">
          <div className="shrink-0 flex gap-4 justify-center items-center">
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

        <div className="mt-6 space-y-6">
          {/* Amount Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Transaction Amount
              </div>
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              placeholder="Enter amount"
              value={formData.amount || ""}
              onChange={handleAmountChange}
              className="w-full px-4 py-3 border border-gray-300! rounded-lg transition-colors focus:outline-none focus:ring 
    focus:ring-pink-500 
    focus:border-pink-500"
            />
            {fieldErrors?.amount && (
              <p className="mt-2 text-sm text-red-600">{fieldErrors.amount}</p>
            )}
          </div>

          {/* Coupon Code Section */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4" />
                Apply Coupon Code
              </div>
            </label>
            <div className="md:flex gap-2 space-y-4">
              <input
                type="text"
                placeholder="Enter coupon code"
                value={formData.couponCode || ""}
                onChange={(e) =>
                  updateFormData({
                    ...formData,
                    couponCode: e.target.value,
                    finalAmount: calculateFinalAmount(
                      formData.amount || 0,
                      e.target.value,
                    ),
                  })
                }
                className="w-full md:flex-1 px-6 py-3 border border-gray-300 rounded-lg transition-colors focus:outline-none focus:ring focus:ring-pink-500"
              />
              <Button
                text="Apply"
                onClick={handleCouponApply}
                className="w-full md:w-fit px-8 md:ml-4 mb-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors focus:outline-none focus:ring-0"
              />
            </div>

            {/* Display coupon info */}
            {formData.couponCode && (
              <div className="mt-3 text-sm">
                <div className="text-gray-600">
                  Coupon: {getCouponDescription(formData.couponCode)}
                </div>
                {formData.finalAmount !== undefined && formData.amount && (
                  <div className="mt-1">
                    <span className="text-gray-500 line-through">
                      ${formData.amount.toFixed(2)}
                    </span>
                    <span className="ml-2 font-medium text-green-600">
                      ${formData.finalAmount.toFixed(2)}
                    </span>
                    {formData.discountAmount && formData.discountAmount > 0 && (
                      <span className="ml-2 text-sm text-green-600">
                        (Saved ${formData.discountAmount.toFixed(2)})
                      </span>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Available Coupons Info - Dropdown */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <details className="group">
              <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-2">
                  <Tag className="h-5 w-5 text-blue-600" />
                  <span className="font-medium text-gray-900">
                    Available Coupons
                  </span>
                </div>
                <ChevronDown className="h-5 w-5 text-gray-500 group-open:rotate-180 transition-transform duration-300" />
              </summary>
              <div className="p-4 border-t border-gray-200 bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  {COUPONS.slice(0, 4).map((coupon) => (
                    <div key={coupon.code} className="flex justify-between">
                      <span className="font-mono bg-blue-100 px-2 py-1 rounded">
                        {coupon.code}
                      </span>
                      <span className="text-blue-700">
                        {coupon.description}
                      </span>
                    </div>
                  ))}
                  <div className="col-span-full text-xs text-blue-600 mt-2">
                    More coupons available: SAVE50, WELCOME20, HOLIDAY25
                  </div>
                </div>
              </div>
            </details>
          </div>

          {/* Prominent Amount Display */}
          <div className="bg-linear-to-r from-green-500 to-emerald-600 rounded-xl p-6 text-white text-center">
            <p className="text-sm uppercase tracking-wider opacity-90">
              Total Amount
            </p>
            <p className="text-2xl md:text-4xl font-bold my-3">
              $ {"  "}
              {formData.finalAmount?.toFixed(2) ||
                formData.amount?.toFixed(2) ||
                "0.00"}
            </p>
            <p className="text-sm opacity-80">
              {formData.discountAmount && formData.discountAmount > 0
                ? `You saved $${formData.discountAmount.toFixed(2)} with coupon ${formData.couponCode}`
                : "Amount to be charged to your account"}
            </p>
          </div>

          {/* Payment Details - Dropdown */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <details className="group">
              <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  <span className="font-medium text-gray-900">
                    Payment Details
                  </span>
                </div>
                <svg
                  className="h-5 w-5 text-gray-500 group-open:rotate-180 transition-transform duration-300"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </summary>
              <div className="p-4 border-t border-gray-200 bg-gray-50">
                <div className="space-y-2 text-sm">
                  <div className="md:flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Transaction Type:</span>
                    <div className="font-medium text-gray-900">
                      {formData.transactionType || "Not specified"}
                    </div>
                  </div>
                  <div className="md:flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Beneficiary:</span>
                    <div className="font-medium text-gray-900">
                      {formData.beneficiary?.nprenom || "Not specified"}
                    </div>
                  </div>
                  <div className="md:flex justify-between py-2">
                    <span className="text-gray-600">Payment Method:</span>
                    <div className="font-medium text-gray-900">
                      {formData.paymentMethod || "Not specified"}
                    </div>
                  </div>
                </div>
              </div>
            </details>
          </div>

          {/* Amount and Discount Details - Dropdown */}
          {formData.amount && formData.amount > 0 && (
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <details className="group">
                <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-2">
                    <Percent className="h-5 w-5 text-blue-600" />
                    <span className="font-medium text-gray-900">
                      Amount & Discount
                    </span>
                  </div>
                  <ChevronDown className="h-5 w-5 text-gray-500 group-open:rotate-180 transition-transform duration-300" />
                </summary>
                <div className="p-4 border-t border-gray-200 bg-gray-50">
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-600">Original Amount:</span>
                      <span className="font-medium text-gray-900">
                        ${formData.amount.toFixed(2)}
                      </span>
                    </div>

                    {formData.couponCode && (
                      <>
                        <div className="flex justify-between items-center py-2 bg-white px-3 rounded border">
                          <div className="flex items-center gap-2">
                            <Tag className="h-4 w-4 text-blue-600" />
                            <span className="text-gray-600">
                              Coupon Applied:
                            </span>
                          </div>
                          <span className="font-medium text-blue-700">
                            {formData.couponCode.toUpperCase()}
                          </span>
                        </div>
                        <div className="flex justify-between items-center py-2 bg-green-50 px-3 rounded border border-green-200">
                          <span className="text-gray-600">
                            Discount Amount:
                          </span>
                          <span className="font-medium text-green-700">
                            -${formData.discountAmount?.toFixed(2) || "0.00"}
                          </span>
                        </div>
                      </>
                    )}

                    <div className="flex justify-between items-center py-3 border-t border-gray-200 mt-2 pt-3">
                      <span className="text-gray-800 font-medium">
                        Total Amount:
                      </span>
                      <span className="text-xl font-bold text-green-600">
                        $
                        {formData.finalAmount?.toFixed(2) ||
                          formData.amount?.toFixed(2) ||
                          "0.00"}
                      </span>
                    </div>

                    {formData.discountAmount && formData.discountAmount > 0 && (
                      <div className="text-center py-2 bg-green-100 rounded text-green-800 text-xs font-medium">
                        You saved ${formData.discountAmount.toFixed(2)} with
                        your coupon!
                      </div>
                    )}
                  </div>
                </div>
              </details>
            </div>
          )}

          {/* Payment Method Details Dropdown */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <details className="group">
              <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-2">
                  <Info className="h-5 w-5 text-blue-600" />
                  <span className="font-medium text-gray-900">
                    Payment Method Details
                  </span>
                </div>
                <ChevronDown className="h-5 w-5 text-gray-500 group-open:rotate-180 transition-transform duration-300" />
              </summary>
              <div className="p-4 border-t border-gray-200 bg-gray-50">
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-800">
                    Selected Payment Method:{" "}
                    <span className="text-blue-600">
                      {formData.paymentMethod || "Not specified"}
                    </span>
                  </h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    {formData.paymentMethod === "Paypal" && (
                      <div>
                        <p>
                          <strong>PayPal</strong> is a secure online payment
                          service that allows you to send payments without
                          sharing financial details. Your payment will be
                          processed securely through PayPal&apos;s platform.
                        </p>
                        <p className="mt-2">
                          • Fast processing (1-2 business days)
                        </p>
                        <p>• 24/7 fraud protection</p>
                        <p>• Buyer and seller protection policies</p>
                      </div>
                    )}
                    {formData.paymentMethod === "Stripe" && (
                      <div>
                        <p>
                          <strong>Stripe</strong> is a leading online payment
                          processing platform that ensures secure transactions
                          with advanced fraud detection.
                        </p>
                        <p className="mt-2">• Advanced security measures</p>
                        <p>• Global payment acceptance</p>
                        <p>• Real-time transaction monitoring</p>
                      </div>
                    )}
                    {formData.paymentMethod === "Google Pay" && (
                      <div>
                        <p>
                          <strong>Google Pay</strong> is a digital wallet
                          service that allows you to make secure payments using
                          your Google account.
                        </p>
                        <p className="mt-2">• One-tap payments</p>
                        <p>• Device tokenization for security</p>
                        <p>• Purchase protection</p>
                      </div>
                    )}
                    {formData.paymentMethod === "Amazon Pay" && (
                      <div>
                        <p>
                          <strong>Amazon Pay</strong> uses your Amazon account
                          information to securely process payments across
                          various platforms.
                        </p>
                        <p className="mt-2">
                          • Leverages Amazon&aso;s trusted security
                        </p>
                        <p>• A-to-Z Guarantee protection</p>
                        <p>• Simplified checkout experience</p>
                      </div>
                    )}
                    {!formData.paymentMethod && (
                      <p>Select a payment method to see details</p>
                    )}
                  </div>
                </div>
              </div>
            </details>
          </div>

          {/* Confirmation Message */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-yellow-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <h4 className="text-sm font-medium text-yellow-800">
                  Please Confirm
                </h4>
                <p className="text-sm text-yellow-700 mt-1">
                  Please review all the details above carefully. Once you
                  submit, the transaction cannot be undone.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
