import { Component, Input, AfterContentInit } from '@angular/core';
import treeMaker from '../../lib/tree';
import { Tree, TreeParams } from '../../models/treemaker';
import { VideoNode } from '@shammas44/interactive-video-player';
import { Location } from '@angular/common';
import { Project } from '../../models/projects';

type LocationData = {
  navigationId: number;
  project: Project;
};

type V = VideoNode & {
  content?: string;
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
  @Input() project: Project | null = null;

  constructor(private location: Location) {
    const project = this.location.getState() as LocationData;
    this.project = project.project;
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
            p.addEventListener('mouseleave', (e: any) => {
              tooltipSpan.classList.add('is-display-none');
              const x = e.clientX;
              const y = e.clientY;
              tooltipSpan.style.top = y + 20 + 'px';
              tooltipSpan.style.left = x + 20 + 'px';
            });
            p.addEventListener('mousemove', (e: any) => {
              const id = e.target.id.split('_')[1];
              const video = this.videos.get(id) as V;
              if (video.content) {
                tooltipSpan.innerText = video?.content ?? '';
                tooltipSpan.classList.remove('is-display-none');
                if (window.innerWidth < 500) {
                  tooltipSpan.classList.add('tooltip--bottom');
                  tooltipSpan.style.top = 'unset'
                  tooltipSpan.style.left = 'unset'
                } else {
                  tooltipSpan.classList.remove('tooltip--bottom');
                  const x = e.clientX;
                  const y = e.clientY;
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

  private generateTree(node: V, ref: Tree) {
    this.treeParams[node.id] = { trad: node.name };
    this.tree[node.id] = {};
    this.generateNode(node, ref[node.id]);
  }

  private generateNode(node: V, ref: Tree) {
    for (const interaction of node?.interactions ?? []) {
      const video = this.videos.get(interaction.id) as V;
      video.content = interaction.content;
      this.videos.set(interaction.id, video);
      ref[video.id] = {};
      const newRef = ref[video.id];
      this.treeParams[video.id] = { trad: video.name };
      this.generateNode(video, newRef);
    }
  }
}
