"use client";

import React from "react";
import { Button } from "@heroui/button";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

interface FileDisplayProps {
  file: File;
  onRemove: () => void;
  className?: string;
}

export const FileDisplay: React.FC<FileDisplayProps> = ({
  file,
  onRemove,
  className = "",
}) => {
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

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className={`${className} h-full flex items-center justify-center`}
      exit={{ opacity: 0, y: -10 }}
      initial={{ opacity: 0, y: -10 }}
    >
      <div className="w-full p-2 lg:p-3">
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="flex-shrink-0 p-1.5 sm:p-2 rounded-lg bg-white/10">
            <Icon
              className="text-white w-5 h-5 sm:w-6 sm:h-6"
              icon={getFileIcon(file.name)}
            />
          </div>

          <div className="w-full">
            <p className="text-white font-medium text-[11px] sm:text-xs truncate">
              {file.name}
            </p>
            <p className="text-white/60 text-[10px] sm:text-[11px]">
              {formatFileSize(file.size)}
            </p>
          </div>

          <div className="flex items-center gap-1">
            <Icon
              className="text-green-400 w-3 h-3 sm:w-3.5 sm:h-3.5"
              icon="material-symbols:check-circle-rounded"
            />
            <span className="text-green-300 text-[10px] sm:text-[11px]">Ready</span>
          </div>

          <Button
            className="bg-white/10 hover:bg-white/20 text-white/70 hover:text-white text-[10px] sm:text-[11px] h-6 sm:h-7"
            size="sm"
            onPress={onRemove}
          >
            Remove File
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default FileDisplay;
