"use client";

import React from "react";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";

interface ImagePromptInputProps {
  onExampleClick?: (prompt: string) => void;
  isGenerating?: boolean;
  className?: string;
  selectedCount?: number;
  isExpanded?: boolean;
  currentPrompt?: string;
}

const allPromptExamples = [
  "A majestic mountain landscape at sunset",
  "Futuristic city with flying cars",
  "Cozy coffee shop in autumn",
  "Abstract geometric art in blue tones",
  "Cute robot reading a book",
  "Magical forest with glowing mushrooms",
  "Underwater palace with coral gardens",
  "Steampunk airship in cloudy sky",
  "Neon cyberpunk street at night",
  "Enchanted library with floating books",
  "Desert oasis with crystal formations",
  "Space station orbiting Earth",
];

export const ImagePromptInput: React.FC<ImagePromptInputProps> = ({
  onExampleClick,
  isGenerating = false,
  className = "",
  selectedCount = 0,
  isExpanded = false,
  currentPrompt = "",
}) => {
  const [isDownloading, setIsDownloading] = React.useState(false);
  const [showDownloadButton, setShowDownloadButton] = React.useState(false);

  const showImageResult = currentPrompt.trim() !== "";

  const handleDownload = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
    }, 2000);
  };

  React.useEffect(() => {
    if (showImageResult && !isGenerating) {
      const timer = setTimeout(() => {
        setShowDownloadButton(true);
      }, 6000);

      return () => clearTimeout(timer);
    } else {
      setShowDownloadButton(false);
    }
  }, [showImageResult, isGenerating]);

  const getRotatedExamples = () => {
    const startIndex = (selectedCount * 3) % allPromptExamples.length;
    const examples = [];

    for (let i = 0; i < 3; i++) {
      examples.push(
        allPromptExamples[(startIndex + i) % allPromptExamples.length],
      );
    }

    return examples;
  };

  const promptExamples = getRotatedExamples();

  const handleExampleClick = (example: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isGenerating && onExampleClick) {
      onExampleClick(example);
    }
  };

  console.log("ImagePromptInput props:", {
    currentPrompt,
    isGenerating,
    isExpanded,
    showImageResult,
  });

  return (
    <div
      className={`h-full flex flex-col text-center ${className} ${isExpanded ? "p-4" : ""}`}
    >
      <AnimatePresence mode="wait">
        {showImageResult ? (
          <motion.div
            key="image-result"
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col h-full"
            exit={{ opacity: 0, scale: 0.8 }}
            initial={{ opacity: 0, scale: 0.8 }}
          >
            <div className={`mb-4 p-3 ${isExpanded ? "mb-6" : ""}`}>
              <p
                className={`text-white font-medium text-center ${isExpanded ? "text-lg" : "text-sm"}`}
              >
                &quot;{currentPrompt}&ldquo;
              </p>

              {showDownloadButton && (
                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 flex justify-center"
                  initial={{ opacity: 0, y: -10 }}
                  transition={{ delay: 0.3 }}
                >
                  {isDownloading ? (
                    <div className="rounded-full px-4 py-2 flex items-center gap-2 border-2 border-green-400/60 shadow-lg bg-green-500/20">
                      <Icon
                        className="text-green-400 drop-shadow-lg w-4 h-4 animate-pulse"
                        icon="material-symbols:download"
                      />
                      <span className="text-green-400 text-sm font-medium drop-shadow-lg">
                        Download started
                      </span>
                    </div>
                  ) : (
                    <button
                      className="rounded-full px-4 py-2 flex items-center gap-2 border-2 border-white/60 shadow-lg hover:border-white/80 hover:bg-white/10 transition-all duration-200"
                      onClick={handleDownload}
                    >
                      <Icon
                        className="text-white drop-shadow-lg w-4 h-4"
                        icon="material-symbols:download"
                      />
                      <span className="text-white text-sm font-medium drop-shadow-lg">
                        Download
                      </span>
                    </button>
                  )}
                </motion.div>
              )}
            </div>

            <div className="flex-1 relative rounded-lg overflow-hidden">
              <div className="w-full h-full relative flex items-center justify-center p-4">
                <motion.div
                  animate={{
                    opacity: isGenerating ? 0 : 1,
                    scale: isGenerating ? 0.8 : 1,
                    filter: isGenerating ? "blur(10px)" : "blur(0px)",
                  }}
                  className={`flex items-center justify-center ${
                    isExpanded ? "w-32 h-32 lg:w-40 lg:h-40" : "w-20 h-20"
                  }`}
                  initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                  transition={{
                    duration: isGenerating ? 0.3 : 3,
                    ease: "easeOut",
                    delay: isGenerating ? 0 : 1.5,
                  }}
                >
                  <Icon
                    className="text-white/60 w-full h-full"
                    icon="material-symbols:auto-awesome-outline"
                  />
                </motion.div>
              </div>


              <motion.div
                animate={{
                  backdropFilter: isGenerating ? "blur(20px)" : "blur(0px)",
                  opacity: isGenerating ? 1 : 0,
                }}
                className="absolute inset-0 rounded-lg z-10"
                initial={{ backdropFilter: "blur(20px)", opacity: 1 }}
                transition={{
                  duration: isGenerating ? 0.3 : 3,
                  ease: "easeOut",
                  delay: isGenerating ? 0 : 0.5,
                }}
              />

              <motion.div
                animate={{
                  height: isGenerating ? "100%" : "0%",
                }}
                className="absolute bottom-0 left-0 right-0 z-20 rounded-lg overflow-hidden"
                initial={{ height: "100%" }}
                style={{
                  background:
                    "linear-gradient(to top, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.5) 40%, rgba(255,255,255,0.2) 80%, transparent 100%)",
                }}
                transition={{
                  duration: isGenerating ? 0.3 : 3.5,
                  ease: "easeInOut",
                  delay: isGenerating ? 0 : 1,
                }}
              />

              {isGenerating && (
                <motion.div
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute top-4 right-4 z-30"
                  initial={{ opacity: 0, scale: 0.8 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="rounded-full px-3 py-2 flex items-center gap-2 border-2 border-white/60 shadow-lg">
                    <Icon
                      className="text-white drop-shadow-lg w-4 h-4 animate-spin"
                      icon="material-symbols:auto-awesome"
                    />
                    <span className="text-white text-xs font-medium drop-shadow-lg">
                      Generating
                    </span>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        ) : isGenerating ? (
          <motion.div
            key="generating"
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center"
            exit={{ opacity: 0, scale: 0.8 }}
            initial={{ opacity: 0, scale: 0.8 }}
          >
            <div
              className={`rounded-full bg-purple-400/20 ${isExpanded ? "mb-4 p-4" : "mb-3 p-3"}`}
            >
              <Icon
                className={`text-purple-400 animate-spin ${isExpanded ? "w-12 h-12" : "w-8 h-8"}`}
                icon="material-symbols:auto-awesome"
              />
            </div>
            <h3
              className={`text-white font-semibold mb-2 ${isExpanded ? "text-lg sm:text-xl lg:text-2xl" : "text-base"}`}
            >
              Generating Image...
            </h3>
            <p
              className={`text-white/60 ${isExpanded ? "text-sm sm:text-base lg:text-lg" : "text-xs"}`}
            >
              Creating your masterpiece
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="examples"
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center w-full"
            exit={{ opacity: 0, scale: 0.8 }}
            initial={{ opacity: 0, scale: 0.8 }}
          >
            <div
              className={`rounded-full bg-white/10 ${isExpanded ? "mb-4 p-4" : "mb-2 p-2"}`}
            >
              <Icon
                className={`text-white/60 ${isExpanded ? "w-12 h-12" : "w-6 h-6"}`}
                icon="material-symbols:image-outline"
              />
            </div>

            <h3
              className={`text-white font-semibold mb-2 ${isExpanded ? "text-lg sm:text-xl lg:text-2xl" : "text-xs"}`}
            >
              Generate Image
            </h3>

            <p
              className={`text-white/60 leading-tight ${isExpanded ? "text-sm sm:text-base mb-4 max-w-2xl mx-auto" : "text-[10px] mb-3"}`}
            >
              Use the chat below or try these examples
            </p>

            <div className={`w-full ${isExpanded ? "max-w-4xl mx-auto" : ""}`}>
              <p
                className={`text-white/40 mb-2 ${isExpanded ? "text-sm" : "text-[9px]"}`}
              >
                Quick examples:
              </p>
              <div
                className={`grid grid-cols-1 ${isExpanded ? "gap-2" : "gap-1"}`}
              >
                {promptExamples.map((example, index) => (
                  <button
                    key={index}
                    className={`text-left text-white/50 hover:text-white/80 rounded hover:bg-white/10 transition-colors border border-white/10 hover:border-white/20 ${
                      isExpanded
                        ? "text-xs sm:text-sm p-2 sm:p-3 leading-relaxed"
                        : "text-[9px] p-2"
                    }`}
                    onClick={(e) => handleExampleClick(example, e)}
                  >
                    &quot;{example}&quot;
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ImagePromptInput;
