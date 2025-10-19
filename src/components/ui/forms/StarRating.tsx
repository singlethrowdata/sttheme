// [R6]: Star Rating Component
// → needs: React hooks for state management
// → provides: star-rating capability for feedback and ratings

"use client";

import React, { useState } from "react";

// [R6]: Star Rating props interface
interface StarRatingProps {
  value?: number;
  onChange?: (value: number) => void;
  maxStars?: number;
  precision?: "full" | "half";
  size?: "sm" | "md" | "lg";
  readonly?: boolean;
  disabled?: boolean;
  showLabel?: boolean;
  label?: string;
  showCount?: boolean;
  className?: string;
}

// [R6]: Star icon component with fill support
const StarIcon = ({
  fill,
  size,
  className = "",
}: {
  fill: number;
  size: "sm" | "md" | "lg";
  className?: string;
}) => {
  const sizeMap = {
    sm: "w-5 h-5",
    md: "w-7 h-7",
    lg: "w-10 h-10",
  };

  return (
    <div className={`relative ${sizeMap[size]} ${className}`}>
      {/* Background star (empty) */}
      <svg
        className="absolute inset-0 text-gray-300 dark:text-gray-600"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
      {/* Filled star (colored) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${fill * 100}%` }}
      >
        <svg
          className="text-yellow-400 dark:text-yellow-500"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      </div>
    </div>
  );
};

// [R6]: Main StarRating component
export default function StarRating({
  value = 0,
  onChange,
  maxStars = 5,
  precision = "full",
  size = "md",
  readonly = false,
  disabled = false,
  showLabel = false,
  label = "Rating",
  showCount = false,
  className = "",
}: StarRatingProps) {
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  // [R6]: Calculate fill value for each star
  const getStarFill = (starIndex: number): number => {
    const currentValue = hoverValue !== null ? hoverValue : value;
    const starValue = starIndex + 1;

    if (currentValue >= starValue) {
      return 1; // Full star
    } else if (currentValue > starIndex) {
      return currentValue - starIndex; // Partial star
    }
    return 0; // Empty star
  };

  // [R6]: Handle star click
  const handleStarClick = (starIndex: number, event: React.MouseEvent) => {
    if (readonly || disabled || !onChange) return;

    let newValue: number;
    if (precision === "half") {
      const rect = event.currentTarget.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const width = rect.width;
      const isHalf = x < width / 2;
      newValue = starIndex + (isHalf ? 0.5 : 1);
    } else {
      newValue = starIndex + 1;
    }

    onChange(newValue);
  };

  // [R6]: Handle star hover
  const handleStarHover = (starIndex: number, event: React.MouseEvent) => {
    if (readonly || disabled) return;

    if (precision === "half") {
      const rect = event.currentTarget.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const width = rect.width;
      const isHalf = x < width / 2;
      setHoverValue(starIndex + (isHalf ? 0.5 : 1));
    } else {
      setHoverValue(starIndex + 1);
    }
  };

  // [R6]: Handle mouse leave
  const handleMouseLeave = () => {
    setHoverValue(null);
  };

  // [R6]: Format rating display
  const formatRating = (rating: number): string => {
    return precision === "half" ? rating.toFixed(1) : rating.toFixed(0);
  };

  return (
    <div className={`inline-block ${className}`}>
      {/* Label */}
      {showLabel && (
        <div className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </div>
      )}

      {/* Stars container */}
      <div className="flex items-center gap-1">
        {/* Stars */}
        <div
          className="flex gap-0.5"
          onMouseLeave={handleMouseLeave}
          role="radiogroup"
          aria-label={label}
        >
          {Array.from({ length: maxStars }, (_, index) => (
            <button
              key={index}
              type="button"
              onClick={(e) => handleStarClick(index, e)}
              onMouseMove={(e) => handleStarHover(index, e)}
              disabled={disabled || readonly}
              className={`
                ${readonly || disabled ? "cursor-default" : "cursor-pointer"}
                ${!readonly && !disabled ? "transition-transform hover:scale-110" : ""}
                ${disabled ? "opacity-50" : ""}
              `}
              aria-label={`${index + 1} ${index + 1 === 1 ? "star" : "stars"}`}
              aria-checked={value > index}
              role="radio"
            >
              <StarIcon fill={getStarFill(index)} size={size} />
            </button>
          ))}
        </div>

        {/* Rating count */}
        {showCount && (
          <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            {formatRating(value)} / {maxStars}
          </span>
        )}
      </div>
    </div>
  );
}
