// [R9]: Switch/Toggle Component
// → needs: React hooks for state management
// → provides: switch-toggle capability for binary state control

"use client";

import React from "react";

interface SwitchToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  className?: string;
}

const SwitchToggle: React.FC<SwitchToggleProps> = ({
  checked,
  onChange,
  label = "",
  description = "",
  size = "md",
  disabled = false,
  className = "",
}) => {
  // Size configurations
  const sizeClasses = {
    sm: {
      switch: "h-5 w-9",
      thumb: "h-4 w-4",
      translate: checked ? "translate-x-4" : "translate-x-0.5",
    },
    md: {
      switch: "h-6 w-11",
      thumb: "h-5 w-5",
      translate: checked ? "translate-x-5" : "translate-x-0.5",
    },
    lg: {
      switch: "h-7 w-14",
      thumb: "h-6 w-6",
      translate: checked ? "translate-x-7" : "translate-x-0.5",
    },
  };

  const handleToggle = () => {
    if (!disabled) {
      onChange(!checked);
    }
  };

  return (
    <div className={`flex items-start gap-3 ${className}`}>
      {/* Switch */}
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={handleToggle}
        disabled={disabled}
        className={`
          relative inline-flex items-center rounded-full transition-colors
          ${sizeClasses[size].switch}
          ${checked
            ? "bg-brand-500 dark:bg-brand-600"
            : "bg-gray-200 dark:bg-gray-700"
          }
          ${disabled
            ? "cursor-not-allowed opacity-50"
            : "cursor-pointer hover:bg-brand-600 dark:hover:bg-brand-700"
          }
          ${!checked && !disabled ? "hover:bg-gray-300 dark:hover:bg-gray-600" : ""}
        `}
      >
        <span
          className={`
            inline-block transform rounded-full bg-white shadow-sm transition-transform
            ${sizeClasses[size].thumb}
            ${sizeClasses[size].translate}
          `}
        />
      </button>

      {/* Label and Description */}
      {(label || description) && (
        <div className="flex-1">
          {label && (
            <label
              onClick={!disabled ? handleToggle : undefined}
              className={`block text-sm font-medium ${disabled
                  ? "cursor-not-allowed text-gray-400 dark:text-gray-600"
                  : "cursor-pointer text-gray-700 dark:text-gray-300"
                }`}
            >
              {label}
            </label>
          )}
          {description && (
            <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
              {description}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default SwitchToggle;
