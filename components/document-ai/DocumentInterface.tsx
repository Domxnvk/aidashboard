"use client";

import React from "react";
import { Card, CardBody, CardFooter } from "@heroui/card";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

interface DocumentInterfaceProps {
  uploadedFile: File | null;
  onSummarize: (file: File) => void;
  onRemoveFile: () => void;
  className?: string;
  isExpanded?: boolean;
}

export const DocumentInterface: React.FC<DocumentInterfaceProps> = ({
  uploadedFile,
  onSummarize,
  onRemoveFile,
  className = "",
  isExpanded = false,
}) => {
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getFileIcon = (fileName: string): string => {
    const extension = fileName.split(".").pop()?.toLowerCase();

    switch (extension) {
      case "pdf":
        return "material-symbols:picture-as-pdf-rounded";
      case "doc":
      case "docx":
        return "material-symbols:description-rounded";
      case "txt":
        return "material-symbols:text-snippet-rounded";
      case "md":
        return "material-symbols:markdown";
      default:
        return "material-symbols:insert-drive-file-rounded";
    }
  };

  if (!uploadedFile) {
    return (
      <div
        className={`h-full flex flex-col items-center justify-center text-center ${className}`}
      >
        <div
          className={`rounded-full bg-white/10 ${isExpanded ? "mb-3 sm:mb-4 p-3 sm:p-4" : "mb-2 p-2"}`}
        >
          <Icon
            className={`text-white/60 ${isExpanded ? "w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12" : "w-5 h-5 sm:w-6 sm:h-6"}`}
            icon="material-symbols:upload-file-rounded"
          />
        </div>
        <h3
          className={`text-white font-semibold mb-2 ${isExpanded ? "text-base sm:text-lg md:text-xl lg:text-2xl" : "text-xs sm:text-sm"}`}
        >
          Upload Document
        </h3>
        <p
          className={`text-white/60 leading-tight ${isExpanded ? "text-xs sm:text-sm md:text-base max-w-2xl mx-auto" : "text-[10px] sm:text-xs mb-3"}`}
        >
          Drop a file here or click browse
        </p>
      </div>
    );
  }

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className={`${className} h-full flex items-center justify-center p-1`}
      exit={{ opacity: 0, y: -10 }}
      initial={{ opacity: 0, y: -10 }}
    >
      <Card className="w-full h-full bg-transparent border-none shadow-none">
        <CardBody
          className={`flex flex-col items-center justify-center text-center ${isExpanded ? "p-6 space-y-4" : "p-2 space-y-2"}`}
        >
          <div className="flex flex-col items-center">
            <div
              className={`rounded-lg bg-white/10 ${isExpanded ? "p-3 sm:p-4 mb-3 sm:mb-4" : "p-2 mb-2"}`}
            >
              <Icon
                className={`text-white ${isExpanded ? "w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12" : "w-5 h-5 sm:w-6 sm:h-6"}`}
                icon={getFileIcon(uploadedFile.name)}
              />
            </div>

            <p
              className={`text-white font-medium leading-tight line-clamp-1 ${isExpanded ? "text-sm sm:text-base md:text-lg lg:text-xl mb-2 max-w-md" : "text-[11px] sm:text-xs mb-1"}`}
            >
              {uploadedFile.name}
            </p>

            <p
              className={`text-white/60 ${isExpanded ? "text-xs sm:text-sm md:text-base mb-2" : "text-[10px] sm:text-[11px] mb-1"}`}
            >
              {formatFileSize(uploadedFile.size)}
            </p>

            <div
              className={`flex items-center gap-1 ${isExpanded ? "mb-4" : "mb-2"}`}
            >
              <Icon
                className={`text-green-400 ${isExpanded ? "w-4 h-4 sm:w-5 sm:h-5" : "w-3 h-3 sm:w-4 sm:h-4"}`}
                icon="material-symbols:check-circle-rounded"
              />
              <span
                className={`text-green-300 ${isExpanded ? "text-xs sm:text-sm" : "text-[10px] sm:text-[11px]"}`}
              >
                Ready for analysis
              </span>
            </div>
          </div>

          <div
            className={`flex gap-3 w-full ${isExpanded ? "max-w-md mx-auto" : ""}`}
          >
            <button
              className={`flex-1 rounded-full px-3 sm:px-4 py-2 flex items-center justify-center gap-1.5 sm:gap-2 border-2 border-white/60 shadow-lg hover:border-white/80 hover:bg-white/10 transition-all duration-200 ${
                isExpanded
                  ? "text-xs sm:text-sm h-10 sm:h-12 min-h-[40px] sm:min-h-[48px]"
                  : "text-[10px] sm:text-[11px] h-8 sm:h-10 min-h-[32px] sm:min-h-[40px]"
              }`}
              onClick={(e) => {
                e.stopPropagation();
                onSummarize(uploadedFile);
              }}
            >
              <Icon
                className={`text-white drop-shadow-lg ${isExpanded ? "w-4 h-4 sm:w-5 sm:h-5" : "w-3.5 h-3.5 sm:w-4 sm:h-4"}`}
                icon="material-symbols:summarize-rounded"
              />
              <span className="text-white font-medium drop-shadow-lg">
                <span className="hidden sm:inline">Summarize Document</span>
                <span className="sm:hidden">Summarize</span>
              </span>
            </button>

            <button
              className={`rounded-full p-2 sm:p-3 border-2 border-red-400/60 shadow-lg hover:border-red-400/80 hover:bg-red-500/10 transition-all duration-200 ${
                isExpanded ? "h-10 sm:h-12 min-h-[40px] sm:min-h-[48px]" : "h-8 sm:h-10 min-h-[32px] sm:min-h-[40px]"
              }`}
              onClick={(e) => {
                e.stopPropagation();
                onRemoveFile();
              }}
            >
              <Icon
                className={`text-red-400 drop-shadow-lg ${isExpanded ? "w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" : "w-3.5 h-3.5 sm:w-4 sm:h-4"}`}
                icon="material-symbols:delete-outline-rounded"
              />
            </button>
          </div>
        </CardBody>

        <CardFooter
          className={`bg-transparent border-t border-white/20 ${isExpanded ? "px-4 py-3" : "px-2 py-1"}`}
        >
          <div className="flex items-center gap-2 w-full justify-center">
            <Icon
              className={`text-white/60 ${isExpanded ? "w-5 h-5" : "w-4 h-4"}`}
              icon="material-symbols:chat-rounded"
            />
            <p
              className={`text-white leading-tight ${isExpanded ? "text-sm" : "text-[10px]"}`}
            >
              Ask specific questions using the chat below
            </p>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default DocumentInterface;
