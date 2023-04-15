import { Component, AfterContentInit } from '@angular/core';
import treeMaker from '../../lib/tree';
import { Tree, TreeParams } from '../../models/treemaker';
import { VideoNode } from '@shammas44/interactive-video-player';
import { Location } from '@angular/common';
import { Project } from '../../models/projects';
import { ProjectService } from 'src/app/services/project.service';

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

  constructor(private location: Location, private api: ProjectService) {
    const data = this.location.getState() as LocationData;
    console.log(data);
    this.project = data.project || null;
    this.watchedSequenceIds = data.watchedSequenceIds || [];
    if (!this.project) {
      const sdgId = document.location.pathname.split('/')[2];
      this.fetchProject(sdgId);
    }
  }

  ngAfterContentInit() {
    if (this.project) {
      this.videos = this.videoToMap(this.project.videos);
      this.drawTree(this.project.entrypointId);
    }
  }

  async fetchProject(sdgId: string) {
    const projects = await this.api.getPlayers();
    const project = projects.filter((p) => {
      if (p.description === sdgId) return p;
      return;
    });
    if (project.length > 0) {
      this.project = project[0];
      this.ngAfterContentInit()
    }
  }

  private videoToMap(videos: VideoNode[]): Map<string, VideoNode> {
    const map = new Map();
    videos.forEach((video) => {
      map.set(video.id, video);
    });
    return map;
  }

  private getHideTooltip(tooltipElement: HTMLElement) {
    return (e: Event) => {
      const event = e as MouseEvent;
      tooltipElement.classList.add('is-display-none');
      const x = event.clientX;
      const y = event.clientY;
      tooltipElement.style.top = y + 20 + 'px';
      tooltipElement.style.left = x + 20 + 'px';
    };
  }

  private getShowTooltip(tooltipElement: HTMLElement) {
    return (e: Event) => {
      const event = e as MouseEvent;
      const id = (e.target as HTMLElement).id.split('_')[1];
      const video = this.videos.get(id) as V;
      if (video.content) {
        tooltipElement.innerText = video?.content ?? '';
        tooltipElement.classList.remove('is-display-none');
        if (window.innerWidth < 500) {
          tooltipElement.classList.add('tooltip--bottom');
          tooltipElement.style.top = 'unset';
          tooltipElement.style.left = 'unset';
        } else {
          tooltipElement.classList.remove('tooltip--bottom');
          const x = event.clientX;
          const y = event.clientY;
          tooltipElement.style.top = y + 20 + 'px';
          tooltipElement.style.left = x + 20 + 'px';
        }
      }
    };
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
            p.addEventListener('mousemove', this.getShowTooltip(tooltipSpan));
            p.addEventListener('mouseleave', this.getHideTooltip(tooltipSpan));
          });
      }
    } catch (error) {
      const e = error as Error;
      console.warn(e);
      const tree = document.querySelector('#tree') as HTMLDivElement;
      if (tree) {
        tree.innerText = MSG.ERROR_INFINITE_TREE;
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
