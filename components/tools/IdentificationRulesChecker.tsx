"use client";

import { useState, useEffect } from "react";

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

  const atLeastOneRuleSatisfied = results?.some((rule) => rule.satisfied) ?? false;

  return (
    <div className="rounded-xl border border-gray-700 bg-gray-800/80 p-8 md:p-10">
      <h2 className="font-heading text-2xl uppercase tracking-wide text-white md:text-3xl">
        Check Your Identification
      </h2>
      <p className="mt-2 text-gray-400">
        Enter your exchange details to validate against IRS rules.
      </p>

      <div className="mt-8 space-y-6">
        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <label htmlFor="numProperties" className="block text-sm font-medium uppercase tracking-wider text-gray-300">
              Properties Identified
            </label>
            <input
              id="numProperties"
              type="text"
              inputMode="numeric"
              value={numProperties}
              onChange={(e) => handleInputChange("numProperties", e.target.value)}
              className={`mt-2 w-full rounded-lg border ${
                errors.numProperties ? "border-red-500" : "border-gray-600"
              } bg-gray-900 px-4 py-3 text-white placeholder-gray-500 outline-none transition focus:border-white`}
              placeholder="0"
            />
            {errors.numProperties && (
              <p className="mt-1 text-sm text-red-400">{errors.numProperties}</p>
            )}
          </div>

          <div>
            <label htmlFor="totalIdentifiedValue" className="block text-sm font-medium uppercase tracking-wider text-gray-300">
              Total Identified Value
            </label>
            <div className="relative mt-2">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
              <input
                id="totalIdentifiedValue"
                type="text"
                inputMode="decimal"
                value={totalIdentifiedValue}
                onChange={(e) => handleInputChange("totalIdentifiedValue", e.target.value)}
                className={`w-full rounded-lg border ${
                  errors.totalIdentifiedValue ? "border-red-500" : "border-gray-600"
                } bg-gray-900 pl-8 pr-4 py-3 text-white placeholder-gray-500 outline-none transition focus:border-white`}
                placeholder="0"
              />
            </div>
            {errors.totalIdentifiedValue && (
              <p className="mt-1 text-sm text-red-400">{errors.totalIdentifiedValue}</p>
            )}
          </div>

          <div>
            <label htmlFor="relinquishedValue" className="block text-sm font-medium uppercase tracking-wider text-gray-300">
              Relinquished Value
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
        </div>

        <button
          type="button"
          onClick={checkRules}
          className="btn-white w-full md:w-auto"
        >
          Check Rules
        </button>

        {results && (
          <div className="mt-8 space-y-4">
            <div
              className={`rounded-lg border-2 p-4 ${
                atLeastOneRuleSatisfied
                  ? "border-green-500 bg-green-900/30"
                  : "border-red-500 bg-red-900/30"
              }`}
            >
              <h3 className="font-heading text-lg uppercase text-white">
                {atLeastOneRuleSatisfied
                  ? "Valid Identification"
                  : "Invalid Identification"}
              </h3>
              <p className="mt-2 text-sm text-gray-300">
                {atLeastOneRuleSatisfied
                  ? "Your identification satisfies at least one IRS rule. You may proceed with your exchange."
                  : "Your identification does not satisfy any IRS rules. Please adjust your property selections."}
              </p>
            </div>

            <div className="space-y-3">
              {results.map((rule, index) => (
                <div
                  key={index}
                  className={`rounded-lg border p-5 ${
                    rule.satisfied 
                      ? "border-green-700 bg-green-900/20" 
                      : "border-red-700 bg-red-900/20"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`mt-0.5 h-5 w-5 shrink-0 rounded-full flex items-center justify-center text-xs font-bold ${
                      rule.satisfied ? "bg-green-500 text-white" : "bg-red-500 text-white"
                    }`}>
                      {rule.satisfied ? "Y" : "N"}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-heading text-base uppercase text-white">{rule.name}</h4>
                      <p className="mt-2 text-sm text-gray-400">{rule.description}</p>
                      {rule.warning && (
                        <div className="mt-3 rounded-md bg-amber-900/40 border border-amber-700 p-3">
                          <p className="text-sm text-amber-300">{rule.warning}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
