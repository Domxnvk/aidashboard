"use client";

import React from "react";
import { Icon } from "@iconify/react";
import { Button } from "@heroui/button";
import clsx from "clsx";

interface WidgetLayoutProps {
  children: React.ReactNode;
  isExpanded?: boolean;
  isSelected?: boolean;
  showControls?: boolean;
  onRemove?: () => void;
  className?: string;
  contentClassName?: string;
}

export const WidgetLayout: React.FC<WidgetLayoutProps> = ({
  children,
  isExpanded = false,
  isSelected = false,
  showControls = true,
  onRemove,
  className = "",
  contentClassName = "",
}) => {
  const containerClasses = clsx(
    "h-full relative overflow-hidden transition-all duration-300",
    {
      "p-3": !isExpanded,
      "p-4 sm:p-6 lg:p-8": isExpanded,
    },
    className,
  );

  const contentClasses = clsx(
    "relative z-10 flex flex-col h-full",
    {
      "items-center justify-center text-center": !isExpanded,
      "items-stretch": isExpanded,
    },
    contentClassName,
  );

  return (
    <div className={containerClasses}>
      {showControls && isSelected && (
        <>
          <div className="absolute top-2 left-2 bg-white/80 rounded-full p-1 z-20 shadow-md">
            <Icon className="text-gray-900" icon="mdi:check" width="14" />
          </div>

          {onRemove && (
            <Button
              isIconOnly
              className="absolute top-2 right-2 z-20 bg-black/20 backdrop-blur-sm min-w-0 hover:bg-black/30 text-white/60 hover:text-white w-6 h-6"
              size="sm"
              onPress={onRemove}
            >
              <Icon icon="mdi:close" width="14" />
            </Button>
          )}
        </>
      )}

      <div className={contentClasses}>{children}</div>
    </div>
  );
};

export const WidgetContent: React.FC<{
  icon?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
  isExpanded?: boolean;
}> = ({ icon, title, description, children, isExpanded = false }) => {
  return (
    <>
      {icon && (
        <div
          className={clsx(
            "rounded-full bg-white/10 backdrop-blur-sm",
            isExpanded ? "mb-4 p-4" : "mb-2 p-2",
          )}
        >
          <Icon
            className={clsx("text-white", isExpanded ? "w-12 h-12" : "w-6 h-6")}
            icon={icon}
          />
        </div>
      )}

      <h3
        className={clsx(
          "font-semibold text-white leading-tight",
          isExpanded ? "text-lg sm:text-xl lg:text-2xl mb-2" : "text-xs mb-1",
        )}
      >
        {title}
      </h3>

      {description && (
        <p
          className={clsx(
            "text-white/60",
            isExpanded
              ? "text-sm sm:text-base mb-4"
              : "text-[10px] line-clamp-2",
          )}
        >
          {description}
        </p>
      )}

      {children}
    </>
  );
};

export default WidgetLayout;
