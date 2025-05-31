"use client";
import React from "react";
import { useEffect, useRef } from "react";

const StaticBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const setCanvasSize = () => {
      canvas.width = document.documentElement.clientWidth;
      canvas.height = document.documentElement.clientHeight;

      drawBackground();
    };

    const drawBackground = () => {
      if (!ctx || !canvas) return;

      const gradientColors = {
        start: { r: 8, g: 8, b: 12 },
        end: { r: 20, g: 20, b: 30 },
      };

      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width * 0.8,
      );

      gradient.addColorStop(
        0,
        `rgb(${gradientColors.start.r}, ${gradientColors.start.g}, ${gradientColors.start.b})`,
      );
      gradient.addColorStop(
        1,
        `rgb(${gradientColors.end.r}, ${gradientColors.end.g}, ${gradientColors.end.b})`,
      );

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const numberOfDots = 120;

      for (let i = 0; i < numberOfDots; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = Math.random() * 1.5 + 0.5;
        const opacity = Math.random() * 0.3 + 0.05;

        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    setCanvasSize();

    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        setCanvasSize();
      }, 100);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 bottom-0 w-full h-full -z-10 pointer-events-none"
    />
  );
};

export default StaticBackground;
