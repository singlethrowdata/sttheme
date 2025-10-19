// [R7]: File Upload with Drag & Drop Component
// → needs: React hooks, file validation utilities
// → provides: file-upload capability with drag-and-drop

"use client";

import React, { useState, useRef, DragEvent, ChangeEvent } from "react";

interface FileUploadProps {
  onFilesChange: (files: File[]) => void;
  accept?: string;
  maxFiles?: number;
  maxSizeMB?: number;
  multiple?: boolean;
  disabled?: boolean;
  className?: string;
}

interface UploadedFile {
  file: File;
  id: string;
  preview?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFilesChange,
  accept = "*",
  maxFiles = 5,
  maxSizeMB = 10,
  multiple = true,
  disabled = false,
  className = "",
}) => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Format file size for display
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  // Validate file
  const validateFile = (file: File): string | null => {
    // Check file size
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      return `File size exceeds ${maxSizeMB}MB limit`;
    }

    // Check file type if specified
    if (accept !== "*") {
      const acceptedTypes = accept.split(",").map((type) => type.trim());
      const fileExtension = "." + file.name.split(".").pop()?.toLowerCase();
      const mimeType = file.type;

      const isAccepted = acceptedTypes.some(
        (type) =>
          type === mimeType ||
          type === fileExtension ||
          (type.endsWith("/*") && mimeType.startsWith(type.replace("/*", "")))
      );

      if (!isAccepted) {
        return `File type not accepted. Allowed: ${accept}`;
      }
    }

    return null;
  };

  // Process files
  const processFiles = (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    const remainingSlots = maxFiles - uploadedFiles.length;

    if (fileArray.length > remainingSlots) {
      setError(`Maximum ${maxFiles} files allowed`);
      return;
    }

    const newFiles: UploadedFile[] = [];
    let validationError = "";

    for (const file of fileArray) {
      const error = validateFile(file);
      if (error) {
        validationError = error;
        break;
      }

      const uploadedFile: UploadedFile = {
        file,
        id: `${file.name}-${Date.now()}-${Math.random()}`,
      };

      // Create preview for images
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          uploadedFile.preview = e.target?.result as string;
          setUploadedFiles((prev) => [...prev]);
        };
        reader.readAsDataURL(file);
      }

      newFiles.push(uploadedFile);
    }

    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    const updated = [...uploadedFiles, ...newFiles];
    setUploadedFiles(updated);
    onFilesChange(updated.map((f) => f.file));
  };

  // Handle file input change
  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
  };

  // Handle drag events
  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (disabled) return;

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  };

  // Remove file
  const removeFile = (id: string) => {
    const updated = uploadedFiles.filter((f) => f.id !== id);
    setUploadedFiles(updated);
    onFilesChange(updated.map((f) => f.file));
    setError("");
  };

  // Open file dialog
  const openFileDialog = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Get file icon based on type
  const getFileIcon = (file: File): string => {
    if (file.type.startsWith("image/")) return "🖼️";
    if (file.type.startsWith("video/")) return "🎥";
    if (file.type.startsWith("audio/")) return "🎵";
    if (file.type.includes("pdf")) return "📄";
    if (file.type.includes("zip") || file.type.includes("rar")) return "📦";
    if (file.type.includes("word") || file.type.includes("document")) return "📝";
    if (file.type.includes("sheet") || file.type.includes("excel")) return "📊";
    return "📁";
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Drop Zone */}
      <div
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={openFileDialog}
        className={`
          relative rounded-lg border-2 border-dashed p-8 text-center transition-all cursor-pointer
          ${isDragging
            ? "border-brand-500 bg-brand-50 dark:border-brand-600 dark:bg-brand-950"
            : "border-gray-300 bg-gray-50 hover:border-brand-400 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-brand-600"
          }
          ${disabled ? "cursor-not-allowed opacity-50" : ""}
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileInputChange}
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          className="hidden"
        />

        <div className="flex flex-col items-center gap-3">
          {/* Upload Icon */}
          <svg
            className={`h-12 w-12 ${isDragging ? "text-brand-500 dark:text-brand-600" : "text-gray-400 dark:text-gray-500"
              }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>

          {/* Text */}
          <div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
              <span className="text-brand-500 dark:text-brand-600">Click to upload</span> or drag
              and drop
            </p>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              {accept !== "*" ? `Accepted: ${accept}` : "Any file type"}
              {" • "}
              Max {maxSizeMB}MB per file
              {multiple && ` • Up to ${maxFiles} files`}
            </p>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-3 rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-950 dark:text-red-400">
          {error}
        </div>
      )}

      {/* Uploaded Files List */}
      {uploadedFiles.length > 0 && (
        <div className="mt-4 space-y-2">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Uploaded Files ({uploadedFiles.length}/{maxFiles})
          </p>
          <div className="space-y-2">
            {uploadedFiles.map((uploadedFile) => (
              <div
                key={uploadedFile.id}
                className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-3 dark:border-gray-700 dark:bg-gray-900"
              >
                {/* File Preview/Icon */}
                <div className="flex-shrink-0">
                  {uploadedFile.preview ? (
                    <img
                      src={uploadedFile.preview}
                      alt={uploadedFile.file.name}
                      className="h-10 w-10 rounded object-cover"
                    />
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded bg-gray-100 text-2xl dark:bg-gray-800">
                      {getFileIcon(uploadedFile.file)}
                    </div>
                  )}
                </div>

                {/* File Info */}
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-medium text-gray-700 dark:text-gray-300">
                    {uploadedFile.file.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {formatFileSize(uploadedFile.file.size)}
                  </p>
                </div>

                {/* Remove Button */}
                <button
                  type="button"
                  onClick={() => removeFile(uploadedFile.id)}
                  disabled={disabled}
                  className="flex-shrink-0 rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-red-500 dark:hover:bg-gray-800 dark:hover:text-red-400"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
