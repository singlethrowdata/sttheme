// [R5]: Range Slider Component for numeric range selection
// → needs: TypeScript types, keyboard and touch handling
// → provides: range-slider capability for filters and settings

"use client";
import React, { useState, useRef, useEffect } from "react";

interface RangeSliderProps {
  value: number | [number, number];
  onChange: (value: number | [number, number]) => void;
  min: number;
  max: number;
  step?: number;
  showLabels?: boolean;
  showTicks?: boolean;
  showTooltip?: boolean;
  disabled?: boolean;
  className?: string;
  formatLabel?: (value: number) => string;
}

const RangeSlider: React.FC<RangeSliderProps> = ({
  value,
  onChange,
  min,
  max,
  step = 1,
  showLabels = true,
  showTicks = false,
  showTooltip = true,
  disabled = false,
  className = "",
  formatLabel = (v) => v.toString(),
}) => {
  const [isDragging, setIsDragging] = useState<"start" | "end" | null>(null);
  const [showStartTooltip, setShowStartTooltip] = useState(false);
  const [showEndTooltip, setShowEndTooltip] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const isRange = Array.isArray(value);
  const startValue = isRange ? value[0] : min;
  const endValue = isRange ? value[1] : value;

  // Calculate percentage position
  const getPercentage = (val: number) => {
    return ((val - min) / (max - min)) * 100;
  };

  // Calculate value from position
  const getValueFromPosition = (clientX: number) => {
    if (!sliderRef.current) return min;

    const rect = sliderRef.current.getBoundingClientRect();
    const percentage = (clientX - rect.left) / rect.width;
    const rawValue = min + percentage * (max - min);
    const steppedValue = Math.round(rawValue / step) * step;
    return Math.max(min, Math.min(max, steppedValue));
  };

  // Handle mouse/touch move
  const handleMove = (clientX: number) => {
    if (!isDragging || disabled) return;

    const newValue = getValueFromPosition(clientX);

    if (isRange) {
      const [currentStart, currentEnd] = value;
      if (isDragging === "start") {
        onChange([Math.min(newValue, currentEnd), currentEnd]);
      } else {
        onChange([currentStart, Math.max(newValue, currentStart)]);
      }
    } else {
      onChange(newValue);
    }
  };

  // Mouse handlers
  const handleMouseDown = (handle: "start" | "end") => (e: React.MouseEvent) => {
    if (disabled) return;
    e.preventDefault();
    setIsDragging(handle);
    if (handle === "start") setShowStartTooltip(true);
    else setShowEndTooltip(true);
  };

  const handleMouseMove = (e: MouseEvent) => {
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(null);
    setShowStartTooltip(false);
    setShowEndTooltip(false);
  };

  // Touch handlers
  const handleTouchStart = (handle: "start" | "end") => () => {
    if (disabled) return;
    setIsDragging(handle);
    if (handle === "start") setShowStartTooltip(true);
    else setShowEndTooltip(true);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(null);
    setShowStartTooltip(false);
    setShowEndTooltip(false);
  };

  // Keyboard handlers
  const handleKeyDown = (handle: "start" | "end") => (e: React.KeyboardEvent) => {
    if (disabled) return;

    const increment = e.shiftKey ? step * 10 : step;
    let newValue: number;

    if (isRange) {
      const [currentStart, currentEnd] = value;
      const currentValue = handle === "start" ? currentStart : currentEnd;

      if (e.key === "ArrowRight" || e.key === "ArrowUp") {
        newValue = Math.min(max, currentValue + increment);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
        newValue = Math.max(min, currentValue - increment);
      } else {
        return;
      }

      if (handle === "start") {
        onChange([Math.min(newValue, currentEnd), currentEnd]);
      } else {
        onChange([currentStart, Math.max(newValue, currentStart)]);
      }
    } else {
      if (e.key === "ArrowRight" || e.key === "ArrowUp") {
        newValue = Math.min(max, endValue + increment);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
        newValue = Math.max(min, endValue - increment);
      } else {
        return;
      }
      onChange(newValue);
    }

    e.preventDefault();
  };

  // Effect for mouse/touch events
  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("touchmove", handleTouchMove);
      document.addEventListener("touchend", handleTouchEnd);

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        document.removeEventListener("touchmove", handleTouchMove);
        document.removeEventListener("touchend", handleTouchEnd);
      };
    }
  }, [isDragging]);

  // Generate tick marks
  const ticks = showTicks
    ? Array.from({ length: Math.floor((max - min) / step) + 1 }, (_, i) => min + i * step)
    : [];

  const startPercentage = getPercentage(startValue);
  const endPercentage = getPercentage(endValue);

  return (
    <div className={`w-full ${className}`}>
      {/* Labels */}
      {showLabels && (
        <div className="mb-2 flex items-center justify-between text-sm text-gray-700 dark:text-gray-300">
          <span className="font-medium">
            {isRange ? `${formatLabel(startValue)} - ${formatLabel(endValue)}` : formatLabel(endValue)}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {formatLabel(min)} - {formatLabel(max)}
          </span>
        </div>
      )}

      {/* Slider Container */}
      <div className="relative px-2 py-4">
        {/* Slider Track */}
        <div
          ref={sliderRef}
          className={`relative h-2 rounded-full ${disabled
            ? "bg-gray-200 dark:bg-gray-700"
            : "bg-gray-200 dark:bg-gray-700"
            }`}
        >
          {/* Active Range */}
          <div
            className={`absolute h-full rounded-full ${disabled
              ? "bg-gray-400 dark:bg-gray-600"
              : "bg-brand-500 dark:bg-brand-600"
              }`}
            style={{
              left: `${isRange ? startPercentage : 0}%`,
              width: `${isRange ? endPercentage - startPercentage : endPercentage}%`,
            }}
          />

          {/* Tick Marks */}
          {showTicks &&
            ticks.map((tick) => (
              <div
                key={tick}
                className="absolute top-1/2 h-3 w-0.5 -translate-y-1/2 bg-gray-400 dark:bg-gray-600"
                style={{ left: `${getPercentage(tick)}%` }}
              />
            ))}

          {/* Start Handle (for range) */}
          {isRange && (
            <div
              className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${startPercentage}%` }}
            >
              <button
                type="button"
                onMouseDown={handleMouseDown("start")}
                onTouchStart={handleTouchStart("start")}
                onKeyDown={handleKeyDown("start")}
                disabled={disabled}
                className={`h-5 w-5 rounded-full border-2 border-white shadow-theme-md focus:outline-none focus:ring-3 focus:ring-brand-500/30 ${disabled
                  ? "cursor-not-allowed bg-gray-400 dark:bg-gray-600"
                  : "cursor-grab bg-brand-500 hover:bg-brand-600 active:cursor-grabbing dark:bg-brand-600 dark:hover:bg-brand-700"
                  }`}
                aria-label="Start value"
                aria-valuemin={min}
                aria-valuemax={max}
                aria-valuenow={startValue}
              />
              {/* Start Tooltip */}
              {showTooltip && (showStartTooltip || isDragging === "start") && (
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-gray-900 px-2 py-1 text-xs font-medium text-white dark:bg-gray-800">
                  {formatLabel(startValue)}
                  <div className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-gray-900 dark:border-t-gray-800" />
                </div>
              )}
            </div>
          )}

          {/* End Handle */}
          <div
            className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${endPercentage}%` }}
          >
            <button
              type="button"
              onMouseDown={handleMouseDown("end")}
              onTouchStart={handleTouchStart("end")}
              onKeyDown={handleKeyDown("end")}
              disabled={disabled}
              className={`h-5 w-5 rounded-full border-2 border-white shadow-theme-md focus:outline-none focus:ring-3 focus:ring-brand-500/30 ${disabled
                ? "cursor-not-allowed bg-gray-400 dark:bg-gray-600"
                : "cursor-grab bg-brand-500 hover:bg-brand-600 active:cursor-grabbing dark:bg-brand-600 dark:hover:bg-brand-700"
                }`}
              aria-label={isRange ? "End value" : "Value"}
              aria-valuemin={min}
              aria-valuemax={max}
              aria-valuenow={endValue}
            />
            {/* End Tooltip */}
            {showTooltip && (showEndTooltip || isDragging === "end") && (
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-gray-900 px-2 py-1 text-xs font-medium text-white dark:bg-gray-800">
                {formatLabel(endValue)}
                <div className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-gray-900 dark:border-t-gray-800" />
              </div>
            )}
          </div>
        </div>

        {/* Tick Labels */}
        {showTicks && (
          <div className="relative mt-2">
            {ticks.map((tick) => (
              <div
                key={tick}
                className="absolute -translate-x-1/2 text-xs text-gray-500 dark:text-gray-400"
                style={{ left: `${getPercentage(tick)}%` }}
              >
                {formatLabel(tick)}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Helper Text */}
      <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
        Use arrow keys to adjust {isRange ? "(Shift + arrow for larger steps)" : "value"}
      </p>
    </div>
  );
};

export default RangeSlider;
