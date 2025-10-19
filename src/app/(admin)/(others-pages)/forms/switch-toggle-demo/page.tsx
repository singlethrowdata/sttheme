// [R9]: Switch/Toggle demo page with multiple examples
// → needs: SwitchToggle component, ComponentCard wrapper
// → provides: Interactive examples for switch/toggle functionality

"use client";
import React, { useState } from "react";
import ComponentCard from "@/components/common/ComponentCard";
import PageBreadCrumb from "@/components/common/PageBreadCrumb";
import SwitchToggle from "@/components/ui/forms/SwitchToggle";

const SwitchToggleDemo: React.FC = () => {
  // Notification settings example
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [smsNotifications, setSmsNotifications] = useState(false);

  // Privacy settings example
  const [profilePublic, setProfilePublic] = useState(true);
  const [showEmail, setShowEmail] = useState(false);
  const [showPhone, setShowPhone] = useState(false);

  // Feature toggles example
  const [darkMode, setDarkMode] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [betaFeatures, setBetaFeatures] = useState(false);

  // Size variants example
  const [smallToggle, setSmallToggle] = useState(true);
  const [mediumToggle, setMediumToggle] = useState(true);
  const [largeToggle, setLargeToggle] = useState(true);

  // System settings example
  const [autoSave, setAutoSave] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);

  return (
    <>
      <PageBreadCrumb pageTitle="Switch / Toggle" />

      <div className="grid grid-cols-1 gap-6">
        {/* Notification Settings */}
        <ComponentCard
          title="Notification Settings"
          desc="Toggle different notification channels with labels and descriptions."
        >
          <div className="space-y-4">
            <SwitchToggle
              checked={emailNotifications}
              onChange={setEmailNotifications}
              label="Email Notifications"
              description="Receive notifications via email"
            />
            <SwitchToggle
              checked={pushNotifications}
              onChange={setPushNotifications}
              label="Push Notifications"
              description="Receive browser push notifications"
            />
            <SwitchToggle
              checked={smsNotifications}
              onChange={setSmsNotifications}
              label="SMS Notifications"
              description="Receive text message alerts"
            />
          </div>
          {(emailNotifications || pushNotifications || smsNotifications) && (
            <div className="mt-4 rounded-lg bg-blue-50 p-3 dark:bg-blue-950">
              <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                Active Channels:{" "}
                {[
                  emailNotifications && "Email",
                  pushNotifications && "Push",
                  smsNotifications && "SMS",
                ]
                  .filter(Boolean)
                  .join(", ")}
              </p>
            </div>
          )}
          <div className="mt-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>Try:</strong> Toggle notification preferences to enable or
              disable different channels.
            </p>
          </div>
        </ComponentCard>

        {/* Privacy Settings */}
        <ComponentCard
          title="Privacy Settings"
          desc="Control visibility of personal information."
        >
          <div className="space-y-4">
            <SwitchToggle
              checked={profilePublic}
              onChange={setProfilePublic}
              label="Public Profile"
              description="Make your profile visible to everyone"
            />
            <SwitchToggle
              checked={showEmail}
              onChange={setShowEmail}
              label="Show Email Address"
              description="Display email on your public profile"
            />
            <SwitchToggle
              checked={showPhone}
              onChange={setShowPhone}
              label="Show Phone Number"
              description="Display phone number on your public profile"
            />
          </div>
          <div className="mt-4 rounded-lg bg-green-50 p-3 dark:bg-green-950">
            <p className="text-sm font-medium text-green-900 dark:text-green-100">
              Privacy Level:{" "}
              {!profilePublic
                ? "Private (Profile hidden)"
                : showEmail || showPhone
                  ? "Public (Contact info visible)"
                  : "Public (Contact info hidden)"}
            </p>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>Note:</strong> Adjusting these settings affects what others
              can see on your profile.
            </p>
          </div>
        </ComponentCard>

        {/* Feature Toggles */}
        <ComponentCard
          title="Feature Toggles"
          desc="Enable or disable application features."
        >
          <div className="space-y-4">
            <SwitchToggle
              checked={darkMode}
              onChange={setDarkMode}
              label="Dark Mode"
              description="Use dark theme across the application"
            />
            <SwitchToggle
              checked={analytics}
              onChange={setAnalytics}
              label="Analytics & Tracking"
              description="Help us improve by sharing usage data"
            />
            <SwitchToggle
              checked={betaFeatures}
              onChange={setBetaFeatures}
              label="Beta Features"
              description="Enable experimental features (may be unstable)"
            />
          </div>
          <div className="mt-4">
            <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
              <h4 className="mb-2 text-sm font-semibold text-gray-900 dark:text-white">
                Current Configuration:
              </h4>
              <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                <li className="flex items-center gap-2">
                  <span className={darkMode ? "text-green-500" : "text-gray-400"}>
                    {darkMode ? "✓" : "○"}
                  </span>
                  Dark Mode
                </li>
                <li className="flex items-center gap-2">
                  <span className={analytics ? "text-green-500" : "text-gray-400"}>
                    {analytics ? "✓" : "○"}
                  </span>
                  Analytics
                </li>
                <li className="flex items-center gap-2">
                  <span className={betaFeatures ? "text-green-500" : "text-gray-400"}>
                    {betaFeatures ? "✓" : "○"}
                  </span>
                  Beta Features
                </li>
              </ul>
            </div>
          </div>
        </ComponentCard>

        {/* Size Variants */}
        <ComponentCard
          title="Size Variants"
          desc="Switch components in small, medium, and large sizes."
        >
          <div className="space-y-6">
            <div>
              <SwitchToggle
                checked={smallToggle}
                onChange={setSmallToggle}
                label="Small Toggle"
                description="Compact size for tight spaces"
                size="sm"
              />
            </div>
            <div>
              <SwitchToggle
                checked={mediumToggle}
                onChange={setMediumToggle}
                label="Medium Toggle (Default)"
                description="Standard size for most use cases"
                size="md"
              />
            </div>
            <div>
              <SwitchToggle
                checked={largeToggle}
                onChange={setLargeToggle}
                label="Large Toggle"
                description="Prominent size for important settings"
                size="lg"
              />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>Tip:</strong> Choose the size that best fits your layout and
              importance hierarchy.
            </p>
          </div>
        </ComponentCard>

        {/* System Settings */}
        <ComponentCard
          title="System Settings"
          desc="Critical system configuration toggles."
        >
          <div className="space-y-4">
            <SwitchToggle
              checked={autoSave}
              onChange={setAutoSave}
              label="Auto-Save"
              description="Automatically save your work every 30 seconds"
            />
            <SwitchToggle
              checked={twoFactor}
              onChange={setTwoFactor}
              label="Two-Factor Authentication"
              description="Add an extra layer of security to your account"
            />
          </div>
          {twoFactor && (
            <div className="mt-4 rounded-lg bg-yellow-50 p-3 dark:bg-yellow-950">
              <p className="text-sm font-medium text-yellow-900 dark:text-yellow-100">
                ⚠️ Two-factor authentication requires additional setup steps.
              </p>
            </div>
          )}
          <div className="mt-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>Note:</strong> These settings affect system behavior and
              security.
            </p>
          </div>
        </ComponentCard>

        {/* Disabled State */}
        <ComponentCard
          title="Disabled State"
          desc="Switch components in disabled/read-only state."
        >
          <div className="space-y-4">
            <SwitchToggle
              checked={true}
              onChange={() => {}}
              label="Enabled (Disabled)"
              description="This toggle is on but cannot be changed"
              disabled={true}
            />
            <SwitchToggle
              checked={false}
              onChange={() => {}}
              label="Disabled (Disabled)"
              description="This toggle is off but cannot be changed"
              disabled={true}
            />
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>Note:</strong> Disabled toggles cannot be interacted with and
              appear visually dimmed.
            </p>
          </div>
        </ComponentCard>

        {/* Features Guide */}
        <ComponentCard
          title="Features & Usage"
          desc="Complete guide to Switch/Toggle capabilities."
        >
          <div className="space-y-4 text-sm text-gray-700 dark:text-gray-300">
            <div>
              <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">
                Key Features
              </h4>
              <ul className="ml-4 list-disc space-y-1">
                <li>Binary on/off state control with smooth animations</li>
                <li>Three size variants: small, medium (default), and large</li>
                <li>Optional label and description text</li>
                <li>Full dark mode support with proper contrast</li>
                <li>Disabled state for read-only scenarios</li>
                <li>Accessible with ARIA labels and keyboard support</li>
                <li>Click anywhere on the container to toggle</li>
                <li>Visual feedback on hover and active states</li>
              </ul>
            </div>

            <div>
              <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">
                Size Guidelines
              </h4>
              <ul className="ml-4 list-disc space-y-1">
                <li>
                  <strong>Small (sm):</strong> Compact layouts, mobile views, or when
                  space is limited
                </li>
                <li>
                  <strong>Medium (md):</strong> Default size for most standard use
                  cases
                </li>
                <li>
                  <strong>Large (lg):</strong> Important settings, prominent features,
                  or accessibility needs
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">
                Common Use Cases
              </h4>
              <ul className="ml-4 list-disc space-y-1">
                <li>Notification preferences and communication settings</li>
                <li>Privacy and visibility controls</li>
                <li>Feature flags and experimental functionality</li>
                <li>Theme and appearance settings</li>
                <li>Security options (2FA, encryption, etc.)</li>
                <li>Data sharing and analytics preferences</li>
                <li>Auto-save and backup configurations</li>
              </ul>
            </div>

            <div>
              <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">
                Accessibility
              </h4>
              <ul className="ml-4 list-disc space-y-1">
                <li>Keyboard accessible (Space/Enter to toggle)</li>
                <li>ARIA labels for screen readers</li>
                <li>Clear visual states (on/off, hover, disabled)</li>
                <li>High contrast in both light and dark modes</li>
                <li>Focus indicators for keyboard navigation</li>
              </ul>
            </div>

            <div>
              <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">
                Best Practices
              </h4>
              <ul className="ml-4 list-disc space-y-1">
                <li>Use descriptive labels that clearly indicate what's being toggled</li>
                <li>Add descriptions for complex or critical settings</li>
                <li>Group related toggles together visually</li>
                <li>Show immediate feedback when state changes</li>
                <li>Use disabled state for settings that depend on other conditions</li>
                <li>Consider confirmation dialogs for destructive or critical toggles</li>
              </ul>
            </div>
          </div>
        </ComponentCard>
      </div>
    </>
  );
};

export default SwitchToggleDemo;
