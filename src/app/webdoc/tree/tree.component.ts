import { Component, AfterContentInit } from '@angular/core';
import treeMaker from '../../lib/tree';
import { Tree, TreeParams } from '../../models/treemaker';
import { VideoNode } from '@shammas44/interactive-video-player';
import { Location } from '@angular/common';
import { Project } from '../../models/projects';

type LocationData = {
  navigationId: number;
  project: Project;
  watchedSequenceIds: string[];
};

type V = VideoNode & {
  content?: string;
};

const MSG = {
  ERROR_INFINITE_TREE:
    'A video interaction is not allowed to point to a previous video.',
};

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
})
export class TreeComponent implements AfterContentInit {
  public tree: Tree = {};
  public treeParams: TreeParams = {};
  public videos: Map<string, V> = new Map();
  public project: Project | null = null;
  public watchedSequenceIds: string[] = [];
  private visitedVideoNodes = new Set();

  constructor(private location: Location) {
    const data = this.location.getState() as LocationData;
    console.log(data);
    this.project = data.project;
    this.watchedSequenceIds = data.watchedSequenceIds;
  }

  ngAfterContentInit() {
    if (this.project) {
      this.videos = this.videoToMap(this.project.videos);
      console.log(this.videos);
      this.drawTree(this.project.entrypointId);
    }
  }

  private videoToMap(videos: VideoNode[]): Map<string, VideoNode> {
    const map = new Map();
    videos.forEach((video) => {
      map.set(video.id, video);
    });
    return map;
  }

  private drawTree(entrypointId: string) {
    try {
      this.generateTree(this.videos.get(entrypointId) as VideoNode, this.tree);

      treeMaker(this.tree, {
        id: 'tree',
        treeParams: this.treeParams,
        link_width: '4px',
        link_color: '#ff5259',
      });

      const tooltipSpan = document.querySelector('#tooltip') as HTMLElement;
      if (tooltipSpan) {
        document
          .querySelectorAll('.tree__container__step__card p')
          .forEach((p) => {
            p.addEventListener('mouseleave', (e) => {
              const event = e as MouseEvent;
              tooltipSpan.classList.add('is-display-none');
              const x = event.clientX;
              const y = event.clientY;
              tooltipSpan.style.top = y + 20 + 'px';
              tooltipSpan.style.left = x + 20 + 'px';
            });
            p.addEventListener('mousemove', (e) => {
              const event = e as MouseEvent;
              const id = (event.target as HTMLElement).id.split('_')[1];
              const video = this.videos.get(id) as V;
              if (video.content) {
                tooltipSpan.innerText = video?.content ?? '';
                tooltipSpan.classList.remove('is-display-none');
                if (window.innerWidth < 500) {
                  tooltipSpan.classList.add('tooltip--bottom');
                  tooltipSpan.style.top = 'unset';
                  tooltipSpan.style.left = 'unset';
                } else {
                  tooltipSpan.classList.remove('tooltip--bottom');
                  const x = event.clientX;
                  const y = event.clientY;
                  tooltipSpan.style.top = y + 20 + 'px';
                  tooltipSpan.style.left = x + 20 + 'px';
                }
              }
            });
          });
      }
    } catch (error) {
      const e = error as Error;
      console.log(error);
      if (e.message === 'Maximum call stack size exceeded') {
        console.warn('Maximum call stack size exceeded');
      }
    }
  }

  private setStyles(id: string) {
    const isAlreadyWatched = this.watchedSequenceIds.includes(id);
    return isAlreadyWatched
      ? { background: 'red', opacity: '1', color: 'white' }
      : { background: 'unset', opacity: '0.3', color: 'black' };
  }

  private generateTree(node: V, ref: Tree) {
    this.treeParams[node.id] = {
      trad: node.name,
      styles: this.setStyles(node.id),
    };
    this.tree[node.id] = {};
    this.generateNode(node, ref[node.id]);
  }

  private generateNode(node: V, ref: Tree) {
    if (this.visitedVideoNodes.has(node.id)) {
      throw new Error(MSG.ERROR_INFINITE_TREE);
    }

    for (const interaction of node?.interactions ?? []) {
      const video = this.videos.get(interaction.id) as V;
      video.content = interaction.content;
      this.videos.set(interaction.id, video);
      ref[video.id] = {};
      const newRef = ref[video.id];
      this.treeParams[video.id] = {
        trad: video.name,
        styles: this.setStyles(interaction.id),
      };
      this.generateNode(video, newRef);
    }
  }
}
