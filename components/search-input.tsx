"use client";

import { useState } from "react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";

type SearchInputProps = {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onClear?: () => void;
  className?: string;
};

export default function SearchInput({
  placeholder = "Search...",
  value,
  onChange,
  onClear,
  className = "",
}: SearchInputProps) {
  return (
    <div className={`relative ${className}`}>
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-slate-300 bg-white py-2 pl-10 pr-10 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-[#1E3A8A] focus:ring-2 focus:ring-[#1E3A8A]/20"
        aria-label="Search"
      />
      {value && (
        <button
          type="button"
          onClick={() => {
            onChange("");
            onClear?.();
          }}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-900"
          aria-label="Clear search"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}

