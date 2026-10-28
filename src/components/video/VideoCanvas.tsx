import React, { useMemo } from 'react';
import { VideoProjectState } from '../../types/video';
import { KineticTextLayer } from './KineticTextLayer';
import { DottedGridCircle } from '../artwork/DottedGridCircle';
import { InkWedge } from '../artwork/InkWedge';
import { CurvedRibbon } from '../artwork/CurvedRibbon';
import { ShuttleArtwork } from '../artwork/ShuttleArtwork';
import { SilhouettePitch } from '../artwork/SilhouettePitch';
import { ChatGPTArtwork } from '../artwork/ChatGPTArtwork';
import { BrainArtwork } from '../artwork/BrainArtwork';
import { CrumpledPaperBin } from '../artwork/CrumpledPaperBin';
import { SilhouetteMask } from '../artwork/SilhouetteMask';
import { PortraitPhoto } from '../artwork/PortraitPhoto';
import { SpaceXLogoArtwork } from '../artwork/SpaceXLogoArtwork';
import { ChessPiece } from '../artwork/ChessPiecesArtwork';
import { SilhouettePower } from '../artwork/SilhouettePower';
import { MouseCursorArtwork } from '../artwork/MouseCursorArtwork';
import { DashedBox } from '../artwork/DashedBox';
import { FollowButtonArtwork } from '../artwork/FollowButtonArtwork';

interface VideoCanvasProps {
  project: VideoProjectState;
  currentTime: number;
  selectedLayerId?: string | null;
  onSelectLayer?: (layerId: string) => void;
  scale?: number; // visual scale of container
}

