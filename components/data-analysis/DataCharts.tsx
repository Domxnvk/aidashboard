"use client";

import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import { Chip } from "@heroui/react";

interface DataChartsProps {
  fileName: string;
  onRemoveFile: () => void;
  isExpanded?: boolean;
  className?: string;
  onDrillDown?: (chartType: string, data: any) => void;
}

const chartData = {
  salesData: [
    { month: "Jan", value: 4000 },
    { month: "Feb", value: 3000 },
    { month: "Mar", value: 5000 },
    { month: "Apr", value: 4500 },
    { month: "May", value: 6000 },
  ],
  categories: [
    { name: "Electronics", value: 35, color: "#3B82F6" },
    { name: "Clothing", value: 25, color: "#10B981" },
    { name: "Books", value: 20, color: "#F59E0B" },
    { name: "Home", value: 20, color: "#EF4444" },
  ],
  metrics: [
    {
      label: "Total Revenue",
      value: "$124,530",
      icon: "material-symbols:trending-up",
      color: "text-green-400",
    },
    {
      label: "Average Order",
      value: "$87.23",
      icon: "material-symbols:shopping-cart",
      color: "text-blue-400",
    },
    {
      label: "Growth Rate",
      value: "+12.5%",
      icon: "material-symbols:analytics",
      color: "text-purple-400",
    },
  ],
};

