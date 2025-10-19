// [R10]: Checkbox Group with Search Component
// → needs: React hooks, search filtering
// → provides: checkbox-group capability with search functionality

"use client";

import React, { useState, useMemo, ChangeEvent } from "react";

interface CheckboxOption {
  value: string;
  label: string;
  description?: string;
}

interface CheckboxGroupProps {
  options: CheckboxOption[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  label?: string;
  searchable?: boolean;
  searchPlaceholder?: string;
  selectAll?: boolean;
  disabled?: boolean;
  className?: string;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  options,
  selectedValues,
  onChange,
  label = "",
  searchable = true,
  searchPlaceholder = "Search options...",
  selectAll = true,
  disabled = false,
  className = "",
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter options based on search query
  const filteredOptions = useMemo(() => {
    if (!searchQuery) return options;
    const query = searchQuery.toLowerCase();
    return options.filter(
      (option) =>
        option.label.toLowerCase().includes(query) ||
        option.description?.toLowerCase().includes(query)
    );
  }, [options, searchQuery]);

  // Handle individual checkbox change
  const handleCheckboxChange = (value: string) => {
    if (disabled) return;

    const newValues = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];

    onChange(newValues);
  };

  // Handle select all
  const handleSelectAll = () => {
    if (disabled) return;

    const allFilteredValues = filteredOptions.map((opt) => opt.value);
    const allSelected = allFilteredValues.every((val) =>
      selectedValues.includes(val)
    );

    if (allSelected) {
      // Deselect all filtered options
      onChange(selectedValues.filter((val) => !allFilteredValues.includes(val)));
    } else {
      // Select all filtered options
      const newValues = [...new Set([...selectedValues, ...allFilteredValues])];
      onChange(newValues);
    }
  };

  // Check if all filtered options are selected
  const allFilteredSelected = useMemo(() => {
    if (filteredOptions.length === 0) return false;
    return filteredOptions.every((opt) => selectedValues.includes(opt.value));
  }, [filteredOptions, selectedValues]);

  // Check if some (but not all) filtered options are selected
  const someFilteredSelected = useMemo(() => {
    if (filteredOptions.length === 0) return false;
    return (
      filteredOptions.some((opt) => selectedValues.includes(opt.value)) &&
      !allFilteredSelected
    );
  }, [filteredOptions, selectedValues, allFilteredSelected]);

  return (
    <div className={`w-full ${className}`}>
      {/* Label */}
      {label && (
        <label className="mb-3 block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}

      {/* Search Input */}
      {searchable && (
        <div className="mb-3">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
              placeholder={searchPlaceholder}
              disabled={disabled}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 pl-10 text-sm text-gray-900 placeholder-gray-400 shadow-theme-xs transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder-gray-500 dark:focus:border-brand-600 dark:disabled:bg-gray-800"
            />
            <svg
              className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 dark:text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      )}

      {/* Select All */}
      {selectAll && filteredOptions.length > 0 && (
        <div className="mb-2 border-b border-gray-200 pb-2 dark:border-gray-700">
          <label className="flex cursor-pointer items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded-lg transition-colors">
            <div className="relative">
              <input
                type="checkbox"
                checked={allFilteredSelected}
                onChange={handleSelectAll}
                disabled={disabled}
                className="peer h-5 w-5 cursor-pointer appearance-none rounded border-2 border-gray-300 bg-white transition-all checked:border-brand-500 checked:bg-brand-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:checked:border-brand-600 dark:checked:bg-brand-600"
              />
              {someFilteredSelected && (
                <svg
                  className="pointer-events-none absolute left-0.5 top-0.5 h-4 w-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 12h14"
                  />
                </svg>
              )}
              {allFilteredSelected && (
                <svg
                  className="pointer-events-none absolute left-0.5 top-0.5 h-4 w-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </div>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              Select All {filteredOptions.length < options.length && `(${filteredOptions.length})`}
            </span>
          </label>
        </div>
      )}

      {/* Options List */}
      <div className="max-h-64 space-y-1 overflow-y-auto rounded-lg border border-gray-200 bg-white p-2 dark:border-gray-700 dark:bg-gray-900">
        {filteredOptions.length > 0 ? (
          filteredOptions.map((option) => (
            <label
              key={option.value}
              className="flex cursor-pointer items-start gap-2 rounded-lg p-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <div className="relative mt-0.5">
                <input
                  type="checkbox"
                  checked={selectedValues.includes(option.value)}
                  onChange={() => handleCheckboxChange(option.value)}
                  disabled={disabled}
                  className="peer h-5 w-5 cursor-pointer appearance-none rounded border-2 border-gray-300 bg-white transition-all checked:border-brand-500 checked:bg-brand-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:checked:border-brand-600 dark:checked:bg-brand-600"
                />
                <svg
                  className="pointer-events-none absolute left-0.5 top-0.5 h-4 w-4 text-white opacity-0 transition-opacity peer-checked:opacity-100"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {option.label}
                </p>
                {option.description && (
                  <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                    {option.description}
                  </p>
                )}
              </div>
            </label>
          ))
        ) : (
          <div className="py-8 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              No options found matching &ldquo;{searchQuery}&rdquo;
            </p>
          </div>
        )}
      </div>

      {/* Selected Count */}
      {selectedValues.length > 0 && (
        <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          {selectedValues.length} of {options.length} selected
        </div>
      )}
    </div>
  );
};

export default CheckboxGroup;