export const VideoCanvas: React.FC<VideoCanvasProps> = ({
  project,
  currentTime,
  selectedLayerId,
  onSelectLayer,
  scale = 1,
}) => {
  const { texts, imageSlots, watermark } = project;

  // Helper to get image slot custom URL if replaced
  const getImageCustomUrl = (slotId: string) => {
    return imageSlots.find((s) => s.id === slotId)?.customUrl;
  };

  // Determine current active scene
  const activeSceneId = useMemo(() => {
    if (currentTime < 4.0) return 1;
    if (currentTime < 10.0) return 2;
    if (currentTime < 14.0) return 3;
    if (currentTime < 20.0) return 4;
    if (currentTime < 23.0) return 5;
    if (currentTime < 26.0) return 6;
    if (currentTime < 29.0) return 7;
    if (currentTime < 33.0) return 8;
    if (currentTime < 37.0) return 9;
    if (currentTime < 40.0) return 10;
    if (currentTime < 44.0) return 11;
    if (currentTime < 48.0) return 12;
    if (currentTime < 51.0) return 13;
    if (currentTime < 55.0) return 14;
    if (currentTime < 59.0) return 15;
    if (currentTime < 62.0) return 16;
    if (currentTime < 65.0) return 17;
    if (currentTime < 67.0) return 18;
    if (currentTime < 71.0) return 19;
    if (currentTime < 74.0) return 20;
    if (currentTime < 79.0) return 21;
    return 22;
  }, [currentTime]);

  // Ink wedge progress calculations
  const inLeftWedge = useMemo(() => {
    // 0:10 (Scene 2 end), 0:11-0:12 (Scene 3), 0:20 (Scene 4 end), 0:21-0:22 (Scene 5),
    // 0:26 (Scene 6 end), 0:37 (Scene 9 end), 0:44-0:45 (Scene 12), 0:52 (Scene 14),
    // 0:54 (Scene 14 end), 0:59 (Scene 15 end), 1:00 (Scene 16), 1:10-1:11 (Scene 19), 1:12-1:13 (Scene 20)
    const checkWedge = (t0: number, t1: number) => {
      if (currentTime >= t0 && currentTime <= t1) {
        const mid = (t0 + t1) / 2;
        return currentTime < mid
          ? (currentTime - t0) / (mid - t0)
          : (t1 - currentTime) / (t1 - mid);
      }
      return 0;
    };

    return Math.max(
      checkWedge(9.4, 10.2),
      checkWedge(10.8, 12.2),
      checkWedge(19.4, 20.3),
      checkWedge(21.0, 22.2),
      checkWedge(25.4, 26.3),
      checkWedge(36.4, 37.3),
      checkWedge(44.0, 45.4),
      checkWedge(51.8, 52.8),
      checkWedge(53.8, 54.8),
      checkWedge(58.5, 59.4),
      checkWedge(59.8, 60.5),
      checkWedge(70.0, 71.3),
      checkWedge(72.0, 73.5)
    );
  }, [currentTime]);

  const inRightWedge = useMemo(() => {
    // 0:10 (Scene 2 end), 0:12 (Scene 3), 0:20-0:21 (Scene 5), 0:26 (Scene 6 end),
    // 0:27 (Scene 7), 0:37 (Scene 10), 0:39 (Scene 10), 0:44-0:45 (Scene 12),
    // 0:52-0:53 (Scene 14), 1:01 (Scene 16), 1:11 (Scene 19), 1:13 (Scene 20)
    const checkWedge = (t0: number, t1: number) => {
      if (currentTime >= t0 && currentTime <= t1) {
        const mid = (t0 + t1) / 2;
        return currentTime < mid
          ? (currentTime - t0) / (mid - t0)
          : (t1 - currentTime) / (t1 - mid);
      }
      return 0;
    };

    return Math.max(
      checkWedge(9.4, 10.2),
      checkWedge(11.8, 12.6),
      checkWedge(20.0, 21.2),
      checkWedge(25.4, 26.3),
      checkWedge(27.0, 27.8),
      checkWedge(37.0, 37.8),
      checkWedge(39.0, 40.0),
      checkWedge(44.4, 45.6),
      checkWedge(52.2, 53.6),
      checkWedge(61.0, 62.0),
      checkWedge(70.5, 71.4),
      checkWedge(72.5, 73.8)
    );
  }, [currentTime]);

  return (
    <div
      id="video-canvas-container"
      onClick={() => onSelectLayer?.('')}
      className="relative select-none overflow-hidden bg-white shadow-2xl transition-all"
      style={{
        width: '720px',
        height: '1280px',
        transform: `scale(${scale})`,
        transformOrigin: 'top center',
        fontFamily: "'Plus Jakarta Sans', -apple-system, sans-serif",
      }}
    >
      {/* =========================================================================
          PERMANENT WATERMARK LAYER (W01)
          "insiderforce.com" — light grey (#D5D5D5), semi-transparent, bold sans,
          horizontally centered, at ~88% of screen height, full 0:00 → 1:24.8.
          Large objects pass in front of / over it.
         ========================================================================= */}
      {watermark.visible && (
        <div
          onClick={(e) => {
            e.stopPropagation();
            onSelectLayer?.('W01');
          }}
          className={`absolute left-1/2 -translate-x-1/2 z-[5] cursor-pointer transition-all ${
            selectedLayerId === 'W01' ? 'ring-2 ring-blue-500 rounded px-2' : ''
          }`}
          style={{
            top: `${watermark.y}%`,
            color: watermark.color,
            opacity: 0.85,
            fontSize: '26px',
            fontWeight: 800,
            letterSpacing: '0.04em',
          }}
          title="Watermark W01: Click to edit"
        >
          {watermark.text}
        </div>
      )}

      {/* =========================================================================
          DOTTED GRID CIRCLE (behind central objects in ChatGPT, brain, portrait, etc.)
         ========================================================================= */}
      {[3, 6, 11, 12, 14, 15, 16, 19, 20].includes(activeSceneId) && (
        <DottedGridCircle
          size={600}
          opacity={activeSceneId === 12 || activeSceneId === 14 || activeSceneId === 20 ? 0.75 : 0.6}
        />
      )}

      {/* =========================================================================
          SCENE 1 (0:00 -> 4:00) "Imagine pitching SpaceX"
         ========================================================================= */}
      {activeSceneId === 1 && (
        <div className="absolute inset-0 z-10 pointer-events-none">
          <CurvedRibbon variant="scene1" progress={Math.min(currentTime / 4.0, 1)} />

          {/* Shuttle 1: Bottom-Left tilted */}
          <div
            className="absolute transition-transform duration-75"
            style={{
              left: `${-40 + Math.min(currentTime * 25, 60)}px`,
              bottom: `${-30 + Math.min(currentTime * 35, 120)}px`,
              transform: `rotate(${32 - Math.min(currentTime * 8, 22)}deg) scale(${1.15 + currentTime * 0.04})`,
            }}
          >
            <ShuttleArtwork
              customUrl={getImageCustomUrl('IMG-SHUTTLE')}
              scale={1.25}
            />
          </div>

          {/* Shuttle 2: Top-Right cropped */}
          <div
            className="absolute -top-16 -right-16 transition-transform duration-75"
            style={{
              transform: `rotate(-45deg) translate(${currentTime * 8}px, ${currentTime * 6}px) scale(0.95)`,
              opacity: 0.85,
            }}
          >
            <ShuttleArtwork
              customUrl={getImageCustomUrl('IMG-SHUTTLE')}
              scale={0.9}
            />
          </div>
        </div>
      )}

      {/* =========================================================================
          SCENE 2 (4:00 -> 10:00) Silhouette pitching in room
         ========================================================================= */}
      {activeSceneId === 2 && (
        <SilhouettePitch
          customUrl={getImageCustomUrl('IMG-SILHOUETTE-PITCH')}
          zoom={1 + (currentTime - 4.0) * 0.02}
          isBlurred={currentTime >= 5.0 && currentTime <= 5.8}
        />
      )}

      {/* =========================================================================
          SCENE 3 (10:00 -> 14:00) "Or imagine pitching ChatGPT"
         ========================================================================= */}
      {activeSceneId === 3 && (
        <ChatGPTArtwork
          customUrl={getImageCustomUrl('IMG-CHATGPT-LOGO')}
          variant="3d-app-icon"
          scale={Math.min(0.8 + (currentTime - 10.0) * 0.5, 1.0)}
          floatOffset={Math.sin((currentTime - 10.0) * 3) * 5}
        />
      )}

      {/* =========================================================================
          SCENE 4 (14:00 -> 20:00) "AI will talk back..."
         ========================================================================= */}
      {activeSceneId === 4 && (
        <>
          <CurvedRibbon variant="scene4" progress={(currentTime - 14.0) / 6.0} />
          {(() => {
            const t = currentTime - 14.0;
            let scale = 1.0;
            let translateX = 0;
            let translateY = 0;
            let rotation = t * 12;

            if (t < 1.0) {
              scale = 1.0 + t * 1.8;
              translateX = t * 180;
            } else if (t < 4.0) {
              scale = 2.8;
              translateX = 200;
              translateY = Math.sin(t * 1.5) * 15;
            } else if (t < 5.0) {
              // 0:18 shift to center
              scale = 2.8 - (t - 4.0) * 1.4;
              translateX = 200 - (t - 4.0) * 200;
            } else {
              // 0:19 shrink to medium size center
              scale = 1.4;
              translateX = 0;
            }

            return (
              <ChatGPTArtwork
                customUrl={getImageCustomUrl('IMG-CHATGPT-LOGO')}
                variant="outline-logo"
                scale={scale}
                rotation={rotation}
                translateX={translateX}
                translateY={translateY}
              />
            );
          })()}
        </>
      )}

      {/* =========================================================================
          SCENE 5 (20:00 -> 23:00) "RECKLESS"
         ========================================================================= */}
      {/* Handled primarily via T17, T18, T19, T20 and ink wedges */}

      {/* =========================================================================
          SCENE 6 (23:00 -> 26:00) Brain / "the truth"
         ========================================================================= */}
      {activeSceneId === 6 && (
        <BrainArtwork
          customUrl={getImageCustomUrl('IMG-BRAIN')}
          scale={Math.min(0.7 + (currentTime - 23.0) * 0.6, 1.0)}
          rotation={Math.sin((currentTime - 23.0) * 2) * 6}
          floatOffset={Math.sin((currentTime - 23.0) * 2.5) * 6}
        />
      )}

      {/* =========================================================================
          SCENE 7 (26:00 -> 29:00) Cursor + dashed box
         ========================================================================= */}
      {activeSceneId === 7 && (
        <>
          {currentTime >= 26.0 && currentTime <= 28.5 && (
            <MouseCursorArtwork
              x={35 + Math.min((currentTime - 26.0) * 12, 22)}
              y={48 + Math.sin((currentTime - 26.0) * 3) * 3}
            />
          )}
          {currentTime >= 27.0 && currentTime <= 28.4 && (
            <DashedBox
              x={50}
              y={45}
              width={540}
              height={140}
              progress={Math.min((currentTime - 27.0) / 0.4, 1)}
            />
          )}
        </>
      )}

      {/* =========================================================================
          SCENE 8 (29:00 -> 33:00) Bullet list + crumpled paper
         ========================================================================= */}
      {activeSceneId === 8 && (
        <CrumpledPaperBin
          customUrl={getImageCustomUrl('IMG-PAPER-BIN')}
          opacity={Math.min((currentTime - 29.0) / 0.5, 1)}
        />
      )}

      {/* =========================================================================
          SCENE 9 (33:00 -> 37:00) Silhouette with mask
         ========================================================================= */}
      {activeSceneId === 9 && (
        <SilhouetteMask
          customUrl={getImageCustomUrl('IMG-SILHOUETTE-MASK')}
          zoom={1 + (currentTime - 33.0) * 0.02}
          slideDown={currentTime > 35.8 ? (currentTime - 35.8) * 120 : 0}
        />
      )}

      {/* =========================================================================
          SCENE 10 (37:00 -> 40:00) Social proof
         ========================================================================= */}
      {activeSceneId === 10 && (
        <>
          {currentTime >= 38.0 && (
            <MouseCursorArtwork
              x={32 + Math.min((currentTime - 38.0) * 14, 25)}
              y={56 + Math.sin((currentTime - 38.0) * 2.5) * 3}
            />
          )}
          {currentTime >= 38.8 && (
            <DashedBox
              x={50}
              y={55}
              width={540}
              height={120}
              progress={Math.min((currentTime - 38.8) / 0.35, 1)}
            />
          )}
        </>
      )}

      {/* =========================================================================
          SCENE 11 (40:00 -> 44:00) Visionaries (portrait)
         ========================================================================= */}
      {activeSceneId === 11 && (
        <PortraitPhoto
          variant="visionary-suit"
          customUrl={getImageCustomUrl('IMG-PORTRAIT-1')}
          zoom={1 + (currentTime - 40.0) * 0.025}
          opacity={currentTime > 43.6 ? 1 - (currentTime - 43.6) * 2.5 : Math.min((currentTime - 40.0) / 0.4, 1)}
        />
      )}

      {/* =========================================================================
          SCENE 12 (44:00 -> 48:00) "That difference creates entire industries"
         ========================================================================= */}
      {/* Handled by texts T37..T43, DottedGridCircle, and ink wedges */}

      {/* =========================================================================
          SCENE 13 (48:00 -> 51:00) Elon said rockets should be reusable
         ========================================================================= */}
      {activeSceneId === 13 && (
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
          {/* Tall dark-grey vertical band sliding from right edge */}
          <div
            className="absolute top-0 right-0 h-full w-[240px] bg-[#2a2a2a] transition-transform duration-100"
            style={{
              transform: currentTime > 50.4 ? 'translateX(260px)' : 'translateX(0)',
              filter: 'drop-shadow(-12px 0 20px rgba(0,0,0,0.3))',
            }}
          />
          {/* 3D shuttle rising on the band */}
          <div
            className="absolute right-[-40px] transition-all duration-100"
            style={{
              bottom: `${100 + (currentTime - 48.0) * 70}px`,
              transform: `scale(1.2) rotate(-5deg) ${currentTime > 50.4 ? 'translateX(260px)' : ''}`,
            }}
          >
            <ShuttleArtwork
              customUrl={getImageCustomUrl('IMG-SHUTTLE')}
              scale={1.2}
            />
          </div>
        </div>
      )}

      {/* =========================================================================
          SCENE 14 (51:00 -> 55:00) Engineers' objection
         ========================================================================= */}
      {/* Handled via texts T45..T47, dotted grid, and ink wedges */}

      {/* =========================================================================
          SCENE 15 (55:00 -> 59:00) SpaceX logo + chess pieces
         ========================================================================= */}
      {activeSceneId === 15 && (
        <>
          {(() => {
            const t = currentTime - 55.0;
            const progress = Math.min(t / 1.0, 1);
            // Flies in from left tilted ~20 deg, then straightens to center
            const tilt = 20 * (1 - progress);
            const translateX = -320 * (1 - progress);
            return (
              <SpaceXLogoArtwork
                customUrl={getImageCustomUrl('IMG-SPACEX-LOGO')}
                tilt={tilt}
                translateX={translateX}
                scale={1.05}
              />
            );
          })()}

          {/* Chess piece 1: Top-right corner */}
          {currentTime >= 57.0 && (
            <div
              className="absolute -top-10 -right-8 pointer-events-none z-10 transition-transform duration-100"
              style={{
                transform: `translate(${-(currentTime - 57.0) * 16}px, ${(currentTime - 57.0) * 14}px) rotate(15deg) scale(0.95)`,
              }}
            >
              <ChessPiece
                type="queen"
                customUrl={getImageCustomUrl('IMG-CHESS-PIECE')}
                scale={0.9}
              />
            </div>
          )}

          {/* Chess piece 2: Bottom-left corner */}
          {currentTime >= 57.0 && (
            <div
              className="absolute -bottom-16 -left-10 pointer-events-none z-10 transition-transform duration-100"
              style={{
                transform: `translate(${(currentTime - 57.0) * 16}px, ${-(currentTime - 57.0) * 14}px) rotate(-18deg) scale(0.95)`,
              }}
            >
              <ChessPiece
                type="king"
                customUrl={getImageCustomUrl('IMG-CHESS-PIECE')}
                scale={0.9}
              />
            </div>
          )}
        </>
      )}

      {/* =========================================================================
          SCENE 16 (59:00 -> 62:00) "Today, reusable rockets are normal"
         ========================================================================= */}
      {activeSceneId === 16 && (
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 pointer-events-none z-10 transition-transform duration-100"
          style={{
            transform: `translate(-50%, calc(-50% + 80px + ${Math.sin((currentTime - 59.0) * 2) * -12}px)) scale(1.15)`,
          }}
        >
          <ShuttleArtwork
            customUrl={getImageCustomUrl('IMG-SHUTTLE')}
            scale={1.2}
          />
        </div>
      )}

      {/* =========================================================================
          SCENE 17 (62:00 -> 65:00) "And the same critics..."
         ========================================================================= */}
      {activeSceneId === 17 && (
        <SilhouettePower
          customUrl={getImageCustomUrl('IMG-SILHOUETTE-POWER')}
          zoom={1 + (currentTime - 62.0) * 0.02}
        />
      )}

      {/* =========================================================================
          SCENE 18 (65:00 -> 67:00) "This pattern repeats everywhere"
         ========================================================================= */}
      {/* Handled by T57 */}

      {/* =========================================================================
          SCENE 19 (67:00 -> 71:00) "Real progress..." (portrait 2)
         ========================================================================= */}
      {activeSceneId === 19 && (
        <PortraitPhoto
          variant="innovator-presenting"
          customUrl={getImageCustomUrl('IMG-PORTRAIT-2')}
          zoom={1 + (currentTime - 67.0) * 0.02}
          opacity={currentTime > 70.6 ? 1 - (currentTime - 70.6) * 2.5 : Math.min((currentTime - 67.0) / 0.4, 1)}
        />
      )}

      {/* =========================================================================
          SCENE 20 (71:00 -> 74:00) Building a startup
         ========================================================================= */}
      {/* Handled by T62, dotted grid, and ink wedges */}

      {/* =========================================================================
          SCENE 21 (74:00 -> 79:00) Chess king "Remember this"
         ========================================================================= */}
      {activeSceneId === 21 && (
        <>
          {/* Thin black curved line arc across screen */}
          <svg
            viewBox="0 0 720 1280"
            className="w-full h-full absolute inset-0 pointer-events-none z-10"
            fill="none"
          >
            <path
              d="M 760 120 C 520 280, 220 540, -40 760"
              stroke="#2c2c2c"
              strokeWidth="1.8"
              opacity="0.6"
            />
          </svg>

          {/* King 1: Swings from top-right along arc */}
          {currentTime >= 75.0 && (
            <div
              className="absolute pointer-events-none z-15 transition-transform duration-75"
              style={{
                top: `${140 + (currentTime - 75.0) * 45}px`,
                right: `${40 + (currentTime - 75.0) * 50}px`,
                transform: `rotate(${24 + (currentTime - 75.0) * 8}deg) scale(1.05)`,
              }}
            >
              <ChessPiece
                type="king"
                customUrl={getImageCustomUrl('IMG-CHESS-PIECE')}
                scale={1.1}
              />
            </div>
          )}

          {/* King 2: Upside down entering from bottom-right */}
          {currentTime >= 77.0 && (
            <div
              className="absolute pointer-events-none z-15 transition-transform duration-75"
              style={{
                bottom: `${-20 + (currentTime - 77.0) * 40}px`,
                right: `${20 + (currentTime - 77.0) * 35}px`,
                transform: `rotate(${-15 - (currentTime - 77.0) * 10}deg) scaleY(-1) scale(1.0)`,
              }}
            >
              <ChessPiece
                type="king"
                customUrl={getImageCustomUrl('IMG-CHESS-PIECE')}
                scale={1.0}
                upsideDown
              />
            </div>
          )}
        </>
      )}

      {/* =========================================================================
          SCENE 22 (79:00 -> 84.80) Closing + CTA (FOLLOW button)
         ========================================================================= */}
      {activeSceneId === 22 && (
        <>
          {currentTime >= 81.0 && (
            <FollowButtonArtwork
              label={texts.find((t) => t.id === 'T71')?.content.replace(/\*\*/g, '') || 'FOLLOW'}
              isPressed={currentTime >= 82.2 && currentTime <= 82.5}
              translateY={currentTime >= 82.0 ? -30 : 0}
            />
          )}

          {/* Mouse cursor on Follow button: clicks down at 1:22 */}
          {currentTime >= 81.2 && currentTime <= 83.2 && (
            <MouseCursorArtwork
              x={50 + Math.sin(currentTime * 2) * 2}
              y={currentTime >= 82.0 ? 63 : 67}
              clicking={currentTime >= 82.2 && currentTime <= 82.5}
            />
          )}
        </>
      )}

      {/* =========================================================================
          ALL LIVE EDITABLE TEXT LAYERS (W01 is watermark, T01..T72 are texts)
         ========================================================================= */}
      {texts.map((layer) => (
        <KineticTextLayer
          key={layer.id}
          layer={layer}
          currentTime={currentTime}
          isSelected={selectedLayerId === layer.id}
          onSelect={onSelectLayer}
        />
      ))}

      {/* =========================================================================
          INK WEDGE SCENE TRANSITIONS (Top-Left & Bottom-Right)
         ========================================================================= */}
      <InkWedge position="top-left" progress={inLeftWedge} />
      <InkWedge position="bottom-right" progress={inRightWedge} />
    </div>
  );
};
