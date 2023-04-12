import { Component, Input,AfterViewInit,AfterContentInit } from '@angular/core';
import { treeMaker, Tree, TreeParams } from '@roumi/treemaker';
import { VideoNode } from '@shammas44/interactive-video-player';
import { Location } from '@angular/common';
import { Project } from '../../models/projects';

type LocationData = {
  navigationId: number;
  project: Project;
};

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
})
export class TreeComponent implements AfterContentInit {
  public tree: Tree = {};
  public treeParams: TreeParams = {};
  public videos: Map<string, VideoNode> = new Map();
  @Input() project: Project | null = null;

  constructor(private location: Location) {
    const project = this.location.getState() as LocationData;
    (project.project as Project).videos.forEach((v: VideoNode) => {
      v.interactions?.forEach((i) => {
        console.log(i);
      });
    });
    this.project = project.project;

  }

  ngAfterContentInit(){
    if (this.project) {
      this.videos = this.videoToMap(this.project.videos);
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
      console.log(this.treeParams,this.tree)
      console.log(document.querySelector('#tree'))

      treeMaker(this.tree, {
        id: 'tree',
        card_click: function (element: HTMLElement) {
          console.log(element);
        },
        treeParams: this.treeParams,
        link_width: '4px',
        link_color: '#ff5259',
      });
      console.log(document.querySelector('#tree'))
    } catch (error) {
      const e = error as Error;
      console.log(error)
      if (e.message === 'Maximum call stack size exceeded') {
        console.warn('Maximum call stack size exceeded');
      }
    }
  }

  private generateTree(node: VideoNode, ref: Tree) {
    this.treeParams[node.id] = { trad: node.id };
    this.tree[node.id] = {};
    this.generateNode(node, ref[node.id]);
  }

  private generateNode(node: VideoNode, ref: Tree) {
    for (const interaction of node?.interactions ?? []) {
      const video = this.videos.get(interaction.id) as VideoNode;
      ref[video.id] = {};
      const newRef = ref[video.id];
      this.treeParams[video.id] = { trad: video.id };
      this.generateNode(video, newRef);
    }
  }
}
