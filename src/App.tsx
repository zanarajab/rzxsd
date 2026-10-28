import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Type,
  Image as ImageIcon,
  Layers,
  Music,
  Download,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Sliders,
  Sparkles,
} from 'lucide-react';
import { VideoProjectState, TextLayer, ImageSlot } from './types/video';
import { INITIAL_PROJECT_STATE, INITIAL_SCENES } from './data/initialProject';
import { VideoCanvas } from './components/video/VideoCanvas';
import { Timeline } from './components/editor/Timeline';
import { TextInspector } from './components/editor/TextInspector';
import { ImageSlotInspector } from './components/editor/ImageSlotInspector';
import { SceneNavigator } from './components/editor/SceneNavigator';
import { AudioModal } from './components/editor/AudioModal';
import { ExportModal } from './components/editor/ExportModal';
import { audioEngine } from './utils/audioEngine';

export default function App() {
  const [project, setProject] = useState<VideoProjectState>(INITIAL_PROJECT_STATE);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [isMuted, setIsMuted] = useState(false);
  const [activeTab, setActiveTab] = useState<'texts' | 'images' | 'scenes'>('texts');
  const [selectedLayerId, setSelectedLayerId] = useState<string | null>('T01');
  const [isAudioModalOpen, setIsAudioModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [canvasZoom, setCanvasZoom] = useState(0.55);

  const lastTimeRef = useRef<number | null>(null);
  const prevSceneRef = useRef<number>(1);
  const animationFrameRef = useRef<number | null>(null);

  // Compute active scene ID from currentTime
  const getSceneIdAtTime = (t: number) => {
    const scene = INITIAL_SCENES.find((s) => t >= s.start && t < s.end);
    return scene ? scene.id : 22;
  };

  // Main playback animation loop with requestAnimationFrame
  useEffect(() => {
    if (!isPlaying) {
      lastTimeRef.current = null;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      audioEngine.stopAmbient();
      audioEngine.syncPlayback(false, currentTime);
      return;
    }

    if (!isMuted && project.audioSettings.enabled && project.audioSettings.ambientSynth) {
      audioEngine.startAmbient();
    }
    audioEngine.syncPlayback(true, currentTime);

    const step = (timestamp: number) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = timestamp;
      }

      const deltaSeconds = ((timestamp - lastTimeRef.current) / 1000) * playbackRate;
      lastTimeRef.current = timestamp;

      setCurrentTime((prev) => {
        const nextTime = prev + deltaSeconds;
        if (nextTime >= project.duration) {
          setIsPlaying(false);
          return project.duration;
        }

        // Check for scene transition for whoosh sound
        const currentSc = getSceneIdAtTime(nextTime);
        if (currentSc !== prevSceneRef.current) {
          if (!isMuted && project.audioSettings.transitionWhooshes) {
            audioEngine.playTransitionWhoosh(currentSc);
          }
          prevSceneRef.current = currentSc;
        }

        return nextTime;
      });

      animationFrameRef.current = requestAnimationFrame(step);
    };

    animationFrameRef.current = requestAnimationFrame(step);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying, playbackRate, project.duration, isMuted, project.audioSettings, currentTime]);

  // Handle play/pause toggle
  const handlePlayPause = useCallback(() => {
    setIsPlaying((prev) => {
      const next = !prev;
      if (next && currentTime >= project.duration) {
        setCurrentTime(0);
      }
      return next;
    });
  }, [currentTime, project.duration]);

  // Handle frame step forward/back (30 fps = 1/30s ~ 0.0333s)
  const handleStepFrame = useCallback(
    (direction: -1 | 1) => {
      setIsPlaying(false);
      setCurrentTime((prev) => {
        const newTime = prev + direction * (1 / 30);
        return Math.max(0, Math.min(newTime, project.duration));
      });
    },
    [project.duration]
  );

  // Handle direct seek
  const handleSeek = useCallback(
    (time: number) => {
      const clamped = Math.max(0, Math.min(time, project.duration));
      setCurrentTime(clamped);
      audioEngine.syncPlayback(isPlaying, clamped);
    },
    [project.duration, isPlaying]
  );

  // Fit canvas zoom based on viewport window height
  const handleFitZoom = useCallback(() => {
    const availableHeight = window.innerHeight - 240; // account for top bar and timeline
    const targetScale = Math.min(0.85, Math.max(0.35, availableHeight / 1280));
    setCanvasZoom(Number(targetScale.toFixed(2)));
  }, []);

  useEffect(() => {
    handleFitZoom();
    window.addEventListener('resize', handleFitZoom);
    return () => window.removeEventListener('resize', handleFitZoom);
  }, [handleFitZoom]);

  // Handle updating a single text layer
  const handleUpdateLayer = (updatedLayer: TextLayer) => {
    setProject((prev) => ({
      ...prev,
      texts: prev.texts.map((t) => (t.id === updatedLayer.id ? updatedLayer : t)),
    }));
  };

  // Handle updating watermark W01
  const handleUpdateWatermark = (updatedWatermark: VideoProjectState['watermark']) => {
    setProject((prev) => ({
      ...prev,
      watermark: updatedWatermark,
    }));
  };

  // Handle updating an image slot
  const handleUpdateImageSlot = (updatedSlot: ImageSlot) => {
    setProject((prev) => ({
      ...prev,
      imageSlots: prev.imageSlots.map((s) => (s.id === updatedSlot.id ? updatedSlot : s)),
    }));
  };

  // Handle updating audio settings
  const handleUpdateAudioSettings = (newAudioSettings: VideoProjectState['audioSettings']) => {
    setProject((prev) => ({
      ...prev,
      audioSettings: newAudioSettings,
    }));
    audioEngine.setVolume(newAudioSettings.volume);
    audioEngine.setCustomAudio(newAudioSettings.customAudioUrl);
  };

  // Active texts at current time
  const activeTexts = project.texts.filter(
    (t) => currentTime >= t.start && currentTime <= t.end
  );

  return (
    <div className="flex flex-col h-screen w-screen bg-[#0e0f12] text-white overflow-hidden font-sans">
      {/* =========================================================================
          TOP BAR CONTRACT (3-Zone strict contract)
          Zone 1: Brand title wordmark
          Zone 2: 4-5 single-line clean text links with subtle hover underlines
          Zone 3: 1 primary action button
         ========================================================================= */}
      <header className="flex items-center justify-between gap-8 px-6 py-3.5 bg-[#141519] border-b border-white/10 shrink-0 z-30">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3">
          <span className="text-base font-extrabold tracking-tight text-white whitespace-nowrap shrink-0">
            Insiderforce
          </span>
          <span className="text-[11px] font-mono text-white/40 border-l border-white/15 pl-3 hidden md:inline">
            Kinetic Typography Editor (9:16)
          </span>
        </div>

        {/* Zone 2: Single-line clean navigation tabs */}
        <nav className="flex items-center gap-6 text-xs font-medium text-white/60">
          <button
            onClick={() => setActiveTab('texts')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-white ${
              activeTab === 'texts' ? 'text-white font-bold underline decoration-2 underline-offset-8' : ''
            }`}
          >
            Text Layers ({project.texts.length})
          </button>
          <button
            onClick={() => setActiveTab('images')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-white ${
              activeTab === 'images' ? 'text-white font-bold underline decoration-2 underline-offset-8' : ''
            }`}
          >
            Image Slots ({project.imageSlots.length})
          </button>
          <button
            onClick={() => setActiveTab('scenes')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-white ${
              activeTab === 'scenes' ? 'text-white font-bold underline decoration-2 underline-offset-8' : ''
            }`}
          >
            Scenes (22)
          </button>
          <button
            onClick={() => setIsAudioModalOpen(true)}
            className="transition-colors whitespace-nowrap shrink-0 hover:text-white flex items-center gap-1.5"
          >
            <Music className="w-3.5 h-3.5 text-blue-400" />
            Audio Bed
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setIsExportModalOpen(true)}
            className="px-4 py-2 text-xs font-semibold text-black bg-white rounded-lg hover:bg-white/90 active:scale-95 transition-all shadow-md whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            Export Video
          </button>
        </div>
      </header>

      {/* =========================================================================
          MIDDLE WORKSPACE: Canvas Player (Center) + Inspector Sidebar (Right)
         ========================================================================= */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Main Canvas Viewport Area */}
        <main className="flex-1 flex flex-col items-center justify-center p-4 bg-[#0a0a0c] overflow-hidden relative">
          {/* Canvas Floating Zoom & Info Header */}
          <div className="absolute top-4 left-6 z-20 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-xs text-white/70">
            <span className="font-mono font-medium text-white">720 × 1280</span>
            <span className="text-white/30">|</span>
            <span className="text-white/60">30 fps</span>
            <span className="text-white/30">|</span>
            <span className="text-white/60">9:16 Vertical</span>
          </div>

          <div className="absolute top-4 right-6 z-20 flex items-center gap-1.5 bg-black/60 backdrop-blur-md p-1 rounded-lg border border-white/10 text-xs">
            <button
              onClick={() => setCanvasZoom((z) => Math.max(0.3, z - 0.05))}
              className="p-1 rounded hover:bg-white/10 text-white/70 hover:text-white"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="font-mono text-[11px] px-1 text-white/80">
              {Math.round(canvasZoom * 100)}%
            </span>
            <button
              onClick={() => setCanvasZoom((z) => Math.min(1.0, z + 0.05))}
              className="p-1 rounded hover:bg-white/10 text-white/70 hover:text-white"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleFitZoom}
              className="p-1 rounded hover:bg-white/10 text-white/70 hover:text-white ml-0.5"
              title="Fit to Window"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Canvas Wrapper */}
          <div className="relative flex items-center justify-center w-full h-full overflow-auto p-4">
            <VideoCanvas
              project={project}
              currentTime={currentTime}
              selectedLayerId={selectedLayerId}
              onSelectLayer={(id) => {
                setSelectedLayerId(id || null);
                if (id) setActiveTab('texts');
              }}
              scale={canvasZoom}
            />
          </div>
        </main>

        {/* Right Inspector Panel (Width 360px) */}
        <aside className="w-[360px] h-full shrink-0 flex flex-col bg-[#141519] border-l border-white/10 overflow-hidden">
          {activeTab === 'texts' && (
            <TextInspector
              texts={project.texts}
              watermark={project.watermark}
              selectedLayerId={selectedLayerId}
              currentTime={currentTime}
              onSelectLayer={(id) => setSelectedLayerId(id)}
              onUpdateLayer={handleUpdateLayer}
              onUpdateWatermark={handleUpdateWatermark}
              onSeek={handleSeek}
            />
          )}

          {activeTab === 'images' && (
            <ImageSlotInspector
              imageSlots={project.imageSlots}
              onUpdateImageSlot={handleUpdateImageSlot}
              onSeekToScene={(sceneId) => {
                const sc = INITIAL_SCENES.find((s) => s.id === sceneId);
                if (sc) handleSeek(sc.start);
              }}
            />
          )}

          {activeTab === 'scenes' && (
            <SceneNavigator
              scenes={INITIAL_SCENES}
              currentTime={currentTime}
              onSeekToScene={handleSeek}
            />
          )}
        </aside>
      </div>

      {/* =========================================================================
          BOTTOM MASTER TIMELINE
         ========================================================================= */}
      <Timeline
        currentTime={currentTime}
        duration={project.duration}
        isPlaying={isPlaying}
        onPlayPause={handlePlayPause}
        onSeek={handleSeek}
        onStepFrame={handleStepFrame}
        scenes={INITIAL_SCENES}
        activeTexts={activeTexts}
        playbackRate={playbackRate}
        onChangePlaybackRate={setPlaybackRate}
        isMuted={isMuted}
        onToggleMute={() => setIsMuted((m) => !m)}
        onFitZoom={handleFitZoom}
      />

      {/* Modals */}
      <AudioModal
        isOpen={isAudioModalOpen}
        onClose={() => setIsAudioModalOpen(false)}
        audioSettings={project.audioSettings}
        onUpdateAudioSettings={handleUpdateAudioSettings}
      />

      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        project={project}
        currentTime={currentTime}
        onImportProject={(imported) => {
          setProject(imported);
          setCurrentTime(0);
        }}
      />
    </div>
  );
}
