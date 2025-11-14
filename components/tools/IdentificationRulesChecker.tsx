"use client";

import { useState, useEffect } from "react";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";

type RuleResult = {
  name: string;
  satisfied: boolean;
  description: string;
  warning?: string;
};

export default function IdentificationRulesChecker() {
  const [numProperties, setNumProperties] = useState<string>("");
  const [totalIdentifiedValue, setTotalIdentifiedValue] = useState<string>("");
  const [relinquishedValue, setRelinquishedValue] = useState<string>("");
  const [results, setResults] = useState<RuleResult[] | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateInputs = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!numProperties || parseInt(numProperties) < 1) {
      newErrors.numProperties = "Number of properties must be at least 1";
    }
    if (!totalIdentifiedValue || parseFloat(totalIdentifiedValue) <= 0) {
      newErrors.totalIdentifiedValue = "Total identified value must be greater than 0";
    }
    if (!relinquishedValue || parseFloat(relinquishedValue) <= 0) {
      newErrors.relinquishedValue = "Relinquished property value must be greater than 0";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const checkRules = () => {
    if (!validateInputs()) {
      setResults(null);
      return;
    }

    const numProps = parseInt(numProperties);
    const totalValue = parseFloat(totalIdentifiedValue);
    const relValue = parseFloat(relinquishedValue);

    const rules: RuleResult[] = [];

    // 3-Property Rule
    const threePropertyRule = numProps <= 3;
    rules.push({
      name: "3-Property Rule",
      satisfied: threePropertyRule,
      description: `You identified ${numProps} propert${numProps === 1 ? "y" : "ies"}. The 3-property rule allows identification of up to 3 replacement properties regardless of value.`,
      warning: threePropertyRule
        ? undefined
        : `You identified ${numProps} properties. The 3-property rule only allows up to 3 properties.`,
    });

    // 200% Rule
    const twoHundredPercentRule = totalValue <= relValue * 2;
    const twoHundredPercent = relValue * 2;
    rules.push({
      name: "200% Rule",
      satisfied: twoHundredPercentRule,
      description: `Your total identified value is ${formatCurrency(totalValue)}. The 200% rule allows identification of properties with a total value up to 200% (${formatCurrency(twoHundredPercent)}) of the relinquished property value.`,
      warning: twoHundredPercentRule
        ? undefined
        : `Your total identified value (${formatCurrency(totalValue)}) exceeds 200% of the relinquished value (${formatCurrency(twoHundredPercent)}).`,
    });

    // 95% Rule
    const ninetyFivePercentRule = totalValue >= relValue * 0.95;
    const ninetyFivePercent = relValue * 0.95;
    rules.push({
      name: "95% Rule",
      satisfied: ninetyFivePercentRule,
      description: `Your total identified value is ${formatCurrency(totalValue)}. The 95% rule requires that you acquire at least 95% (${formatCurrency(ninetyFivePercent)}) of the total identified value.`,
      warning: ninetyFivePercentRule
        ? undefined
        : `Your total identified value (${formatCurrency(totalValue)}) is less than 95% of the relinquished value (${formatCurrency(ninetyFivePercent)}). You must acquire at least 95% of the identified value.`,
    });

    setResults(rules);
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
    if (field === "numProperties") setNumProperties(numericValue);
    if (field === "totalIdentifiedValue") setTotalIdentifiedValue(numericValue);
    if (field === "relinquishedValue") setRelinquishedValue(numericValue);

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  // Auto-check rules when all fields are filled
  useEffect(() => {
    if (numProperties && totalIdentifiedValue && relinquishedValue) {
      const numProps = parseInt(numProperties);
      const totalValue = parseFloat(totalIdentifiedValue);
      const relValue = parseFloat(relinquishedValue);

      if (numProps >= 1 && totalValue > 0 && relValue > 0) {
        const rules: RuleResult[] = [];

        const threePropertyRule = numProps <= 3;
        rules.push({
          name: "3-Property Rule",
          satisfied: threePropertyRule,
          description: `You identified ${numProps} propert${numProps === 1 ? "y" : "ies"}. The 3-property rule allows identification of up to 3 replacement properties regardless of value.`,
          warning: threePropertyRule
            ? undefined
            : `You identified ${numProps} properties. The 3-property rule only allows up to 3 properties.`,
        });

        const twoHundredPercentRule = totalValue <= relValue * 2;
        const twoHundredPercent = relValue * 2;
        rules.push({
          name: "200% Rule",
          satisfied: twoHundredPercentRule,
          description: `Your total identified value is ${formatCurrency(totalValue)}. The 200% rule allows identification of properties with a total value up to 200% (${formatCurrency(twoHundredPercent)}) of the relinquished property value.`,
          warning: twoHundredPercentRule
            ? undefined
            : `Your total identified value (${formatCurrency(totalValue)}) exceeds 200% of the relinquished value (${formatCurrency(twoHundredPercent)}).`,
        });

        const ninetyFivePercentRule = totalValue >= relValue * 0.95;
        const ninetyFivePercent = relValue * 0.95;
        rules.push({
          name: "95% Rule",
          satisfied: ninetyFivePercentRule,
          description: `Your total identified value is ${formatCurrency(totalValue)}. The 95% rule requires that you acquire at least 95% (${formatCurrency(ninetyFivePercent)}) of the total identified value.`,
          warning: ninetyFivePercentRule
            ? undefined
            : `Your total identified value (${formatCurrency(totalValue)}) is less than 95% of the relinquished value (${formatCurrency(ninetyFivePercent)}). You must acquire at least 95% of the identified value.`,
        });

        setResults(rules);
      }
    }
  }, [numProperties, totalIdentifiedValue, relinquishedValue]);

  const allRulesSatisfied = results?.every((rule) => rule.satisfied) ?? false;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">
      <div className="mb-6 flex items-center gap-3">
        <CheckCircleIcon className="h-8 w-8 text-[#1E3A8A]" />
        <h2 className="text-2xl font-semibold text-slate-900">Identification Rules Checker</h2>
      </div>

      <div className="space-y-6">
        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <label htmlFor="numProperties" className="block text-sm font-semibold text-slate-700 mb-2">
              Number of Properties Identified
            </label>
            <input
              id="numProperties"
              type="text"
              inputMode="numeric"
              value={numProperties}
              onChange={(e) => handleInputChange("numProperties", e.target.value)}
              className={`w-full rounded-lg border ${
                errors.numProperties ? "border-red-500" : "border-slate-300"
              } bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-[#1E3A8A] focus:ring-2 focus:ring-[#1E3A8A]/20`}
              placeholder="0"
            />
            {errors.numProperties && (
              <p className="mt-1 text-sm text-red-600">{errors.numProperties}</p>
            )}
            <p className="mt-1 text-xs text-slate-500">Total number of replacement properties identified</p>
          </div>

          <div>
            <label htmlFor="totalIdentifiedValue" className="block text-sm font-semibold text-slate-700 mb-2">
              Total Identified Value
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">$</span>
              <input
                id="totalIdentifiedValue"
                type="text"
                inputMode="decimal"
                value={totalIdentifiedValue}
                onChange={(e) => handleInputChange("totalIdentifiedValue", e.target.value)}
                className={`w-full rounded-lg border ${
                  errors.totalIdentifiedValue ? "border-red-500" : "border-slate-300"
                } bg-white pl-8 pr-4 py-3 text-slate-900 outline-none transition focus:border-[#1E3A8A] focus:ring-2 focus:ring-[#1E3A8A]/20`}
                placeholder="0"
              />
            </div>
            {errors.totalIdentifiedValue && (
              <p className="mt-1 text-sm text-red-600">{errors.totalIdentifiedValue}</p>
            )}
            <p className="mt-1 text-xs text-slate-500">Sum of all identified replacement property values</p>
          </div>

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
            <p className="mt-1 text-xs text-slate-500">Sale price of the relinquished property</p>
          </div>
        </div>

        <button
          type="button"
          onClick={checkRules}
          className="w-full rounded-full bg-[#1E3A8A] px-6 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-white shadow-lg shadow-blue-900/20 transition hover:bg-[#162d63] md:w-auto"
        >
          Check Rules
        </button>

        {results && (
          <div className="mt-8 space-y-4">
            <div
              className={`rounded-lg border-2 p-4 ${
                allRulesSatisfied
                  ? "border-green-500 bg-green-50"
                  : "border-yellow-500 bg-yellow-50"
              }`}
            >
              <div className="flex items-center gap-2">
                {allRulesSatisfied ? (
                  <CheckCircleIcon className="h-6 w-6 text-green-600" />
                ) : (
                  <XCircleIcon className="h-6 w-6 text-yellow-600" />
                )}
                <h3 className="text-lg font-semibold text-slate-900">
                  {allRulesSatisfied
                    ? "All Rules Satisfied"
                    : "Some Rules Not Satisfied"}
                </h3>
              </div>
              <p className="mt-2 text-sm text-slate-700">
                {allRulesSatisfied
                  ? "Your identification meets all IRS requirements. You may proceed with acquiring any of the identified properties."
                  : "Review the rules below. You must satisfy at least one of the three identification rules to proceed."}
              </p>
            </div>

            <div className="space-y-4">
              {results.map((rule, index) => (
                <div
                  key={index}
                  className={`rounded-lg border p-6 ${
                    rule.satisfied ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {rule.satisfied ? (
                      <CheckCircleIcon className="h-6 w-6 flex-shrink-0 text-green-600 mt-0.5" />
                    ) : (
                      <XCircleIcon className="h-6 w-6 flex-shrink-0 text-red-600 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <h4 className="text-base font-semibold text-slate-900">{rule.name}</h4>
                      <p className="mt-2 text-sm text-slate-700">{rule.description}</p>
                      {rule.warning && (
                        <div className="mt-3 rounded-md bg-yellow-100 p-3">
                          <p className="text-sm font-semibold text-yellow-800">Warning</p>
                          <p className="mt-1 text-sm text-yellow-700">{rule.warning}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-md bg-blue-50 p-4">
              <p className="text-xs text-slate-700">
                <strong>Understanding the Rules:</strong> You must satisfy at least one of the three identification rules:
                (1) Identify up to 3 properties regardless of value, (2) Identify any number of properties with total
                value up to 200% of relinquished value, or (3) Identify any number of properties but acquire at least
                95% of the total identified value. Consult your qualified intermediary to ensure compliance.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

