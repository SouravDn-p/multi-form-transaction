// Step2.tsx
"use client";

import { useState, useMemo } from "react";
import { StepProps } from "@/types/stepType";
import { Users, Search } from "lucide-react";
import { BENEFICIARIES } from "@/constants/constant";

export default function Step2({
  formData,
  updateFormData,
  fieldErrors,
}: StepProps) {
  const [search, setSearch] = useState("");

  const filteredBeneficiaries = useMemo(() => {
    if (!search.trim()) return BENEFICIARIES;

    const q = search.toLowerCase();
    return BENEFICIARIES.filter(
      (b) =>
        b.name.toLowerCase().includes(q) ||
        String(b.id).toLowerCase().includes(q),
    );
  }, [search]);

  return (
    <div className="space-y-6">
      <div className="bg-white py-6 px-6 rounded-xl border border-gray-200 shadow-sm">
        {/* Header */}
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-xl bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md">
              <Users className="h-6 w-6 text-white" />
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-xl">
              Select Beneficiary
            </h3>
            <p className="text-base text-gray-600 pt-2">
              Choose the beneficiary who will receive this transaction. Please
              ensure the details are correct.
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search Beneficiary
          </label>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or ID"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Beneficiary List */}
        <div className="mt-6 space-y-3">
          {filteredBeneficiaries.length === 0 && (
            <p className="text-sm text-gray-500">No beneficiaries found.</p>
          )}

          {filteredBeneficiaries.map((beneficiary) => (
            <button
              key={beneficiary.id}
              type="button"
              className={`p-4 rounded-lg border text-left transition-all duration-200 w-full ${
                formData.beneficiary?.id === beneficiary.id
                  ? "border-blue-500 bg-blue-50 text-blue-700 hover:cursor-pointer"
                  : "border-gray-200 hover:border-blue-300 hover:bg-blue-50 hover:cursor-pointer"
              }`}
              onClick={() =>
                updateFormData({
                  ...formData,
                  beneficiary,
                })
              }
            >
              <div className="font-medium">{beneficiary.name}</div>
              <div className="text-sm text-gray-600 mt-1">
                ID: {beneficiary.id}
              </div>
            </button>
          ))}

          {fieldErrors?.beneficiary && (
            <p className="mt-2 text-sm text-red-600">
              {fieldErrors.beneficiary}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
