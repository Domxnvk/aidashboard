"use client";

import React, { useState, useRef, useEffect } from "react";
import { Card, Chip, Button, Slider, Progress } from "@heroui/react";
import { Icon } from "@iconify/react";

import SimpleAudioVisualizer from "./SimpleAudioVisualizer";

interface MusicSelection {
  genre: string;
  mood: string;
  tempo: number;
  instruments: string[];
  duration: string;
}

const GENRES = [
  { id: "pop", label: "Pop", icon: "mdi:music-note" },
  { id: "rock", label: "Rock", icon: "mdi:guitar-electric" },
  { id: "jazz", label: "Jazz", icon: "mdi:saxophone" },
  { id: "classical", label: "Classical", icon: "mdi:violin" },
  { id: "electronic", label: "Electronic", icon: "mdi:sine-wave" },
  { id: "hip-hop", label: "Hip-Hop", icon: "mdi:microphone" },
  { id: "country", label: "Country", icon: "mdi:guitar-acoustic" },
  { id: "rnb", label: "R&B", icon: "mdi:music-circle" },
];

const MOODS = [
  { id: "happy", label: "Happy", icon: "noto:grinning-face" },
  { id: "sad", label: "Sad", icon: "noto:pensive-face" },
  { id: "energetic", label: "Energetic", icon: "noto:fire" },
  { id: "relaxing", label: "Relaxing", icon: "noto:relieved-face" },
  { id: "dramatic", label: "Dramatic", icon: "noto:exploding-head" },
  { id: "mysterious", label: "Mysterious", icon: "noto:thinking-face" },
  { id: "romantic", label: "Romantic", icon: "noto:smiling-face-with-hearts" },
  {
    id: "aggressive",
    label: "Aggressive",
    icon: "noto:face-with-symbols-on-mouth",
  },
];

const TEMPO_MARKS = [
  { value: 60, label: "60" },
  { value: 120, label: "120" },
  { value: 180, label: "180" },
];

const INSTRUMENTS = [
  { id: "piano", label: "Piano", icon: "mdi:piano" },
  { id: "guitar", label: "Guitar", icon: "mdi:guitar-acoustic" },
  { id: "drums", label: "Drums", icon: "mdi:drum" },
  { id: "strings", label: "Strings", icon: "mdi:violin" },
  { id: "synth", label: "Synth", icon: "mdi:keyboard" },
  { id: "bass", label: "Bass", icon: "mdi:guitar-electric" },
];

const DURATIONS = [
  { id: "30s", label: "30 seconds" },
  { id: "1min", label: "1 minute" },
  { id: "2min", label: "2 minutes" },
  { id: "3min", label: "3 minutes" },
];

interface MusicComposerProps {
  isExpanded?: boolean;
}

