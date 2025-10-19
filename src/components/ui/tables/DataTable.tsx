// [R11-R20]: Advanced DataTable with all table features
// → provides: enterprise-grade table with sorting, filtering, selection, pagination, resizing, expandable rows, inline editing, export, column groups, virtual scrolling

"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";

// Types
export interface Column<T = any> {
  id: string;
  header: string;
  accessor: keyof T | ((row: T) => any);
  sortable?: boolean;
  filterable?: boolean;
  resizable?: boolean;
  minWidth?: number;
  maxWidth?: number;
  width?: number;
  render?: (value: any, row: T) => React.ReactNode;
  editable?: boolean;
  filterType?: "text" | "select" | "number" | "date";
  filterOptions?: { label: string; value: any }[];
  group?: string; // [R19] Column grouping
}

export interface DataTableProps<T = any> {
  data: T[];
  columns: Column<T>[];

  // [R11] Sorting
  sortable?: boolean;
  multiSort?: boolean;
  onSort?: (sortConfig: SortConfig[]) => void;

  // [R12] Filtering
  filterable?: boolean;
  onFilter?: (filters: Record<string, any>) => void;

  // [R13] Row Selection
  selectable?: boolean;
  selectedRows?: Set<number>;
  onSelectionChange?: (selectedRows: Set<number>) => void;

  // [R14] Pagination
  pagination?: boolean;
  pageSize?: number;
  currentPage?: number;
  totalRecords?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;

  // [R15] Column Resizing
  resizable?: boolean;
  onColumnResize?: (columnId: string, width: number) => void;

  // [R16] Expandable Rows
  expandable?: boolean;
  renderExpandedRow?: (row: T, index: number) => React.ReactNode;

  // [R17] Inline Editing
  editable?: boolean;
  onCellEdit?: (rowIndex: number, columnId: string, value: any) => void;

  // [R18] Export
  exportable?: boolean;
  exportFormats?: ("csv" | "excel" | "pdf")[];
  exportFileName?: string;

  // [R19] Fixed Headers
  stickyHeader?: boolean;
  columnGroups?: { name: string; columns: string[] }[];

  // [R20] Virtual Scrolling
  virtual?: boolean;
  rowHeight?: number;

  // General
  className?: string;
  striped?: boolean;
  hoverable?: boolean;
  bordered?: boolean;
}

interface SortConfig {
  column: string;
  direction: "asc" | "desc";
}

