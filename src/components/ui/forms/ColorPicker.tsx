// [R4]: Color Picker Component for theme customization and color selection
// → needs: TypeScript types, color conversion utilities
// → provides: color-picker capability for visual color selection

"use client";
import React, { useState, useEffect, useRef, ChangeEvent } from "react";

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  format?: "hex" | "rgb" | "hsl";
  presets?: string[];
  showEyedropper?: boolean;
  className?: string;
  disabled?: boolean;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  color,
  onChange,
  format = "hex",
  presets = [],
  showEyedropper = false,
  className = "",
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentFormat, setCurrentFormat] = useState(format);
  const [recentColors, setRecentColors] = useState<string[]>([]);
  const pickerRef = useRef<HTMLDivElement>(null);

  // Color conversion utilities
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
      : null;
  };

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0,
      s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
          break;
        case g:
          h = ((b - r) / d + 2) / 6;
          break;
        case b:
          h = ((r - g) / d + 4) / 6;
          break;
      }
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  };

  // Format color based on current format
  const formatColor = (hexColor: string): string => {
    const rgb = hexToRgb(hexColor);
    if (!rgb) return hexColor;

    switch (currentFormat) {
      case "rgb":
        return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
      case "hsl":
        const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
        return `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
      default:
        return hexColor;
    }
  };

  // Handle color change and add to recent colors
  const handleColorChange = (newColor: string) => {
    onChange(newColor);

    // Add to recent colors (max 8)
    setRecentColors((prev) => {
      const updated = [newColor, ...prev.filter((c) => c !== newColor)];
      return updated.slice(0, 8);
    });
  };

  // Eyedropper API support
  const handleEyedropper = async () => {
    if (!("EyeDropper" in window)) {
      alert("EyeDropper API is not supported in this browser");
      return;
    }

    try {
      // @ts-expect-error - EyeDropper API not yet in TypeScript
      const eyeDropper = new EyeDropper();
      const result = await eyeDropper.open();
      handleColorChange(result.sRGBHex);
    } catch (error) {
      console.error("Eyedropper error:", error);
    }
  };

  // Copy color to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(formatColor(color));
  };

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={`relative ${className}`} ref={pickerRef}>
      {/* Color Swatch Button */}
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`flex h-11 w-full items-center gap-3 rounded-lg border px-3 shadow-theme-xs ${disabled
          ? "cursor-not-allowed border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-800"
          : "border-gray-300 bg-white hover:border-brand-300 dark:border-gray-700 dark:bg-gray-900 dark:hover:border-brand-800"
          }`}
      >
        <div
          className="h-7 w-7 rounded-md border-2 border-gray-200 dark:border-gray-700"
          style={{ backgroundColor: color }}
        />
        <span className="flex-1 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
          {formatColor(color)}
        </span>
        <svg
          className={`h-4 w-4 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""
            }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Picker Dropdown */}
      {isOpen && !disabled && (
        <div className="absolute z-50 mt-2 w-72 rounded-lg border border-gray-200 bg-white p-4 shadow-theme-lg dark:border-gray-800 dark:bg-gray-900">
          {/* Color Input */}
          <div className="mb-4">
            <input
              type="color"
              value={color}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleColorChange(e.target.value)
              }
              className="h-32 w-full cursor-pointer rounded-lg border-2 border-gray-200 dark:border-gray-700"
            />
          </div>

          {/* Format Selector */}
          <div className="mb-4 flex gap-2">
            {(["hex", "rgb", "hsl"] as const).map((fmt) => (
              <button
                key={fmt}
                type="button"
                onClick={() => setCurrentFormat(fmt)}
                className={`flex-1 rounded-md px-3 py-1.5 text-xs font-medium uppercase transition-colors ${currentFormat === fmt
                  ? "bg-brand-500 text-white dark:bg-brand-600"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                  }`}
              >
                {fmt}
              </button>
            ))}
          </div>

          {/* Color Presets */}
          {presets.length > 0 && (
            <div className="mb-4">
              <p className="mb-2 text-xs font-medium text-gray-600 dark:text-gray-400">
                Presets
              </p>
              <div className="grid grid-cols-8 gap-2">
                {presets.map((preset, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleColorChange(preset)}
                    className="h-8 w-8 rounded-md border-2 border-gray-200 hover:border-brand-400 dark:border-gray-700 dark:hover:border-brand-600"
                    style={{ backgroundColor: preset }}
                    title={preset}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Recent Colors */}
          {recentColors.length > 0 && (
            <div className="mb-4">
              <p className="mb-2 text-xs font-medium text-gray-600 dark:text-gray-400">
                Recent
              </p>
              <div className="grid grid-cols-8 gap-2">
                {recentColors.map((recent, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleColorChange(recent)}
                    className="h-8 w-8 rounded-md border-2 border-gray-200 hover:border-brand-400 dark:border-gray-700 dark:hover:border-brand-600"
                    style={{ backgroundColor: recent }}
                    title={recent}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2">
            {showEyedropper && (
              <button
                type="button"
                onClick={handleEyedropper}
                className="flex-1 rounded-md bg-gray-100 px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                <svg
                  className="mx-auto h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                  />
                </svg>
              </button>
            )}
            <button
              type="button"
              onClick={copyToClipboard}
              className="flex-1 rounded-md bg-brand-500 px-3 py-2 text-xs font-medium text-white hover:bg-brand-600 dark:bg-brand-600 dark:hover:bg-brand-700"
            >
              Copy
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
