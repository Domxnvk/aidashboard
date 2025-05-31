"use client";

import React, { useState, useEffect } from "react";

import DataFileUpload from "./DataFileUpload";
import DataInterface from "./DataInterface";

interface DataAnalysisProps {
  onFileUpload?: (file: File) => void;
  className?: string;
  onAnalyze?: (file: File) => void;
  uploadedFile?: File | null;
  onFileRemove?: () => void;
  isExpanded?: boolean;
  onDrillDown?: (chartType: string, data: any) => void;
  isAnalyzed?: boolean;
}

export const DataAnalysis: React.FC<DataAnalysisProps> = ({
  onFileUpload,
  className = "",
  onAnalyze,
  uploadedFile: externalUploadedFile,
  onFileRemove: externalOnFileRemove,
  isExpanded = false,
  onDrillDown,
  isAnalyzed = false,
}) => {
  const [internalUploadedFile, setInternalUploadedFile] = useState<File | null>(
    null,
  );
  const [internalIsAnalyzed, setInternalIsAnalyzed] = useState(false);
  const uploadedFile = externalUploadedFile || internalUploadedFile;
  const isFileAnalyzed = isAnalyzed || internalIsAnalyzed;

  useEffect(() => {
    if (externalUploadedFile === null) {
      setInternalUploadedFile(null);
      setInternalIsAnalyzed(false);
    }
  }, [externalUploadedFile]);

  const handleFileSelect = (file: File) => {
    if (!externalUploadedFile) {
      setInternalUploadedFile(file);
    }
    onFileUpload?.(file);
  };

  const handleFileRemove = () => {
    if (externalUploadedFile && externalOnFileRemove) {
      externalOnFileRemove();
    } else {
      setInternalUploadedFile(null);
      setInternalIsAnalyzed(false);
    }
  };

  return (
    <div className={`w-full h-full ${className}`}>
      {uploadedFile ? (
        <DataInterface
          isAnalyzed={isFileAnalyzed}
          isExpanded={isExpanded}
          uploadedFile={uploadedFile}
          onAnalyze={(file) => {
            setInternalIsAnalyzed(true);
            onAnalyze?.(file);
          }}
          onDrillDown={onDrillDown}
          onRemoveFile={handleFileRemove}
        />
      ) : (
        <DataFileUpload
          isExpanded={isExpanded}
          onFileSelect={handleFileSelect}
        />
      )}
    </div>
  );
};

export default DataAnalysis;
