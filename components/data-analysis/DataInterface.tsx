"use client";

import React, { useState, useEffect } from "react";
import { Card, CardBody } from "@heroui/card";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { Progress, Button, Spinner } from "@heroui/react";

import DataCharts from "./DataCharts";

interface DataInterfaceProps {
  uploadedFile: File | null;
  onAnalyze: (file: File) => void;
  onRemoveFile: () => void;
  className?: string;
  isExpanded?: boolean;
  onDrillDown?: (chartType: string, data: any) => void;
  isAnalyzed?: boolean;
}

export const DataInterface: React.FC<DataInterfaceProps> = ({
  uploadedFile,
  onAnalyze,
  onRemoveFile,
  className = "",
  isExpanded = false,
  onDrillDown,
  isAnalyzed = false,
}) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisComplete, setAnalysisComplete] = useState(isAnalyzed);

  useEffect(() => {
    setAnalysisComplete(isAnalyzed);
  }, [isAnalyzed]);

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
      case "xlsx":
      case "xls":
        return "material-symbols:table-chart";
      case "csv":
        return "material-symbols:csv";
      default:
        return "material-symbols:insert-drive-file-rounded";
    }
  };

  const handleAnalyze = () => {
    if (!uploadedFile) return;

    setIsAnalyzing(true);
    setAnalysisProgress(0);

    const interval = setInterval(() => {
      setAnalysisProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsAnalyzing(false);
          setAnalysisComplete(true);

          return 100;
        }

        return prev + 10;
      });
    }, 300);

    onAnalyze(uploadedFile);
  };

  if (!uploadedFile) {
    return (
      <div
        className={`h-full flex flex-col items-center justify-center text-center ${className}`}
      >
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
          className={`text-white/60 leading-tight ${isExpanded ? "text-xs sm:text-sm md:text-base max-w-2xl mx-auto" : "text-[9px] sm:text-[10px] mb-2 sm:mb-3"}`}
        >
          Drop a file here or click browse
        </p>
      </div>
    );
  }

  if ((analysisComplete || isAnalyzed) && !isAnalyzing) {
    return (
      <DataCharts
        className={className}
        fileName={uploadedFile.name}
        isExpanded={isExpanded}
        onDrillDown={onDrillDown}
        onRemoveFile={onRemoveFile}
      />
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
          className={`flex flex-col items-center justify-center text-center ${isExpanded ? "p-2 sm:p-4 md:p-6 space-y-2 sm:space-y-3 md:space-y-4" : "p-1.5 sm:p-2 space-y-1.5 sm:space-y-2"}`}
        >
          <div className="flex flex-col items-center">
            <div
              className={`rounded-lg bg-white/10 ${isExpanded ? "p-2 sm:p-3 md:p-4 mb-2 sm:mb-3 md:mb-4" : "p-1.5 sm:p-2 mb-1.5 sm:mb-2"}`}
            >
              <Icon
                className={`text-white ${isExpanded ? "w-6 h-6 sm:w-8 h-8 md:w-10 h-10 lg:w-12 h-12" : "w-4 h-4 sm:w-5 h-5 md:w-6 h-6"}`}
                icon={getFileIcon(uploadedFile.name)}
              />
            </div>

            <p
              className={`text-white font-medium leading-tight line-clamp-1 ${isExpanded ? "text-sm sm:text-base md:text-lg lg:text-xl mb-1 sm:mb-2 max-w-md" : "text-[10px] sm:text-xs mb-1"}`}
            >
              {uploadedFile.name}
            </p>

            <p
              className={`text-white/60 ${isExpanded ? "text-xs sm:text-sm md:text-base mb-1 sm:mb-2" : "text-[9px] sm:text-[10px] mb-1"}`}
            >
              {formatFileSize(uploadedFile.size)}
            </p>

            <div
              className={`flex items-center gap-1 ${isExpanded ? "mb-2 sm:mb-3 md:mb-4" : "mb-1.5 sm:mb-2"}`}
            >
              <Icon
                className={`text-green-400 ${isExpanded ? "w-4 h-4 sm:w-5 h-5" : "w-3 h-3 sm:w-4 h-4"}`}
                icon="material-symbols:check-circle-rounded"
              />
              <span
                className={`text-green-300 ${isExpanded ? "text-xs sm:text-sm" : "text-[9px] sm:text-[10px]"}`}
              >
                Ready for analysis
              </span>
            </div>
          </div>

          {isAnalyzing && (
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className={`w-full ${isExpanded ? "max-w-md" : "max-w-xs"}`}
              initial={{ opacity: 0, y: 10 }}
            >
              <div className="mb-3">
                <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                  <span
                    className={`text-white font-medium ${isExpanded ? "text-xs sm:text-sm" : "text-[10px] sm:text-xs"}`}
                  >
                    Analyzing data
                  </span>
                  <Spinner color="default" size="sm" variant="dots" />
                </div>
                <Progress
                  aria-label="Analysis progress"
                  classNames={{
                    base: "w-full",
                    track: "bg-gray-800 border border-gray-700",
                    indicator: "bg-gradient-to-r from-gray-300 to-white",
                    label: "text-white/80 text-xs",
                    value: "text-white/60 text-xs",
                  }}
                  showValueLabel={isExpanded}
                  size={isExpanded ? "md" : "sm"}
                  value={analysisProgress}
                />
              </div>
              <p
                className={`text-white/60 ${isExpanded ? "text-[10px] sm:text-xs" : "text-[9px] sm:text-[10px]"}`}
              >
                Processing spreadsheet data and generating insights
              </p>
            </motion.div>
          )}

          {!isAnalyzing && (
            <div
              className={`flex gap-2 sm:gap-3 w-full ${isExpanded ? "max-w-md mx-auto" : ""}`}
            >
              <Button
                className="flex-1 bg-transparent text-white border-white/60 data-[hover=true]:bg-white data-[hover=true]:text-black shadow-lg"
                radius="full"
                size={isExpanded ? "md" : "sm"}
                startContent={
                  <Icon
                    className={`${isExpanded ? "w-4 h-4" : "w-3 h-3"} data-[hover=true]:text-black`}
                    icon="material-symbols:analytics"
                  />
                }
                variant="bordered"
                onClick={handleAnalyze}
              >
                <span
                  className={`font-medium ${isExpanded ? "text-sm" : "text-xs"}`}
                >
                  Analyze Data
                </span>
              </Button>

              <Button
                isIconOnly
                aria-label="Remove file"
                className="bg-transparent text-red-400 border-red-400/60 data-[hover=true]:bg-red-500 data-[hover=true]:text-white data-[hover=true]:border-red-500"
                radius="full"
                size={isExpanded ? "md" : "sm"}
                variant="bordered"
                onClick={onRemoveFile}
              >
                <Icon
                  className={isExpanded ? "w-4 h-4" : "w-3 h-3"}
                  icon="material-symbols:delete-outline-rounded"
                />
              </Button>
            </div>
          )}
        </CardBody>
      </Card>
    </motion.div>
  );
};

export default DataInterface;
