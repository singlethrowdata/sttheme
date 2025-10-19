// [R8]: Autocomplete Input Component
// → needs: React hooks, filtering utilities
// → provides: autocomplete-input capability for search and selection

"use client";

import React, { useState, useRef, useEffect, ChangeEvent, KeyboardEvent } from "react";

interface AutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  suggestions: string[];
  placeholder?: string;
  label?: string;
  maxSuggestions?: number;
  caseSensitive?: boolean;
  disabled?: boolean;
  className?: string;
}

const Autocomplete: React.FC<AutocompleteProps> = ({
  value,
  onChange,
  suggestions,
  placeholder = "Type to search...",
  label = "",
  maxSuggestions = 5,
  caseSensitive = false,
  disabled = false,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Filter suggestions based on input value
  useEffect(() => {
    if (!value) {
      setFilteredSuggestions([]);
      setIsOpen(false);
      return;
    }

    const searchValue = caseSensitive ? value : value.toLowerCase();
    const filtered = suggestions.filter((suggestion) => {
      const suggestionValue = caseSensitive ? suggestion : suggestion.toLowerCase();
      return suggestionValue.includes(searchValue);
    });

    setFilteredSuggestions(filtered.slice(0, maxSuggestions));
    setIsOpen(filtered.length > 0);
    setHighlightedIndex(-1);
  }, [value, suggestions, maxSuggestions, caseSensitive]);

  // Handle input change
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  // Handle suggestion selection
  const handleSuggestionClick = (suggestion: string) => {
    onChange(suggestion);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || filteredSuggestions.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < filteredSuggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < filteredSuggestions.length) {
          handleSuggestionClick(filteredSuggestions[highlightedIndex]);
        }
        break;
      case "Escape":
        setIsOpen(false);
        setHighlightedIndex(-1);
        break;
    }
  };

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
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

  // Highlight matching text
  const highlightMatch = (text: string, query: string) => {
    if (!query) return text;

    const searchValue = caseSensitive ? query : query.toLowerCase();
    const textValue = caseSensitive ? text : text.toLowerCase();
    const index = textValue.indexOf(searchValue);

    if (index === -1) return text;

    const beforeMatch = text.substring(0, index);
    const match = text.substring(index, index + query.length);
    const afterMatch = text.substring(index + query.length);

    return (
      <>
        {beforeMatch}
        <strong className="font-semibold text-brand-600 dark:text-brand-400">{match}</strong>
        {afterMatch}
      </>
    );
  };

  return (
    <div className={`relative w-full ${className}`}>
      {/* Label */}
      {label && (
        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}

      {/* Input Field */}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => value && filteredSuggestions.length > 0 && setIsOpen(true)}
          placeholder={placeholder}
          disabled={disabled}
          className={`
            w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs transition-colors
            ${disabled
              ? "cursor-not-allowed border-gray-300 bg-gray-50 text-gray-500 dark:border-gray-700 dark:bg-gray-800"
              : "border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder-gray-500 dark:focus:border-brand-600"
            }
          `}
        />

        {/* Search Icon */}
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <svg
            className="h-5 w-5 text-gray-400 dark:text-gray-500"
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

      {/* Suggestions Dropdown */}
      {isOpen && filteredSuggestions.length > 0 && !disabled && (
        <div
          ref={dropdownRef}
          className="absolute z-50 mt-2 max-h-60 w-full overflow-auto rounded-lg border border-gray-200 bg-white shadow-theme-lg dark:border-gray-800 dark:bg-gray-900"
        >
          {filteredSuggestions.map((suggestion, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleSuggestionClick(suggestion)}
              className={`
                w-full px-4 py-2.5 text-left text-sm transition-colors
                ${index === highlightedIndex
                  ? "bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300"
                  : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                }
                ${index !== filteredSuggestions.length - 1 ? "border-b border-gray-100 dark:border-gray-800" : ""}
              `}
            >
              {highlightMatch(suggestion, value)}
            </button>
          ))}
        </div>
      )}

      {/* No Results Message */}
      {isOpen && value && filteredSuggestions.length === 0 && !disabled && (
        <div className="absolute z-50 mt-2 w-full rounded-lg border border-gray-200 bg-white p-4 text-center shadow-theme-lg dark:border-gray-800 dark:bg-gray-900">
          <p className="text-sm text-gray-500 dark:text-gray-400">No results found for &ldquo;{value}&rdquo;</p>
        </div>
      )}
    </div>
  );
};

export default Autocomplete;
