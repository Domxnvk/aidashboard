"use client";

import React, { useRef, useEffect } from "react";

interface SimpleAudioVisualizerProps {
  audioElement: HTMLAudioElement | null | undefined;
  isPlaying: boolean;
  volume?: number;
}

export default function SimpleAudioVisualizer({
  audioElement,
  isPlaying,
  volume = 70,
}: SimpleAudioVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioContextRef = useRef<AudioContext>();
  const analyserRef = useRef<AnalyserNode>();
  const sourceRef = useRef<MediaElementAudioSourceNode>();
  const gainNodeRef = useRef<GainNode>();
  const animationRef = useRef<number>();

  useEffect(() => {
    if (!audioElement) return;

    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        analyserRef.current = audioContextRef.current.createAnalyser();
        sourceRef.current = audioContextRef.current.createMediaElementSource(audioElement);
        
        gainNodeRef.current = audioContextRef.current.createGain();
        
        sourceRef.current.connect(analyserRef.current);
        analyserRef.current.connect(gainNodeRef.current);
        gainNodeRef.current.connect(audioContextRef.current.destination);
        
        audioElement.volume = 1.0;
        
        analyserRef.current.fftSize = 256;
        analyserRef.current.smoothingTimeConstant = 0.8;
      }
    } catch (error) {
      console.error('Audio setup error:', error);
    }
  }, [audioElement]);

  useEffect(() => {
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = volume / 100;
    }
  }, [volume]);

  useEffect(() => {
    if (!canvasRef.current) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerY = canvas.height / 2;
      const segments = 200;
      const segmentWidth = canvas.width / segments;

      if (!isPlaying) {
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
        gradient.addColorStop(0.5, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0.3)');
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(0, centerY);
        ctx.lineTo(canvas.width, centerY);
        ctx.stroke();
        
        ctx.shadowColor = 'white';
        ctx.shadowBlur = 15;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.shadowBlur = 0;
      } else {
        const bufferLength = analyserRef.current!.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        analyserRef.current!.getByteFrequencyData(dataArray);

        let avgAmplitude = 0;
        for (let i = 0; i < bufferLength; i++) {
          avgAmplitude += dataArray[i];
        }
        avgAmplitude = (avgAmplitude / bufferLength) / 255;
        

        ctx.strokeStyle = 'white';
        ctx.lineWidth = 3;
        ctx.beginPath();

        for (let i = 0; i <= segments; i++) {
          const x = i * segmentWidth;
          
          const freqProgress = i / segments;
          
          const freqIndex1 = Math.floor(freqProgress * bufferLength * 0.8);
          const freqIndex2 = Math.floor(freqProgress * bufferLength * 0.6);
          const freqIndex3 = Math.floor(freqProgress * bufferLength * 0.4);
          
          const freq1 = dataArray[Math.min(freqIndex1, bufferLength - 1)] / 255;
          const freq2 = dataArray[Math.min(freqIndex2, bufferLength - 1)] / 255;
          const freq3 = dataArray[Math.min(freqIndex3, bufferLength - 1)] / 255;
          
          const combinedFreq = (freq1 + freq2 + freq3) / 3;
          
          let intensityFade = 1;
          const fadeZone = 0.15;
          if (freqProgress < fadeZone) {
            intensityFade = freqProgress / fadeZone;
          } else if (freqProgress > (1 - fadeZone)) {
            intensityFade = (1 - freqProgress) / fadeZone;
          }
          
          const time = Date.now() * 0.003;
          const baseWave = Math.sin(freqProgress * Math.PI * 6 + time) * avgAmplitude * 15;
          const audioWave = combinedFreq * 45;
          const harmonicWave = Math.sin(freqProgress * Math.PI * 12 + time * 1.8) * avgAmplitude * 10;
          const detailWave = Math.sin(freqProgress * Math.PI * 20 + time * 0.5) * combinedFreq * 8;
          
          const y = centerY - ((audioWave + baseWave + harmonicWave + detailWave) * intensityFade);
          
          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        
        ctx.stroke();
      }
    };

    if (audioContextRef.current?.state === 'suspended') {
      audioContextRef.current.resume();
    }

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ display: 'block' }}
    />
  );
}