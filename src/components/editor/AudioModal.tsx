import React, { useRef } from 'react';
import { Volume2, VolumeX, Music, Upload, RotateCcw, X, Sliders } from 'lucide-react';
import { VideoProjectState } from '../../types/video';

interface AudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  audioSettings: VideoProjectState['audioSettings'];
  onUpdateAudioSettings: (settings: VideoProjectState['audioSettings']) => void;
}

export const AudioModal: React.FC<AudioModalProps> = ({
  isOpen,
  onClose,
  audioSettings,
  onUpdateAudioSettings,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const audioUrl = URL.createObjectURL(file);
    onUpdateAudioSettings({
      ...audioSettings,
      customAudioUrl: audioUrl,
    });
  };

  const handleResetAudio = () => {
    onUpdateAudioSettings({
      ...audioSettings,
      customAudioUrl: undefined,
      ambientSynth: true,
      transitionWhooshes: true,
      uiClicks: true,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
      <div className="bg-[#18191d] border border-white/10 rounded-2xl w-full max-w-md text-white shadow-2xl overflow-hidden">
        {/* Hidden File Input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleAudioUpload}
          accept="audio/mp3,audio/wav,audio/ogg,audio/m4a"
          className="hidden"
        />

        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Music className="w-5 h-5 text-blue-400" />
            <h3 className="font-semibold text-sm text-white">Audio & Sound FX Bed</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-white/10 text-white/50 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4 text-xs">
          {/* Master Volume */}
          <div className="space-y-1.5 bg-black/40 p-3.5 rounded-xl border border-white/5">
            <div className="flex items-center justify-between text-white/80">
              <span className="font-medium flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-white/60" /> Master Volume
              </span>
              <span className="font-mono text-white/60">{Math.round(audioSettings.volume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={audioSettings.volume}
              onChange={(e) =>
                onUpdateAudioSettings({ ...audioSettings, volume: parseFloat(e.target.value) })
              }
              className="w-full accent-blue-500"
            />
          </div>

          {/* Soundbed Modes */}
          <div className="space-y-2">
            <label className="text-[11px] font-semibold text-white/50 uppercase tracking-wider block">
              Sound Elements
            </label>

            {/* Ambient Synth Bed */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/5">
              <div>
                <div className="font-medium text-white/90">Cinematic Ambient Drone</div>
                <div className="text-[11px] text-white/40">Subtle D-minor analogue drone & low harmonic swell</div>
              </div>
              <input
                type="checkbox"
                checked={audioSettings.ambientSynth}
                onChange={(e) =>
                  onUpdateAudioSettings({ ...audioSettings, ambientSynth: e.target.checked })
                }
                className="w-4 h-4 accent-blue-500 cursor-pointer"
              />
            </div>

            {/* Transition Whoosh FX */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/5">
              <div>
                <div className="font-medium text-white/90">Scene Transition Whooshes</div>
                <div className="text-[11px] text-white/40">Filtered aerodynamic sweep on scene cuts</div>
              </div>
              <input
                type="checkbox"
                checked={audioSettings.transitionWhooshes}
                onChange={(e) =>
                  onUpdateAudioSettings({ ...audioSettings, transitionWhooshes: e.target.checked })
                }
                className="w-4 h-4 accent-blue-500 cursor-pointer"
              />
            </div>

            {/* UI Clicks FX */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/5">
              <div>
                <div className="font-medium text-white/90">Cursor / Button Clicks</div>
                <div className="text-[11px] text-white/40">Tactile acoustic feedback on clicks</div>
              </div>
              <input
                type="checkbox"
                checked={audioSettings.uiClicks}
                onChange={(e) =>
                  onUpdateAudioSettings({ ...audioSettings, uiClicks: e.target.checked })
                }
                className="w-4 h-4 accent-blue-500 cursor-pointer"
              />
            </div>
          </div>

          {/* Custom Audio Upload */}
          <div className="p-3.5 bg-black/40 rounded-xl border border-white/5 space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-white/90">Replaceable Audio Bed</div>
                <div className="text-[11px] text-white/40">
                  {audioSettings.customAudioUrl
                    ? 'Custom audio file loaded'
                    : 'Using procedural cinematic synthesizer'}
                </div>
              </div>
              {audioSettings.customAudioUrl && (
                <button
                  onClick={handleResetAudio}
                  className="p-1 rounded hover:bg-white/10 text-white/60 hover:text-white"
                  title="Reset to procedural synthesizer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full py-2 px-3 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium flex items-center justify-center gap-2 transition-colors"
            >
              <Upload className="w-3.5 h-3.5" />
              Upload Audio Track (MP3/WAV)
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-black/40 border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-white text-black font-semibold hover:bg-white/90 transition-colors text-xs"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
