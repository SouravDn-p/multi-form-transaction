/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Step1 from "@/components/steps/Step1";
import Step2 from "@/components/steps/Step2";
import Step3 from "@/components/steps/Step3";
import Step4 from "@/components/steps/Step4";
import Button from "@/components/ui/Button";
import Toast from "@/components/ui/Toast";
import { STEPS } from "@/constants/constant";
import { TransactionFormData } from "@/types/types";
import {
  ArrowRightLeft,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  FileText,
  Lock,
  Shield,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AuthWrapper from "@/components/AuthWrapper";
import { useAppSelector } from "@/redux/hooks";
import {
  usePaymentIntendMutation,
  usePaymentSubmitMutation,
} from "@/redux/features/api/transactionApi";
import { PaymentInstancePayload } from "@/types/transactionType";

export default function TransactionForm() {
  const user = useAppSelector((state) => state.auth.user);
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<TransactionFormData>({});
  const [error, setError] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [toast, setToast] = useState({
    isVisible: false,
    message: "",
    type: "success" as "success" | "error",
  });
  const [paymentIntend, { isLoading }] = usePaymentIntendMutation();
  const [paymentSubmit, { isLoading: isSubmitLoading }] =
    usePaymentSubmitMutation();

  // Effect to validate current step when formData changes
  useEffect(() => {
    validateCurrentStep();
  }, [formData, currentStep]);

  // Function to validate current step in real-time
  const validateCurrentStep = () => {
    const newErrors: Record<string, string> = {};

    switch (currentStep) {
      case 1:
        if (!formData.transactionType) {
          newErrors.transactionType = "Please select a transaction type";
        }
        break;
      case 2:
        if (!formData.beneficiary?.userID || !formData.beneficiary?.nprenom) {
          newErrors.beneficiary = "Please select a beneficiary";
        }
        break;
      case 3:
        if (!formData.paymentMethod) {
          newErrors.paymentMethod = "Please select a payment method";
        }
        break;
      case 4:
        if (!formData.amount || formData.amount <= 0) {
          newErrors.amount = "Please enter a valid amount";
        }
        break;
    }

    setFieldErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleNext = async () => {
    // Validate current step before proceeding
    const isValid = validateCurrentStep();

    const paymentBody: PaymentInstancePayload = {
      userID: user?.userID,
      benId: formData.beneficiary?.userID,
      amount: formData.amount,
      coupon: formData.couponCode,
    };

    if (!isValid) {
      return;
    }

    if (currentStep === STEPS.length) {
      setLoading(true);

      try {
        const result = await paymentIntend(paymentBody).unwrap();

        if (result.payment_intent_id) {
          const paymentSubmitBody = {
            payment_intent_id: result.payment_intent_id,
          };

          await paymentSubmit(paymentSubmitBody).unwrap();
        }
        setError("");
        setErrors([]);
        setFieldErrors({});

        setToast({
          isVisible: true,
          message: "Form submitted successfully!",
          type: "success",
        });

        setTimeout(() => {
          router.push("/success");
        }, 2000);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        console.log(err?.data?.error);
        let mes = "Error submitting form. Please try again.";
        if (err?.data?.error === "Insufficient balance!") {
          mes = "Insufficient balance!";
        }
        if (err?.data?.message === "The amount field must be at least 1.") {
          mes = "The amount field must be at least 1.";
        }

        setToast({
          isVisible: true,
          message: mes,
          type: "error",
        });
      } finally {
        setLoading(false);
      }
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const steps = [
    {
      number: 1,
      title: "Transaction Type",
      tagline: "Choose Type",
      icon: ArrowRightLeft,
      color: "text-orange-500 bg-orange-100",
    },
    {
      number: 2,
      title: "Select Beneficiary",
      tagline: "Recipient",
      icon: Users,
      color: "text-blue-500 bg-blue-100",
    },
    {
      number: 3,
      title: "Payment Method",
      tagline: "How to Pay",
      icon: CreditCard,
      color: "text-purple-500 bg-purple-100",
    },
    {
      number: 4,
      title: "Summary & Confirm",
      tagline: "Review",
      icon: FileText,
      color: "text-green-500 bg-green-100",
    },
  ];

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1
            user={user ? user : null}
            formData={formData}
            updateFormData={setFormData}
            fieldErrors={fieldErrors}
          />
        );
      case 2:
        return (
          <Step2
            user={user ? user : null}
            formData={formData}
            updateFormData={setFormData}
            fieldErrors={fieldErrors}
          />
        );
      case 3:
        return (
          <Step3
            user={user ? user : null}
            formData={formData}
            updateFormData={setFormData}
            fieldErrors={fieldErrors}
          />
        );
      case 4:
        return (
          <Step4
            user={user ? user : null}
            formData={formData}
            updateFormData={setFormData}
            fieldErrors={fieldErrors}
          />
        );

      default:
        return null;
    }
  };

  return (
    <AuthWrapper requireAuth={true} redirectTo="/login">
      <main className="min-h-screen bg-[#FFFFFF80] flex justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-1 items-center justify-center mt-12 ">
          <div
            className="w-[90vw] space-y-8 px-2 md:px-8 py-8 rounded-3xl  
                 "
          >
            <div>
              <h2 className="mt-6 text-center text-lg md:text-xl lg:text-3xl font-semibold text-foreground">
                Payment Information
              </h2>
              <p className="text-center text-base md:text-xl text-muted-foreground pt-1">
                Complete Your Payment Information to list your services
              </p>
            </div>
            {/* Step Indicators */}
            <div className="flex justify-between items-center mt-8  w-full md:max-w-5xl mx-auto overflow-auto">
              {steps.map((step) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.number}
                    className="flex flex-col items-center font-arimo overflow-auto min-w-48 md:min-w-fit"
                  >
                    <div
                      className={`rounded-full w-10 h-10 flex items-center justify-center ${
                        currentStep === step.number
                          ? "bg-primary text-white"
                          : currentStep > step.number
                            ? "bg-green-500 text-white"
                            : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {step.number}
                    </div>
                    <p
                      className={`text-md mt-1 text-center  ${
                        currentStep === step.number
                          ? " text-muted-foreground"
                          : " text-[#6A7282]"
                      } `}
                    >
                      {step.title}
                    </p>
                    <p className="text-sm mt-1 text-center text-secondary">
                      {step.tagline}
                    </p>
                  </div>
                );
              })}
            </div>
            {/* Step Content */}
            <div className="mt-8 w-full md:max-w-[60vw] xl:max-w-[50vw] mx-auto">
              {renderStep()}
            </div>
            {(error || errors.length > 0) && (
              <div className="mt-2 w-full md:max-w-[60vw] xl:max-w-[50vw] mx-auto bg-red-50 p-4 rounded-lg border border-red-200">
                <div className="flex items-center mb-2">
                  <svg
                    className="h-5 w-5 text-red-500 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <h3 className="text-red-800 font-medium">
                    Please fix the following issues:
                  </h3>
                </div>
                <ul className="text-red-700 text-sm space-y-1">
                  {/* Show header error message if present (for step 5) */}
                  {error && error !== "Please fix the following issues:" && (
                    <li className="flex items-start font-medium">• {error}</li>
                  )}
                  {errors.map((err, index) => (
                    <li key={index} className="flex items-start">
                      • {err}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {/* Navigation Buttons */}
            <div className="flex justify-between mt-6 w-full md:max-w-[50vw] mx-auto">
              {currentStep > 1 && (
                <Button
                  icon={<ChevronLeft className="h-5 w-5 md:mr-2" />}
                  iconPosition="left"
                  onClick={handlePrevious}
                  className="text-sm font-medium text-white hover:text-primary/90  rounded-xl"
                >
                  Previous
                </Button>
              )}
              <Button
                text={
                  loading
                    ? "Submitting..."
                    : currentStep === 4
                      ? "Submit"
                      : "Next "
                }
                icon={<ChevronRight className="h-5 w-5 md:mr-2" />}
                variant="primary"
                className="ml-auto rounded-xl text-white"
                onClick={handleNext}
                disabled={
                  loading ||
                  (currentStep < 4 && Object.keys(fieldErrors).length > 0)
                }
              />
            </div>
            {/* Bottom Badges */}
            <div className="grid gap-4 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 space-x-4 mt-8 w-full md:max-w-[60vw] xl:max-w-[50vw] mx-auto  pt-8 ">
              <div className="bg-white p-4 rounded-xl border-border flex items-center space-x-2 shadow-md ">
                <div className="flex items-center bg-blue-100 text-blue-600 px-3 py-2 rounded-lg text-sm">
                  <Shield className="h-8 w-6 " />
                </div>
                <div className="mx-4">
                  <h1 className="text-sm md:text-md">Secure Verification</h1>
                  <h3 className="text-secondary text-xs md:text-md">
                    Bank-level encryption
                  </h3>
                </div>
              </div>
              <div className="bg-white p-4 rounded-xl border-border flex items-center space-x-2 shadow-md">
                <div className="flex items-center bg-green-100 text-green-600 px-3 py-2 rounded-lg text-sm">
                  <Lock className="h-8 w-6 " />
                </div>
                <div className="mx-4">
                  <h1 className="text-sm md:text-md">Data Protected</h1>
                  <h3 className="text-secondary text-xs md:text-md">
                    Privacy guaranteed
                  </h3>
                </div>
              </div>
              <div className="bg-white p-4 rounded-xl border-border flex items-center space-x-2 shadow-md">
                <div className="flex items-center bg-purple-100 text-purple-600 px-3 py-2 rounded-lg text-sm">
                  <CheckCircle className="h-8 w-6 " />
                </div>
                <div className="mx-4">
                  <h1 className="text-sm md:text-md">Secure Verification</h1>
                  <h3 className="text-secondary text-xs md:text-md">
                    2-3 business days
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast((prev) => ({ ...prev, isVisible: false }))}
      />
    </AuthWrapper>
  );
}
