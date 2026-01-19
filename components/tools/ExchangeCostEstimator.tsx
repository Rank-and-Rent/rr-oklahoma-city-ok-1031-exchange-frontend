"use client";

import { useState, useEffect } from "react";

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
    <div className="rounded-xl border border-gray-700 bg-gray-800/80 p-8 md:p-10">
      <h2 className="font-heading text-2xl uppercase tracking-wide text-white md:text-3xl">
        Estimate Your Costs
      </h2>
      <p className="mt-2 text-gray-400">
        Enter your property details to estimate exchange costs.
      </p>

      <div className="mt-8 space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="propertyValue" className="block text-sm font-medium uppercase tracking-wider text-gray-300">
              Property Value
            </label>
            <div className="relative mt-2">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
              <input
                id="propertyValue"
                type="text"
                inputMode="decimal"
                value={propertyValue}
                onChange={(e) => handleInputChange("propertyValue", e.target.value)}
                className={`w-full rounded-lg border ${
                  errors.propertyValue ? "border-red-500" : "border-gray-600"
                } bg-gray-900 pl-8 pr-4 py-3 text-white placeholder-gray-500 outline-none transition focus:border-white`}
                placeholder="0"
              />
            </div>
            {errors.propertyValue && (
              <p className="mt-1 text-sm text-red-400">{errors.propertyValue}</p>
            )}
          </div>

          <div>
            <label htmlFor="qiFeePercentage" className="block text-sm font-medium uppercase tracking-wider text-gray-300">
              QI Fee Percentage
            </label>
            <div className="relative mt-2">
              <input
                id="qiFeePercentage"
                type="text"
                inputMode="decimal"
                value={qiFeePercentage}
                onChange={(e) => handleInputChange("qiFeePercentage", e.target.value)}
                className={`w-full rounded-lg border ${
                  errors.qiFeePercentage ? "border-red-500" : "border-gray-600"
                } bg-gray-900 px-4 py-3 text-white placeholder-gray-500 outline-none transition focus:border-white`}
                placeholder="1.0"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">%</span>
            </div>
            {errors.qiFeePercentage && (
              <p className="mt-1 text-sm text-red-400">{errors.qiFeePercentage}</p>
            )}
          </div>

          <div>
            <label htmlFor="escrowFee" className="block text-sm font-medium uppercase tracking-wider text-gray-300">
              Escrow Fee
            </label>
            <div className="relative mt-2">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
              <input
                id="escrowFee"
                type="text"
                inputMode="decimal"
                value={escrowFee}
                onChange={(e) => handleInputChange("escrowFee", e.target.value)}
                className={`w-full rounded-lg border ${
                  errors.escrowFee ? "border-red-500" : "border-gray-600"
                } bg-gray-900 pl-8 pr-4 py-3 text-white placeholder-gray-500 outline-none transition focus:border-white`}
                placeholder="500"
              />
            </div>
            {errors.escrowFee && (
              <p className="mt-1 text-sm text-red-400">{errors.escrowFee}</p>
            )}
          </div>

          <div>
            <label htmlFor="titleInsuranceRate" className="block text-sm font-medium uppercase tracking-wider text-gray-300">
              Title Insurance Rate
            </label>
            <div className="relative mt-2">
              <input
                id="titleInsuranceRate"
                type="text"
                inputMode="decimal"
                value={titleInsuranceRate}
                onChange={(e) => handleInputChange("titleInsuranceRate", e.target.value)}
                className={`w-full rounded-lg border ${
                  errors.titleInsuranceRate ? "border-red-500" : "border-gray-600"
                } bg-gray-900 px-4 py-3 text-white placeholder-gray-500 outline-none transition focus:border-white`}
                placeholder="0.5"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">%</span>
            </div>
            {errors.titleInsuranceRate && (
              <p className="mt-1 text-sm text-red-400">{errors.titleInsuranceRate}</p>
            )}
          </div>

          <div className="md:col-span-2 md:w-1/2">
            <label htmlFor="recordingFees" className="block text-sm font-medium uppercase tracking-wider text-gray-300">
              Recording Fees
            </label>
            <div className="relative mt-2">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
              <input
                id="recordingFees"
                type="text"
                inputMode="decimal"
                value={recordingFees}
                onChange={(e) => handleInputChange("recordingFees", e.target.value)}
                className={`w-full rounded-lg border ${
                  errors.recordingFees ? "border-red-500" : "border-gray-600"
                } bg-gray-900 pl-8 pr-4 py-3 text-white placeholder-gray-500 outline-none transition focus:border-white`}
                placeholder="100"
              />
            </div>
            {errors.recordingFees && (
              <p className="mt-1 text-sm text-red-400">{errors.recordingFees}</p>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={calculateCosts}
          className="btn-white w-full md:w-auto"
        >
          Calculate Costs
        </button>

        {results && (
          <div className="mt-8 rounded-lg border border-gray-600 bg-gray-900 p-6">
            <h3 className="font-heading text-xl uppercase tracking-wide text-white">Cost Breakdown</h3>
            <div className="mt-4 space-y-3">
              <div className="flex justify-between border-b border-gray-700 pb-3">
                <span className="text-gray-400">QI Fee:</span>
                <span className="font-semibold text-white">{formatCurrency(results.qiFee)}</span>
              </div>
              <div className="flex justify-between border-b border-gray-700 pb-3">
                <span className="text-gray-400">Escrow Fee:</span>
                <span className="font-semibold text-white">{formatCurrency(results.escrowFee)}</span>
              </div>
              <div className="flex justify-between border-b border-gray-700 pb-3">
                <span className="text-gray-400">Title Insurance:</span>
                <span className="font-semibold text-white">{formatCurrency(results.titleInsurance)}</span>
              </div>
              <div className="flex justify-between border-b border-gray-700 pb-3">
                <span className="text-gray-400">Recording Fees:</span>
                <span className="font-semibold text-white">{formatCurrency(results.recordingFees)}</span>
              </div>
              <div className="flex justify-between border-b-2 border-white/30 pb-3 pt-2">
                <span className="font-heading text-lg uppercase text-white">Total Costs:</span>
                <span className="font-heading text-lg text-white">{formatCurrency(results.totalCosts)}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
