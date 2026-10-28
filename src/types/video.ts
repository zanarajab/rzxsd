export type TextAnimationType = 'blur-in-word' | 'blur-in-letter' | 'fade-in' | 'scale-blur';

export interface TextLayer {
  id: string;
  content: string; // Supports **word** for bold key words
  start: number; // in seconds
  end: number; // in seconds
  x: number; // percentage (0-100)
  y: number; // percentage (0-100)
  fontSize: number; // base px at 720x1280
  textAlign?: 'left' | 'center' | 'right';
  animation: TextAnimationType;
  customWeight?: 'regular' | 'bold';
  color?: string; // default #444 - #555, bold #222 - #333
  sceneId: number;
  lineBreak?: boolean;
  maxWidth?: number; // px
  letterSpacing?: string;
  uppercase?: boolean;
}

export interface ImageSlot {
  id: string;
  name: string;
  description: string;
  customUrl?: string; // User uploaded image URL
  style: 'soft-3d' | 'clay' | 'flat-vector' | 'custom';
  sceneIds: number[];
}

export interface Scene {
  id: number;
  title: string;
  start: number;
  end: number;
  description: string;
  hasInkWedge?: 'top-left' | 'bottom-right' | 'both' | 'none';
  hasDottedGrid?: boolean;
}

export interface VideoProjectState {
  version: string;
  title: string;
  duration: number; // 84.8
  width: number; // 720
  height: number; // 1280
  fps: number; // 30
  watermark: {
    id: string;
    text: string;
    visible: boolean;
    color: string;
    y: number;
  };
  texts: TextLayer[];
  imageSlots: ImageSlot[];
  audioSettings: {
    enabled: boolean;
    volume: number;
    ambientSynth: boolean;
    transitionWhooshes: boolean;
    uiClicks: boolean;
    customAudioUrl?: string;
  };
}
