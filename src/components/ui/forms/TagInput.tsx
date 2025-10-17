// [R2]: Tag Input Component for metadata, categories, keywords
// → needs: TypeScript types, keyboard handling
// → provides: tag-input capability for categorization

"use client";
import React, { useState, KeyboardEvent, ChangeEvent, useRef } from "react";

interface TagInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
  suggestions?: string[];
  maxTags?: number;
  placeholder?: string;
  allowDuplicates?: boolean;
  validate?: (tag: string) => boolean;
  className?: string;
  disabled?: boolean;
}

const TagInput: React.FC<TagInputProps> = ({
  tags,
  onChange,
  suggestions = [],
  maxTags,
  placeholder = "Add a tag...",
  allowDuplicates = false,
  validate,
  className = "",
  disabled = false,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter suggestions based on input
  const filteredSuggestions = suggestions.filter(
    (suggestion) =>
      suggestion.toLowerCase().includes(inputValue.toLowerCase()) &&
      (allowDuplicates || !tags.includes(suggestion))
  );

  const addTag = (tag: string) => {
    const trimmedTag = tag.trim();

    // Validation checks
    if (!trimmedTag) return;
    if (maxTags && tags.length >= maxTags) return;
    if (!allowDuplicates && tags.includes(trimmedTag)) return;
    if (validate && !validate(trimmedTag)) return;

    onChange([...tags, trimmedTag]);
    setInputValue("");
    setShowSuggestions(false);
  };

  const removeTag = (indexToRemove: number) => {
    onChange(tags.filter((_, index) => index !== indexToRemove));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(inputValue);
    } else if (e.key === "Backspace" && !inputValue && tags.length > 0) {
      removeTag(tags.length - 1);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setShowSuggestions(value.length > 0 && suggestions.length > 0);
  };

  const handleSuggestionClick = (suggestion: string) => {
    addTag(suggestion);
    inputRef.current?.focus();
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(tags.join(", "));
  };

  return (
    <div className={`relative ${className}`}>
      {/* Tag Display Area */}
      <div
        className={`min-h-[44px] w-full rounded-lg border bg-white px-3 py-2 shadow-theme-xs dark:bg-gray-900 ${disabled
            ? "border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-800"
            : "border-gray-300 focus-within:border-brand-300 focus-within:ring-3 focus-within:ring-brand-500/10 dark:border-gray-700 dark:focus-within:border-brand-800"
          }`}
      >
        <div className="flex flex-wrap items-center gap-2">
          {/* Rendered Tags */}
          {tags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1.5 rounded-md bg-brand-50 px-2.5 py-1 text-sm font-medium text-brand-700 dark:bg-brand-500/20 dark:text-brand-400"
            >
              {tag}
              {!disabled && (
                <button
                  type="button"
                  onClick={() => removeTag(index)}
                  className="inline-flex items-center justify-center rounded-sm text-brand-700 hover:bg-brand-100 hover:text-brand-800 dark:text-brand-400 dark:hover:bg-brand-500/30"
                  aria-label={`Remove ${tag}`}
                >
                  <svg
                    className="h-3.5 w-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </span>
          ))}

          {/* Input Field */}
          {(!maxTags || tags.length < maxTags) && !disabled && (
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onFocus={() =>
                setShowSuggestions(
                  inputValue.length > 0 && suggestions.length > 0
                )
              }
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              placeholder={tags.length === 0 ? placeholder : ""}
              className="min-w-[120px] flex-1 border-none bg-transparent text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none dark:text-white/90 dark:placeholder:text-white/30"
            />
          )}
        </div>
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && filteredSuggestions.length > 0 && (
        <div className="absolute z-10 mt-2 max-h-60 w-full overflow-auto rounded-lg border border-gray-200 bg-white shadow-theme-lg dark:border-gray-800 dark:bg-gray-900">
          {filteredSuggestions.map((suggestion, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleSuggestionClick(suggestion)}
              className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-white/5"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}

      {/* Helper Text */}
      <div className="mt-2 flex items-center justify-between">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {maxTags
            ? `${tags.length}/${maxTags} tags`
            : `${tags.length} ${tags.length === 1 ? "tag" : "tags"}`}
        </p>
        {tags.length > 0 && (
          <button
            type="button"
            onClick={copyToClipboard}
            className="text-xs font-medium text-brand-500 hover:text-brand-600 dark:text-brand-400 dark:hover:text-brand-300"
          >
            Copy all
          </button>
        )}
      </div>
    </div>
  );
};

export default TagInput;
