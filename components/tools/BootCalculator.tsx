"use client";

import { useState, useEffect } from "react";
import { CalculatorIcon } from "@heroicons/react/24/outline";

type BootCalculationResult = {
  cashBoot: number;
  mortgageBoot: number;
  totalBoot: number;
  estimatedTax: number;
};

export default function BootCalculator() {
  const [relinquishedValue, setRelinquishedValue] = useState<string>("");
  const [replacementValue, setReplacementValue] = useState<string>("");
  const [cashReceived, setCashReceived] = useState<string>("");
  const [oldMortgage, setOldMortgage] = useState<string>("");
  const [newMortgage, setNewMortgage] = useState<string>("");
  const [results, setResults] = useState<BootCalculationResult | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateInputs = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!relinquishedValue || parseFloat(relinquishedValue) <= 0) {
      newErrors.relinquishedValue = "Relinquished property value must be greater than 0";
    }
    if (!replacementValue || parseFloat(replacementValue) <= 0) {
      newErrors.replacementValue = "Replacement property value must be greater than 0";
    }
    if (cashReceived === "" || parseFloat(cashReceived) < 0) {
      newErrors.cashReceived = "Cash received cannot be negative";
    }
    if (oldMortgage === "" || parseFloat(oldMortgage) < 0) {
      newErrors.oldMortgage = "Old mortgage cannot be negative";
    }
    if (newMortgage === "" || parseFloat(newMortgage) < 0) {
      newErrors.newMortgage = "New mortgage cannot be negative";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateBoot = () => {
    if (!validateInputs()) {
      setResults(null);
      return;
    }

    const relValue = parseFloat(relinquishedValue);
    const repValue = parseFloat(replacementValue);
    const cash = parseFloat(cashReceived) || 0;
    const oldMort = parseFloat(oldMortgage) || 0;
    const newMort = parseFloat(newMortgage) || 0;

    // Cash boot is any cash received
    const cashBoot = cash;

    // Mortgage boot occurs when new debt is less than old debt
    const mortgageBoot = Math.max(0, oldMort - newMort);

    // Total boot
    const totalBoot = cashBoot + mortgageBoot;

    // Estimated tax (using 20% as illustrative rate - should note this is approximate)
    const estimatedTax = totalBoot * 0.20;

    setResults({
      cashBoot,
      mortgageBoot,
      totalBoot,
      estimatedTax,
    });
  };

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handleInputChange = (field: string, value: string) => {
    // Allow only numbers and decimal point
    const numericValue = value.replace(/[^0-9.]/g, "");
    if (field === "relinquishedValue") setRelinquishedValue(numericValue);
    if (field === "replacementValue") setReplacementValue(numericValue);
    if (field === "cashReceived") setCashReceived(numericValue);
    if (field === "oldMortgage") setOldMortgage(numericValue);
    if (field === "newMortgage") setNewMortgage(numericValue);

    // Clear errors for this field
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  // Auto-calculate when all fields are filled
  useEffect(() => {
    if (
      relinquishedValue &&
      replacementValue &&
      cashReceived !== "" &&
      oldMortgage !== "" &&
      newMortgage !== ""
    ) {
      const relValue = parseFloat(relinquishedValue);
      const repValue = parseFloat(replacementValue);
      const cash = parseFloat(cashReceived) || 0;
      const oldMort = parseFloat(oldMortgage) || 0;
      const newMort = parseFloat(newMortgage) || 0;

      if (relValue > 0 && repValue > 0 && cash >= 0 && oldMort >= 0 && newMort >= 0) {
        const cashBoot = cash;
        const mortgageBoot = Math.max(0, oldMort - newMort);
        const totalBoot = cashBoot + mortgageBoot;
        const estimatedTax = totalBoot * 0.20;

        setResults({
          cashBoot,
          mortgageBoot,
          totalBoot,
          estimatedTax,
        });
      }
    }
  }, [relinquishedValue, replacementValue, cashReceived, oldMortgage, newMortgage]);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">
      <div className="mb-6 flex items-center gap-3">
        <CalculatorIcon className="h-8 w-8 text-[#1E3A8A]" />
        <h2 className="text-2xl font-semibold text-slate-900">Boot Calculator</h2>
      </div>

      <div className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="relinquishedValue" className="block text-sm font-semibold text-slate-700 mb-2">
              Relinquished Property Value
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">$</span>
              <input
                id="relinquishedValue"
                type="text"
                inputMode="decimal"
                value={relinquishedValue}
                onChange={(e) => handleInputChange("relinquishedValue", e.target.value)}
                className={`w-full rounded-lg border ${
                  errors.relinquishedValue ? "border-red-500" : "border-slate-300"
                } bg-white pl-8 pr-4 py-3 text-slate-900 outline-none transition focus:border-[#1E3A8A] focus:ring-2 focus:ring-[#1E3A8A]/20`}
                placeholder="0"
              />
            </div>
            {errors.relinquishedValue && (
              <p className="mt-1 text-sm text-red-600">{errors.relinquishedValue}</p>
            )}
            <p className="mt-1 text-xs text-slate-500">The sale price of the property you're selling</p>
          </div>

          <div>
            <label htmlFor="replacementValue" className="block text-sm font-semibold text-slate-700 mb-2">
              Replacement Property Value
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">$</span>
              <input
                id="replacementValue"
                type="text"
                inputMode="decimal"
                value={replacementValue}
                onChange={(e) => handleInputChange("replacementValue", e.target.value)}
                className={`w-full rounded-lg border ${
                  errors.replacementValue ? "border-red-500" : "border-slate-300"
                } bg-white pl-8 pr-4 py-3 text-slate-900 outline-none transition focus:border-[#1E3A8A] focus:ring-2 focus:ring-[#1E3A8A]/20`}
                placeholder="0"
              />
            </div>
            {errors.replacementValue && (
              <p className="mt-1 text-sm text-red-600">{errors.replacementValue}</p>
            )}
            <p className="mt-1 text-xs text-slate-500">The purchase price of the replacement property</p>
          </div>

          <div>
            <label htmlFor="cashReceived" className="block text-sm font-semibold text-slate-700 mb-2">
              Cash Received
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">$</span>
              <input
                id="cashReceived"
                type="text"
                inputMode="decimal"
                value={cashReceived}
                onChange={(e) => handleInputChange("cashReceived", e.target.value)}
                className={`w-full rounded-lg border ${
                  errors.cashReceived ? "border-red-500" : "border-slate-300"
                } bg-white pl-8 pr-4 py-3 text-slate-900 outline-none transition focus:border-[#1E3A8A] focus:ring-2 focus:ring-[#1E3A8A]/20`}
                placeholder="0"
              />
            </div>
            {errors.cashReceived && (
              <p className="mt-1 text-sm text-red-600">{errors.cashReceived}</p>
            )}
            <p className="mt-1 text-xs text-slate-500">Any cash you receive from the exchange</p>
          </div>

          <div>
            <label htmlFor="oldMortgage" className="block text-sm font-semibold text-slate-700 mb-2">
              Old Mortgage Balance
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">$</span>
              <input
                id="oldMortgage"
                type="text"
                inputMode="decimal"
                value={oldMortgage}
                onChange={(e) => handleInputChange("oldMortgage", e.target.value)}
                className={`w-full rounded-lg border ${
                  errors.oldMortgage ? "border-red-500" : "border-slate-300"
                } bg-white pl-8 pr-4 py-3 text-slate-900 outline-none transition focus:border-[#1E3A8A] focus:ring-2 focus:ring-[#1E3A8A]/20`}
                placeholder="0"
              />
            </div>
            {errors.oldMortgage && (
              <p className="mt-1 text-sm text-red-600">{errors.oldMortgage}</p>
            )}
            <p className="mt-1 text-xs text-slate-500">Mortgage balance on the relinquished property</p>
          </div>

          <div>
            <label htmlFor="newMortgage" className="block text-sm font-semibold text-slate-700 mb-2">
              New Mortgage Balance
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">$</span>
              <input
                id="newMortgage"
                type="text"
                inputMode="decimal"
                value={newMortgage}
                onChange={(e) => handleInputChange("newMortgage", e.target.value)}
                className={`w-full rounded-lg border ${
                  errors.newMortgage ? "border-red-500" : "border-slate-300"
                } bg-white pl-8 pr-4 py-3 text-slate-900 outline-none transition focus:border-[#1E3A8A] focus:ring-2 focus:ring-[#1E3A8A]/20`}
                placeholder="0"
              />
            </div>
            {errors.newMortgage && (
              <p className="mt-1 text-sm text-red-600">{errors.newMortgage}</p>
            )}
            <p className="mt-1 text-xs text-slate-500">Mortgage balance on the replacement property</p>
          </div>
        </div>

        <button
          type="button"
          onClick={calculateBoot}
          className="w-full rounded-full bg-[#1E3A8A] px-6 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-white shadow-lg shadow-blue-900/20 transition hover:bg-[#162d63] md:w-auto"
        >
          Calculate Boot
        </button>

        {results && (
          <div className="mt-8 rounded-lg border border-slate-200 bg-slate-50 p-6">
            <h3 className="mb-4 text-lg font-semibold text-slate-900">Calculation Results</h3>
            <div className="space-y-3">
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-sm text-slate-600">Cash Boot:</span>
                <span className="text-sm font-semibold text-slate-900">{formatCurrency(results.cashBoot)}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-sm text-slate-600">Mortgage Boot:</span>
                <span className="text-sm font-semibold text-slate-900">{formatCurrency(results.mortgageBoot)}</span>
              </div>
              <div className="flex justify-between border-b-2 border-slate-300 pb-2 pt-2">
                <span className="text-base font-semibold text-slate-900">Total Boot:</span>
                <span className="text-base font-bold text-[#1E3A8A]">{formatCurrency(results.totalBoot)}</span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-sm text-slate-600">Estimated Tax (20%):</span>
                <span className="text-sm font-semibold text-red-600">{formatCurrency(results.estimatedTax)}</span>
              </div>
            </div>
            <div className="mt-4 rounded-md bg-blue-50 p-4">
              <p className="text-xs text-slate-700">
                <strong>Note:</strong> Cash boot is any cash received in the exchange. Mortgage boot occurs when your new mortgage is less than your old mortgage. The estimated tax rate of 20% is illustrative only. Actual tax rates depend on your income bracket, state taxes, and depreciation recapture. Consult your CPA for accurate tax calculations.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

