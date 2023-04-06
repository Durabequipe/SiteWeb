import { Project as P } from '@shammas44/interactive-video-player';

export type Project = P & {
  thumbnailImage: string;
  coverImage: string;
  name: string;
};

export type SdgProject = Project & {
  sdgNo: number;
}
