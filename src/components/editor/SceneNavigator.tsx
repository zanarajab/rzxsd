import React from 'react';
import { Layers, Play, Clock, ArrowRight } from 'lucide-react';
import { Scene } from '../../types/video';

interface SceneNavigatorProps {
  scenes: Scene[];
  currentTime: number;
  onSeekToScene: (time: number) => void;
}

export const SceneNavigator: React.FC<SceneNavigatorProps> = ({
  scenes,
  currentTime,
  onSeekToScene,
}) => {
  return (
    <div className="flex flex-col h-full bg-[#16171b] text-white border-l border-white/10 select-none">
      <div className="p-4 border-b border-white/10 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-white/70" />
          <h2 className="font-semibold text-sm tracking-tight text-white">Scene Directory (22 Scenes)</h2>
        </div>
        <span className="text-xs font-mono text-white/50">84.8s Total</span>
      </div>

      <div className="flex-1 overflow-y-auto divide-y divide-white/5 p-2 space-y-1.5">
        {scenes.map((scene) => {
          const isCurrent = currentTime >= scene.start && currentTime < scene.end;

          return (
            <div
              key={scene.id}
              onClick={() => onSeekToScene(scene.start)}
              className={`p-3 rounded-xl border transition-all cursor-pointer ${
                isCurrent
                  ? 'bg-blue-900/30 border-blue-500/50 shadow-md'
                  : 'bg-black/30 border-white/5 hover:border-white/20 hover:bg-white/[0.03]'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span
                    className={`font-mono text-xs font-bold px-2 py-0.5 rounded ${
                      isCurrent ? 'bg-blue-600 text-white' : 'bg-white/10 text-white/80'
                    }`}
                  >
                    Scene {scene.id}
                  </span>
                  <h3 className="text-xs font-semibold text-white/95 truncate max-w-[200px]">
                    {scene.title}
                  </h3>
                </div>
                <span className="font-mono text-[11px] text-white/50 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {scene.start.toFixed(1)}s - {scene.end.toFixed(1)}s
                </span>
              </div>

              <p className="text-[11px] text-white/60 line-clamp-2 leading-relaxed">
                {scene.description}
              </p>

              <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/5 text-[10px] text-white/40">
                <div className="flex items-center gap-2">
                  {scene.hasInkWedge && scene.hasInkWedge !== 'none' && (
                    <span className="bg-white/5 px-1.5 py-0.5 rounded text-white/60">
                      Ink Wedge: {scene.hasInkWedge}
                    </span>
                  )}
                  {scene.hasDottedGrid && (
                    <span className="bg-white/5 px-1.5 py-0.5 rounded text-white/60">
                      Dotted Grid
                    </span>
                  )}
                </div>

                <span className="text-blue-400 flex items-center gap-1">
                  Jump <ArrowRight className="w-2.5 h-2.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
