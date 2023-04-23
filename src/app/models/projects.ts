import { Project as P, VideoNode } from '@shammas44/interactive-video-player';

export type Video = VideoNode & {
  content?: string;
  canChooseTheme: boolean;
  themeVideoId: string | null;
};

export type Project = P & {
  thumbnailImage: string;
  coverImage: string;
  name: string;
  description: string;
  isActive: boolean;
  videos: Video[];
};

export type LocationData = {
  navigationId: number;
  project: Project;
};
