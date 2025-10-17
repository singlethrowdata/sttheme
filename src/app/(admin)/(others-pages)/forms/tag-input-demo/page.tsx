// [R2]: Tag Input demo page with multiple examples
// → needs: TagInput component, ComponentCard wrapper
// → provides: Interactive examples for tag input functionality

"use client";
import React, { useState } from "react";
import ComponentCard from "@/components/common/ComponentCard";
import PageBreadCrumb from "@/components/common/PageBreadCrumb";
import TagInput from "@/components/ui/forms/TagInput";

const TagInputDemo: React.FC = () => {
  // Email tags example
  const [emailTags, setEmailTags] = useState<string[]>([
    "john@example.com",
    "jane@example.com",
  ]);

  // Category tags with suggestions
  const [categoryTags, setCategoryTags] = useState<string[]>(["Technology"]);
  const categorySuggestions = [
    "Technology",
    "Business",
    "Design",
    "Marketing",
    "Finance",
    "Health",
    "Education",
    "Entertainment",
  ];

  // Skill tags with autocomplete
  const [skillTags, setSkillTags] = useState<string[]>([
    "React",
    "TypeScript",
  ]);
  const skillSuggestions = [
    "React",
    "TypeScript",
    "JavaScript",
    "Node.js",
    "Python",
    "Java",
    "CSS",
    "HTML",
    "GraphQL",
    "MongoDB",
    "PostgreSQL",
    "Docker",
    "Kubernetes",
    "AWS",
  ];

  // Limited tags example (max 5)
  const [limitedTags, setLimitedTags] = useState<string[]>(["Tag 1", "Tag 2"]);

  // Email validation
  const emailValidate = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <>
      <PageBreadCrumb pageTitle="Tag Input" />

      <div className="grid grid-cols-1 gap-6">
        {/* Email Tags Example */}
        <ComponentCard
          title="Email Tags"
          desc="Add email addresses with validation. Only valid email formats are accepted."
        >
          <TagInput
            tags={emailTags}
            onChange={setEmailTags}
            placeholder="Enter email address..."
            validate={emailValidate}
          />
          <div className="mt-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>Try:</strong> Type an email and press Enter or comma. Invalid
              emails will be rejected.
            </p>
          </div>
        </ComponentCard>

        {/* Category Tags with Suggestions */}
        <ComponentCard
          title="Category Tags"
          desc="Select from predefined categories with autocomplete suggestions."
        >
          <TagInput
            tags={categoryTags}
            onChange={setCategoryTags}
            suggestions={categorySuggestions}
            placeholder="Type to search categories..."
          />
          <div className="mt-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>Try:</strong> Start typing to see suggestions, or add
              custom categories.
            </p>
          </div>
        </ComponentCard>

        {/* Skill Tags with Autocomplete */}
        <ComponentCard
          title="Skill Tags"
          desc="Add technical skills with autocomplete from a large predefined list."
        >
          <TagInput
            tags={skillTags}
            onChange={setSkillTags}
            suggestions={skillSuggestions}
            placeholder="Add skills..."
          />
          <div className="mt-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>Try:</strong> Type &quot;Java&quot; to see JavaScript, Java, etc.
              Duplicates are prevented by default.
            </p>
          </div>
        </ComponentCard>

        {/* Limited Tags Example */}
        <ComponentCard
          title="Limited Tags (Max 5)"
          desc="Restrict the number of tags that can be added."
        >
          <TagInput
            tags={limitedTags}
            onChange={setLimitedTags}
            maxTags={5}
            placeholder="Add up to 5 tags..."
          />
          <div className="mt-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>Try:</strong> Add tags until you reach the limit of 5. The
              input will be disabled after.
            </p>
          </div>
        </ComponentCard>

        {/* Color-Coded Tags Example */}
        <ComponentCard
          title="Color Variants"
          desc="Different tag styles for various use cases (styling handled by TagInput component)."
        >
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Default Tags (Brand Color)
              </label>
              <TagInput
                tags={["React", "Next.js", "Tailwind"]}
                onChange={() => {}}
                placeholder="Brand colored tags..."
              />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>Note:</strong> Tags use the brand color scheme by default.
              Custom color variants can be added as needed.
            </p>
          </div>
        </ComponentCard>

        {/* Disabled State */}
        <ComponentCard
          title="Disabled State"
          desc="Read-only display of tags without edit capabilities."
        >
          <TagInput
            tags={["Read-only", "Disabled", "No editing"]}
            onChange={() => {}}
            disabled={true}
          />
          <div className="mt-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>Note:</strong> Tags cannot be removed or added in disabled
              state.
            </p>
          </div>
        </ComponentCard>

        {/* Keyboard Shortcuts */}
        <ComponentCard
          title="Keyboard Shortcuts"
          desc="Learn how to interact with the tag input using keyboard."
        >
          <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
            <div className="flex items-start gap-3">
              <kbd className="inline-flex items-center rounded border border-gray-300 bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
                Enter
              </kbd>
              <span>Add tag from current input</span>
            </div>
            <div className="flex items-start gap-3">
              <kbd className="inline-flex items-center rounded border border-gray-300 bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
                ,
              </kbd>
              <span>Add tag from current input (comma separator)</span>
            </div>
            <div className="flex items-start gap-3">
              <kbd className="inline-flex items-center rounded border border-gray-300 bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
                Backspace
              </kbd>
              <span>Remove last tag when input is empty</span>
            </div>
            <div className="flex items-start gap-3">
              <kbd className="inline-flex items-center rounded border border-gray-300 bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
                Copy all
              </kbd>
              <span>Click to copy all tags to clipboard</span>
            </div>
          </div>
        </ComponentCard>
      </div>
    </>
  );
};

export default TagInputDemo;
