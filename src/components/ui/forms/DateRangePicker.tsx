"use client";

// [R3]: Date Range Picker Component
// → needs: None (independent component)
// → provides: date-range-picker capability for temporal filtering

import { useState, useRef, useEffect } from "react";

interface DateRange {
  start: Date;
  end: Date;
}

interface DateRangePickerProps {
  startDate?: Date;
  endDate?: Date;
  onChange: (range: DateRange) => void;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[];
  presets?: boolean;
  className?: string;
}

const PRESET_RANGES = [
  { label: "Today", getValue: () => ({ start: new Date(), end: new Date() }) },
  {
    label: "Yesterday",
    getValue: () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      return { start: yesterday, end: yesterday };
    },
  },
  {
    label: "Last 7 days",
    getValue: () => {
      const end = new Date();
      const start = new Date();
      start.setDate(start.getDate() - 6);
      return { start, end };
    },
  },
  {
    label: "Last 30 days",
    getValue: () => {
      const end = new Date();
      const start = new Date();
      start.setDate(start.getDate() - 29);
      return { start, end };
    },
  },
  {
    label: "This month",
    getValue: () => {
      const now = new Date();
      const start = new Date(now.getFullYear(), now.getMonth(), 1);
      const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      return { start, end };
    },
  },
  {
    label: "Last month",
    getValue: () => {
      const now = new Date();
      const start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const end = new Date(now.getFullYear(), now.getMonth(), 0);
      return { start, end };
    },
  },
];

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default function DateRangePicker({
  startDate,
  endDate,
  onChange,
  minDate,
  maxDate,
  disabledDates = [],
  presets = true,
  className = "",
}: DateRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [tempStart, setTempStart] = useState<Date | null>(startDate || null);
  const [tempEnd, setTempEnd] = useState<Date | null>(endDate || null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  const formatDate = (date: Date | null) => {
    if (!date) return "";
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  const isSameDay = (date1: Date, date2: Date) => {
    return date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear();
  };

  const isDateDisabled = (date: Date) => {
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return disabledDates.some(disabled => isSameDay(disabled, date));
  };

  const isInRange = (date: Date) => {
    if (!tempStart) return false;
    if (tempEnd && tempStart <= tempEnd) {
      return date >= tempStart && date <= tempEnd;
    }
    if (hoverDate && tempStart <= hoverDate) {
      return date >= tempStart && date <= hoverDate;
    }
    return false;
  };

  const handleDateClick = (date: Date) => {
    if (isDateDisabled(date)) return;

    if (!tempStart || (tempStart && tempEnd)) {
      setTempStart(date);
      setTempEnd(null);
    } else {
      if (date < tempStart) {
        setTempEnd(tempStart);
        setTempStart(date);
      } else {
        setTempEnd(date);
      }
    }
  };

  const handleApply = () => {
    if (tempStart && tempEnd) {
      onChange({ start: tempStart, end: tempEnd });
      setIsOpen(false);
    }
  };

  const handlePresetClick = (preset: typeof PRESET_RANGES[0]) => {
    const range = preset.getValue();
    setTempStart(range.start);
    setTempEnd(range.end);
    onChange(range);
    setIsOpen(false);
  };

  const renderCalendar = (monthOffset: number = 0) => {
    const displayMonth = new Date(currentMonth);
    displayMonth.setMonth(displayMonth.getMonth() + monthOffset);

    const year = displayMonth.getFullYear();
    const month = displayMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-8" />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isStart = tempStart && isSameDay(date, tempStart);
      const isEnd = tempEnd && isSameDay(date, tempEnd);
      const inRange = isInRange(date);
      const disabled = isDateDisabled(date);
      const isToday = isSameDay(date, new Date());

      days.push(
        <button
          key={day}
          type="button"
          disabled={disabled}
          onClick={() => handleDateClick(date)}
          onMouseEnter={() => setHoverDate(date)}
          className={`
            h-8 w-8 rounded text-sm transition-colors
            ${disabled ? "text-gray-300 dark:text-gray-600 cursor-not-allowed" : "hover:bg-brand-50 dark:hover:bg-gray-700"}
            ${isStart || isEnd ? "bg-brand-500 text-white hover:bg-brand-600" : ""}
            ${inRange && !isStart && !isEnd ? "bg-brand-100 dark:bg-brand-900/20 text-brand-700 dark:text-brand-300" : ""}
            ${isToday && !isStart && !isEnd ? "border border-brand-500" : ""}
          `}
        >
          {day}
        </button>
      );
    }

    return (
      <div className="p-3">
        <div className="flex items-center justify-between mb-3">
          {monthOffset === 0 && (
            <button
              type="button"
              onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)))}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
            >
              ←
            </button>
          )}
          <div className="font-medium text-sm">
            {MONTH_NAMES[displayMonth.getMonth()]} {displayMonth.getFullYear()}
          </div>
          {monthOffset === 1 && (
            <button
              type="button"
              onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)))}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
            >
              →
            </button>
          )}
          {monthOffset === 0 && <div className="w-6" />}
          {monthOffset === 1 && <div className="w-6" />}
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(day => (
            <div key={day} className="h-8 flex items-center justify-center text-xs font-medium text-gray-500">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {days}
        </div>
      </div>
    );
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-left flex items-center justify-between hover:border-brand-500 dark:hover:border-brand-500 transition-colors"
      >
        <span className="text-sm">
          {tempStart && tempEnd
            ? `${formatDate(tempStart)} - ${formatDate(tempEnd)}`
            : "Select date range"}
        </span>
        <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-theme-xs overflow-hidden">
          <div className="flex">
            {presets && (
              <div className="border-r border-gray-200 dark:border-gray-700 p-3 space-y-1">
                {PRESET_RANGES.map(preset => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => handlePresetClick(preset)}
                    className="block w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-brand-50 dark:hover:bg-gray-700 transition-colors whitespace-nowrap"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            )}

            <div className="flex">
              {renderCalendar(0)}
              {renderCalendar(1)}
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 p-3 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => {
                setTempStart(startDate || null);
                setTempEnd(endDate || null);
                setIsOpen(false);
              }}
              className="px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleApply}
              disabled={!tempStart || !tempEnd}
              className="px-4 py-2 text-sm rounded-lg bg-brand-500 text-white hover:bg-brand-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
