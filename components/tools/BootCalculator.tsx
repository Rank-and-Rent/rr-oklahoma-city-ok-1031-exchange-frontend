"use client";

import { useState, useEffect } from "react";

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

    const cash = parseFloat(cashReceived) || 0;
    const oldMort = parseFloat(oldMortgage) || 0;
    const newMort = parseFloat(newMortgage) || 0;

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
    const numericValue = value.replace(/[^0-9.]/g, "");
    if (field === "relinquishedValue") setRelinquishedValue(numericValue);
    if (field === "replacementValue") setReplacementValue(numericValue);
    if (field === "cashReceived") setCashReceived(numericValue);
    if (field === "oldMortgage") setOldMortgage(numericValue);
    if (field === "newMortgage") setNewMortgage(numericValue);

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

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
    <div className="rounded-xl border border-gray-700 bg-gray-800/80 p-8 md:p-10">
      <h2 className="font-heading text-2xl uppercase tracking-wide text-white md:text-3xl">
        Calculate Your Boot
      </h2>
      <p className="mt-2 text-gray-400">
        Enter your exchange details below to calculate potential boot.
      </p>

      <div className="mt-8 space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="relinquishedValue" className="block text-sm font-medium uppercase tracking-wider text-gray-300">
              Relinquished Property Value
            </label>
            <div className="relative mt-2">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
              <input
                id="relinquishedValue"
                type="text"
                inputMode="decimal"
                value={relinquishedValue}
                onChange={(e) => handleInputChange("relinquishedValue", e.target.value)}
                className={`w-full rounded-lg border ${
                  errors.relinquishedValue ? "border-red-500" : "border-gray-600"
                } bg-gray-900 pl-8 pr-4 py-3 text-white placeholder-gray-500 outline-none transition focus:border-white`}
                placeholder="0"
              />
            </div>
            {errors.relinquishedValue && (
              <p className="mt-1 text-sm text-red-400">{errors.relinquishedValue}</p>
            )}
          </div>

          <div>
            <label htmlFor="replacementValue" className="block text-sm font-medium uppercase tracking-wider text-gray-300">
              Replacement Property Value
            </label>
            <div className="relative mt-2">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
              <input
                id="replacementValue"
                type="text"
                inputMode="decimal"
                value={replacementValue}
                onChange={(e) => handleInputChange("replacementValue", e.target.value)}
                className={`w-full rounded-lg border ${
                  errors.replacementValue ? "border-red-500" : "border-gray-600"
                } bg-gray-900 pl-8 pr-4 py-3 text-white placeholder-gray-500 outline-none transition focus:border-white`}
                placeholder="0"
              />
            </div>
            {errors.replacementValue && (
              <p className="mt-1 text-sm text-red-400">{errors.replacementValue}</p>
            )}
          </div>

          <div>
            <label htmlFor="cashReceived" className="block text-sm font-medium uppercase tracking-wider text-gray-300">
              Cash Received
            </label>
            <div className="relative mt-2">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
              <input
                id="cashReceived"
                type="text"
                inputMode="decimal"
                value={cashReceived}
                onChange={(e) => handleInputChange("cashReceived", e.target.value)}
                className={`w-full rounded-lg border ${
                  errors.cashReceived ? "border-red-500" : "border-gray-600"
                } bg-gray-900 pl-8 pr-4 py-3 text-white placeholder-gray-500 outline-none transition focus:border-white`}
                placeholder="0"
              />
            </div>
            {errors.cashReceived && (
              <p className="mt-1 text-sm text-red-400">{errors.cashReceived}</p>
            )}
          </div>

          <div>
            <label htmlFor="oldMortgage" className="block text-sm font-medium uppercase tracking-wider text-gray-300">
              Old Mortgage Balance
            </label>
            <div className="relative mt-2">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
              <input
                id="oldMortgage"
                type="text"
                inputMode="decimal"
                value={oldMortgage}
                onChange={(e) => handleInputChange("oldMortgage", e.target.value)}
                className={`w-full rounded-lg border ${
                  errors.oldMortgage ? "border-red-500" : "border-gray-600"
                } bg-gray-900 pl-8 pr-4 py-3 text-white placeholder-gray-500 outline-none transition focus:border-white`}
                placeholder="0"
              />
            </div>
            {errors.oldMortgage && (
              <p className="mt-1 text-sm text-red-400">{errors.oldMortgage}</p>
            )}
          </div>

          <div className="md:col-span-2 md:w-1/2">
            <label htmlFor="newMortgage" className="block text-sm font-medium uppercase tracking-wider text-gray-300">
              New Mortgage Balance
            </label>
            <div className="relative mt-2">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
              <input
                id="newMortgage"
                type="text"
                inputMode="decimal"
                value={newMortgage}
                onChange={(e) => handleInputChange("newMortgage", e.target.value)}
                className={`w-full rounded-lg border ${
                  errors.newMortgage ? "border-red-500" : "border-gray-600"
                } bg-gray-900 pl-8 pr-4 py-3 text-white placeholder-gray-500 outline-none transition focus:border-white`}
                placeholder="0"
              />
            </div>
            {errors.newMortgage && (
              <p className="mt-1 text-sm text-red-400">{errors.newMortgage}</p>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={calculateBoot}
          className="btn-white w-full md:w-auto"
        >
          Calculate Boot
        </button>

        {results && (
          <div className="mt-8 rounded-lg border border-gray-600 bg-gray-900 p-6">
            <h3 className="font-heading text-xl uppercase tracking-wide text-white">Results</h3>
            <div className="mt-4 space-y-3">
              <div className="flex justify-between border-b border-gray-700 pb-3">
                <span className="text-gray-400">Cash Boot:</span>
                <span className="font-semibold text-white">{formatCurrency(results.cashBoot)}</span>
              </div>
              <div className="flex justify-between border-b border-gray-700 pb-3">
                <span className="text-gray-400">Mortgage Boot:</span>
                <span className="font-semibold text-white">{formatCurrency(results.mortgageBoot)}</span>
              </div>
              <div className="flex justify-between border-b-2 border-white/30 pb-3 pt-2">
                <span className="font-heading text-lg uppercase text-white">Total Boot:</span>
                <span className="font-heading text-lg text-white">{formatCurrency(results.totalBoot)}</span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-gray-400">Estimated Tax (20%):</span>
                <span className="font-semibold text-red-400">{formatCurrency(results.estimatedTax)}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
