"use client";

import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Icon } from "@iconify/react";

interface DocumentSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  fileName: string;
  summary?: string;
}

const EXAMPLE_SUMMARY = `**Document Summary: Marketing Strategy Report**

**Key Findings:**
• The document outlines a comprehensive digital marketing strategy for Q1 2024
• Target audience analysis reveals 18-35 demographic as primary focus
• Budget allocation: 40% social media, 30% content marketing, 20% paid ads, 10% email campaigns

**Main Objectives:**
1. Increase brand awareness by 25% within 3 months
2. Generate 150+ qualified leads per month
3. Improve customer engagement rates by 15%

**Recommended Actions:**
- Launch Instagram and TikTok campaigns targeting younger demographics
- Develop weekly blog content focusing on industry trends
- Implement automated email nurture sequences
- A/B test landing page designs for better conversion

**Budget Summary:** $45,000 total quarterly budget with ROI projections of 3.2x by end of Q1.

**Timeline:** Implementation starts January 15th, with monthly reviews scheduled for optimization.`;

export const DocumentSummaryModal: React.FC<DocumentSummaryModalProps> = ({
  isOpen,
  onClose,
  fileName,
  summary = EXAMPLE_SUMMARY,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([summary], { type: "text/plain" });

    element.href = URL.createObjectURL(file);
    element.download = `${fileName.split(".")[0]}_summary.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <Modal
      backdrop="blur"
      classNames={{
        backdrop: "bg-black/50 backdrop-blur-sm",
        base: "border border-white/20 bg-black/40 backdrop-blur-md",
        header: "border-b border-white/10 bg-white/5",
        body: "py-6",
        footer: "border-t border-white/10 bg-white/5",
      }}
      isOpen={isOpen}
      size="lg"
      onClose={onClose}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <div className="p-1.5 sm:p-2 rounded-full bg-white/10">
              <Icon
                className="text-white w-4 h-4 sm:w-5 sm:h-5"
                icon="material-symbols:summarize-rounded"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-semibold text-base sm:text-lg">
                Document Summary
              </h3>
              <p className="text-white/60 text-xs sm:text-sm truncate">{fileName}</p>
            </div>
          </div>
        </ModalHeader>

        <ModalBody>
          <div className="space-y-4">
            <div className="bg-white/5 border border-white/10 rounded-lg p-3 sm:p-4 max-h-64 sm:max-h-80 lg:max-h-96 overflow-y-auto">
              <div className="prose prose-invert prose-xs sm:prose-sm max-w-none">
                {summary.split("\n").map((line, index) => {
                  if (line.startsWith("**") && line.endsWith("**")) {
                    return (
                      <h4
                        key={index}
                        className="text-white font-semibold text-sm sm:text-base mb-1.5 sm:mb-2 mt-3 sm:mt-4 first:mt-0"
                      >
                        {line.replace(/\*\*/g, "")}
                      </h4>
                    );
                  } else if (line.startsWith("•") || line.startsWith("-")) {
                    return (
                      <p
                        key={index}
                        className="text-white/80 text-xs sm:text-sm mb-1 ml-3 sm:ml-4"
                      >
                        {line}
                      </p>
                    );
                  } else if (line.match(/^\d+\./)) {
                    return (
                      <p
                        key={index}
                        className="text-white/80 text-xs sm:text-sm mb-1 ml-3 sm:ml-4"
                      >
                        {line}
                      </p>
                    );
                  } else if (line.trim() === "") {
                    return <div key={index} className="h-2" />;
                  } else {
                    return (
                      <p key={index} className="text-white/70 text-xs sm:text-sm mb-1.5 sm:mb-2">
                        {line}
                      </p>
                    );
                  }
                })}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                className={`rounded-full px-3 sm:px-4 py-1.5 sm:py-2 flex items-center gap-1.5 sm:gap-2 border-2 shadow-lg transition-all duration-200 ${
                  copied
                    ? "border-green-400/60 bg-green-500/20 hover:border-green-400/80 hover:bg-green-500/30"
                    : "border-white/60 hover:border-white/80 hover:bg-white/10"
                }`}
                onClick={handleCopy}
              >
                <Icon
                  className={`drop-shadow-lg w-3.5 h-3.5 sm:w-4 sm:h-4 ${copied ? "text-green-400" : "text-white"}`}
                  icon={
                    copied
                      ? "material-symbols:check-rounded"
                      : "material-symbols:content-copy-rounded"
                  }
                />
                <span
                  className={`text-xs sm:text-sm font-medium drop-shadow-lg ${copied ? "text-green-400" : "text-white"}`}
                >
                  {copied ? "Copied!" : "Copy"}
                  <span className="hidden sm:inline">{copied ? "" : " Summary"}</span>
                </span>
              </button>

              <button
                className="rounded-full px-3 sm:px-4 py-1.5 sm:py-2 flex items-center gap-1.5 sm:gap-2 border-2 border-white/60 shadow-lg hover:border-white/80 hover:bg-white/10 transition-all duration-200"
                onClick={handleDownload}
              >
                <Icon
                  className="text-white drop-shadow-lg w-3.5 h-3.5 sm:w-4 sm:h-4"
                  icon="material-symbols:download-rounded"
                />
                <span className="text-white text-xs sm:text-sm font-medium drop-shadow-lg">
                  Download
                </span>
              </button>
            </div>
          </div>
        </ModalBody>

        <ModalFooter className="gap-3">
          <button
            className="rounded-full px-3 sm:px-4 py-1.5 sm:py-2 flex items-center gap-1.5 sm:gap-2 border-2 border-red-400/60 shadow-lg hover:border-red-400/80 hover:bg-red-500/10 transition-all duration-200"
            onClick={onClose}
          >
            <span className="text-red-400 text-xs sm:text-sm font-medium drop-shadow-lg">
              Close
            </span>
          </button>
          <button
            className="rounded-full px-3 sm:px-4 py-1.5 sm:py-2 flex items-center gap-1.5 sm:gap-2 border-2 border-green-400/60 shadow-lg hover:border-green-400/80 hover:bg-green-500/10 transition-all duration-200"
            onClick={onClose}
          >
            <Icon
              className="text-green-400 drop-shadow-lg w-3.5 h-3.5 sm:w-4 sm:h-4"
              icon="material-symbols:chat-rounded"
            />
            <span className="text-green-400 text-xs sm:text-sm font-medium drop-shadow-lg">
              <span className="hidden sm:inline">Continue </span>Analysis
            </span>
          </button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DocumentSummaryModal;
