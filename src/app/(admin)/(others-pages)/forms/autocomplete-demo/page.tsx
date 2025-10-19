// [R8]: Autocomplete demo page with multiple examples
// → needs: Autocomplete component, ComponentCard wrapper
// → provides: Interactive examples for autocomplete functionality

"use client";
import React, { useState } from "react";
import ComponentCard from "@/components/common/ComponentCard";
import PageBreadCrumb from "@/components/common/PageBreadCrumb";
import Autocomplete from "@/components/ui/forms/Autocomplete";

const AutocompleteDemo: React.FC = () => {
  // Country selector example
  const countries = [
    "United States", "Canada", "United Kingdom", "Australia", "Germany",
    "France", "Japan", "China", "India", "Brazil", "Mexico", "Spain",
    "Italy", "Netherlands", "Sweden", "Norway", "Denmark", "Finland"
  ];
  const [selectedCountry, setSelectedCountry] = useState("");

  // Programming language example
  const languages = [
    "JavaScript", "TypeScript", "Python", "Java", "C++", "C#",
    "Ruby", "Go", "Rust", "Swift", "Kotlin", "PHP", "Scala"
  ];
  const [selectedLanguage, setSelectedLanguage] = useState("");

  // Email domain example
  const emailDomains = [
    "gmail.com", "outlook.com", "yahoo.com", "hotmail.com",
    "icloud.com", "protonmail.com", "aol.com", "mail.com"
  ];
  const [emailInput, setEmailInput] = useState("");

  // City search example
  const cities = [
    "New York", "Los Angeles", "Chicago", "Houston", "Phoenix",
    "Philadelphia", "San Antonio", "San Diego", "Dallas", "San Jose",
    "Austin", "Jacksonville", "Fort Worth", "Columbus", "Charlotte"
  ];
  const [selectedCity, setSelectedCity] = useState("");

  // Product search example
  const products = [
    "MacBook Pro", "iPad Air", "iPhone 15", "Apple Watch",
    "AirPods Pro", "Mac Mini", "iMac", "Mac Studio"
  ];
  const [selectedProduct, setSelectedProduct] = useState("");

  return (
    <>
      <PageBreadCrumb pageTitle="Autocomplete Input" />

      <div className="grid grid-cols-1 gap-6">
        {/* Country Selector */}
        <ComponentCard
          title="Country Selector"
          desc="Search and select a country from a list of options."
        >
          <Autocomplete
            suggestions={countries}
            value={selectedCountry}
            onChange={setSelectedCountry}
            placeholder="Type to search countries..."
          />
          {selectedCountry && (
            <div className="mt-4 rounded-lg bg-blue-50 p-3 dark:bg-blue-950">
              <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                Selected: <span className="font-bold">{selectedCountry}</span>
              </p>
            </div>
          )}
          <div className="mt-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>Try:</strong> Start typing a country name like "United" or "Can"
              to see filtered suggestions.
            </p>
          </div>
        </ComponentCard>

        {/* Programming Language */}
        <ComponentCard
          title="Programming Language"
          desc="Case-insensitive search for programming languages."
        >
          <Autocomplete
            suggestions={languages}
            value={selectedLanguage}
            onChange={setSelectedLanguage}
            placeholder="Search programming languages..."
            caseSensitive={false}
          />
          {selectedLanguage && (
            <div className="mt-4 rounded-lg bg-green-50 p-3 dark:bg-green-950">
              <p className="text-sm font-medium text-green-900 dark:text-green-100">
                Language: <span className="font-bold">{selectedLanguage}</span>
              </p>
            </div>
          )}
          <div className="mt-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>Try:</strong> Type "java", "type", or "python" in any case
              to see case-insensitive matching.
            </p>
          </div>
        </ComponentCard>

        {/* Email Domain */}
        <ComponentCard
          title="Email Domain Autocomplete"
          desc="Limited suggestions with maximum display count."
        >
          <Autocomplete
            suggestions={emailDomains}
            value={emailInput}
            onChange={setEmailInput}
            placeholder="Enter email domain..."
            maxSuggestions={5}
          />
          {emailInput && (
            <div className="mt-4 rounded-lg bg-purple-50 p-3 dark:bg-purple-950">
              <p className="text-sm font-medium text-purple-900 dark:text-purple-100">
                Domain: <span className="font-bold">{emailInput}</span>
              </p>
            </div>
          )}
          <div className="mt-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>Note:</strong> Maximum of 5 suggestions shown at a time.
              Type "mail" to see limited results.
            </p>
          </div>
        </ComponentCard>

        {/* City Search */}
        <ComponentCard
          title="City Search"
          desc="Search US cities with keyboard navigation support."
        >
          <Autocomplete
            suggestions={cities}
            value={selectedCity}
            onChange={setSelectedCity}
            placeholder="Search for a city..."
          />
          {selectedCity && (
            <div className="mt-4 rounded-lg bg-yellow-50 p-3 dark:bg-yellow-950">
              <p className="text-sm font-medium text-yellow-900 dark:text-yellow-100">
                City: <span className="font-bold">{selectedCity}</span>
              </p>
            </div>
          )}
          <div className="mt-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>Keyboard:</strong> Use ↑↓ arrow keys to navigate, Enter to select,
              Escape to close.
            </p>
          </div>
        </ComponentCard>

        {/* Product Search */}
        <ComponentCard
          title="Product Search"
          desc="Case-sensitive product name search."
        >
          <Autocomplete
            suggestions={products}
            value={selectedProduct}
            onChange={setSelectedProduct}
            placeholder="Search Apple products..."
            caseSensitive={true}
          />
          {selectedProduct && (
            <div className="mt-4 rounded-lg bg-red-50 p-3 dark:bg-red-950">
              <p className="text-sm font-medium text-red-900 dark:text-red-100">
                Product: <span className="font-bold">{selectedProduct}</span>
              </p>
            </div>
          )}
          <div className="mt-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>Note:</strong> Case-sensitive search. Try "Mac" (works) vs "mac"
              (no results).
            </p>
          </div>
        </ComponentCard>

        {/* Disabled State */}
        <ComponentCard
          title="Disabled State"
          desc="Autocomplete component in disabled/read-only state."
        >
          <Autocomplete
            suggestions={countries}
            value="United States"
            onChange={() => { }}
            placeholder="Disabled autocomplete"
            disabled={true}
          />
          <div className="mt-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>Note:</strong> The autocomplete is disabled and cannot be
              interacted with.
            </p>
          </div>
        </ComponentCard>

        {/* Features Guide */}
        <ComponentCard
          title="Features & Usage"
          desc="Complete guide to Autocomplete capabilities."
        >
          <div className="space-y-4 text-sm text-gray-700 dark:text-gray-300">
            <div>
              <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">
                Key Features
              </h4>
              <ul className="ml-4 list-disc space-y-1">
                <li>Real-time suggestion filtering as you type</li>
                <li>Keyboard navigation (Arrow keys, Enter, Escape)</li>
                <li>Highlighted matching text in suggestions</li>
                <li>Case-sensitive or case-insensitive search</li>
                <li>Configurable maximum suggestions display</li>
                <li>Click outside to close dropdown</li>
                <li>"No results" message when no matches found</li>
                <li>Full dark mode support</li>
                <li>Disabled state handling</li>
              </ul>
            </div>

            <div>
              <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">
                Keyboard Navigation
              </h4>
              <ul className="ml-4 list-disc space-y-1">
                <li>
                  <strong>↑ Arrow Up:</strong> Navigate to previous suggestion
                </li>
                <li>
                  <strong>↓ Arrow Down:</strong> Navigate to next suggestion
                </li>
                <li>
                  <strong>Enter:</strong> Select highlighted suggestion
                </li>
                <li>
                  <strong>Escape:</strong> Close dropdown and clear input
                </li>
                <li>
                  <strong>Click Outside:</strong> Close dropdown
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">
                Search Behavior
              </h4>
              <ul className="ml-4 list-disc space-y-1">
                <li>
                  Filters suggestions based on whether they contain the input text
                </li>
                <li>
                  Case-sensitive search requires exact case matching
                </li>
                <li>
                  Case-insensitive search (default) matches any case
                </li>
                <li>
                  Matching text is highlighted in suggestions
                </li>
                <li>
                  Shows "No results found" when no matches exist
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">
                Common Use Cases
              </h4>
              <ul className="ml-4 list-disc space-y-1">
                <li>Location selectors (countries, cities, addresses)</li>
                <li>Tag and category selection</li>
                <li>Email domain suggestions</li>
                <li>Product search and filtering</li>
                <li>User search and mentions</li>
                <li>Command palettes and quick actions</li>
              </ul>
            </div>

            <div>
              <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">
                Performance Tips
              </h4>
              <ul className="ml-4 list-disc space-y-1">
                <li>
                  Use <code>maxSuggestions</code> to limit results for large datasets
                </li>
                <li>
                  Consider debouncing for API-based suggestions
                </li>
                <li>
                  Memoize suggestion lists to avoid unnecessary re-filtering
                </li>
              </ul>
            </div>
          </div>
        </ComponentCard>
      </div>
    </>
  );
};

export default AutocompleteDemo;