export function MusicComposer({ isExpanded = false }: MusicComposerProps) {
  const [selection, setSelection] = useState<MusicSelection>({
    genre: "",
    mood: "",
    tempo: 90,
    instruments: [],
    duration: "1min",
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedMusic, setGeneratedMusic] = useState<any>(null);
  const [volume, setVolume] = useState(70);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
    };
  }, [generatedMusic]);


  const togglePlayPause = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Error toggling playback:', error);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleGenreSelect = (genreId: string) => {
    setSelection({ ...selection, genre: genreId });
  };

  const handleMoodSelect = (moodId: string) => {
    setSelection({ ...selection, mood: moodId });
  };

  const handleTempoChange = (value: number | number[]) => {
    setSelection({
      ...selection,
      tempo: Array.isArray(value) ? value[0] : value,
    });
  };

  const handleInstrumentToggle = (instrumentId: string) => {
    const instruments = selection.instruments.includes(instrumentId)
      ? selection.instruments.filter((i) => i !== instrumentId)
      : [...selection.instruments, instrumentId];

    setSelection({ ...selection, instruments });
  };

  const handleDurationSelect = (durationId: string) => {
    setSelection({ ...selection, duration: durationId });
  };

  const handleGenerateMusic = async () => {
    setIsGenerating(true);
    setGeneratedMusic(null);
    setTimeout(() => {
      setGeneratedMusic({
        title: `${selection.mood.charAt(0).toUpperCase() + selection.mood.slice(1)} ${selection.genre.charAt(0).toUpperCase() + selection.genre.slice(1)} Track`,
        duration: selection.duration,
        tempo: selection.tempo,
      });
      setIsGenerating(false);
    }, 4000);
  };

  const canGenerate =
    selection.genre && selection.mood && selection.instruments.length > 0;

  if (!isExpanded) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-4">
        <div className="rounded-full bg-white/10 mb-2 p-2">
          <Icon className="text-white/60 w-6 h-6" icon="carbon:music" />
        </div>
        <h3 className="text-white font-semibold text-xs mb-1">
          Music Composer
        </h3>
        <p className="text-white/60 text-[10px] leading-tight">
          Create original music with AI
        </p>
      </div>
    );
  }

  if (isGenerating) {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <div className="text-center">
          <div className="mb-6">
            <Icon
              className="text-white/80 animate-pulse"
              icon="mdi:music-box-multiple"
              width={48}
            />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
            Generating Music
          </h2>
          <p className="text-white/60 text-sm sm:text-base">
            Creating your {selection.mood} {selection.genre} track...
          </p>
          <div className="mt-8 flex justify-center">
            <Progress
              isIndeterminate
              aria-label="Loading..."
              className="max-w-md"
              classNames={{
                track: "bg-white/20",
                indicator: "bg-white",
              }}
              size="sm"
            />
          </div>
        </div>
      </div>
    );
  }

  if (generatedMusic && !isGenerating) {
    if (!isExpanded) {
      return (
        <div className="h-full flex items-center justify-center p-2">
          <div className="flex flex-col items-center justify-center text-center space-y-1.5">
            <audio
              ref={audioRef}
              src="/coldplay-x-y-changing-faces.mp3"
              onEnded={() => setIsPlaying(false)}
            >
              <track kind="captions" label="English captions" srcLang="en" />
            </audio>
            
            <div className="rounded-full bg-white/10 p-1.5">
              <Icon className="text-white/60 w-5 h-5" icon="mdi:music-note" />
            </div>
            <h3 className="text-white font-semibold text-[11px] leading-tight line-clamp-1 max-w-full px-2">
              {generatedMusic.title}
            </h3>
            <p className="text-white/60 text-[9px]">
              Now Playing
            </p>
            
            <Button
              isIconOnly
              className="bg-white text-black data-[hover=true]:bg-white/90"
              radius="full"
              size="sm"
              onPress={togglePlayPause}
            >
              <Icon icon={isPlaying ? "mdi:pause" : "mdi:play"} width={16} />
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div className="h-full overflow-y-auto sm:overflow-hidden sm:flex sm:items-center sm:justify-center p-3 sm:p-4">
        <div className="w-full max-w-2xl space-y-3 sm:space-y-4 my-4 sm:my-0">
          <audio
            ref={audioRef}
            src="/coldplay-x-y-changing-faces.mp3"
            onEnded={() => setIsPlaying(false)}
          >
            <track kind="captions" label="English captions" srcLang="en" />
          </audio>
          
          <div className="text-center">
            <Icon
              className="text-white mb-2"
              icon="mdi:music-note"
              width={28}
            />
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-1">
              {generatedMusic.title}
            </h3>
            <p className="text-xs sm:text-sm text-white/60">
              {generatedMusic.duration} • {generatedMusic.tempo} BPM
            </p>
          </div>

          <div className="relative h-32 sm:h-28 py-2 sm:py-0">
            <SimpleAudioVisualizer
              audioElement={audioRef.current || undefined}
              isPlaying={isPlaying}
              volume={volume}
            />
          </div>

          <div className="flex items-center justify-center gap-3">
            <Button
              isIconOnly
              className="bg-white/10 text-white data-[hover=true]:bg-white/20"
              radius="full"
              size="md"
              onPress={() => setVolume(Math.max(0, volume - 10))}
            >
              <Icon icon="mdi:volume-minus" width={20} />
            </Button>
            <Button
              isIconOnly
              className="bg-white text-black data-[hover=true]:bg-white/90"
              radius="full"
              size="lg"
              onPress={togglePlayPause}
            >
              <Icon icon={isPlaying ? "mdi:pause" : "mdi:play"} width={28} />
            </Button>
            <Button
              isIconOnly
              className="bg-white/10 text-white data-[hover=true]:bg-white/20"
              radius="full"
              size="md"
              onPress={() => setVolume(Math.min(100, volume + 10))}
            >
              <Icon icon="mdi:volume-plus" width={20} />
            </Button>
          </div>

          <div>
            <Progress
              className="mb-2"
              classNames={{
                track: "bg-white/20",
                indicator: "bg-white",
              }}
              value={duration > 0 ? (currentTime / duration) * 100 : 0}
            />
            <div className="flex justify-between text-xs text-white/60">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          <div className="flex gap-3 justify-center">
            <Button
              className="bg-white/10 text-white data-[hover=true]:bg-white/20 sm:hidden"
              isIconOnly
              radius="full"
              size="md"
              variant="flat"
            >
              <Icon icon="mdi:download" width={20} />
            </Button>
            <Button
              className="bg-white/10 text-white data-[hover=true]:bg-white/20 hidden sm:flex"
              radius="full"
              startContent={<Icon icon="mdi:download" width={18} />}
              variant="flat"
            >
              Download
            </Button>
            <Button
              className="bg-white/10 text-white data-[hover=true]:bg-white/20 sm:hidden"
              isIconOnly
              radius="full"
              size="md"
              variant="flat"
            >
              <Icon icon="mdi:share-variant" width={20} />
            </Button>
            <Button
              className="bg-white/10 text-white data-[hover=true]:bg-white/20 hidden sm:flex"
              radius="full"
              startContent={<Icon icon="mdi:share-variant" width={18} />}
              variant="flat"
            >
              Share
            </Button>
            <Button
              className="bg-white/10 text-white data-[hover=true]:bg-white/20 sm:hidden"
              isIconOnly
              radius="full"
              size="md"
              variant="flat"
              onPress={() => {
                setGeneratedMusic(null);
                setSelection({
                  genre: "",
                  mood: "",
                  tempo: 90,
                  instruments: [],
                  duration: "1min",
                });
              }}
            >
              <Icon icon="mdi:refresh" width={20} />
            </Button>
            <Button
              className="bg-white/10 text-white data-[hover=true]:bg-white/20 hidden sm:flex"
              radius="full"
              startContent={<Icon icon="mdi:refresh" width={18} />}
              variant="flat"
              onPress={() => {
                setGeneratedMusic(null);
                setSelection({
                  genre: "",
                  mood: "",
                  tempo: 90,
                  instruments: [],
                  duration: "1min",
                });
              }}
            >
              New Track
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className={`flex flex-col gap-1 sm:gap-2 text-center ${isExpanded ? "px-3 pt-3 pb-2" : "px-2 pt-2 pb-1"}`}>
        <div className="flex items-center justify-center gap-1 sm:gap-2">
          <Icon
            className="text-white"
            icon="mdi:music-box"
            width={isExpanded ? 24 : 20}
          />
          <h2
            className={`font-bold text-white ${isExpanded ? "text-base sm:text-lg md:text-xl lg:text-2xl" : "text-sm sm:text-base"}`}
          >
            Music Composer
          </h2>
        </div>
        <p
          className={`text-white/60 ${isExpanded ? "text-[11px] sm:text-xs md:text-sm" : "text-[10px] sm:text-xs"}`}
        >
          Create custom music by selecting genre, mood, and instruments
        </p>
      </div>

      <div className={`flex-1 overflow-y-auto ${isExpanded ? "px-3 pb-3" : "px-2 pb-2"}`}>
        <div className="flex flex-col gap-4 sm:gap-6 md:gap-8 max-w-4xl mx-auto w-full">
          <div>
            <h3 className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold mb-2 sm:mb-3 text-white text-center">
              Select Genre
            </h3>
            <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 gap-1.5 sm:gap-2">
              {GENRES.map((genre) => (
                <Card
                  key={genre.id}
                  isPressable
                  className={`p-2 sm:p-2.5 transition-all bg-white/5 backdrop-blur-md ${
                    selection.genre === genre.id
                      ? "border-white/40"
                      : "border-white/10"
                  }`}
                  onPress={() => handleGenreSelect(genre.id)}
                >
                  <div className="flex flex-col items-center gap-1">
                    <Icon
                      className={
                        selection.genre === genre.id
                          ? "text-white"
                          : "text-white/60"
                      }
                      icon={genre.icon}
                      width={18}
                    />
                    <span
                      className={`text-[10px] sm:text-xs font-medium text-center ${
                        selection.genre === genre.id
                          ? "text-white"
                          : "text-white/80"
                      }`}
                    >
                      {genre.label}
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold mb-2 sm:mb-3 text-white text-center">
              Select Mood
            </h3>
            <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center">
              {MOODS.map((mood) => (
                <Chip
                  key={mood.id}
                  className={`cursor-pointer text-xs sm:text-sm ${
                    selection.mood === mood.id
                      ? "bg-white text-black border-white"
                      : "bg-white/10 text-white border-white/20 hover:bg-white/20"
                  }`}
                  size={isExpanded ? "md" : "sm"}
                  startContent={<Icon icon={mood.icon} width={16} />}
                  variant="flat"
                  onClick={() => handleMoodSelect(mood.id)}
                >
                  {mood.label}
                </Chip>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm sm:text-base md:text-lg font-semibold mb-2 sm:mb-3 text-white text-center">
              Select Tempo ({selection.tempo} BPM)
            </h3>
            <div className="px-3">
              <Slider
                className="max-w-full"
                classNames={{
                  base: "max-w-full",
                  track: "bg-white/20",
                  filler: "bg-white",
                  thumb: "bg-white",
                  mark: "text-[10px] sm:text-xs text-white/60",
                  label: "text-xs sm:text-sm text-white",
                  value: "text-xs sm:text-sm text-white",
                }}
                color="foreground"
                label="BPM"
                marks={TEMPO_MARKS}
                maxValue={180}
                minValue={60}
                size="sm"
                step={30}
                value={selection.tempo}
                onChange={handleTempoChange}
              />
              <div className="flex justify-between mt-1">
                <span className="text-[10px] sm:text-xs text-white/60">
                  Slow
                </span>
                <span className="text-[10px] sm:text-xs text-white/60">
                  Fast
                </span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold mb-2 sm:mb-3 text-white text-center">
              Select Instruments
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 sm:gap-2">
              {INSTRUMENTS.map((instrument) => (
                <Card
                  key={instrument.id}
                  isPressable
                  className={`p-2 sm:p-3 md:p-4 transition-all bg-white/5 backdrop-blur-md ${
                    selection.instruments.includes(instrument.id)
                      ? "border-white/40"
                      : "border-white/10"
                  }`}
                  onPress={() => handleInstrumentToggle(instrument.id)}
                >
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Icon
                      className={
                        selection.instruments.includes(instrument.id)
                          ? "text-white"
                          : "text-white/60"
                      }
                      icon={instrument.icon}
                      width={18}
                    />
                    <span
                      className={`text-xs sm:text-sm font-medium ${
                        selection.instruments.includes(instrument.id)
                          ? "text-white"
                          : "text-white/80"
                      }`}
                    >
                      {instrument.label}
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold mb-2 sm:mb-3 text-white text-center">
              Select Duration
            </h3>
            <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center">
              {DURATIONS.map((duration) => (
                <Button
                  key={duration.id}
                  className={`text-[11px] sm:text-xs md:text-sm ${
                    selection.duration === duration.id
                      ? "bg-white text-black border-white"
                      : "bg-transparent text-white border-white/60 data-[hover=true]:bg-white/10"
                  }`}
                  size={isExpanded ? "sm" : "sm"}
                  variant="bordered"
                  onPress={() => handleDurationSelect(duration.id)}
                >
                  {duration.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="pt-2 sm:pt-4">
            <Button
              fullWidth
              className="bg-transparent text-white border-white/60 data-[hover=true]:bg-white data-[hover=true]:text-black shadow-lg text-sm sm:text-base"
              isDisabled={!canGenerate}
              isLoading={isGenerating}
              radius="full"
              size={isExpanded ? "md" : "sm"}
              startContent={
                !isGenerating && (
                  <Icon
                    icon="mdi:music-note-plus"
                    width={isExpanded ? 20 : 16}
                  />
                )
              }
              variant="bordered"
              onPress={handleGenerateMusic}
            >
              {isGenerating ? "Generating Music..." : "Generate Music"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
