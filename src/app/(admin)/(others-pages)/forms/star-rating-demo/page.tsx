// [R6]: Star Rating Demo Page
// → needs: StarRating component
// → provides: demonstration of star-rating features

"use client";

import React, { useState } from "react";
import StarRating from "@/components/ui/forms/StarRating";

export default function StarRatingDemo() {
  // [R6]: State for different rating examples
  const [productRating, setProductRating] = useState(4);
  const [serviceRating, setServiceRating] = useState(3.5);
  const [userRating, setUserRating] = useState(0);
  const recipeRating = 4.5;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Star Rating Component
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Interactive star rating component with half-star precision and multiple configurations
          </p>
        </div>

        {/* Examples Grid */}
        <div className="grid gap-6">
          {/* Example 1: Product Rating (Full Stars) */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Product Rating (Full Stars)
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Standard 5-star rating with full-star precision and count display
            </p>
            <StarRating
              value={productRating}
              onChange={setProductRating}
              showLabel
              label="How would you rate this product?"
              showCount
              size="md"
            />
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              Current rating: {productRating} stars
            </p>
          </div>

          {/* Example 2: Service Rating (Half Stars) */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Service Rating (Half Stars)
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Half-star precision allows more granular ratings (3.5, 4.5, etc.)
            </p>
            <StarRating
              value={serviceRating}
              onChange={setServiceRating}
              precision="half"
              showLabel
              label="Rate our customer service"
              showCount
              size="md"
            />
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              Current rating: {serviceRating} stars
            </p>
          </div>

          {/* Example 3: User Feedback (Large) */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              User Feedback (Large Size)
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Large stars for prominent feedback forms
            </p>
            <StarRating
              value={userRating}
              onChange={setUserRating}
              precision="half"
              showLabel
              label="How was your experience?"
              size="lg"
            />
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              {userRating === 0
                ? "Click to rate your experience"
                : `You rated: ${userRating} stars - Thank you for your feedback!`}
            </p>
          </div>

          {/* Example 4: Recipe Rating (Read-Only) */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Recipe Rating (Read-Only Display)
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Display average ratings in read-only mode
            </p>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-300">
                  Chocolate Chip Cookies
                </span>
                <StarRating
                  value={recipeRating}
                  precision="half"
                  readonly
                  showCount
                  size="sm"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-300">
                  Banana Bread
                </span>
                <StarRating
                  value={4}
                  precision="half"
                  readonly
                  showCount
                  size="sm"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-300">
                  Apple Pie
                </span>
                <StarRating
                  value={5}
                  readonly
                  showCount
                  size="sm"
                />
              </div>
            </div>
          </div>

          {/* Example 5: Custom Star Count */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Custom Star Count
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Use different maximum star counts (3, 5, or 10)
            </p>
            <div className="space-y-4">
              <div>
                <StarRating
                  value={2}
                  maxStars={3}
                  showLabel
                  label="Difficulty Level (1-3)"
                  showCount
                  size="md"
                />
              </div>
              <div>
                <StarRating
                  value={7}
                  maxStars={10}
                  showLabel
                  label="Overall Satisfaction (1-10)"
                  showCount
                  size="sm"
                />
              </div>
            </div>
          </div>

          {/* Example 6: Size Variants & States */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Size Variants & States
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Available sizes and component states
            </p>
            <div className="space-y-4">
              {/* Small */}
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Small (sm)
                </p>
                <StarRating
                  value={4}
                  precision="half"
                  size="sm"
                  showCount
                />
              </div>

              {/* Medium */}
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Medium (md) - Default
                </p>
                <StarRating
                  value={3.5}
                  precision="half"
                  size="md"
                  showCount
                />
              </div>

              {/* Large */}
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Large (lg)
                </p>
                <StarRating
                  value={5}
                  precision="half"
                  size="lg"
                  showCount
                />
              </div>

              {/* Disabled */}
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Disabled State
                </p>
                <StarRating
                  value={3}
                  disabled
                  size="md"
                  showCount
                />
              </div>
            </div>
          </div>

          {/* Features Guide */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
            <h2 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-4">
              Features & Usage
            </h2>
            <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400 mt-0.5">✓</span>
                <span><strong>Full & Half Stars:</strong> Choose between full-star or half-star precision</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400 mt-0.5">✓</span>
                <span><strong>Hover Preview:</strong> See rating preview before clicking</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400 mt-0.5">✓</span>
                <span><strong>Read-Only Mode:</strong> Display ratings without interaction</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400 mt-0.5">✓</span>
                <span><strong>Custom Star Count:</strong> Use 3, 5, 10, or any number of stars</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400 mt-0.5">✓</span>
                <span><strong>Size Variants:</strong> Small, medium, and large sizes</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400 mt-0.5">✓</span>
                <span><strong>Labels & Counts:</strong> Optional labels and rating count display</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400 mt-0.5">✓</span>
                <span><strong>Dark Mode:</strong> Full dark mode support</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400 mt-0.5">✓</span>
                <span><strong>Accessibility:</strong> ARIA labels and keyboard support</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
