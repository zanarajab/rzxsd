import React, { useRef, useEffect } from 'react';
import { Play, Pause, RotateCcw, SkipBack, SkipForward, Volume2, VolumeX, Maximize2 } from 'lucide-react';
import { Scene, TextLayer } from '../../types/video';

interface TimelineProps {
  currentTime: number;
  duration: number;
  isPlaying: boolean;
  onPlayPause: () => void;
  onSeek: (time: number) => void;
  onStepFrame: (direction: -1 | 1) => void;
  scenes: Scene[];
  activeTexts: TextLayer[];
  playbackRate: number;
  onChangePlaybackRate: (rate: number) => void;
  isMuted: boolean;
  onToggleMute: () => void;
  onFitZoom: () => void;
}

export const Timeline: React.FC<TimelineProps> = ({
  currentTime,
  duration,
  isPlaying,
  onPlayPause,
  onSeek,
  onStepFrame,
  scenes,
  playbackRate,
  onChangePlaybackRate,
  isMuted,
  onToggleMute,
  onFitZoom,
}) => {
  const scrubberTrackRef = useRef<HTMLDivElement>(null);

  // Format seconds to MM:SS.ff
  const formatTimecode = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const hundredths = Math.floor((seconds % 1) * 100);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${hundredths.toString().padStart(2, '0')}`;
  };

  const currentFrame = Math.floor(currentTime * 30);
  const totalFrames = Math.floor(duration * 30);

  // Handle scrubber drag / click
  const handleScrubberInteract = (e: React.MouseEvent<HTMLDivElement> | MouseEvent) => {
    if (!scrubberTrackRef.current) return;
    const rect = scrubberTrackRef.current.getBoundingClientRect();
    const clickX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const targetTime = (clickX / rect.width) * duration;
    onSeek(Math.max(0, Math.min(targetTime, duration)));
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    handleScrubberInteract(e);

    const onMouseMove = (moveEvent: MouseEvent) => {
      handleScrubberInteract(moveEvent);
    };

    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  // Keyboard shortcut listener for spacebar play/pause
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.code === 'Space') {
        e.preventDefault();
        onPlayPause();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        onStepFrame(-1);
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        onStepFrame(1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onPlayPause, onStepFrame]);

  const progressPercent = (currentTime / duration) * 100;

  return (
    <div className="bg-[#121316] border-t border-white/10 text-white select-none px-4 py-3 flex flex-col gap-2">
      {/* Upper Controls Row */}
      <div className="flex items-center justify-between gap-4">
        {/* Playback Transport Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onSeek(0)}
            className="p-1.5 rounded hover:bg-white/10 text-white/70 hover:text-white transition-colors"
            title="Reset to 00:00"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={() => onStepFrame(-1)}
            className="p-1.5 rounded hover:bg-white/10 text-white/70 hover:text-white transition-colors"
            title="Step Back 1 Frame (Left Arrow)"
          >
            <SkipBack className="w-4 h-4" />
          </button>
          <button
            onClick={onPlayPause}
            className="px-3.5 py-1.5 rounded-lg bg-white text-black font-semibold hover:bg-white/90 active:scale-95 transition-all flex items-center gap-1.5 text-sm shadow-md"
            title="Play / Pause (Space)"
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 fill-current" /> Pause
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" /> Play
              </>
            )}
          </button>
          <button
            onClick={() => onStepFrame(1)}
            className="p-1.5 rounded hover:bg-white/10 text-white/70 hover:text-white transition-colors"
            title="Step Forward 1 Frame (Right Arrow)"
          >
            <SkipForward className="w-4 h-4" />
          </button>
        </div>

        {/* Timecode & Frame Counter */}
        <div className="flex items-center gap-3 font-mono text-xs">
          <div className="bg-black/40 px-3 py-1.5 rounded border border-white/10 flex items-center gap-2">
            <span className="text-white font-bold tracking-wider">{formatTimecode(currentTime)}</span>
            <span className="text-white/40">/</span>
            <span className="text-white/60">{formatTimecode(duration)}</span>
          </div>
          <div className="hidden sm:block text-white/50 text-[11px] tabular-nums">
            Frame {currentFrame} / {totalFrames} (30 fps)
          </div>
        </div>

        {/* Speed, Audio & View Options */}
        <div className="flex items-center gap-3">
          {/* Speed Selector */}
          <div className="flex items-center bg-black/40 rounded p-0.5 border border-white/10 text-xs">
            {[0.5, 1.0, 1.5, 2.0].map((rate) => (
              <button
                key={rate}
                onClick={() => onChangePlaybackRate(rate)}
                className={`px-2 py-0.5 rounded transition-colors ${
                  playbackRate === rate ? 'bg-white/20 text-white font-bold' : 'text-white/60 hover:text-white'
                }`}
              >
                {rate}x
              </button>
            ))}
          </div>

          {/* Mute Toggle */}
          <button
            onClick={onToggleMute}
            className="p-1.5 rounded hover:bg-white/10 text-white/70 hover:text-white transition-colors"
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Canvas Fit Zoom Button */}
          <button
            onClick={onFitZoom}
            className="p-1.5 rounded hover:bg-white/10 text-white/70 hover:text-white transition-colors"
            title="Fit Canvas to Viewport"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Timeline Scrubber Track */}
      <div className="relative pt-1 pb-1">
        {/* Scrubber Ruler with Scene Blocks */}
        <div
          ref={scrubberTrackRef}
          onMouseDown={handleMouseDown}
          className="relative h-12 bg-black/50 rounded-lg border border-white/10 overflow-hidden cursor-pointer select-none group"
        >
          {/* Scene Dividers & Labels */}
          {scenes.map((scene) => {
            const startPct = (scene.start / duration) * 100;
            const widthPct = ((scene.end - scene.start) / duration) * 100;
            const isCurrentScene = currentTime >= scene.start && currentTime < scene.end;

            return (
              <div
                key={scene.id}
                onClick={(e) => {
                  e.stopPropagation();
                  onSeek(scene.start);
                }}
                className={`absolute top-0 bottom-0 border-r border-white/15 px-1 py-1 overflow-hidden transition-colors hover:bg-white/10 ${
                  isCurrentScene ? 'bg-white/10' : ''
                }`}
                style={{
                  left: `${startPct}%`,
                  width: `${widthPct}%`,
                }}
                title={`Scene ${scene.id}: ${scene.title} (${scene.start.toFixed(1)}s - ${scene.end.toFixed(1)}s)`}
              >
                <div className="text-[10px] font-mono font-semibold truncate text-white/70 leading-none">
                  {scene.id}. {scene.title}
                </div>
                <div className="text-[9px] text-white/40 mt-1 truncate">
                  {scene.start.toFixed(1)}s
                </div>
              </div>
            );
          })}

          {/* Scrubber Progress Fill Bar */}
          <div
            className="absolute top-0 bottom-0 left-0 bg-blue-500/20 pointer-events-none"
            style={{ width: `${progressPercent}%` }}
          />

          {/* Red Needle Playhead */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-30 pointer-events-none"
            style={{ left: `${progressPercent}%` }}
          >
            {/* Playhead Flag Cap */}
            <div className="absolute -top-1 -left-1.5 w-3.5 h-3.5 bg-red-500 rounded-sm shadow-md" />
          </div>
        </div>
      </div>
    </div>
  );
};
