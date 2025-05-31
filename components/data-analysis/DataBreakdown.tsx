"use client";

import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import {
  Button,
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Card,
  CardBody,
  Progress,
  Tooltip,
  Chip,
} from "@heroui/react";

interface DataBreakdownProps {
  data: {
    title: string;
    data: any[];
    type: "line" | "pie";
    metrics: any[];
  };
  onBack: () => void;
  className?: string;
  isExpanded?: boolean;
}

export const DataBreakdown: React.FC<DataBreakdownProps> = ({
  data,
  onBack,
  className = "",
  isExpanded = false,
}) => {
  const [visibleRows, setVisibleRows] = useState(0);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setVisibleRows(0);

    const interval = setInterval(() => {
      setVisibleRows((prev) => {
        if (prev >= data.data.length) {
          clearInterval(interval);
          setLoading(false);

          return prev;
        }

        return prev + 1;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [data.data.length]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (!target.closest('[role="tooltip"]') && !target.closest("button")) {
        setIsTooltipOpen(false);
      }
    };

    if (isTooltipOpen) {
      document.addEventListener("click", handleClickOutside);

      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [isTooltipOpen]);

  const formatValue = (value: any) => {
    if (typeof value === "number") {
      return value.toLocaleString();
    }

    return value;
  };

  const getChangeIcon = (current: number, previous: number) => {
    if (current > previous) {
      return (
        <Icon
          className="w-3 h-3 text-green-400"
          icon="material-symbols:trending-up"
        />
      );
    } else if (current < previous) {
      return (
        <Icon
          className="w-3 h-3 text-red-400"
          icon="material-symbols:trending-down"
        />
      );
    }

    return (
      <Icon
        className="w-3 h-3 text-gray-400"
        icon="material-symbols:trending-flat"
      />
    );
  };

  const calculateChange = (current: number, previous: number) => {
    if (previous === 0) return 0;

    return ((current - previous) / previous) * 100;
  };

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className={`${className} h-full overflow-y-auto`}
      initial={{ opacity: 0, y: 20 }}
    >
      <div className={`${isExpanded ? "p-4 space-y-4" : "p-2 space-y-3"}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className={`rounded-lg bg-blue-500/20 ${isExpanded ? "p-2" : "p-1"}`}
            >
              <Icon
                className={`text-blue-400 ${isExpanded ? "w-5 h-5" : "w-4 h-4"}`}
                icon="material-symbols:analytics"
              />
            </div>
            <div>
              <h3
                className={`text-white font-semibold ${isExpanded ? "text-base sm:text-lg" : "text-sm"}`}
              >
                {data.title}
              </h3>
              <p
                className={`text-white/60 ${isExpanded ? "text-sm" : "text-xs"}`}
              >
                Detailed Analysis
              </p>
            </div>
          </div>

          <Button
            className={`bg-transparent text-white border-white/60 data-[hover=true]:bg-white data-[hover=true]:text-black ${
              isExpanded
                ? "px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm"
                : "px-2 sm:px-3 py-1 sm:py-1.5 text-xs"
            }`}
            radius="full"
            size="sm"
            startContent={
              <Icon
                className={`${isExpanded ? "w-3 h-3 sm:w-4 sm:h-4" : "w-3 h-3"}`}
                icon="material-symbols:arrow-back"
              />
            }
            variant="bordered"
            onClick={onBack}
          >
            <span
              className={`font-medium ${isExpanded ? "hidden sm:inline" : "hidden xs:inline"}`}
            >
              Back to
            </span>
            <span className="font-medium"> Overview</span>
          </Button>
        </div>

        <div
          className={`grid grid-cols-1 ${isExpanded ? "sm:grid-cols-3 gap-3" : "gap-2"}`}
        >
          {data.metrics.map((metric, index) => (
            <motion.div
              key={index}
              animate={{ opacity: 1, scale: 1 }}
              className={`bg-white/5 rounded-lg border border-white/10 ${isExpanded ? "p-2 sm:p-3" : "p-2"} text-center`}
              initial={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex flex-col items-center gap-1">
                <Icon
                  className={`${metric.color} ${isExpanded ? "w-4 h-4 sm:w-5 h-5" : "w-3 h-3 sm:w-4 h-4"}`}
                  icon={metric.icon}
                />
                <div className="text-center">
                  <p
                    className={`${metric.color} font-bold ${isExpanded ? "text-sm sm:text-base" : "text-xs sm:text-sm"}`}
                  >
                    {metric.value}
                  </p>
                  <p
                    className={`text-white/70 font-medium ${isExpanded ? "text-[10px] sm:text-xs" : "text-[9px] sm:text-[10px]"}`}
                  >
                    {metric.label}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <Card className="bg-white/5 border border-white/10">
          <CardBody className={isExpanded ? "p-3 sm:p-4" : "p-2 sm:p-3"}>
            <div className="flex items-center justify-between mb-3">
              <h4
                className={`text-white font-medium ${isExpanded ? "text-sm sm:text-base" : "text-xs sm:text-sm"}`}
              >
                {data.type === "line"
                  ? "Monthly Performance Data"
                  : "Category Breakdown"}
              </h4>
              <Tooltip
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20"
                closeDelay={200}
                content={
                  <div className="px-1 py-2 max-w-xs">
                    <div className="text-small font-bold text-white">
                      AI Insights
                    </div>
                    <div className="text-tiny text-white/80 mt-1">
                      {data.type === "line"
                        ? "Your sales show a positive trend with May being the peak month. Consider analyzing what factors contributed to the 33% growth from April to May."
                        : "Electronics dominates your sales at 35%, suggesting strong demand in tech products. Consider expanding your electronics inventory for Q4."}
                    </div>
                  </div>
                }
                delay={0}
                isOpen={isTooltipOpen}
                placement="left"
                onOpenChange={(open) => setIsTooltipOpen(open)}
              >
                <motion.div
                  animate={{ opacity: 1, scale: 1 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  transition={{ delay: 0.5, duration: 0.3 }}
                >
                  <Chip
                    as="button"
                    className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border-white/20 cursor-pointer hover:from-blue-500/30 hover:to-purple-500/30 transition-colors"
                    size="sm"
                    startContent={
                      <motion.div
                        animate={{ rotate: [0, -10, 10, -10, 0] }}
                        transition={{
                          duration: 0.5,
                          delay: 1,
                          repeat: Infinity,
                          repeatDelay: 5,
                        }}
                      >
                        <Icon
                          className="text-yellow-400"
                          icon="material-symbols:lightbulb"
                          width={14}
                        />
                      </motion.div>
                    }
                    variant="flat"
                    onClick={() => setIsTooltipOpen(!isTooltipOpen)}
                  >
                    AI Insights
                  </Chip>
                </motion.div>
              </Tooltip>
            </div>

            <div className="overflow-x-auto">
              <Table
                removeWrapper
                aria-label="Data breakdown table"
                className="bg-transparent"
                classNames={{
                  wrapper: "bg-transparent shadow-none",
                  th: "bg-white/10 text-white font-medium text-xs",
                  td: "text-white/80 text-xs",
                }}
              >
                <TableHeader>
                  {data.type === "line" ? (
                    <>
                      <TableColumn>MONTH</TableColumn>
                      <TableColumn>SALES</TableColumn>
                      <TableColumn>CHANGE</TableColumn>
                      <TableColumn>TREND</TableColumn>
                    </>
                  ) : (
                    <>
                      <TableColumn>CATEGORY</TableColumn>
                      <TableColumn>PERCENTAGE</TableColumn>
                      <TableColumn>COLOR</TableColumn>
                    </>
                  )}
                </TableHeader>
                <TableBody emptyContent="No data to display">
                  {data.data.slice(0, visibleRows).map((item, index) => {
                    if (data.type === "line") {
                      return (
                        <TableRow key={index}>
                          <TableCell className="font-medium">
                            {item.month || "N/A"}
                          </TableCell>
                          <TableCell>${formatValue(item.value || 0)}</TableCell>
                          <TableCell>
                            {index > 0 ? (
                              <span
                                className={
                                  calculateChange(
                                    item.value,
                                    data.data[index - 1].value,
                                  ) >= 0
                                    ? "text-green-400"
                                    : "text-red-400"
                                }
                              >
                                {calculateChange(
                                  item.value,
                                  data.data[index - 1].value,
                                ).toFixed(1)}
                                %
                              </span>
                            ) : (
                              <span className="text-gray-400">-</span>
                            )}
                          </TableCell>
                          <TableCell>
                            {index > 0 ? (
                              getChangeIcon(
                                item.value,
                                data.data[index - 1].value,
                              )
                            ) : (
                              <span className="text-gray-400">-</span>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    } else {
                      return (
                        <TableRow key={index}>
                          <TableCell className="font-medium">
                            {item.name || "N/A"}
                          </TableCell>
                          <TableCell>{item.value || 0}%</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div
                                className="w-3 h-3 rounded-full"
                                style={{
                                  backgroundColor: item.color || "#gray",
                                }}
                              />
                              <span className="text-xs text-white/60">
                                {item.color || "N/A"}
                              </span>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    }
                  })}
                </TableBody>
              </Table>
            </div>
          </CardBody>
        </Card>

        {loading && (
          <Card className="col-span-full">
            <CardBody className="p-6">
              <div className="flex flex-col items-center space-y-4">
                <Progress
                  isIndeterminate
                  aria-label="Loading..."
                  className="max-w-md"
                  classNames={{
                    base: "max-w-md",
                    track: "drop-shadow-md border border-default",
                    indicator: "bg-gradient-to-r from-gray-500 to-white",
                    label: "tracking-wider font-medium text-default-600",
                    value: "text-foreground/60",
                  }}
                  size="md"
                />
                <p className="text-default-500">Analyzing your data...</p>
              </div>
            </CardBody>
          </Card>
        )}
      </div>
    </motion.div>
  );
};

export default DataBreakdown;
