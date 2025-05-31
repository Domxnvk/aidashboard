"use client";

import React, { useState, useEffect } from "react";

import FileUpload from "./FileUpload";
import DocumentInterface from "./DocumentInterface";

interface DocumentAIProps {
  onFileUpload?: (file: File) => void;
  className?: string;
  onSummarize?: (file: File) => void;
  uploadedFile?: File | null;
  onFileRemove?: () => void;
  isExpanded?: boolean;
}

export const DocumentAI: React.FC<DocumentAIProps> = ({
  onFileUpload,
  className = "",
  onSummarize,
  uploadedFile: externalUploadedFile,
  onFileRemove: externalOnFileRemove,
  isExpanded = false,
}) => {
  const [internalUploadedFile, setInternalUploadedFile] = useState<File | null>(
    null,
  );
  const uploadedFile = externalUploadedFile || internalUploadedFile;

  useEffect(() => {
    if (externalUploadedFile === null) {
      setInternalUploadedFile(null);
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
    }
  };

  return (
    <div className={`w-full h-full ${className}`}>
      {uploadedFile ? (
        <DocumentInterface
          isExpanded={isExpanded}
          uploadedFile={uploadedFile}
          onRemoveFile={handleFileRemove}
          onSummarize={(file) => onSummarize?.(file)}
        />
      ) : (
        <FileUpload isExpanded={isExpanded} onFileSelect={handleFileSelect} />
      )}
    </div>
  );
};

export default DocumentAI;