export function DataTable<T extends Record<string, any>>({
  data = [],
  columns = [],
  sortable = true,
  multiSort = false,
  filterable = true,
  selectable = false,
  pagination = true,
  pageSize: initialPageSize = 10,
  resizable = true,
  expandable = false,
  editable = false,
  exportable = false,
  exportFormats = ["csv", "excel", "pdf"],
  exportFileName = "export",
  stickyHeader = true,
  virtual = false,
  rowHeight = 48,
  className = "",
  striped = false,
  hoverable = true,
  bordered = false,
  selectedRows: controlledSelection,
  onSelectionChange,
  renderExpandedRow,
  onCellEdit,
  onSort,
  onFilter,
  columnGroups = [],
}: DataTableProps<T>) {
  // [R11] Sorting state
  const [sortConfig, setSortConfig] = useState<SortConfig[]>([]);

  // [R12] Filtering state
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [filterDropdowns, setFilterDropdowns] = useState<Record<string, boolean>>({});

  // [R13] Selection state
  const [internalSelection, setInternalSelection] = useState<Set<number>>(new Set());
  const selectedRowsSet = controlledSelection ?? internalSelection;

  // [R14] Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);

  // [R15] Resizing state
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>({});
  const [resizingColumn, setResizingColumn] = useState<string | null>(null);
  const resizeStartX = useRef(0);
  const resizeStartWidth = useRef(0);

  // [R16] Expandable rows state
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

  // [R17] Editing state
  const [editingCell, setEditingCell] = useState<{ row: number; column: string } | null>(null);
  const [editValue, setEditValue] = useState<any>("");

  // [R20] Virtual scrolling
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize column widths
  useEffect(() => {
    const initialWidths: Record<string, number> = {};
    columns.forEach(col => {
      if (col.width) {
        initialWidths[col.id] = col.width;
      }
    });
    setColumnWidths(prev => ({ ...initialWidths, ...prev }));
  }, [columns]);

  // [R11] Handle sorting
  const handleSort = (columnId: string) => {
    if (!sortable) return;

    setSortConfig(prev => {
      const existing = prev.find(s => s.column === columnId);

      if (!multiSort) {
        if (!existing) {
          return [{ column: columnId, direction: "asc" }];
        } else if (existing.direction === "asc") {
          return [{ column: columnId, direction: "desc" }];
        } else {
          return [];
        }
      } else {
        // Multi-column sorting
        if (!existing) {
          return [...prev, { column: columnId, direction: "asc" }];
        } else if (existing.direction === "asc") {
          return prev.map(s =>
            s.column === columnId ? { ...s, direction: "desc" as const } : s
          );
        } else {
          return prev.filter(s => s.column !== columnId);
        }
      }
    });
  };

  // [R12] Handle filtering
  const handleFilterChange = (columnId: string, value: any) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      if (value === "" || value === null || value === undefined) {
        delete newFilters[columnId];
      } else {
        newFilters[columnId] = value;
      }
      onFilter?.(newFilters);
      return newFilters;
    });
    setCurrentPage(1); // Reset to first page on filter
  };

  // [R13] Handle row selection
  const handleRowSelect = (rowIndex: number, event?: React.MouseEvent) => {
    if (!selectable) return;

    const newSelection = new Set(selectedRowsSet);

    if (event?.shiftKey && selectedRowsSet.size > 0) {
      // Range selection
      const selectedIndices = Array.from(selectedRowsSet);
      const lastSelected = Math.max(...selectedIndices);
      const start = Math.min(lastSelected, rowIndex);
      const end = Math.max(lastSelected, rowIndex);

      for (let i = start; i <= end; i++) {
        newSelection.add(i);
      }
    } else {
      // Single selection
      if (newSelection.has(rowIndex)) {
        newSelection.delete(rowIndex);
      } else {
        newSelection.add(rowIndex);
      }
    }

    if (onSelectionChange) {
      onSelectionChange(newSelection);
    } else {
      setInternalSelection(newSelection);
    }
  };

  const handleSelectAll = () => {
    if (selectedRowsSet.size === processedData.length) {
      const newSelection = new Set<number>();
      if (onSelectionChange) {
        onSelectionChange(newSelection);
      } else {
        setInternalSelection(newSelection);
      }
    } else {
      const newSelection = new Set(processedData.map((_, idx) => idx));
      if (onSelectionChange) {
        onSelectionChange(newSelection);
      } else {
        setInternalSelection(newSelection);
      }
    }
  };

  // [R15] Handle column resizing
  const handleResizeStart = (columnId: string, e: React.MouseEvent) => {
    if (!resizable) return;

    e.preventDefault();
    setResizingColumn(columnId);
    resizeStartX.current = e.clientX;
    resizeStartWidth.current = columnWidths[columnId] || 150;
  };

  useEffect(() => {
    if (!resizingColumn) return;

    const handleMouseMove = (e: MouseEvent) => {
      const diff = e.clientX - resizeStartX.current;
      const newWidth = Math.max(50, resizeStartWidth.current + diff);

      setColumnWidths(prev => ({
        ...prev,
        [resizingColumn]: newWidth
      }));
    };

    const handleMouseUp = () => {
      setResizingColumn(null);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [resizingColumn]);

  // [R16] Handle row expansion
  const toggleRowExpansion = (rowIndex: number) => {
    setExpandedRows(prev => {
      const newSet = new Set(prev);
      if (newSet.has(rowIndex)) {
        newSet.delete(rowIndex);
      } else {
        newSet.add(rowIndex);
      }
      return newSet;
    });
  };

  // [R17] Handle inline editing
  const startEdit = (rowIndex: number, columnId: string, currentValue: any) => {
    if (!editable) return;
    setEditingCell({ row: rowIndex, column: columnId });
    setEditValue(currentValue);
  };

  const saveEdit = () => {
    if (editingCell) {
      onCellEdit?.(editingCell.row, editingCell.column, editValue);
      setEditingCell(null);
    }
  };

  const cancelEdit = () => {
    setEditingCell(null);
  };

  // Process data (filter, sort)
  const processedData = useMemo(() => {
    let result = [...data];

    // [R12] Apply filters
    Object.entries(filters).forEach(([columnId, filterValue]) => {
      const column = columns.find(c => c.id === columnId);
      if (!column) return;

      result = result.filter(row => {
        const cellValue = typeof column.accessor === "function"
          ? column.accessor(row)
          : row[column.accessor];

        const value = String(cellValue).toLowerCase();
        const filter = String(filterValue).toLowerCase();
        return value.includes(filter);
      });
    });

    // [R11] Apply sorting
    if (sortConfig.length > 0) {
      result.sort((a, b) => {
        for (const { column: columnId, direction } of sortConfig) {
          const column = columns.find(c => c.id === columnId);
          if (!column) continue;

          const aValue = typeof column.accessor === "function"
            ? column.accessor(a)
            : a[column.accessor];
          const bValue = typeof column.accessor === "function"
            ? column.accessor(b)
            : b[column.accessor];

          if (aValue < bValue) return direction === "asc" ? -1 : 1;
          if (aValue > bValue) return direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    return result;
  }, [data, filters, sortConfig, columns]);

  // [R14] Pagination
  const totalPages = Math.ceil(processedData.length / pageSize);
  const paginatedData = pagination
    ? processedData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    : processedData;

  // [R20] Virtual scrolling calculations
  const visibleData = virtual
    ? (() => {
      const startIndex = Math.floor(scrollTop / rowHeight);
      const endIndex = Math.min(
        startIndex + Math.ceil((containerRef.current?.clientHeight || 600) / rowHeight) + 1,
        paginatedData.length
      );
      return paginatedData.slice(startIndex, endIndex).map((row, idx) => ({
        row,
        index: startIndex + idx,
        offset: (startIndex + idx) * rowHeight
      }));
    })()
    : paginatedData.map((row, idx) => ({ row, index: idx, offset: 0 }));

  // [R18] Export functions
  const exportToCSV = () => {
    const headers = columns.map(col => col.header).join(",");
    const rows = processedData.map(row => {
      return columns.map(col => {
        const value = typeof col.accessor === "function"
          ? col.accessor(row)
          : row[col.accessor];
        return `"${String(value).replace(/"/g, '""')}"`;
      }).join(",");
    });

    const csv = [headers, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${exportFileName}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportToExcel = () => {
    // Simplified Excel export (TSV format)
    const headers = columns.map(col => col.header).join("\t");
    const rows = processedData.map(row => {
      return columns.map(col => {
        const value = typeof col.accessor === "function"
          ? col.accessor(row)
          : row[col.accessor];
        return String(value);
      }).join("\t");
    });

    const tsv = [headers, ...rows].join("\n");
    const blob = new Blob([tsv], { type: "application/vnd.ms-excel" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${exportFileName}.xls`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportToPDF = () => {
    window.print(); // Simple PDF export via browser print
  };

  const getSortIcon = (columnId: string) => {
    const sort = sortConfig.find(s => s.column === columnId);
    if (!sort) return "↕";
    return sort.direction === "asc" ? "↑" : "↓";
  };

  const getSortOrder = (columnId: string) => {
    const index = sortConfig.findIndex(s => s.column === columnId);
    return index >= 0 && multiSort ? index + 1 : null;
  };

  return (
    <div className={`data-table-container ${className}`}>
      {/* [R18] Export toolbar */}
      {exportable && (
        <div className="mb-4 flex items-center justify-between">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {processedData.length} records {selectedRowsSet.size > 0 && `(${selectedRowsSet.size} selected)`}
          </div>
          <div className="flex gap-2">
            {exportFormats.includes("csv") && (
              <button
                onClick={exportToCSV}
                className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 rounded-lg transition-colors"
              >
                Export CSV
              </button>
            )}
            {exportFormats.includes("excel") && (
              <button
                onClick={exportToExcel}
                className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 rounded-lg transition-colors"
              >
                Export Excel
              </button>
            )}
            {exportFormats.includes("pdf") && (
              <button
                onClick={exportToPDF}
                className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 rounded-lg transition-colors"
              >
                Export PDF
              </button>
            )}
          </div>
        </div>
      )}

      {/* Table container */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/5 dark:bg-white/[0.03]">
        <div
          ref={containerRef}
          className="overflow-auto"
          style={{ maxHeight: virtual ? "600px" : "none" }}
          onScroll={e => setScrollTop(e.currentTarget.scrollTop)}
        >
          <table className="min-w-full">
            {/* [R19] Table Header with column groups */}
            <thead className={stickyHeader ? "sticky top-0 z-10 bg-white dark:bg-gray-900" : ""}>
              {/* Column groups row */}
              {columnGroups.length > 0 && (
                <tr className="border-b border-gray-200 dark:border-white/5">
                  {selectable && <th className="px-4 py-2"></th>}
                  {expandable && <th className="px-4 py-2"></th>}
                  {columnGroups.map((group, idx) => (
                    <th
                      key={idx}
                      colSpan={group.columns.length}
                      className="px-4 py-2 text-center text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-white/5"
                    >
                      {group.name}
                    </th>
                  ))}
                </tr>
              )}

              {/* Main header row */}
              <tr className="border-b border-gray-200 dark:border-white/5">
                {/* [R13] Select all checkbox */}
                {selectable && (
                  <th className="px-4 py-3 w-12">
                    <input
                      type="checkbox"
                      checked={selectedRowsSet.size === processedData.length && processedData.length > 0}
                      ref={input => {
                        if (input) {
                          input.indeterminate = selectedRowsSet.size > 0 && selectedRowsSet.size < processedData.length;
                        }
                      }}
                      onChange={handleSelectAll}
                      className="w-4 h-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500"
                    />
                  </th>
                )}

                {/* [R16] Expand column */}
                {expandable && <th className="px-4 py-3 w-12"></th>}

                {columns.map(column => {
                  const width = columnWidths[column.id] || column.width || 150;

                  return (
                    <th
                      key={column.id}
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-400 relative group"
                      style={{ width: `${width}px`, minWidth: `${width}px` }}
                    >
                      <div className="flex items-center gap-2">
                        {/* [R11] Sortable header */}
                        {column.sortable !== false && sortable ? (
                          <button
                            onClick={() => handleSort(column.id)}
                            className="flex items-center gap-1 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                          >
                            <span>{column.header}</span>
                            <span className="text-gray-400">{getSortIcon(column.id)}</span>
                            {multiSort && getSortOrder(column.id) !== null && (
                              <span className="text-xs bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 rounded px-1">
                                {getSortOrder(column.id)}
                              </span>
                            )}
                          </button>
                        ) : (
                          <span>{column.header}</span>
                        )}

                        {/* [R12] Filter dropdown */}
                        {column.filterable !== false && filterable && (
                          <div className="relative">
                            <button
                              onClick={() => setFilterDropdowns(prev => ({ ...prev, [column.id]: !prev[column.id] }))}
                              className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-white/10 ${filters[column.id] ? 'text-brand-600 dark:text-brand-400' : 'text-gray-400'}`}
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                              </svg>
                            </button>

                            {filterDropdowns[column.id] && (
                              <div className="absolute top-full left-0 mt-1 bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-200 dark:border-white/10 p-2 z-20 min-w-[200px]">
                                <input
                                  type="text"
                                  value={filters[column.id] || ""}
                                  onChange={e => handleFilterChange(column.id, e.target.value)}
                                  placeholder={`Filter ${column.header}...`}
                                  className="w-full px-3 py-1.5 text-sm border border-gray-300 dark:border-white/10 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                                  autoFocus
                                />
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* [R15] Resize handle */}
                      {column.resizable !== false && resizable && (
                        <div
                          onMouseDown={e => handleResizeStart(column.id, e)}
                          className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-brand-500 group-hover:bg-brand-300"
                        />
                      )}
                    </th>
                  );
                })}
              </tr>
            </thead>

            {/* Table Body */}
            <tbody
              className="divide-y divide-gray-100 dark:divide-white/5"
              style={virtual ? { height: `${processedData.length * rowHeight}px`, position: "relative" } : undefined}
            >
              {visibleData.map(({ row, index, offset }) => {
                const isExpanded = expandedRows.has(index);
                const isSelected = selectedRowsSet.has(index);

                return (
                  <React.Fragment key={index}>
                    <tr
                      className={`
                        ${striped && index % 2 === 0 ? "bg-gray-50/50 dark:bg-white/[0.02]" : ""}
                        ${hoverable ? "hover:bg-gray-50 dark:hover:bg-white/[0.05]" : ""}
                        ${isSelected ? "bg-brand-50 dark:bg-brand-900/20" : ""}
                        transition-colors
                      `}
                      style={virtual ? {
                        position: "absolute",
                        top: 0,
                        transform: `translateY(${offset}px)`,
                        height: `${rowHeight}px`
                      } : undefined}
                    >
                      {/* [R13] Selection checkbox */}
                      {selectable && (
                        <td className="px-4 py-3">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={(e) => handleRowSelect(index, e as unknown as React.MouseEvent)}
                            className="w-4 h-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500"
                          />
                        </td>
                      )}

                      {/* [R16] Expand toggle */}
                      {expandable && (
                        <td className="px-4 py-3">
                          <button
                            onClick={() => toggleRowExpansion(index)}
                            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                          >
                            <svg
                              className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-90" : ""}`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        </td>
                      )}

                      {/* Data cells */}
                      {columns.map(column => {
                        const value = typeof column.accessor === "function"
                          ? column.accessor(row)
                          : row[column.accessor];

                        const isEditing = editingCell?.row === index && editingCell?.column === column.id;

                        return (
                          <td
                            key={column.id}
                            className="px-4 py-3 text-sm text-gray-900 dark:text-white"
                            onDoubleClick={() => column.editable !== false && editable && startEdit(index, column.id, value)}
                          >
                            {/* [R17] Inline editing */}
                            {isEditing ? (
                              <div className="flex items-center gap-2">
                                <input
                                  type="text"
                                  value={editValue}
                                  onChange={e => setEditValue(e.target.value)}
                                  onKeyDown={e => {
                                    if (e.key === "Enter") saveEdit();
                                    if (e.key === "Escape") cancelEdit();
                                  }}
                                  className="flex-1 px-2 py-1 text-sm border border-brand-500 rounded focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white dark:bg-gray-900"
                                  autoFocus
                                />
                                <button
                                  onClick={saveEdit}
                                  className="p-1 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded"
                                >
                                  ✓
                                </button>
                                <button
                                  onClick={cancelEdit}
                                  className="p-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                                >
                                  ✕
                                </button>
                              </div>
                            ) : (
                              column.render ? column.render(value, row) : value
                            )}
                          </td>
                        );
                      })}
                    </tr>

                    {/* [R16] Expanded row content */}
                    {expandable && isExpanded && renderExpandedRow && (
                      <tr className="bg-gray-50 dark:bg-white/[0.02]">
                        <td colSpan={columns.length + (selectable ? 1 : 0) + 1} className="px-4 py-3">
                          {renderExpandedRow(row, index)}
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* [R14] Pagination controls */}
        {pagination && (
          <div className="px-4 py-3 border-t border-gray-200 dark:border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, processedData.length)} of {processedData.length} results
              </span>

              <select
                value={pageSize}
                onChange={e => {
                  setPageSize(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="px-3 py-1.5 text-sm border border-gray-300 dark:border-white/10 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value={5}>5 per page</option>
                <option value={10}>10 per page</option>
                <option value={25}>25 per page</option>
                <option value={50}>50 per page</option>
                <option value={100}>100 per page</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                First
              </button>
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>

              <span className="px-4 py-1.5 text-sm text-gray-600 dark:text-gray-400">
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
              <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Last
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
