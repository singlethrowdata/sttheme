// [R5]: Range Slider demo page with multiple examples
// → needs: RangeSlider component, ComponentCard wrapper
// → provides: Interactive examples for range slider functionality

"use client";
import React, { useState } from "react";
import ComponentCard from "@/components/common/ComponentCard";
import PageBreadCrumb from "@/components/common/PageBreadCrumb";
import RangeSlider from "@/components/ui/forms/RangeSlider";

const RangeSliderDemo: React.FC = () => {
  // Price range filter
  const [priceRange, setPriceRange] = useState<[number, number]>([200, 800]);

  // Age range selector
  const [ageRange, setAgeRange] = useState<[number, number]>([25, 45]);

  // Volume control (single value)
  const [volume, setVolume] = useState(50);

  // Temperature range
  const [tempRange, setTempRange] = useState<[number, number]>([-5, 25]);

  // Percentage slider
  const [percentage, setPercentage] = useState(75);

  // Budget slider with large steps
  const [budget, setBudget] = useState<[number, number]>([5000, 15000]);

  return (
    <>
      <PageBreadCrumb pageTitle="Range Slider" />

      <div className="grid grid-cols-1 gap-6">
        {/* Price Range Filter */}
        <ComponentCard
          title="Price Range Filter"
          desc="Select a price range with dual handles for filtering products."
        >
          <RangeSlider
            value={priceRange}
            onChange={setPriceRange as (value: number | [number, number]) => void}
            min={0}
            max={1000}
            step={10}
            showLabels={true}
            showTooltip={true}
            formatLabel={(v) => `$${v}`}
          />
          <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>Selected Range:</strong> ${priceRange[0]} - $
              {priceRange[1]}
            </p>
          </div>
        </ComponentCard>

        {/* Age Range Selector */}
        <ComponentCard
          title="Age Range Selector"
          desc="Select target age demographic with visual tick marks."
        >
          <RangeSlider
            value={ageRange}
            onChange={setAgeRange as (value: number | [number, number]) => void}
            min={18}
            max={65}
            step={1}
            showLabels={true}
            showTicks={true}
            showTooltip={true}
            formatLabel={(v) => `${v} yrs`}
          />
          <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>Age Group:</strong> {ageRange[0]} - {ageRange[1]} years
              old
            </p>
          </div>
        </ComponentCard>

        {/* Volume Control (Single Value) */}
        <ComponentCard
          title="Volume Control"
          desc="Single-handle slider for adjusting volume level."
        >
          <RangeSlider
            value={volume}
            onChange={setVolume as (value: number | [number, number]) => void}
            min={0}
            max={100}
            step={1}
            showLabels={true}
            showTooltip={true}
            formatLabel={(v) => `${v}%`}
          />
          <div className="mt-4 flex items-center gap-4">
            <div className="flex-1 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <strong>Volume:</strong> {volume}%
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setVolume(0)}
                className="rounded-md bg-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              >
                Mute
              </button>
              <button
                onClick={() => setVolume(100)}
                className="rounded-md bg-brand-500 px-3 py-2 text-sm font-medium text-white hover:bg-brand-600 dark:bg-brand-600 dark:hover:bg-brand-700"
              >
                Max
              </button>
            </div>
          </div>
        </ComponentCard>

        {/* Temperature Range */}
        <ComponentCard
          title="Temperature Range"
          desc="Select temperature range with negative values support."
        >
          <RangeSlider
            value={tempRange}
            onChange={setTempRange as (value: number | [number, number]) => void}
            min={-20}
            max={40}
            step={1}
            showLabels={true}
            showTooltip={true}
            formatLabel={(v) => `${v}°C`}
          />
          <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>Temperature Range:</strong> {tempRange[0]}°C to{" "}
              {tempRange[1]}°C
            </p>
          </div>
        </ComponentCard>

        {/* Percentage Slider */}
        <ComponentCard
          title="Percentage Slider"
          desc="Single value slider for percentage-based controls."
        >
          <RangeSlider
            value={percentage}
            onChange={setPercentage as (value: number | [number, number]) => void}
            min={0}
            max={100}
            step={5}
            showLabels={true}
            showTicks={true}
            showTooltip={true}
            formatLabel={(v) => `${v}%`}
          />
          <div className="mt-4">
            <div className="h-4 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
              <div
                className="h-full bg-brand-500 transition-all duration-300 dark:bg-brand-600"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
              Progress: {percentage}%
            </p>
          </div>
        </ComponentCard>

        {/* Budget Range with Large Steps */}
        <ComponentCard
          title="Budget Range (Large Steps)"
          desc="Budget selector with $1000 increments and formatted labels."
        >
          <RangeSlider
            value={budget}
            onChange={setBudget as (value: number | [number, number]) => void}
            min={0}
            max={50000}
            step={1000}
            showLabels={true}
            showTooltip={true}
            formatLabel={(v) => `$${(v / 1000).toFixed(0)}k`}
          />
          <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>Budget Range:</strong> $
              {budget[0].toLocaleString()} - ${budget[1].toLocaleString()}
            </p>
          </div>
        </ComponentCard>

        {/* Disabled State */}
        <ComponentCard
          title="Disabled State"
          desc="Range slider in disabled/read-only state."
        >
          <RangeSlider
            value={[30, 70]}
            onChange={() => {}}
            min={0}
            max={100}
            disabled={true}
          />
          <div className="mt-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>Note:</strong> This slider is disabled and cannot be
              adjusted.
            </p>
          </div>
        </ComponentCard>

        {/* Features Guide */}
        <ComponentCard
          title="Features & Usage"
          desc="Complete guide to Range Slider capabilities."
        >
          <div className="space-y-4 text-sm text-gray-700 dark:text-gray-300">
            <div>
              <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">
                Interaction Methods
              </h4>
              <ul className="ml-4 list-disc space-y-1">
                <li>
                  <strong>Mouse:</strong> Click and drag handles to adjust
                  values
                </li>
                <li>
                  <strong>Touch:</strong> Touch-friendly for mobile devices
                </li>
                <li>
                  <strong>Keyboard:</strong> Arrow keys to adjust (Shift +
                  arrow for larger steps)
                </li>
                <li>
                  <strong>Tooltips:</strong> Show current value on hover/drag
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">
                Key Features
              </h4>
              <ul className="ml-4 list-disc space-y-1">
                <li>Single value or dual-handle range selection</li>
                <li>Configurable min/max values and step increment</li>
                <li>Optional value labels and tick marks</li>
                <li>Dynamic tooltips showing current values</li>
                <li>Custom label formatting (currency, percentage, etc.)</li>
                <li>Keyboard navigation with accessibility support</li>
                <li>Touch-optimized for mobile devices</li>
                <li>Full dark mode support</li>
                <li>Disabled/read-only state</li>
              </ul>
            </div>

            <div>
              <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">
                Common Use Cases
              </h4>
              <ul className="ml-4 list-disc space-y-1">
                <li>Price range filters for e-commerce</li>
                <li>Age or demographic selectors</li>
                <li>Volume and audio controls</li>
                <li>Temperature range selection</li>
                <li>Budget and financial planning tools</li>
                <li>Data range filters and analytics</li>
                <li>Percentage-based settings</li>
              </ul>
            </div>

            <div>
              <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">
                Keyboard Shortcuts
              </h4>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <kbd className="inline-flex items-center rounded border border-gray-300 bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
                    ← →
                  </kbd>
                  <span>Adjust value by step increment</span>
                </div>
                <div className="flex items-center gap-3">
                  <kbd className="inline-flex items-center rounded border border-gray-300 bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
                    ↑ ↓
                  </kbd>
                  <span>Adjust value by step increment</span>
                </div>
                <div className="flex items-center gap-3">
                  <kbd className="inline-flex items-center rounded border border-gray-300 bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
                    Shift + Arrow
                  </kbd>
                  <span>Adjust value by 10× step increment</span>
                </div>
              </div>
            </div>
          </div>
        </ComponentCard>
      </div>
    </>
  );
};

export default RangeSliderDemo;
