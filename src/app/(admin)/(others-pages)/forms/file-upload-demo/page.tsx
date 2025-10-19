// [R7]: File Upload demo page with multiple examples
// → needs: FileUpload component, ComponentCard wrapper
// → provides: Interactive examples for file upload functionality

"use client";
import React, { useState } from "react";
import ComponentCard from "@/components/common/ComponentCard";
import PageBreadCrumb from "@/components/common/PageBreadCrumb";
import FileUpload from "@/components/ui/forms/FileUpload";

const FileUploadDemo: React.FC = () => {
  // Document upload example
  const [documentFiles, setDocumentFiles] = useState<File[]>([]);

  // Image upload example
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  // Multiple file upload example
  const [multipleFiles, setMultipleFiles] = useState<File[]>([]);

  // Limited files example
  const [limitedFiles, setLimitedFiles] = useState<File[]>([]);

  // Large file upload example
  const [largeFiles, setLargeFiles] = useState<File[]>([]);

  return (
    <>
      <PageBreadCrumb pageTitle="File Upload" />

      <div className="grid grid-cols-1 gap-6">
        {/* Document Upload */}
        <ComponentCard
          title="Document Upload"
          desc="Upload PDF, Word, and text documents with drag and drop support."
        >
          <FileUpload
            onFilesChange={setDocumentFiles}
            accept=".pdf,.doc,.docx,.txt"
            maxFiles={3}
            maxSizeMB={5}
          />
          {documentFiles.length > 0 && (
            <div className="mt-4 rounded-lg bg-blue-50 p-3 dark:bg-blue-950">
              <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                {documentFiles.length} document{documentFiles.length > 1 ? "s" : ""} ready
                for upload
              </p>
            </div>
          )}
          <div className="mt-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>Try:</strong> Drag and drop PDF, Word, or text files onto the
              upload area, or click to browse files.
            </p>
          </div>
        </ComponentCard>

        {/* Image Upload */}
        <ComponentCard
          title="Image Upload"
          desc="Upload images with preview thumbnails. Supports JPG, PNG, and GIF formats."
        >
          <FileUpload
            onFilesChange={setImageFiles}
            accept="image/*"
            maxFiles={5}
            maxSizeMB={10}
          />
          {imageFiles.length > 0 && (
            <div className="mt-4 rounded-lg bg-green-50 p-3 dark:bg-green-950">
              <p className="text-sm font-medium text-green-900 dark:text-green-100">
                {imageFiles.length} image{imageFiles.length > 1 ? "s" : ""} selected
              </p>
              <p className="mt-1 text-xs text-green-700 dark:text-green-300">
                Preview thumbnails are displayed for image files
              </p>
            </div>
          )}
          <div className="mt-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>Try:</strong> Upload images to see automatic thumbnail
              previews. Maximum 10MB per file.
            </p>
          </div>
        </ComponentCard>

        {/* Multiple File Types */}
        <ComponentCard
          title="Multiple File Types"
          desc="Accept any file type with no restrictions."
        >
          <FileUpload
            onFilesChange={setMultipleFiles}
            accept="*"
            maxFiles={10}
            maxSizeMB={20}
          />
          {multipleFiles.length > 0 && (
            <div className="mt-4 space-y-2">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                File Summary:
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="rounded bg-gray-100 p-2 dark:bg-gray-800">
                  <span className="text-gray-600 dark:text-gray-400">Total Files:</span>
                  <span className="ml-2 font-semibold text-gray-900 dark:text-white">
                    {multipleFiles.length}
                  </span>
                </div>
                <div className="rounded bg-gray-100 p-2 dark:bg-gray-800">
                  <span className="text-gray-600 dark:text-gray-400">Total Size:</span>
                  <span className="ml-2 font-semibold text-gray-900 dark:text-white">
                    {(
                      multipleFiles.reduce((sum, f) => sum + f.size, 0) /
                      1024 /
                      1024
                    ).toFixed(2)}{" "}
                    MB
                  </span>
                </div>
              </div>
            </div>
          )}
          <div className="mt-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>Try:</strong> Upload any file type. Each file has an icon
              based on its type.
            </p>
          </div>
        </ComponentCard>

        {/* Limited Files */}
        <ComponentCard
          title="Limited File Count"
          desc="Restrict the maximum number of files that can be uploaded."
        >
          <FileUpload
            onFilesChange={setLimitedFiles}
            accept="*"
            maxFiles={2}
            maxSizeMB={5}
          />
          {limitedFiles.length > 0 && (
            <div className="mt-4 rounded-lg bg-yellow-50 p-3 dark:bg-yellow-950">
              <p className="text-sm font-medium text-yellow-900 dark:text-yellow-100">
                {limitedFiles.length} of 2 files uploaded
              </p>
            </div>
          )}
          <div className="mt-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>Try:</strong> This example only allows up to 2 files. Try
              uploading more to see the validation error.
            </p>
          </div>
        </ComponentCard>

        {/* Large File Upload */}
        <ComponentCard
          title="Large File Upload"
          desc="Upload larger files with increased size limit."
        >
          <FileUpload
            onFilesChange={setLargeFiles}
            accept="*"
            maxFiles={3}
            maxSizeMB={50}
          />
          {largeFiles.length > 0 && (
            <div className="mt-4">
              <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                <h4 className="mb-2 text-sm font-semibold text-gray-900 dark:text-white">
                  Ready to Upload:
                </h4>
                <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                  {largeFiles.map((file, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="text-brand-500">•</span>
                      {file.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          <div className="mt-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>Note:</strong> Maximum file size is 50MB for this uploader.
            </p>
          </div>
        </ComponentCard>

        {/* Disabled State */}
        <ComponentCard
          title="Disabled State"
          desc="File upload component in disabled/read-only state."
        >
          <FileUpload
            onFilesChange={() => { }}
            disabled={true}
            maxFiles={5}
            maxSizeMB={10}
          />
          <div className="mt-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>Note:</strong> The file upload is disabled and cannot be
              interacted with.
            </p>
          </div>
        </ComponentCard>

        {/* Features Guide */}
        <ComponentCard
          title="Features & Usage"
          desc="Complete guide to File Upload capabilities."
        >
          <div className="space-y-4 text-sm text-gray-700 dark:text-gray-300">
            <div>
              <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">
                Upload Methods
              </h4>
              <ul className="ml-4 list-disc space-y-1">
                <li>
                  <strong>Drag & Drop:</strong> Drag files from your file explorer
                  onto the upload area
                </li>
                <li>
                  <strong>Click to Browse:</strong> Click anywhere on the upload
                  area to open file browser
                </li>
                <li>
                  <strong>Multiple Files:</strong> Select multiple files at once
                  (when enabled)
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">
                Key Features
              </h4>
              <ul className="ml-4 list-disc space-y-1">
                <li>Drag and drop file upload with visual feedback</li>
                <li>File type validation with custom accept patterns</li>
                <li>File size validation (configurable max size)</li>
                <li>Maximum file count limits</li>
                <li>Image preview thumbnails for uploaded images</li>
                <li>File type icons for non-image files</li>
                <li>Individual file removal</li>
                <li>Error message display for validation failures</li>
                <li>Full dark mode support</li>
                <li>Disabled state handling</li>
              </ul>
            </div>

            <div>
              <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">
                File Type Icons
              </h4>
              <p className="mb-2">Automatic icon display based on file type:</p>
              <ul className="ml-4 list-disc space-y-1">
                <li>🖼️ Images (JPG, PNG, GIF, etc.)</li>
                <li>🎥 Videos (MP4, AVI, MOV, etc.)</li>
                <li>🎵 Audio (MP3, WAV, etc.)</li>
                <li>📄 PDFs</li>
                <li>📦 Archives (ZIP, RAR, etc.)</li>
                <li>📝 Documents (Word, etc.)</li>
                <li>📊 Spreadsheets (Excel, etc.)</li>
                <li>📁 Other file types</li>
              </ul>
            </div>

            <div>
              <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">
                Validation Rules
              </h4>
              <ul className="ml-4 list-disc space-y-1">
                <li>
                  File size is validated against the <code>maxSizeMB</code> prop
                </li>
                <li>
                  File count is validated against the <code>maxFiles</code> prop
                </li>
                <li>
                  File type is validated against the <code>accept</code> prop
                </li>
                <li>Clear error messages are displayed for validation failures</li>
              </ul>
            </div>

            <div>
              <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">
                Common Use Cases
              </h4>
              <ul className="ml-4 list-disc space-y-1">
                <li>Document management systems</li>
                <li>Image galleries and photo uploads</li>
                <li>File attachment in forms</li>
                <li>Media upload for content creation</li>
                <li>Resume/CV uploads for job applications</li>
                <li>Batch file processing</li>
              </ul>
            </div>
          </div>
        </ComponentCard>
      </div>
    </>
  );
};

export default FileUploadDemo;
