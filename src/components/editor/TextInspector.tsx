import React, { useState } from 'react';
import { Search, Clock, Sliders, Type, Bold, Eye, EyeOff, RotateCcw } from 'lucide-react';
import { TextLayer, TextAnimationType, VideoProjectState } from '../../types/video';

interface TextInspectorProps {
  texts: TextLayer[];
  watermark: VideoProjectState['watermark'];
  selectedLayerId: string | null;
  currentTime: number;
  onSelectLayer: (layerId: string) => void;
  onUpdateLayer: (updatedLayer: TextLayer) => void;
  onUpdateWatermark: (updatedWatermark: VideoProjectState['watermark']) => void;
  onSeek: (time: number) => void;
}

export const TextInspector: React.FC<TextInspectorProps> = ({
  texts,
  watermark,
  selectedLayerId,
  currentTime,
  onSelectLayer,
  onUpdateLayer,
  onUpdateWatermark,
  onSeek,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMode, setFilterMode] = useState<'all' | 'active' | 'selected'>('all');

  const selectedLayer = texts.find((t) => t.id === selectedLayerId);

  // Filtered layers
  const filteredLayers = texts.filter((layer) => {
    const matchesSearch =
      layer.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      layer.content.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (filterMode === 'active') {
      return currentTime >= layer.start && currentTime <= layer.end;
    }
    if (filterMode === 'selected') {
      return layer.id === selectedLayerId;
    }
    return true;
  });

  // Helper to wrap selected text with **bold**
  const handleToggleBoldSelection = () => {
    if (!selectedLayer) return;
    const input = document.getElementById('text-content-input') as HTMLTextAreaElement | null;
    if (!input) return;

    const start = input.selectionStart;
    const end = input.selectionEnd;
    const currentVal = selectedLayer.content;

    if (start !== end) {
      const selectedPart = currentVal.substring(start, end);
      const newVal = `${currentVal.substring(0, start)}**${selectedPart}**${currentVal.substring(end)}`;
      onUpdateLayer({ ...selectedLayer, content: newVal });
    } else {
      // Just append **bold**
      onUpdateLayer({ ...selectedLayer, content: `${currentVal} **bold**` });
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#16171b] text-white border-l border-white/10 select-none">
      {/* Header & Search */}
      <div className="p-4 border-b border-white/10 flex flex-col gap-3 shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Type className="w-4 h-4 text-white/70" />
            <h2 className="font-semibold text-sm tracking-tight text-white">Text Layers & Watermark</h2>
          </div>
          <span className="text-xs font-mono text-white/50">{texts.length} layers</span>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-white/40 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search layers (e.g. T01, rockets, SpaceX)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-black/40 border border-white/10 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-colors"
          />
        </div>

        {/* Filter Segmented Control */}
        <div className="flex items-center gap-1 p-1 bg-black/40 rounded-lg border border-white/5 text-xs">
          <button
            onClick={() => setFilterMode('all')}
            className={`flex-1 py-1 rounded text-center transition-colors ${
              filterMode === 'all' ? 'bg-white/15 text-white font-medium' : 'text-white/60 hover:text-white'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilterMode('active')}
            className={`flex-1 py-1 rounded text-center transition-colors ${
              filterMode === 'active' ? 'bg-white/15 text-white font-medium' : 'text-white/60 hover:text-white'
            }`}
          >
            Active Now
          </button>
          <button
            onClick={() => setFilterMode('selected')}
            className={`flex-1 py-1 rounded text-center transition-colors ${
              filterMode === 'selected' ? 'bg-white/15 text-white font-medium' : 'text-white/60 hover:text-white'
            }`}
          >
            Selected
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto divide-y divide-white/5">
        {/* ================= Watermark W01 Editor Section ================= */}
        <div
          className={`p-3.5 transition-colors cursor-pointer ${
            selectedLayerId === 'W01' ? 'bg-blue-900/20 border-l-2 border-blue-500' : 'hover:bg-white/[0.02]'
          }`}
          onClick={() => onSelectLayer('W01')}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold bg-white/10 text-white px-1.5 py-0.5 rounded">
                W01
              </span>
              <span className="text-xs font-medium text-white/90">Permanent Watermark</span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onUpdateWatermark({ ...watermark, visible: !watermark.visible });
              }}
              className="p-1 rounded hover:bg-white/10 text-white/60 hover:text-white"
              title={watermark.visible ? 'Hide Watermark' : 'Show Watermark'}
            >
              {watermark.visible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5 text-red-400" />}
            </button>
          </div>

          <div className="space-y-2">
            <input
              type="text"
              value={watermark.text}
              onChange={(e) => onUpdateWatermark({ ...watermark, text: e.target.value })}
              className="w-full bg-black/40 border border-white/10 rounded px-2.5 py-1 text-xs text-white focus:outline-none focus:border-white/30"
              placeholder="Watermark text..."
            />
            <div className="flex items-center justify-between text-[11px] text-white/60">
              <span>Position Y: {watermark.y}%</span>
              <input
                type="range"
                min="50"
                max="96"
                value={watermark.y}
                onChange={(e) => onUpdateWatermark({ ...watermark, y: Number(e.target.value) })}
                className="w-32 accent-white/80"
              />
            </div>
          </div>
        </div>

        {/* ================= Selected Layer Detailed Editor ================= */}
        {selectedLayer && (
          <div className="p-4 bg-white/[0.03] space-y-3.5 border-b border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold bg-blue-600 text-white px-2 py-0.5 rounded shadow">
                  {selectedLayer.id}
                </span>
                <span className="text-xs text-white/60">Scene {selectedLayer.sceneId}</span>
              </div>
              <button
                onClick={() => onSeek(selectedLayer.start)}
                className="flex items-center gap-1 text-[11px] text-blue-400 hover:text-blue-300 font-mono"
                title="Jump playback to layer start"
              >
                <Clock className="w-3 h-3" />
                {selectedLayer.start.toFixed(1)}s - {selectedLayer.end.toFixed(1)}s
              </button>
            </div>

            {/* Content Textarea with Bold Markdown instruction */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[11px] text-white/60">
                <span>Text Content (use **word** for bold)</span>
                <button
                  type="button"
                  onClick={handleToggleBoldSelection}
                  className="flex items-center gap-1 text-[10px] bg-white/10 hover:bg-white/20 text-white px-1.5 py-0.5 rounded transition-colors"
                  title="Make selected text bold (**word**)"
                >
                  <Bold className="w-3 h-3" /> Bold Word
                </button>
              </div>
              <textarea
                id="text-content-input"
                rows={2}
                value={selectedLayer.content}
                onChange={(e) => onUpdateLayer({ ...selectedLayer, content: e.target.value })}
                className="w-full bg-black/50 border border-white/15 rounded-lg p-2.5 text-xs text-white font-sans focus:outline-none focus:border-blue-500 transition-colors resize-none"
              />
            </div>

            {/* Timing Controls */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] text-white/50 block mb-1">Start Time (sec)</label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max={selectedLayer.end}
                  value={selectedLayer.start}
                  onChange={(e) => onUpdateLayer({ ...selectedLayer, start: parseFloat(e.target.value) || 0 })}
                  className="w-full bg-black/40 border border-white/10 rounded px-2 py-1 text-xs text-white font-mono"
                />
              </div>
              <div>
                <label className="text-[10px] text-white/50 block mb-1">End Time (sec)</label>
                <input
                  type="number"
                  step="0.1"
                  min={selectedLayer.start}
                  max="85"
                  value={selectedLayer.end}
                  onChange={(e) => onUpdateLayer({ ...selectedLayer, end: parseFloat(e.target.value) || 84.8 })}
                  className="w-full bg-black/40 border border-white/10 rounded px-2 py-1 text-xs text-white font-mono"
                />
              </div>
            </div>

            {/* Position Controls */}
            <div className="space-y-2 pt-1 border-t border-white/5">
              <div className="flex items-center justify-between text-[11px] text-white/60">
                <span>Position X: {selectedLayer.x}%</span>
                <input
                  type="range"
                  min="10"
                  max="90"
                  value={selectedLayer.x}
                  onChange={(e) => onUpdateLayer({ ...selectedLayer, x: Number(e.target.value) })}
                  className="w-36 accent-blue-500"
                />
              </div>
              <div className="flex items-center justify-between text-[11px] text-white/60">
                <span>Position Y: {selectedLayer.y}%</span>
                <input
                  type="range"
                  min="10"
                  max="90"
                  value={selectedLayer.y}
                  onChange={(e) => onUpdateLayer({ ...selectedLayer, y: Number(e.target.value) })}
                  className="w-36 accent-blue-500"
                />
              </div>
              <div className="flex items-center justify-between text-[11px] text-white/60">
                <span>Font Size: {selectedLayer.fontSize}px</span>
                <input
                  type="range"
                  min="20"
                  max="110"
                  value={selectedLayer.fontSize}
                  onChange={(e) => onUpdateLayer({ ...selectedLayer, fontSize: Number(e.target.value) })}
                  className="w-36 accent-blue-500"
                />
              </div>
            </div>

            {/* Alignment & Animation */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <div>
                <label className="text-[10px] text-white/50 block mb-1">Align</label>
                <select
                  value={selectedLayer.textAlign || 'center'}
                  onChange={(e) =>
                    onUpdateLayer({ ...selectedLayer, textAlign: e.target.value as 'left' | 'center' | 'right' })
                  }
                  className="w-full bg-black/40 border border-white/10 rounded px-2 py-1 text-xs text-white"
                >
                  <option value="center">Center</option>
                  <option value="left">Left</option>
                  <option value="right">Right</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] text-white/50 block mb-1">Animation</label>
                <select
                  value={selectedLayer.animation}
                  onChange={(e) =>
                    onUpdateLayer({ ...selectedLayer, animation: e.target.value as TextAnimationType })
                  }
                  className="w-full bg-black/40 border border-white/10 rounded px-2 py-1 text-xs text-white"
                >
                  <option value="blur-in-word">Word Blur-In</option>
                  <option value="blur-in-letter">Letter Typing</option>
                  <option value="scale-blur">Scale & Blur</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* ================= All Layers List ================= */}
        <div className="divide-y divide-white/5">
          {filteredLayers.map((layer) => {
            const isCurrent = currentTime >= layer.start && currentTime <= layer.end;
            const isSelected = layer.id === selectedLayerId;

            return (
              <div
                key={layer.id}
                onClick={() => {
                  onSelectLayer(layer.id);
                  onSeek(layer.start);
                }}
                className={`p-3 cursor-pointer transition-colors ${
                  isSelected
                    ? 'bg-blue-900/30 border-l-2 border-blue-500'
                    : isCurrent
                    ? 'bg-white/[0.05]'
                    : 'hover:bg-white/[0.02]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`font-mono text-[10px] font-bold px-1.5 py-0.2 rounded ${
                        isSelected ? 'bg-blue-600 text-white' : 'bg-white/10 text-white/70'
                      }`}
                    >
                      {layer.id}
                    </span>
                    <span className="text-[10px] text-white/40">Scene {layer.sceneId}</span>
                  </div>
                  <span className="font-mono text-[10px] text-white/50">
                    {layer.start.toFixed(1)}s - {layer.end.toFixed(1)}s
                  </span>
                </div>
                <p className="text-xs text-white/90 truncate font-sans">
                  {layer.content}
                </p>
              </div>
            );
          })}

          {filteredLayers.length === 0 && (
            <div className="p-8 text-center text-white/40 text-xs">
              No text layers found matching filter.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
