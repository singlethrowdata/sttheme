// [R3]: Date Range Picker demo page with multiple examples
// → needs: DateRangePicker component, ComponentCard wrapper
// → provides: Interactive examples for date range selection functionality

"use client";
import React, { useState } from "react";
import ComponentCard from "@/components/common/ComponentCard";
import PageBreadCrumb from "@/components/common/PageBreadCrumb";
import DateRangePicker from "@/components/ui/forms/DateRangePicker";

interface DateRange {
  start: Date;
  end: Date;
}

const DateRangeDemo: React.FC = () => {
  // Report date range
  const [reportRange, setReportRange] = useState<DateRange>({
    start: new Date(new Date().setDate(new Date().getDate() - 30)),
    end: new Date(),
  });

  // Booking date range
  const [bookingRange, setBookingRange] = useState<DateRange>({
    start: new Date(),
    end: new Date(new Date().setDate(new Date().getDate() + 7)),
  });

  // Analytics date filter
  const [analyticsRange, setAnalyticsRange] = useState<DateRange>({
    start: new Date(new Date().setDate(new Date().getDate() - 7)),
    end: new Date(),
  });

  // Event scheduling range
  const [eventRange, setEventRange] = useState<DateRange>({
    start: new Date(),
    end: new Date(),
  });

  // Constrained date range (only future dates)
  const [futureRange, setFutureRange] = useState<DateRange>({
    start: new Date(),
    end: new Date(new Date().setDate(new Date().getDate() + 1)),
  });

  // Format date for display
  const formatDateRange = (range: DateRange) => {
    return `${range.start.toLocaleDateString()} - ${range.end.toLocaleDateString()}`;
  };

  return (
    <>
      <PageBreadCrumb pageTitle="Date Range Picker" />

      <div className="grid grid-cols-1 gap-6">
        {/* Report Date Range Selector */}
        <ComponentCard
          title="Report Date Range"
          desc="Select date range for generating reports with preset options."
        >
          <DateRangePicker
            startDate={reportRange.start}
            endDate={reportRange.end}
            onChange={setReportRange}
            presets={true}
          />
          <div className="mt-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>Selected:</strong> {formatDateRange(reportRange)}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              <strong>Try:</strong> Use preset ranges like &quot;Last 30 days&quot; or &quot;This month&quot; for quick selection.
            </p>
          </div>
        </ComponentCard>

        {/* Booking Date Range Picker */}
        <ComponentCard
          title="Booking Date Range"
          desc="Select check-in and check-out dates for reservations."
        >
          <DateRangePicker
            startDate={bookingRange.start}
            endDate={bookingRange.end}
            onChange={setBookingRange}
            minDate={new Date()}
            presets={false}
          />
          <div className="mt-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>Selected:</strong> {formatDateRange(bookingRange)}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              <strong>Try:</strong> Past dates are disabled - only future dates can be selected.
            </p>
          </div>
        </ComponentCard>

        {/* Analytics Date Filter */}
        <ComponentCard
          title="Analytics Date Filter"
          desc="Filter analytics data by date range with quick presets."
        >
          <DateRangePicker
            startDate={analyticsRange.start}
            endDate={analyticsRange.end}
            onChange={setAnalyticsRange}
            maxDate={new Date()}
            presets={true}
          />
          <div className="mt-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>Selected:</strong> {formatDateRange(analyticsRange)}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              <strong>Try:</strong> Future dates are disabled - only historical data is available.
            </p>
          </div>
        </ComponentCard>

        {/* Event Scheduling Range */}
        <ComponentCard
          title="Event Scheduling"
          desc="Schedule events by selecting start and end dates."
        >
          <DateRangePicker
            startDate={eventRange.start}
            endDate={eventRange.end}
            onChange={setEventRange}
            presets={false}
          />
          <div className="mt-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>Selected:</strong> {formatDateRange(eventRange)}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              <strong>Try:</strong> Select dates for multi-day events or single-day events.
            </p>
          </div>
        </ComponentCard>

        {/* Future Dates Only */}
        <ComponentCard
          title="Future Dates Only"
          desc="Constrained date picker allowing only future dates."
        >
          <DateRangePicker
            startDate={futureRange.start}
            endDate={futureRange.end}
            onChange={setFutureRange}
            minDate={new Date()}
            presets={false}
          />
          <div className="mt-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>Selected:</strong> {formatDateRange(futureRange)}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              <strong>Note:</strong> All past dates are disabled to ensure future selections only.
            </p>
          </div>
        </ComponentCard>

        {/* Features Guide */}
        <ComponentCard
          title="Features & Usage"
          desc="Learn how to use the date range picker effectively."
        >
          <div className="space-y-4 text-sm text-gray-700 dark:text-gray-300">
            <div>
              <h4 className="font-medium mb-2">Dual Calendar View</h4>
              <p className="text-gray-600 dark:text-gray-400">
                Two months displayed side-by-side for easier range selection across months.
              </p>
            </div>

            <div>
              <h4 className="font-medium mb-2">Preset Ranges</h4>
              <p className="text-gray-600 dark:text-gray-400">
                Quick selection options: Today, Yesterday, Last 7 days, Last 30 days, This month, Last month.
              </p>
            </div>

            <div>
              <h4 className="font-medium mb-2">Date Constraints</h4>
              <p className="text-gray-600 dark:text-gray-400">
                Set minimum and maximum dates to restrict selection range. Disabled dates appear grayed out.
              </p>
            </div>

            <div>
              <h4 className="font-medium mb-2">Visual Feedback</h4>
              <p className="text-gray-600 dark:text-gray-400">
                Selected dates are highlighted, and the range between them is shown with a different background color.
              </p>
            </div>

            <div>
              <h4 className="font-medium mb-2">Hover Preview</h4>
              <p className="text-gray-600 dark:text-gray-400">
                When selecting a range, hover over dates to see a preview of the range before confirming.
              </p>
            </div>

            <div>
              <h4 className="font-medium mb-2">Dark Mode Support</h4>
              <p className="text-gray-600 dark:text-gray-400">
                Full support for dark mode with appropriate color adjustments for better visibility.
              </p>
            </div>
          </div>
        </ComponentCard>
      </div>
    </>
  );
};

export default DateRangeDemo;
