// [R4]: Color Picker demo page with multiple examples
// → needs: ColorPicker component, ComponentCard wrapper
// → provides: Interactive examples for color picker functionality

"use client";
import React, { useState } from "react";
import ComponentCard from "@/components/common/ComponentCard";
import PageBreadCrumb from "@/components/common/PageBreadCrumb";
import ColorPicker from "@/components/ui/forms/ColorPicker";

const ColorPickerDemo: React.FC = () => {
  // Theme color example
  const [themeColor, setThemeColor] = useState("#3b82f6");

  // Brand color example with presets
  const [brandColor, setBrandColor] = useState("#8b5cf6");
  const brandPresets = [
    "#ef4444",
    "#f97316",
    "#f59e0b",
    "#84cc16",
    "#10b981",
    "#06b6d4",
    "#3b82f6",
    "#8b5cf6",
  ];

  // Text color example
  const [textColor, setTextColor] = useState("#1f2937");

  // Background color example
  const [bgColor, setBgColor] = useState("#f3f4f6");

  // Accent color with eyedropper
  const [accentColor, setAccentColor] = useState("#ec4899");

  return (
    <>
      <PageBreadCrumb pageTitle="Color Picker" />

      <div className="grid grid-cols-1 gap-6">
        {/* Theme Color Selector */}
        <ComponentCard
          title="Theme Color Selector"
          desc="Select a primary theme color with hex format display."
        >
          <div className="space-y-4">
            <ColorPicker
              color={themeColor}
              onChange={setThemeColor}
              format="hex"
            />
            <div className="rounded-lg border-2 border-gray-200 p-4 dark:border-gray-700">
              <div
                className="h-20 rounded-md"
                style={{ backgroundColor: themeColor }}
              />
              <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                Preview: {themeColor}
              </p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>Try:</strong> Click the color swatch to open the picker.
              Use the native color picker or copy the color code.
            </p>
          </div>
        </ComponentCard>

        {/* Brand Color with Presets */}
        <ComponentCard
          title="Brand Color with Palette"
          desc="Choose from predefined brand color presets or select custom colors."
        >
          <div className="space-y-4">
            <ColorPicker
              color={brandColor}
              onChange={setBrandColor}
              format="hex"
              presets={brandPresets}
            />
            <div className="rounded-lg border-2 border-gray-200 p-4 dark:border-gray-700">
              <div
                className="h-20 rounded-md"
                style={{ backgroundColor: brandColor }}
              />
              <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                Selected Brand Color: {brandColor}
              </p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>Try:</strong> Select from the preset palette or choose a
              custom color. Recently used colors are saved automatically.
            </p>
          </div>
        </ComponentCard>

        {/* Text Color in RGB Format */}
        <ComponentCard
          title="Text Color (RGB Format)"
          desc="Select text color with RGB format display."
        >
          <div className="space-y-4">
            <ColorPicker
              color={textColor}
              onChange={setTextColor}
              format="rgb"
            />
            <div className="rounded-lg border-2 border-gray-200 p-6 dark:border-gray-700">
              <p className="text-2xl font-bold" style={{ color: textColor }}>
                The quick brown fox jumps over the lazy dog
              </p>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Text color in RGB format
              </p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>Note:</strong> Color is displayed in RGB format. Switch
              between HEX, RGB, and HSL using the format buttons.
            </p>
          </div>
        </ComponentCard>

        {/* Background Color in HSL Format */}
        <ComponentCard
          title="Background Color (HSL Format)"
          desc="Select background color with HSL format display."
        >
          <div className="space-y-4">
            <ColorPicker color={bgColor} onChange={setBgColor} format="hsl" />
            <div
              className="rounded-lg border-2 border-gray-200 p-8 dark:border-gray-700"
              style={{ backgroundColor: bgColor }}
            >
              <div className="rounded-md bg-white p-4 shadow-theme-md dark:bg-gray-900">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Content on custom background
                </p>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  Background: {bgColor}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>Note:</strong> Color is displayed in HSL (Hue, Saturation,
              Lightness) format.
            </p>
          </div>
        </ComponentCard>

        {/* Accent Color with Eyedropper */}
        <ComponentCard
          title="Accent Color (with Eyedropper)"
          desc="Use the eyedropper tool to pick colors from anywhere on your screen."
        >
          <div className="space-y-4">
            <ColorPicker
              color={accentColor}
              onChange={setAccentColor}
              format="hex"
              showEyedropper={true}
              presets={brandPresets}
            />
            <div className="rounded-lg border-2 border-gray-200 p-4 dark:border-gray-700">
              <div className="flex items-center gap-4">
                <div
                  className="h-16 w-16 rounded-full border-4 border-white shadow-theme-lg"
                  style={{ backgroundColor: accentColor }}
                />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Accent Color
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {accentColor}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>Try:</strong> Click the eyedropper icon to pick colors
              from anywhere on your screen (Chrome/Edge only).
            </p>
          </div>
        </ComponentCard>

        {/* Disabled State */}
        <ComponentCard
          title="Disabled State"
          desc="Color picker in disabled/read-only state."
        >
          <ColorPicker
            color="#6b7280"
            onChange={() => {}}
            disabled={true}
          />
          <div className="mt-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>Note:</strong> The color picker is disabled and cannot be
              interacted with.
            </p>
          </div>
        </ComponentCard>

        {/* Features Guide */}
        <ComponentCard
          title="Features & Usage"
          desc="Complete guide to Color Picker capabilities."
        >
          <div className="space-y-4 text-sm text-gray-700 dark:text-gray-300">
            <div>
              <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">
                Format Support
              </h4>
              <ul className="ml-4 list-disc space-y-1">
                <li>
                  <strong>HEX:</strong> #3b82f6 (standard web color format)
                </li>
                <li>
                  <strong>RGB:</strong> rgb(59, 130, 246) (red, green, blue
                  values)
                </li>
                <li>
                  <strong>HSL:</strong> hsl(217, 91%, 60%) (hue, saturation,
                  lightness)
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">
                Key Features
              </h4>
              <ul className="ml-4 list-disc space-y-1">
                <li>Visual color swatch display with dropdown picker</li>
                <li>Native HTML5 color input for precise selection</li>
                <li>Format switching between HEX, RGB, and HSL</li>
                <li>Preset color palettes for quick selection</li>
                <li>Recent colors history (up to 8 colors)</li>
                <li>Copy to clipboard functionality</li>
                <li>
                  Eyedropper tool (Chrome/Edge only - uses browser EyeDropper
                  API)
                </li>
                <li>Click outside to close dropdown</li>
                <li>Full dark mode support</li>
              </ul>
            </div>

            <div>
              <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">
                Common Use Cases
              </h4>
              <ul className="ml-4 list-disc space-y-1">
                <li>Theme customization and color scheme selection</li>
                <li>Brand color management</li>
                <li>Design tool color pickers</li>
                <li>Text and background color selection</li>
                <li>UI element accent colors</li>
              </ul>
            </div>

            <div>
              <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">
                Browser Compatibility
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                The eyedropper feature uses the EyeDropper API, which is
                currently supported in Chrome and Edge. The feature will display
                an alert if the API is not available in the browser.
              </p>
            </div>
          </div>
        </ComponentCard>
      </div>
    </>
  );
};

export default ColorPickerDemo;
