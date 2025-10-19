// [R11-R20]: DataTable comprehensive demo page
// → provides: Complete demonstration of all table features

"use client";

import React, { useState } from "react";
import { DataTable, Column } from "@/components/ui/tables/DataTable";

// Sample data types
interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: string;
  rating: number;
  lastUpdated: string;
}

interface Employee {
  id: number;
  name: string;
  department: string;
  position: string;
  salary: number;
  startDate: string;
  email: string;
  performance: number;
}

// Generate sample data
const generateProducts = (): Product[] => {
  const products: Product[] = [];
  const categories = ["Electronics", "Clothing", "Food", "Books", "Toys"];
  const statuses = ["Active", "Pending", "Out of Stock"];

  for (let i = 1; i <= 50; i++) {
    products.push({
      id: i,
      name: `Product ${i}`,
      category: categories[Math.floor(Math.random() * categories.length)],
      price: Math.floor(Math.random() * 500) + 10,
      stock: Math.floor(Math.random() * 100),
      status: statuses[Math.floor(Math.random() * statuses.length)],
      rating: Math.round((Math.random() * 5) * 10) / 10,
      lastUpdated: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    });
  }
  return products;
};

const generateEmployees = (): Employee[] => {
  const employees: Employee[] = [];
  const departments = ["Engineering", "Sales", "Marketing", "HR", "Finance"];
  const positions = ["Manager", "Senior", "Junior", "Lead", "Associate"];

  for (let i = 1; i <= 30; i++) {
    employees.push({
      id: i,
      name: `Employee ${i}`,
      department: departments[Math.floor(Math.random() * departments.length)],
      position: positions[Math.floor(Math.random() * positions.length)],
      salary: Math.floor(Math.random() * 100000) + 40000,
      startDate: new Date(Date.now() - Math.random() * 365 * 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      email: `employee${i}@company.com`,
      performance: Math.round((Math.random() * 5) * 10) / 10
    });
  }
  return employees;
};

export default function DataTableDemo() {
  const [products] = useState<Product[]>(generateProducts());
  const [employees, setEmployees] = useState<Employee[]>(generateEmployees());
  const [selectedProducts, setSelectedProducts] = useState<Set<number>>(new Set());

  // Product columns with all features
  const productColumns: Column<Product>[] = [
    {
      id: "id",
      header: "ID",
      accessor: "id",
      sortable: true,
      width: 80,
      group: "Basic Info"
    },
    {
      id: "name",
      header: "Product Name",
      accessor: "name",
      sortable: true,
      filterable: true,
      editable: true,
      width: 200,
      group: "Basic Info"
    },
    {
      id: "category",
      header: "Category",
      accessor: "category",
      sortable: true,
      filterable: true,
      width: 150,
      group: "Basic Info"
    },
    {
      id: "price",
      header: "Price",
      accessor: "price",
      sortable: true,
      filterable: true,
      editable: true,
      width: 120,
      render: (value) => `$${value.toFixed(2)}`,
      group: "Financial"
    },
    {
      id: "stock",
      header: "Stock",
      accessor: "stock",
      sortable: true,
      filterable: true,
      editable: true,
      width: 100,
      render: (value) => (
        <span className={value < 20 ? "text-red-600 font-semibold" : "text-gray-900 dark:text-white"}>
          {value}
        </span>
      ),
      group: "Inventory"
    },
    {
      id: "status",
      header: "Status",
      accessor: "status",
      sortable: true,
      filterable: true,
      width: 130,
      render: (value) => (
        <span className={`
          px-2 py-1 text-xs rounded-full
          ${value === "Active" ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" : ""}
          ${value === "Pending" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300" : ""}
          ${value === "Out of Stock" ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300" : ""}
        `}>
          {value}
        </span>
      ),
      group: "Inventory"
    },
    {
      id: "rating",
      header: "Rating",
      accessor: "rating",
      sortable: true,
      width: 120,
      render: (value) => (
        <div className="flex items-center gap-1">
          <span className="text-yellow-500">★</span>
          <span>{value.toFixed(1)}</span>
        </div>
      ),
      group: "Metrics"
    },
    {
      id: "lastUpdated",
      header: "Last Updated",
      accessor: "lastUpdated",
      sortable: true,
      width: 140,
      group: "Metrics"
    }
  ];

  // Employee columns for inline editing demo
  const employeeColumns: Column<Employee>[] = [
    {
      id: "id",
      header: "ID",
      accessor: "id",
      width: 80
    },
    {
      id: "name",
      header: "Name",
      accessor: "name",
      sortable: true,
      filterable: true,
      editable: true,
      width: 180
    },
    {
      id: "department",
      header: "Department",
      accessor: "department",
      sortable: true,
      filterable: true,
      editable: true,
      width: 150
    },
    {
      id: "position",
      header: "Position",
      accessor: "position",
      sortable: true,
      filterable: true,
      editable: true,
      width: 140
    },
    {
      id: "salary",
      header: "Salary",
      accessor: "salary",
      sortable: true,
      editable: true,
      width: 130,
      render: (value) => `$${value.toLocaleString()}`
    },
    {
      id: "email",
      header: "Email",
      accessor: "email",
      editable: true,
      width: 220
    },
    {
      id: "performance",
      header: "Performance",
      accessor: "performance",
      sortable: true,
      width: 130,
      render: (value) => (
        <div className="flex items-center gap-2">
          <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-brand-500"
              style={{ width: `${(value / 5) * 100}%` }}
            />
          </div>
          <span className="text-xs">{value}/5</span>
        </div>
      )
    }
  ];

  const handleCellEdit = (rowIndex: number, columnId: string, value: any) => {
    const updatedEmployees = [...employees];
    updatedEmployees[rowIndex] = {
      ...updatedEmployees[rowIndex],
      [columnId]: value
    };
    setEmployees(updatedEmployees);
  };

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Advanced DataTable
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Enterprise-grade table component with all 10 advanced features: sorting, filtering, selection, pagination, resizing, expandable rows, inline editing, export, column groups, and virtual scrolling.
        </p>
      </div>

      {/* Example 1: Full-Featured Product Table */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
            1. Full-Featured Product Catalog
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            [R11-R20] All features enabled: Multi-column sorting, inline filters, row selection, pagination, column resizing, expandable rows, export, column groups, sticky headers
          </p>
        </div>

        <DataTable
          data={products}
          columns={productColumns}
          sortable={true}
          multiSort={true}
          filterable={true}
          selectable={true}
          selectedRows={selectedProducts}
          onSelectionChange={setSelectedProducts}
          pagination={true}
          pageSize={10}
          resizable={true}
          expandable={true}
          renderExpandedRow={(row: Product) => (
            <div className="p-4 bg-gray-50 dark:bg-white/[0.02] rounded-lg">
              <h4 className="font-semibold mb-2">Product Details</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Product ID:</span>
                  <span className="ml-2 font-medium">{row.id}</span>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Category:</span>
                  <span className="ml-2 font-medium">{row.category}</span>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Stock Level:</span>
                  <span className="ml-2 font-medium">{row.stock} units</span>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Last Updated:</span>
                  <span className="ml-2 font-medium">{row.lastUpdated}</span>
                </div>
              </div>
            </div>
          )}
          exportable={true}
          exportFormats={["csv", "excel", "pdf"]}
          exportFileName="product-catalog"
          stickyHeader={true}
          columnGroups={[
            { name: "Basic Info", columns: ["id", "name", "category"] },
            { name: "Financial", columns: ["price"] },
            { name: "Inventory", columns: ["stock", "status"] },
            { name: "Metrics", columns: ["rating", "lastUpdated"] }
          ]}
          striped={true}
          hoverable={true}
        />
      </section>

      {/* Example 2: Inline Editing */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
            2. Employee Directory with Inline Editing
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            [R17] Double-click any cell to edit inline. Press Enter to save, Escape to cancel.
          </p>
        </div>

        <DataTable
          data={employees}
          columns={employeeColumns}
          sortable={true}
          filterable={true}
          pagination={true}
          pageSize={8}
          editable={true}
          onCellEdit={handleCellEdit}
          stickyHeader={true}
          striped={true}
        />
      </section>

      {/* Example 3: Virtual Scrolling for Large Datasets */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
            3. Virtual Scrolling Performance
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            [R20] Virtual scrolling enabled for optimal performance with large datasets (50+ rows)
          </p>
        </div>

        <DataTable
          data={products}
          columns={productColumns.slice(0, 5)}
          sortable={true}
          filterable={true}
          pagination={false}
          virtual={true}
          rowHeight={48}
          stickyHeader={true}
        />
      </section>

      {/* Example 4: Export Functionality */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
            4. Data Export Options
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            [R18] Export table data to CSV, Excel, or PDF formats
          </p>
        </div>

        <DataTable
          data={products.slice(0, 15)}
          columns={productColumns.slice(0, 6)}
          sortable={true}
          pagination={false}
          exportable={true}
          exportFormats={["csv", "excel", "pdf"]}
          exportFileName="product-export"
        />
      </section>

      {/* Example 5: Column Resizing & Sticky Headers */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
            5. Column Resizing & Fixed Headers
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            [R15][R19] Drag column borders to resize. Headers remain fixed while scrolling.
          </p>
        </div>

        <DataTable
          data={employees.slice(0, 20)}
          columns={employeeColumns}
          resizable={true}
          stickyHeader={true}
          pagination={false}
          striped={true}
        />
      </section>

      {/* Example 6: Features Guide */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
            6. Features Guide
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Sorting */}
          <div className="p-6 bg-white dark:bg-white/[0.03] rounded-xl border border-gray-200 dark:border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-brand-100 dark:bg-brand-900/30 rounded-lg flex items-center justify-center">
                <span className="text-brand-600 dark:text-brand-400 text-xl">↕</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">[R11] Advanced Sorting</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">Multi-column with direction</p>
              </div>
            </div>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>• Click column header to sort</li>
              <li>• Click again to reverse direction</li>
              <li>• Multi-column sorting (Shift+Click)</li>
              <li>• Sort order indicators</li>
            </ul>
          </div>

          {/* Filtering */}
          <div className="p-6 bg-white dark:bg-white/[0.03] rounded-xl border border-gray-200 dark:border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-brand-100 dark:bg-brand-900/30 rounded-lg flex items-center justify-center">
                <span className="text-brand-600 dark:text-brand-400 text-xl">🔍</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">[R12] Column Filtering</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">Inline filter dropdowns</p>
              </div>
            </div>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>• Filter icon in each column header</li>
              <li>• Real-time filtering as you type</li>
              <li>• Multiple column filters combine</li>
              <li>• Active filter indicators</li>
            </ul>
          </div>

          {/* Selection */}
          <div className="p-6 bg-white dark:bg-white/[0.03] rounded-xl border border-gray-200 dark:border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-brand-100 dark:bg-brand-900/30 rounded-lg flex items-center justify-center">
                <span className="text-brand-600 dark:text-brand-400 text-xl">☑</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">[R13] Row Selection</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">Checkbox, click, range</p>
              </div>
            </div>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>• Click checkbox to select row</li>
              <li>• Select all with header checkbox</li>
              <li>• Shift+Click for range selection</li>
              <li>• Selection count displayed</li>
            </ul>
          </div>

          {/* Pagination */}
          <div className="p-6 bg-white dark:bg-white/[0.03] rounded-xl border border-gray-200 dark:border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-brand-100 dark:bg-brand-900/30 rounded-lg flex items-center justify-center">
                <span className="text-brand-600 dark:text-brand-400 text-xl">📄</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">[R14] Pagination</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">Page size, navigation, info</p>
              </div>
            </div>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>• Configurable page sizes (5-100)</li>
              <li>• First/Previous/Next/Last controls</li>
              <li>• Current page and total info</li>
              <li>• Record range display</li>
            </ul>
          </div>

          {/* Resizing */}
          <div className="p-6 bg-white dark:bg-white/[0.03] rounded-xl border border-gray-200 dark:border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-brand-100 dark:bg-brand-900/30 rounded-lg flex items-center justify-center">
                <span className="text-brand-600 dark:text-brand-400 text-xl">↔</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">[R15] Column Resizing</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">Drag handles, live preview</p>
              </div>
            </div>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>• Hover column border for resize cursor</li>
              <li>• Drag to adjust column width</li>
              <li>• Live preview while resizing</li>
              <li>• Minimum width constraints</li>
            </ul>
          </div>

          {/* Expandable */}
          <div className="p-6 bg-white dark:bg-white/[0.03] rounded-xl border border-gray-200 dark:border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-brand-100 dark:bg-brand-900/30 rounded-lg flex items-center justify-center">
                <span className="text-brand-600 dark:text-brand-400 text-xl">▶</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">[R16] Expandable Rows</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">Toggle expand, nested content</p>
              </div>
            </div>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>• Click arrow to expand row</li>
              <li>• Show additional details</li>
              <li>• Custom expanded content</li>
              <li>• Smooth expand/collapse animation</li>
            </ul>
          </div>

          {/* Inline Editing */}
          <div className="p-6 bg-white dark:bg-white/[0.03] rounded-xl border border-gray-200 dark:border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-brand-100 dark:bg-brand-900/30 rounded-lg flex items-center justify-center">
                <span className="text-brand-600 dark:text-brand-400 text-xl">✏</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">[R17] Inline Editing</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">Cell editing, save/cancel</p>
              </div>
            </div>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>• Double-click cell to edit</li>
              <li>• Enter to save, Escape to cancel</li>
              <li>• Visual save/cancel buttons</li>
              <li>• Editable column configuration</li>
            </ul>
          </div>

          {/* Export */}
          <div className="p-6 bg-white dark:bg-white/[0.03] rounded-xl border border-gray-200 dark:border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-brand-100 dark:bg-brand-900/30 rounded-lg flex items-center justify-center">
                <span className="text-brand-600 dark:text-brand-400 text-xl">📥</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">[R18] Export</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">CSV, Excel, PDF</p>
              </div>
            </div>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>• Export to CSV format</li>
              <li>• Export to Excel (TSV)</li>
              <li>• Export to PDF (print)</li>
              <li>• Custom file naming</li>
            </ul>
          </div>

          {/* Column Groups */}
          <div className="p-6 bg-white dark:bg-white/[0.03] rounded-xl border border-gray-200 dark:border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-brand-100 dark:bg-brand-900/30 rounded-lg flex items-center justify-center">
                <span className="text-brand-600 dark:text-brand-400 text-xl">📊</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">[R19] Column Groups</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">Fixed headers, grouped columns</p>
              </div>
            </div>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>• Group related columns together</li>
              <li>• Sticky header rows</li>
              <li>• Visual column grouping</li>
              <li>• Scrollable with fixed headers</li>
            </ul>
          </div>

          {/* Virtual Scrolling */}
          <div className="p-6 bg-white dark:bg-white/[0.03] rounded-xl border border-gray-200 dark:border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-brand-100 dark:bg-brand-900/30 rounded-lg flex items-center justify-center">
                <span className="text-brand-600 dark:text-brand-400 text-xl">⚡</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">[R20] Virtual Scrolling</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">Performance for large datasets</p>
              </div>
            </div>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>• Renders only visible rows</li>
              <li>• Smooth scrolling performance</li>
              <li>• Handles 1000+ rows efficiently</li>
              <li>• Configurable row height</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
