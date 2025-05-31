"use client";

import React from "react";
import { Button } from "@heroui/button";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { Image } from "@heroui/image";

interface GeneratedImage {
  id: string;
  prompt: string;
  url: string;
  timestamp: Date;
}

interface ImageDisplayProps {
  image: GeneratedImage;
  onRemove: () => void;
  onNewImage: () => void;
  className?: string;
}

export const ImageDisplay: React.FC<ImageDisplayProps> = ({
  image,
  onRemove,
  onNewImage,
  className = "",
}) => {
  const formatTimestamp = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className={`${className} h-full flex flex-col items-center justify-center text-center p-2`}
      exit={{ opacity: 0, y: -10 }}
      initial={{ opacity: 0, y: -10 }}
    >
      <div className="w-full max-w-[200px] space-y-3">
        <div className="relative">
          <Image
            alt={image.prompt}
            className="w-full rounded-lg"
            classNames={{
              wrapper: "w-full",
              img: "w-full h-auto object-cover rounded-lg",
            }}
            src={image.url}
          />

          <div className="absolute top-2 right-2 bg-green-500/80 rounded-full p-1">
            <Icon
              className="text-white w-3 h-3"
              icon="material-symbols:check-rounded"
            />
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-white font-medium text-xs leading-tight line-clamp-2">
            &quot;{image.prompt}&quot;
          </p>

          <p className="text-white/60 text-[10px]">
            Generated at {formatTimestamp(image.timestamp)}
          </p>
        </div>

        <div className="flex gap-2 w-full">
          <Button
            className="flex-1 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 text-purple-200 text-[10px] h-7"
            size="sm"
            startContent={
              <Icon icon="material-symbols:add-rounded" width="12" />
            }
            onPress={onNewImage}
          >
            New Image
          </Button>

          <Button
            className="flex-1 bg-white/10 hover:bg-white/20 text-white/70 hover:text-white text-[10px] h-7"
            size="sm"
            startContent={
              <Icon icon="material-symbols:download-rounded" width="12" />
            }
            onPress={() => {
              const link = document.createElement("a");

              link.href = image.url;
              link.download = `generated-image-${image.id}.jpg`;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
          >
            Download
          </Button>
        </div>

        <Button
          className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-300 hover:text-red-200 text-[10px] h-6"
          size="sm"
          onPress={onRemove}
        >
          Remove Image
        </Button>
      </div>
    </motion.div>
  );
};

export default ImageDisplay;