export const DataCharts: React.FC<DataChartsProps> = ({
  fileName,
  isExpanded = false,
  className = "",
  onDrillDown,
}) => {
  const [visibleBars, setVisibleBars] = useState(0);
  const [visibleMetrics, setVisibleMetrics] = useState(0);
  const [pieProgress, setPieProgress] = useState(0);

  useEffect(() => {
    const metricsTimer = setTimeout(() => {
      const metricsInterval = setInterval(() => {
        setVisibleMetrics((prev) => {
          if (prev >= chartData.metrics.length) {
            clearInterval(metricsInterval);

            return prev;
          }

          return prev + 1;
        });
      }, 200);
    }, 500);

    const barTimer = setTimeout(() => {
      const barInterval = setInterval(() => {
        setVisibleBars((prev) => {
          if (prev >= chartData.salesData.length) {
            clearInterval(barInterval);

            return prev;
          }

          return prev + 1;
        });
      }, 300);
    }, 2000);

    const pieTimer = setTimeout(() => {
      const pieInterval = setInterval(() => {
        setPieProgress((prev) => {
          if (prev >= 100) {
            clearInterval(pieInterval);

            return 100;
          }

          return prev + 5;
        });
      }, 75);
    }, 4500);

    return () => {
      clearTimeout(metricsTimer);
      clearTimeout(barTimer);
      clearTimeout(pieTimer);
    };
  }, []);

  const maxValue = Math.max(...chartData.salesData.map((d) => d.value));

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className={`${className} h-full overflow-y-auto`}
      initial={{ opacity: 0, y: 20 }}
    >
      <div className={`${isExpanded ? "p-4 space-y-6" : "p-2 space-y-3"}`}>
        <div className="flex items-center gap-2">
          <div
            className={`rounded-lg bg-white/10 ${isExpanded ? "p-2 sm:p-2" : "p-1"}`}
          >
            <Icon
              className={`text-white ${isExpanded ? "w-4 h-4 sm:w-5 h-5 md:w-6 h-6" : "w-3 h-3 sm:w-4 h-4"}`}
              icon="material-symbols:analytics"
            />
          </div>
          <div>
            <h3
              className={`text-white font-semibold ${isExpanded ? "text-sm sm:text-base md:text-lg" : "text-xs sm:text-sm"}`}
            >
              Data Analysis
            </h3>
            <p
              className={`text-white/60 ${isExpanded ? "text-xs sm:text-sm" : "text-[10px] sm:text-xs"}`}
            >
              {fileName}
            </p>
          </div>
        </div>

        <div
          className={`grid grid-cols-1 ${isExpanded ? "sm:grid-cols-3 gap-3" : "gap-2"}`}
        >
          <AnimatePresence>
            {chartData.metrics.slice(0, visibleMetrics).map((metric, index) => (
              <motion.div
                key={index}
                animate={{ opacity: 1, scale: 1 }}
                className={`bg-white/5 rounded-lg border border-white/10 ${isExpanded ? "p-1.5 sm:p-2" : "p-1 sm:p-1.5"} text-center`}
                initial={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="flex flex-col items-center gap-1">
                  <Icon
                    className={`${metric.color} ${isExpanded ? "w-4 h-4 sm:w-5 h-5" : "w-3 h-3 sm:w-4 h-4"}`}
                    icon={metric.icon}
                  />
                  <div className="text-center">
                    <p
                      className={`${metric.color} font-bold ${isExpanded ? "text-sm sm:text-base md:text-lg" : "text-xs sm:text-sm"}`}
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
          </AnimatePresence>
        </div>

        <div
          className={`grid grid-cols-1 ${isExpanded ? "lg:grid-cols-2 gap-2 sm:gap-3 md:gap-4" : "gap-2 sm:gap-3"}`}
        >
          <div
            className={`bg-white/5 rounded-lg border border-white/10 ${isExpanded ? "p-2 sm:p-3 md:p-4" : "p-2 sm:p-3"}`}
          >
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <h4
                className={`text-white font-medium ${isExpanded ? "text-sm sm:text-base" : "text-xs sm:text-sm"}`}
              >
                Monthly Sales
              </h4>
              <Chip
                as="button"
                className="bg-white/10 text-white border-white/20 hover:bg-white/20 transition-colors cursor-pointer"
                size={isExpanded ? "sm" : "sm"}
                startContent={
                  <Icon
                    icon="material-symbols:insights"
                    width={isExpanded ? 16 : 14}
                  />
                }
                variant="bordered"
                onClick={() =>
                  onDrillDown?.("monthly-sales", {
                    title: "Monthly Sales Breakdown",
                    data: chartData.salesData,
                    type: "line",
                    metrics: chartData.metrics,
                  })
                }
              >
                Insights
              </Chip>
            </div>
            <div
              className={`relative ${isExpanded ? "h-28 sm:h-32 md:h-40" : "h-20 sm:h-24 md:h-28"}`}
            >
              <svg
                className="w-full h-full"
                viewBox="0 0 300 150"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <pattern
                    height="30"
                    id="grid"
                    patternUnits="userSpaceOnUse"
                    width="50"
                  >
                    <path
                      d="M 50 0 L 0 0 0 30"
                      fill="none"
                      stroke="rgba(255,255,255,0.08)"
                      strokeWidth="0.5"
                    />
                  </pattern>
                </defs>
                <rect fill="url(#grid)" height="100%" width="100%" />

                <g transform="translate(40, 15)">
                  <rect
                    fill="rgba(255,255,255,0.02)"
                    height="100"
                    rx="4"
                    width="220"
                  />

                  <line
                    stroke="rgba(255,255,255,0.3)"
                    strokeDasharray="5,5"
                    strokeWidth="1"
                    x1="0"
                    x2="220"
                    y1="50"
                    y2="50"
                  />
                  <text
                    className="text-[9px] font-medium"
                    fill="rgba(255,255,255,0.6)"
                    textAnchor="end"
                    x="-8"
                    y="53"
                  >
                    Avg
                  </text>

                  <motion.path
                    animate={{
                      pathLength:
                        visibleBars >= chartData.salesData.length ? 1 : 0,
                      opacity:
                        visibleBars >= chartData.salesData.length ? 1 : 0,
                    }}
                    d={chartData.salesData
                      .map((data, index) => {
                        const x =
                          (index / (chartData.salesData.length - 1)) * 220;
                        const y = 100 - (data.value / maxValue) * 90;

                        return `${index === 0 ? "M" : "L"} ${x},${y}`;
                      })
                      .join(" ")}
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    stroke="url(#smoothLineGradient)"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    style={{
                      filter: "drop-shadow(0 0 8px rgba(59, 130, 246, 0.4))",
                    }}
                    transition={{
                      duration: 3,
                      delay: 0.5,
                      ease: "easeInOut",
                    }}
                  />

                  {chartData.salesData.map((data, index) => {
                    if (index === 0) return null;

                    const x1 =
                      ((index - 1) / (chartData.salesData.length - 1)) * 220;
                    const y1 =
                      100 -
                      (chartData.salesData[index - 1].value / maxValue) * 90;
                    const x2 = (index / (chartData.salesData.length - 1)) * 220;
                    const y2 = 100 - (data.value / maxValue) * 90;

                    const isAboveBaseline = (y1 + y2) / 2 < 50;
                    const segmentColor = isAboveBaseline
                      ? "#10B981"
                      : "#EF4444";
                    const glowColor = isAboveBaseline
                      ? "rgba(16, 185, 129, 0.6)"
                      : "rgba(239, 68, 68, 0.6)";

                    return (
                      <motion.line
                        key={`segment-${index}`}
                        animate={{
                          pathLength: visibleBars > index ? 1 : 0,
                          opacity: visibleBars > index ? 1 : 0,
                        }}
                        initial={{ pathLength: 0, opacity: 0 }}
                        stroke={segmentColor}
                        strokeLinecap="round"
                        strokeWidth="4"
                        style={{
                          filter: `drop-shadow(0 0 6px ${glowColor})`,
                        }}
                        transition={{
                          duration: 0.8,
                          delay: index * 0.3,
                          ease: "easeInOut",
                        }}
                        x1={x1}
                        x2={x2}
                        y1={y1}
                        y2={y2}
                      />
                    );
                  })}

                  {chartData.salesData.map((data, index) => {
                    const x = (index / (chartData.salesData.length - 1)) * 220;
                    const y = 100 - (data.value / maxValue) * 90;
                    const isVisible = visibleBars > index;

                    const isAboveBaseline = y < 50;
                    const pointColor = isAboveBaseline ? "#10B981" : "#EF4444";
                    const glowColor = isAboveBaseline
                      ? "rgba(16, 185, 129, 0.4)"
                      : "rgba(239, 68, 68, 0.4)";

                    return (
                      <g key={index}>
                        <motion.circle
                          animate={{
                            scale: isVisible ? [0, 1.4, 1] : 0,
                            opacity: isVisible ? 1 : 0,
                          }}
                          cx={x}
                          cy={y}
                          fill={pointColor}
                          initial={{ scale: 0, opacity: 0 }}
                          r="4"
                          stroke="white"
                          strokeWidth="2"
                          style={{
                            filter: `drop-shadow(0 0 8px ${glowColor})`,
                          }}
                          transition={{
                            duration: 0.6,
                            delay: index * 0.3 + 0.5,
                            ease: "easeOut",
                          }}
                        />

                        <motion.circle
                          animate={{
                            scale: isVisible ? [1, 2.5, 1] : 0,
                            opacity: isVisible ? [0.5, 0, 0.5] : 0,
                          }}
                          cx={x}
                          cy={y}
                          fill={pointColor}
                          initial={{ scale: 0, opacity: 0 }}
                          r="4"
                          transition={{
                            duration: 2.5,
                            delay: index * 0.3 + 0.8,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        />

                        <motion.g
                          animate={{
                            opacity: isVisible ? 1 : 0,
                            y: isVisible ? 0 : 10,
                          }}
                          initial={{ opacity: 0, y: 10 }}
                          transition={{
                            duration: 0.4,
                            delay: index * 0.3 + 0.9,
                          }}
                        >
                          <rect
                            fill="rgba(0,0,0,0.85)"
                            height="20"
                            rx="10"
                            stroke={pointColor}
                            strokeWidth="1"
                            width="40"
                            x={x - 20}
                            y={Math.max(y - 32, 5)}
                          />
                          <text
                            className="text-[10px] font-bold"
                            fill="white"
                            textAnchor="middle"
                            x={x}
                            y={Math.max(y - 19, 18)}
                          >
                            ${(data.value / 1000).toFixed(0)}k
                          </text>
                        </motion.g>

                        <motion.text
                          animate={{
                            opacity: isVisible ? 1 : 0,
                          }}
                          className="text-[10px] font-medium"
                          fill="rgba(255,255,255,0.8)"
                          initial={{ opacity: 0 }}
                          textAnchor="middle"
                          transition={{
                            duration: 0.3,
                            delay: index * 0.3 + 1.1,
                          }}
                          x={x}
                          y="125"
                        >
                          {data.month}
                        </motion.text>
                      </g>
                    );
                  })}

                  <motion.path
                    animate={{
                      pathLength:
                        visibleBars >= chartData.salesData.length ? 1 : 0,
                      opacity:
                        visibleBars >= chartData.salesData.length ? 0.15 : 0,
                    }}
                    d={`M 0,100 ${chartData.salesData
                      .map((data, index) => {
                        const x =
                          (index / (chartData.salesData.length - 1)) * 220;
                        const y = 100 - (data.value / maxValue) * 90;

                        return `L ${x},${y}`;
                      })
                      .join(" ")} L 220,100 Z`}
                    fill="url(#areaGradient)"
                    initial={{ pathLength: 0, opacity: 0 }}
                    transition={{
                      duration: 1.5,
                      delay: chartData.salesData.length * 0.3 + 0.5,
                      ease: "easeOut",
                    }}
                  />
                </g>

                <defs>
                  <linearGradient
                    id="smoothLineGradient"
                    x1="0%"
                    x2="100%"
                    y1="0%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="25%" stopColor="#10B981" />
                    <stop offset="50%" stopColor="#F59E0B" />
                    <stop offset="75%" stopColor="#EF4444" />
                    <stop offset="100%" stopColor="#8B5CF6" />
                  </linearGradient>

                  <linearGradient
                    id="areaGradient"
                    x1="0%"
                    x2="0%"
                    y1="0%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
                    <stop offset="50%" stopColor="#10B981" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          <div
            className={`bg-white/5 rounded-lg border border-white/10 ${isExpanded ? "p-2 sm:p-3 md:p-4" : "p-2 sm:p-3"}`}
          >
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <h4
                className={`text-white font-medium ${isExpanded ? "text-sm sm:text-base" : "text-xs sm:text-sm"}`}
              >
                Category Distribution
              </h4>
              <Chip
                as="button"
                className="bg-white/10 text-white border-white/20 hover:bg-white/20 transition-colors cursor-pointer"
                size={isExpanded ? "sm" : "sm"}
                startContent={
                  <Icon
                    icon="material-symbols:insights"
                    width={isExpanded ? 16 : 14}
                  />
                }
                variant="bordered"
                onClick={() =>
                  onDrillDown?.("category-distribution", {
                    title: "Category Distribution Breakdown",
                    data: chartData.categories,
                    type: "pie",
                    metrics: chartData.metrics,
                  })
                }
              >
                Insights
              </Chip>
            </div>
            <div className="flex items-center justify-center">
              <div
                className={`relative aspect-square overflow-hidden rounded-full ${isExpanded ? "w-16 sm:w-20 md:w-24" : "w-12 sm:w-14 md:w-16"}`}
              >
                <motion.div
                  animate={{ rotate: pieProgress * 3.6 }}
                  className="absolute inset-0 rounded-full overflow-hidden"
                  initial={{ rotate: 0 }}
                  style={{
                    background: `conic-gradient(
                      #3B82F6 0deg ${pieProgress * 1.26}deg,
                      #10B981 ${pieProgress * 1.26}deg ${pieProgress * 2.16}deg,
                      #F59E0B ${pieProgress * 2.16}deg ${pieProgress * 2.88}deg,
                      #EF4444 ${pieProgress * 2.88}deg ${pieProgress * 3.6}deg,
                      transparent ${pieProgress * 3.6}deg 360deg
                    )`,
                  }}
                />
                <div
                  className={`absolute inset-2 bg-black/40 rounded-full flex items-center justify-center overflow-hidden`}
                >
                  <span
                    className={`text-white font-bold ${isExpanded ? "text-xs sm:text-sm" : "text-[10px] sm:text-xs"}`}
                  >
                    {Math.round(pieProgress)}%
                  </span>
                </div>
              </div>
            </div>

            <div
              className={`mt-2 sm:mt-3 grid grid-cols-2 gap-1 ${isExpanded ? "text-[10px] sm:text-xs" : "text-[9px] sm:text-[10px]"}`}
            >
              {chartData.categories.map((cat, index) => (
                <div key={index} className="flex items-center gap-1">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: cat.color }}
                  />
                  <span className="text-white/60 truncate">{cat.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DataCharts;
