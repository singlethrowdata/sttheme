// [R1]: Demo page for multi-step form wizard
// → needs: MultiStepForm component
// → provides: visual validation of wizard functionality

"use client";
import React from "react";
import MultiStepForm from "@/components/ui/forms/MultiStepForm";

const MultiStepFormDemo = () => {
  const steps = [
    {
      label: "Personal Info",
      content: (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Personal Information
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                First Name
              </label>
              <input
                type="text"
                placeholder="John"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                suppressHydrationWarning
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Last Name
              </label>
              <input
                type="text"
                placeholder="Doe"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                suppressHydrationWarning
              />
            </div>
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                type="email"
                placeholder="john.doe@example.com"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                suppressHydrationWarning
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      label: "Account Details",
      content: (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Account Details
          </h3>
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Username
              </label>
              <input
                type="text"
                placeholder="johndoe"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      label: "Preferences",
      content: (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Preferences
          </h3>
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Notifications
              </label>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-brand-500 focus:ring-brand-500"
                    defaultChecked
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Email notifications
                  </span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-brand-500 focus:ring-brand-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    SMS notifications
                  </span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-brand-500 focus:ring-brand-500"
                    defaultChecked
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Push notifications
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      label: "Review",
      content: (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Review & Submit
          </h3>
          <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Please review your information before submitting. You can go back
              to make any changes if needed.
            </p>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between border-b border-gray-200 pb-2 dark:border-gray-700">
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Name:
              </span>
              <span className="text-gray-600 dark:text-gray-400">
                John Doe
              </span>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-2 dark:border-gray-700">
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Email:
              </span>
              <span className="text-gray-600 dark:text-gray-400">
                john.doe@example.com
              </span>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-2 dark:border-gray-700">
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Username:
              </span>
              <span className="text-gray-600 dark:text-gray-400">johndoe</span>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const handleComplete = (data: Record<string, unknown>) => {
    console.log("Form completed with data:", data);
    alert("Form submitted successfully!");
  };

  const handleCancel = () => {
    console.log("Form cancelled");
  };

  return (
    <div className="mx-auto max-w-4xl p-6" suppressHydrationWarning>
      <div className="mb-8">
        <h1 className="mb-2 text-2xl font-semibold text-gray-900 dark:text-white">
          Multi-Step Form Wizard
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Complete all steps to submit your registration
        </p>
      </div>

      <MultiStepForm
        steps={steps}
        onComplete={handleComplete}
        onCancel={handleCancel}
        submitLabel="Submit Registration"
      />
    </div>
  );
};

export default MultiStepFormDemo;
