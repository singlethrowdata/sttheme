// [R10]: Checkbox Group demo page with multiple examples
// → needs: CheckboxGroup component, ComponentCard wrapper
// → provides: Interactive examples for checkbox group functionality

"use client";
import React, { useState } from "react";
import ComponentCard from "@/components/common/ComponentCard";
import PageBreadCrumb from "@/components/common/PageBreadCrumb";
import CheckboxGroup from "@/components/ui/forms/CheckboxGroup";

const CheckboxGroupDemo: React.FC = () => {
  // Programming languages example
  const languageOptions = [
    { value: "javascript", label: "JavaScript", description: "Dynamic web programming" },
    { value: "typescript", label: "TypeScript", description: "JavaScript with types" },
    { value: "python", label: "Python", description: "General-purpose language" },
    { value: "java", label: "Java", description: "Enterprise applications" },
    { value: "csharp", label: "C#", description: "Microsoft .NET platform" },
    { value: "go", label: "Go", description: "Google's systems language" },
    { value: "rust", label: "Rust", description: "Memory-safe systems" },
    { value: "ruby", label: "Ruby", description: "Web development" },
  ];
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  // Features example
  const featureOptions = [
    { value: "notifications", label: "Email Notifications" },
    { value: "newsletter", label: "Newsletter Subscription" },
    { value: "updates", label: "Product Updates" },
    { value: "security", label: "Security Alerts" },
    { value: "marketing", label: "Marketing Emails" },
  ];
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(["notifications", "security"]);

  // Project categories example
  const categoryOptions = [
    { value: "web", label: "Web Development", description: "Frontend and backend web apps" },
    { value: "mobile", label: "Mobile Apps", description: "iOS and Android development" },
    { value: "desktop", label: "Desktop Software", description: "Windows, Mac, Linux apps" },
    { value: "data", label: "Data Science", description: "Analytics and ML projects" },
    { value: "devops", label: "DevOps", description: "Infrastructure and automation" },
    { value: "security", label: "Security", description: "Cybersecurity projects" },
  ];
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Countries example
  const countryOptions = [
    { value: "us", label: "United States" },
    { value: "ca", label: "Canada" },
    { value: "uk", label: "United Kingdom" },
    { value: "de", label: "Germany" },
    { value: "fr", label: "France" },
    { value: "jp", label: "Japan" },
    { value: "au", label: "Australia" },
    { value: "br", label: "Brazil" },
    { value: "in", label: "India" },
    { value: "cn", label: "China" },
  ];
  const [selectedCountries, setSelectedCountries] = useState<string[]>(["us", "ca"]);

  // Permissions example
  const permissionOptions = [
    { value: "read", label: "Read", description: "View content and data" },
    { value: "write", label: "Write", description: "Create and modify content" },
    { value: "delete", label: "Delete", description: "Remove content permanently" },
    { value: "admin", label: "Admin", description: "Full administrative access" },
  ];
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>(["read"]);

  return (
    <>
      <PageBreadCrumb pageTitle="Checkbox Group" />

      <div className="grid grid-cols-1 gap-6">
        {/* Programming Languages */}
        <ComponentCard
          title="Programming Languages"
          desc="Select your preferred programming languages with search and descriptions."
        >
          <CheckboxGroup
            options={languageOptions}
            selectedValues={selectedLanguages}
            onChange={setSelectedLanguages}
            label="Choose Programming Languages"
            searchable={true}
            searchPlaceholder="Search languages..."
          />
          {selectedLanguages.length > 0 && (
            <div className="mt-4 rounded-lg bg-blue-50 p-3 dark:bg-blue-950">
              <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                Selected ({selectedLanguages.length}): {selectedLanguages.join(", ")}
              </p>
            </div>
          )}
          <div className="mt-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>Try:</strong> Use the search box to filter languages, or click
              Select All to choose all options.
            </p>
          </div>
        </ComponentCard>

        {/* Email Preferences */}
        <ComponentCard
          title="Email Preferences"
          desc="Control which types of emails you want to receive."
        >
          <CheckboxGroup
            options={featureOptions}
            selectedValues={selectedFeatures}
            onChange={setSelectedFeatures}
            label="Email Subscription Options"
          />
          <div className="mt-4 rounded-lg bg-green-50 p-3 dark:bg-green-950">
            <p className="text-sm font-medium text-green-900 dark:text-green-100">
              Active: {selectedFeatures.length} of {featureOptions.length} options
            </p>
            <p className="mt-1 text-xs text-green-700 dark:text-green-300">
              {selectedFeatures.length === featureOptions.length
                ? "All notifications enabled"
                : selectedFeatures.length === 0
                  ? "No notifications enabled"
                  : "Partial selection"}
            </p>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>Note:</strong> Security alerts are recommended and pre-selected
              for account safety.
            </p>
          </div>
        </ComponentCard>

        {/* Project Categories */}
        <ComponentCard
          title="Project Categories"
          desc="Select project categories with descriptions and search."
        >
          <CheckboxGroup
            options={categoryOptions}
            selectedValues={selectedCategories}
            onChange={setSelectedCategories}
            label="Areas of Expertise"
            searchable={true}
            searchPlaceholder="Search categories..."
          />
          {selectedCategories.length > 0 && (
            <div className="mt-4">
              <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                <h4 className="mb-2 text-sm font-semibold text-gray-900 dark:text-white">
                  Selected Categories:
                </h4>
                <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                  {selectedCategories.map((cat) => {
                    const option = categoryOptions.find((o) => o.value === cat);
                    return (
                      <li key={cat} className="flex items-center gap-2">
                        <span className="text-brand-500">✓</span>
                        {option?.label}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          )}
          <div className="mt-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>Tip:</strong> Select multiple categories to showcase your
              diverse skill set.
            </p>
          </div>
        </ComponentCard>

        {/* Country Selection */}
        <ComponentCard
          title="Country Selection"
          desc="Searchable list of countries with select all functionality."
        >
          <CheckboxGroup
            options={countryOptions}
            selectedValues={selectedCountries}
            onChange={setSelectedCountries}
            label="Target Markets"
            searchable={true}
            searchPlaceholder="Search countries..."
          />
          <div className="mt-4 rounded-lg bg-purple-50 p-3 dark:bg-purple-950">
            <p className="text-sm font-medium text-purple-900 dark:text-purple-100">
              Markets: {selectedCountries.length} selected
            </p>
            {selectedCountries.length > 0 && (
              <p className="mt-1 text-xs text-purple-700 dark:text-purple-300">
                {countryOptions
                  .filter((c) => selectedCountries.includes(c.value))
                  .map((c) => c.label)
                  .join(", ")}
              </p>
            )}
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>Try:</strong> Search for specific countries or use Select All
              for global reach.
            </p>
          </div>
        </ComponentCard>

        {/* User Permissions */}
        <ComponentCard
          title="User Permissions"
          desc="Grant permissions with clear descriptions of each level."
        >
          <CheckboxGroup
            options={permissionOptions}
            selectedValues={selectedPermissions}
            onChange={setSelectedPermissions}
            label="Access Permissions"
          />
          <div className="mt-4 rounded-lg bg-yellow-50 p-3 dark:bg-yellow-950">
            <p className="text-sm font-medium text-yellow-900 dark:text-yellow-100">
              {selectedPermissions.includes("admin")
                ? "⚠️ Admin access grants full control"
                : selectedPermissions.includes("delete")
                  ? "⚠️ Delete permission allows permanent removal"
                  : "✓ Safe permission level"}
            </p>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>Warning:</strong> Admin and Delete permissions should be
              granted carefully.
            </p>
          </div>
        </ComponentCard>

        {/* Disabled State */}
        <ComponentCard
          title="Disabled State"
          desc="Checkbox group in disabled/read-only state."
        >
          <CheckboxGroup
            options={languageOptions.slice(0, 4)}
            selectedValues={["javascript", "typescript"]}
            onChange={() => { }}
            label="Locked Preferences"
            disabled={true}
          />
          <div className="mt-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>Note:</strong> The checkbox group is disabled and cannot be
              modified.
            </p>
          </div>
        </ComponentCard>

        {/* Features Guide */}
        <ComponentCard
          title="Features & Usage"
          desc="Complete guide to Checkbox Group capabilities."
        >
          <div className="space-y-4 text-sm text-gray-700 dark:text-gray-300">
            <div>
              <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">
                Key Features
              </h4>
              <ul className="ml-4 list-disc space-y-1">
                <li>Searchable checkbox list with real-time filtering</li>
                <li>Select all and deselect all functionality</li>
                <li>Indeterminate state for partial selections</li>
                <li>Individual option descriptions for clarity</li>
                <li>Selected count display in header</li>
                <li>Full dark mode support</li>
                <li>Disabled state for read-only scenarios</li>
                <li>Keyboard accessible with proper ARIA labels</li>
              </ul>
            </div>

            <div>
              <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">
                Search Functionality
              </h4>
              <ul className="ml-4 list-disc space-y-1">
                <li>
                  Real-time filtering as you type in the search box
                </li>
                <li>
                  Matches against both labels and descriptions
                </li>
                <li>
                  Case-insensitive search for better usability
                </li>
                <li>
                  Clear indication when no results match search
                </li>
                <li>
                  Selected values remain visible even when filtered out
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">
                Selection States
              </h4>
              <ul className="ml-4 list-disc space-y-1">
                <li>
                  <strong>Unchecked:</strong> No items selected (empty checkbox)
                </li>
                <li>
                  <strong>Indeterminate:</strong> Some items selected (dash icon)
                </li>
                <li>
                  <strong>Checked:</strong> All items selected (checkmark icon)
                </li>
                <li>
                  Click the header checkbox to toggle between all/none
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">
                Common Use Cases
              </h4>
              <ul className="ml-4 list-disc space-y-1">
                <li>Multi-select filters for data tables and search</li>
                <li>User preferences and notification settings</li>
                <li>Permission and access control management</li>
                <li>Category and tag selection</li>
                <li>Feature toggles and configuration</li>
                <li>Country, region, or location selection</li>
                <li>Skill, interest, or expertise selection</li>
              </ul>
            </div>

            <div>
              <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">
                Best Practices
              </h4>
              <ul className="ml-4 list-disc space-y-1">
                <li>Use descriptive labels that clearly explain each option</li>
                <li>Add descriptions for complex or ambiguous options</li>
                <li>Enable search for lists with more than 7-10 items</li>
                <li>Pre-select recommended or required options</li>
                <li>Show selected count to help users track their choices</li>
                <li>Group related options together logically</li>
                <li>Consider using warnings for sensitive permissions</li>
              </ul>
            </div>

            <div>
              <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">
                Accessibility
              </h4>
              <ul className="ml-4 list-disc space-y-1">
                <li>Proper ARIA labels for screen readers</li>
                <li>Keyboard navigation support (Tab, Space, Enter)</li>
                <li>Clear visual focus indicators</li>
                <li>High contrast in both light and dark modes</li>
                <li>Indeterminate state properly announced to assistive tech</li>
              </ul>
            </div>
          </div>
        </ComponentCard>
      </div>
    </>
  );
};

export default CheckboxGroupDemo;
