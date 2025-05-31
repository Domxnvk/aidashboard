"use client";

import React, { useCallback, useState } from "react";
import { Button } from "@heroui/button";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  acceptedTypes?: string[];
  maxSizeInMB?: number;
  className?: string;
  isExpanded?: boolean;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  acceptedTypes = [".pdf", ".doc", ".docx", ".txt", ".md"],
  maxSizeInMB = 10,
  className = "",
  isExpanded = false,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateFile = (file: File): string | null => {
    const fileSizeInMB = file.size / (1024 * 1024);

    if (fileSizeInMB > maxSizeInMB) {
      return `File size must be less than ${maxSizeInMB}MB`;
    }

    const fileExtension = "." + file.name.split(".").pop()?.toLowerCase();

    if (!acceptedTypes.includes(fileExtension)) {
      return `File type not supported. Accepted types: ${acceptedTypes.join(", ")}`;
    }

    return null;
  };

  const handleFileProcessing = useCallback(
    async (file: File) => {
      setError(null);
      setIsUploading(true);

      const validationError = validateFile(file);

      if (validationError) {
        setError(validationError);
        setIsUploading(false);

        return;
      }

      try {
        await new Promise((resolve) => setTimeout(resolve, 500));
        onFileSelect(file);
      } catch (err) {
        setError("Failed to process file");
      } finally {
        setIsUploading(false);
      }
    },
    [onFileSelect, maxSizeInMB, acceptedTypes],
  );

  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    const file = event.target.files?.[0];

    if (file) {
      handleFileProcessing(file);
    }
  };

  const handleDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      event.stopPropagation();
      setIsDragOver(false);

      const file = event.dataTransfer.files[0];

      if (file) {
        handleFileProcessing(file);
      }
    },
    [handleFileProcessing],
  );

  const handleDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragOver(false);
  }, []);

  return (
    <div
      className={`
        transition-all duration-300 relative overflow-hidden h-full
        ${isDragOver ? "bg-blue-400/10" : ""}
        ${className}
      `}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="p-2 lg:p-3 flex flex-col items-center justify-center text-center h-full">
        <AnimatePresence mode="wait">
          {isUploading ? (
            <motion.div
              key="uploading"
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center"
              exit={{ opacity: 0, scale: 0.8 }}
              initial={{ opacity: 0, scale: 0.8 }}
            >
              <div className="mb-2 p-2 lg:p-3 rounded-full bg-blue-400/20">
                <Icon
                  className="text-blue-400 w-6 h-6 lg:w-7 lg:h-7 animate-pulse"
                  icon="material-symbols:upload-file-rounded"
                />
              </div>
              <p className="text-white/80 text-xs lg:text-sm">Processing...</p>
            </motion.div>
          ) : (
            <motion.div
              key="upload"
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center w-full"
              exit={{ opacity: 0, scale: 0.8 }}
              initial={{ opacity: 0, scale: 0.8 }}
            >
              <div className="mb-2 sm:mb-3 p-2 sm:p-2.5 lg:p-3 rounded-full bg-white/10">
                <Icon
                  className={`w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 transition-colors ${
                    isDragOver ? "text-blue-400" : "text-white/60"
                  }`}
                  icon="material-symbols:upload-file-rounded"
                />
              </div>

              <h3 className="text-white font-semibold text-xs sm:text-sm lg:text-base mb-1 sm:mb-2">
                Upload Document
              </h3>

              <p className="text-white/60 text-[11px] sm:text-xs lg:text-sm mb-2 sm:mb-3 max-w-xs leading-tight">
                Drag & drop or click to browse
              </p>

              <input
                accept={acceptedTypes.join(",")}
                className="hidden"
                id="file-upload"
                type="file"
                onChange={handleFileInput}
                onClick={(e) => e.stopPropagation()}
              />

              <Button
                as="label"
                className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20"
                htmlFor="file-upload"
                radius="full"
                size="sm"
                startContent={
                  <Icon
                    icon="material-symbols:folder-open-rounded"
                    width="16"
                  />
                }
                onClick={(e) => e.stopPropagation()}
              >
                Browse
              </Button>

              <div className="mt-2 text-[9px] sm:text-[10px] lg:text-xs text-white/40 space-y-0.5 text-center">
                <p>
                  {acceptedTypes.join(", ")} • {maxSizeInMB}MB max
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {error && (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 p-2 bg-red-500/20 border border-red-500/30 rounded-lg"
            initial={{ opacity: 0, y: 10 }}
          >
            <div className="flex items-center gap-1.5">
              <Icon
                className="text-red-400 w-3 h-3"
                icon="material-symbols:error-rounded"
              />
              <p className="text-red-300 text-xs">{error}</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
