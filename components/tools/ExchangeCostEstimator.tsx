"use client";

import { useState, useEffect } from "react";
import { BanknotesIcon } from "@heroicons/react/24/outline";

type CostBreakdown = {
  qiFee: number;
  escrowFee: number;
  titleInsurance: number;
  recordingFees: number;
  totalCosts: number;
};

export default function ExchangeCostEstimator() {
  const [propertyValue, setPropertyValue] = useState<string>("");
  const [qiFeePercentage, setQiFeePercentage] = useState<string>("1.0");
  const [escrowFee, setEscrowFee] = useState<string>("500");
  const [titleInsuranceRate, setTitleInsuranceRate] = useState<string>("0.5");
  const [recordingFees, setRecordingFees] = useState<string>("100");
  const [results, setResults] = useState<CostBreakdown | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateInputs = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!propertyValue || parseFloat(propertyValue) <= 0) {
      newErrors.propertyValue = "Property value must be greater than 0";
    }
    if (!qiFeePercentage || parseFloat(qiFeePercentage) < 0 || parseFloat(qiFeePercentage) > 10) {
      newErrors.qiFeePercentage = "QI fee percentage must be between 0 and 10";
    }
    if (escrowFee === "" || parseFloat(escrowFee) < 0) {
      newErrors.escrowFee = "Escrow fee cannot be negative";
    }
    if (!titleInsuranceRate || parseFloat(titleInsuranceRate) < 0 || parseFloat(titleInsuranceRate) > 5) {
      newErrors.titleInsuranceRate = "Title insurance rate must be between 0 and 5";
    }
    if (recordingFees === "" || parseFloat(recordingFees) < 0) {
      newErrors.recordingFees = "Recording fees cannot be negative";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateCosts = () => {
    if (!validateInputs()) {
      setResults(null);
      return;
    }

    const propValue = parseFloat(propertyValue);
    const qiPercent = parseFloat(qiFeePercentage) / 100;
    const escrow = parseFloat(escrowFee) || 0;
    const titleRate = parseFloat(titleInsuranceRate) / 100;
    const recording = parseFloat(recordingFees) || 0;

    const qiFee = propValue * qiPercent;
    const titleInsurance = propValue * titleRate;
    const totalCosts = qiFee + escrow + titleInsurance + recording;

    setResults({
      qiFee,
      escrowFee: escrow,
      titleInsurance,
      recordingFees: recording,
      totalCosts,
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
    if (field === "propertyValue") setPropertyValue(numericValue);
    if (field === "qiFeePercentage") setQiFeePercentage(numericValue);
    if (field === "escrowFee") setEscrowFee(numericValue);
    if (field === "titleInsuranceRate") setTitleInsuranceRate(numericValue);
    if (field === "recordingFees") setRecordingFees(numericValue);

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  // Auto-calculate when all fields are filled
  useEffect(() => {
    if (propertyValue && qiFeePercentage && escrowFee !== "" && titleInsuranceRate && recordingFees !== "") {
      const propValue = parseFloat(propertyValue);
      const qiPercent = parseFloat(qiFeePercentage) / 100;
      const escrow = parseFloat(escrowFee) || 0;
      const titleRate = parseFloat(titleInsuranceRate) / 100;
      const recording = parseFloat(recordingFees) || 0;

      if (
        propValue > 0 &&
        qiPercent >= 0 &&
        qiPercent <= 0.1 &&
        escrow >= 0 &&
        titleRate >= 0 &&
        titleRate <= 0.05 &&
        recording >= 0
      ) {
        const qiFee = propValue * qiPercent;
        const titleInsurance = propValue * titleRate;
        const totalCosts = qiFee + escrow + titleInsurance + recording;

        setResults({
          qiFee,
          escrowFee: escrow,
          titleInsurance,
          recordingFees: recording,
          totalCosts,
        });
      }
    }
  }, [propertyValue, qiFeePercentage, escrowFee, titleInsuranceRate, recordingFees]);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">
      <div className="mb-6 flex items-center gap-3">
        <BanknotesIcon className="h-8 w-8 text-[#1E3A8A]" />
        <h2 className="text-2xl font-semibold text-slate-900">Exchange Cost Estimator</h2>
      </div>

      <div className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="propertyValue" className="block text-sm font-semibold text-slate-700 mb-2">
              Property Value
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">$</span>
              <input
                id="propertyValue"
                type="text"
                inputMode="decimal"
                value={propertyValue}
                onChange={(e) => handleInputChange("propertyValue", e.target.value)}
                className={`w-full rounded-lg border ${
                  errors.propertyValue ? "border-red-500" : "border-slate-300"
                } bg-white pl-8 pr-4 py-3 text-slate-900 outline-none transition focus:border-[#1E3A8A] focus:ring-2 focus:ring-[#1E3A8A]/20`}
                placeholder="0"
              />
            </div>
            {errors.propertyValue && (
              <p className="mt-1 text-sm text-red-600">{errors.propertyValue}</p>
            )}
            <p className="mt-1 text-xs text-slate-500">The value of the property in the exchange</p>
          </div>

          <div>
            <label htmlFor="qiFeePercentage" className="block text-sm font-semibold text-slate-700 mb-2">
              QI Fee Percentage (%)
            </label>
            <div className="relative">
              <input
                id="qiFeePercentage"
                type="text"
                inputMode="decimal"
                value={qiFeePercentage}
                onChange={(e) => handleInputChange("qiFeePercentage", e.target.value)}
                className={`w-full rounded-lg border ${
                  errors.qiFeePercentage ? "border-red-500" : "border-slate-300"
                } bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-[#1E3A8A] focus:ring-2 focus:ring-[#1E3A8A]/20`}
                placeholder="1.0"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500">%</span>
            </div>
            {errors.qiFeePercentage && (
              <p className="mt-1 text-sm text-red-600">{errors.qiFeePercentage}</p>
            )}
            <p className="mt-1 text-xs text-slate-500">Typical range: 0.5% - 2% of property value</p>
          </div>

          <div>
            <label htmlFor="escrowFee" className="block text-sm font-semibold text-slate-700 mb-2">
              Escrow Fee
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">$</span>
              <input
                id="escrowFee"
                type="text"
                inputMode="decimal"
                value={escrowFee}
                onChange={(e) => handleInputChange("escrowFee", e.target.value)}
                className={`w-full rounded-lg border ${
                  errors.escrowFee ? "border-red-500" : "border-slate-300"
                } bg-white pl-8 pr-4 py-3 text-slate-900 outline-none transition focus:border-[#1E3A8A] focus:ring-2 focus:ring-[#1E3A8A]/20`}
                placeholder="500"
              />
            </div>
            {errors.escrowFee && (
              <p className="mt-1 text-sm text-red-600">{errors.escrowFee}</p>
            )}
            <p className="mt-1 text-xs text-slate-500">Escrow and closing coordination fees</p>
          </div>

          <div>
            <label htmlFor="titleInsuranceRate" className="block text-sm font-semibold text-slate-700 mb-2">
              Title Insurance Rate (%)
            </label>
            <div className="relative">
              <input
                id="titleInsuranceRate"
                type="text"
                inputMode="decimal"
                value={titleInsuranceRate}
                onChange={(e) => handleInputChange("titleInsuranceRate", e.target.value)}
                className={`w-full rounded-lg border ${
                  errors.titleInsuranceRate ? "border-red-500" : "border-slate-300"
                } bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-[#1E3A8A] focus:ring-2 focus:ring-[#1E3A8A]/20`}
                placeholder="0.5"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500">%</span>
            </div>
            {errors.titleInsuranceRate && (
              <p className="mt-1 text-sm text-red-600">{errors.titleInsuranceRate}</p>
            )}
            <p className="mt-1 text-xs text-slate-500">Typical range: 0.3% - 0.8% of property value</p>
          </div>

          <div>
            <label htmlFor="recordingFees" className="block text-sm font-semibold text-slate-700 mb-2">
              Recording Fees
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">$</span>
              <input
                id="recordingFees"
                type="text"
                inputMode="decimal"
                value={recordingFees}
                onChange={(e) => handleInputChange("recordingFees", e.target.value)}
                className={`w-full rounded-lg border ${
                  errors.recordingFees ? "border-red-500" : "border-slate-300"
                } bg-white pl-8 pr-4 py-3 text-slate-900 outline-none transition focus:border-[#1E3A8A] focus:ring-2 focus:ring-[#1E3A8A]/20`}
                placeholder="100"
              />
            </div>
            {errors.recordingFees && (
              <p className="mt-1 text-sm text-red-600">{errors.recordingFees}</p>
            )}
            <p className="mt-1 text-xs text-slate-500">County recording fees (varies by county)</p>
          </div>
        </div>

        <button
          type="button"
          onClick={calculateCosts}
          className="w-full rounded-full bg-[#1E3A8A] px-6 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-white shadow-lg shadow-blue-900/20 transition hover:bg-[#162d63] md:w-auto"
        >
          Calculate Costs
        </button>

        {results && (
          <div className="mt-8 rounded-lg border border-slate-200 bg-slate-50 p-6">
            <h3 className="mb-4 text-lg font-semibold text-slate-900">Cost Breakdown</h3>
            <div className="space-y-3">
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-sm text-slate-600">QI Fee:</span>
                <span className="text-sm font-semibold text-slate-900">{formatCurrency(results.qiFee)}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-sm text-slate-600">Escrow Fee:</span>
                <span className="text-sm font-semibold text-slate-900">{formatCurrency(results.escrowFee)}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-sm text-slate-600">Title Insurance:</span>
                <span className="text-sm font-semibold text-slate-900">{formatCurrency(results.titleInsurance)}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-sm text-slate-600">Recording Fees:</span>
                <span className="text-sm font-semibold text-slate-900">{formatCurrency(results.recordingFees)}</span>
              </div>
              <div className="flex justify-between border-b-2 border-slate-300 pb-2 pt-2">
                <span className="text-base font-semibold text-slate-900">Total Exchange Costs:</span>
                <span className="text-base font-bold text-[#1E3A8A]">{formatCurrency(results.totalCosts)}</span>
              </div>
            </div>
            <div className="mt-4 rounded-md bg-blue-50 p-4">
              <p className="text-xs text-slate-700">
                <strong>Note:</strong> These are estimated costs. Actual fees may vary based on your qualified intermediary, title company, and county requirements. Oklahoma does not impose a state real estate transfer tax, but recording fees and title insurance premiums still apply. Additional costs may include lender fees, inspection costs, and survey fees.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

