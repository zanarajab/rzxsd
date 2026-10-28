import React, { useRef } from 'react';
import { Image, Upload, RotateCcw, ExternalLink, Sparkles } from 'lucide-react';
import { ImageSlot } from '../../types/video';

interface ImageSlotInspectorProps {
  imageSlots: ImageSlot[];
  onUpdateImageSlot: (updatedSlot: ImageSlot) => void;
  onSeekToScene: (sceneId: number) => void;
}

export const ImageSlotInspector: React.FC<ImageSlotInspectorProps> = ({
  imageSlots,
  onUpdateImageSlot,
  onSeekToScene,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const activeSlotIdRef = useRef<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !activeSlotIdRef.current) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      const targetSlot = imageSlots.find((s) => s.id === activeSlotIdRef.current);
      if (targetSlot) {
        onUpdateImageSlot({
          ...targetSlot,
          customUrl: dataUrl,
          style: 'custom',
        });
      }
    };
    reader.readAsDataURL(file);
    // Reset file input
    e.target.value = '';
  };

  const triggerUpload = (slotId: string) => {
    activeSlotIdRef.current = slotId;
    fileInputRef.current?.click();
  };

  const handleResetSlot = (slotId: string) => {
    const targetSlot = imageSlots.find((s) => s.id === slotId);
    if (targetSlot) {
      onUpdateImageSlot({
        ...targetSlot,
        customUrl: undefined,
        style: 'soft-3d',
      });
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#16171b] text-white border-l border-white/10 select-none">
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="image/png,image/jpeg,image/webp,image/svg+xml"
        className="hidden"
      />

      {/* Header */}
      <div className="p-4 border-b border-white/10 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <Image className="w-4 h-4 text-white/70" />
          <h2 className="font-semibold text-sm tracking-tight text-white">Replaceable Image Slots</h2>
        </div>
        <span className="text-xs font-mono text-white/50">{imageSlots.length} slots</span>
      </div>

      <div className="p-3 text-[11px] text-white/50 bg-white/[0.02] border-b border-white/5">
        Upload custom images/graphics or keep the built-in monochrome Apple-keynote soft 3D clay renders.
      </div>

      {/* Slot Items */}
      <div className="flex-1 overflow-y-auto divide-y divide-white/5 p-2 space-y-2">
        {imageSlots.map((slot) => {
          const isCustom = Boolean(slot.customUrl);

          return (
            <div
              key={slot.id}
              className="p-3.5 bg-black/40 rounded-xl border border-white/10 space-y-3 hover:border-white/20 transition-all"
            >
              {/* Slot Header */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-[10px] font-bold bg-white/10 text-white px-1.5 py-0.5 rounded">
                      {slot.id}
                    </span>
                    <h3 className="text-xs font-semibold text-white/95">{slot.name}</h3>
                  </div>
                  <p className="text-[11px] text-white/50 leading-relaxed">{slot.description}</p>
                </div>
              </div>

              {/* Status & Preview */}
              <div className="flex items-center justify-between text-xs pt-1">
                <div className="flex items-center gap-1.5">
                  {isCustom ? (
                    <span className="text-[10px] font-mono font-medium text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2 py-0.5 rounded">
                      Custom Asset Active
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono text-white/50 bg-white/5 px-2 py-0.5 rounded">
                      Default 3D Render
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1">
                  {slot.sceneIds.map((scId) => (
                    <button
                      key={scId}
                      onClick={() => onSeekToScene(scId)}
                      className="text-[10px] text-blue-400 hover:text-blue-300 font-mono hover:underline flex items-center gap-0.5"
                      title={`Jump to Scene ${scId}`}
                    >
                      Sc.{scId} <ExternalLink className="w-2.5 h-2.5" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Image Preview if available */}
              {isCustom && slot.customUrl && (
                <div className="relative w-full h-24 bg-black/60 rounded-lg overflow-hidden border border-white/10 flex items-center justify-center p-2">
                  <img
                    src={slot.customUrl}
                    alt={slot.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => triggerUpload(slot.id)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-colors"
                >
                  <Upload className="w-3.5 h-3.5" />
                  {isCustom ? 'Replace Image' : 'Upload Image'}
                </button>

                {isCustom && (
                  <button
                    onClick={() => handleResetSlot(slot.id)}
                    className="flex items-center justify-center gap-1 py-1.5 px-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white text-xs transition-colors"
                    title="Reset to default 3D render"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
