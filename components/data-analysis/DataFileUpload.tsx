"use client";

import React, { useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { Spinner } from "@heroui/react";

interface DataFileUploadProps {
  onFileSelect: (file: File) => void;
  className?: string;
  isExpanded?: boolean;
}

export const DataFileUpload: React.FC<DataFileUploadProps> = ({
  onFileSelect,
  className = "",
  isExpanded = false,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const acceptedFileTypes = ".xlsx,.xls,.csv";
  const acceptedExtensions = ["xlsx", "xls", "csv"];

  const isValidFile = (file: File): boolean => {
    const extension = file.name.split(".").pop()?.toLowerCase();

    return extension ? acceptedExtensions.includes(extension) : false;
  };

  const handleFileSelect = async (file: File) => {
    if (!isValidFile(file)) {
      alert("Please upload only Excel files (.xlsx, .xls) or CSV files (.csv)");

      return;
    }

    setIsUploading(true);

    setTimeout(() => {
      setIsUploading(false);
      onFileSelect(file);
    }, 1000);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files);

    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  if (isUploading) {
    return (
      <motion.div
        animate={{ opacity: 1, scale: 1 }}
        className={`h-full flex flex-col items-center justify-center text-center ${className}`}
        initial={{ opacity: 0, scale: 0.9 }}
      >
        <div
          className={`${isExpanded ? "mb-2 sm:mb-3 md:mb-4" : "mb-1.5 sm:mb-2"}`}
        >
          <Spinner color="default" size={isExpanded ? "lg" : "md"} />
        </div>
        <h3
          className={`text-white font-semibold mb-1 sm:mb-2 ${isExpanded ? "text-sm sm:text-base md:text-lg lg:text-xl" : "text-[10px] sm:text-xs"}`}
        >
          Uploading Data...
        </h3>
        <p
          className={`text-white/60 leading-tight ${isExpanded ? "text-xs sm:text-sm md:text-base max-w-2xl mx-auto" : "text-[9px] sm:text-[10px]"}`}
        >
          Processing your file
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className={`h-full flex flex-col items-center justify-center text-center cursor-pointer transition-colors duration-200 ${
        isDragOver ? "bg-blue-500/10" : ""
      } ${className}`}
      initial={{ opacity: 0, y: 20 }}
      onClick={handleClick}
      onDragLeave={(e) => {
        e.preventDefault();
        setIsDragOver(false);
      }}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragOver(true);
      }}
      onDrop={handleDrop}
    >
      <input
        ref={fileInputRef}
        accept={acceptedFileTypes}
        className="hidden"
        type="file"
        onChange={handleFileInputChange}
      />

      <div
        className={`rounded-full bg-white/10 ${isExpanded ? "mb-2 sm:mb-3 md:mb-4 p-2 sm:p-3 md:p-4" : "mb-1.5 sm:mb-2 p-1.5 sm:p-2"}`}
      >
        <Icon
          className={`text-white/60 ${isExpanded ? "w-6 h-6 sm:w-8 h-8 md:w-10 h-10 lg:w-12 h-12" : "w-4 h-4 sm:w-5 h-5 md:w-6 h-6"}`}
          icon="material-symbols:table-chart"
        />
      </div>

      <h3
        className={`text-white font-semibold mb-1 sm:mb-2 ${isExpanded ? "text-sm sm:text-base md:text-lg lg:text-xl" : "text-[10px] sm:text-xs"}`}
      >
        Upload Data File
      </h3>

      <p
        className={`text-white/60 leading-tight ${isExpanded ? "text-xs sm:text-sm md:text-base mb-2 sm:mb-3 md:mb-4 max-w-2xl mx-auto" : "text-[9px] sm:text-[10px] mb-2 sm:mb-3"}`}
      >
        Drop an Excel or CSV file here or click to browse
      </p>

      {isExpanded && (
        <div className="flex flex-wrap gap-1 sm:gap-2 justify-center">
          <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-white/10 rounded-full text-[10px] sm:text-xs text-white/60">
            .xlsx
          </span>
          <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-white/10 rounded-full text-[10px] sm:text-xs text-white/60">
            .xls
          </span>
          <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-white/10 rounded-full text-[10px] sm:text-xs text-white/60">
            .csv
          </span>
        </div>
      )}
    </motion.div>
  );
};

export default DataFileUpload;
