import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import '@shammas44/interactive-video-player';
import { Project } from '../../models/projects';
import {
  Player as PlayerElement,
  VideoNode,
} from '@shammas44/interactive-video-player';
import { Location } from '@angular/common';
import { WatchedSequenceService } from 'src/app/services/watched-video.service';
import { ActivatedRoute } from '@angular/router';
import { videoToMap } from 'src/app/lib/utils';

type LocationData = {
  navigationId: number;
  project: Project;
};

const MSG = {
  ERROR_INFINITE_TREE:
    'A video interaction is not allowed to point to a previous video.',
};

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit {
  public project: Project | null;
  private projectId: string;
  public showPopup = false;

  constructor(
    private projectService: ProjectService,
    private location: Location,
    private watchedSequenceService: WatchedSequenceService,
    private route: ActivatedRoute
  ) {
    const project = this.location.getState() as LocationData;
    this.project = project.project;
    const projectId = document.location.pathname.split('/')[2];
    this.projectId = projectId;
    // this.getTheme(this.project.videos[this.project.videos.length - 1]);
    this.setSdgColor(projectId);
  }

  setSdgColor(id: string) {
    document.documentElement.style.setProperty(
      '--current-sdg-color',
      `var(--sdg${id}-color)`
    );
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      if (!this.project) {
        this.setAndInitProject();
      } else {
        this.init();
      }
    });
  }

  onSequenceStart(e: any) {
    this.watchedSequenceService.addUniqueId(e.detail.id);
  }

  onVideoEnd(e: any) {
    console.log(e);
    // this.getTheme(e.detail)
    this.setPopup(true);
  }

  getTheme(video: VideoNode) {
    if (this.project?.videos) {
      const videos = videoToMap(this.project.videos);
      const visitedVideoNodes = new Set();
      let choosenTheme: string | undefined;
      console.log(video);

      // const visitNode = (node: V, isTheme = false, theme?: string) => {
      //   if (visitedVideoNodes.has(node.id)) {
      //     throw new Error(MSG.ERROR_INFINITE_TREE);
      //   }
      //   console.log(node);
      //   if (isTheme) {
      //     theme = node.content;
      //     isTheme = false;
      //   }

      //   if (node.canChooseTheme) {
      //     isTheme = true;
      //   }

      //   if (node.id == video?.id) {
      //     choosenTheme = theme;
      //   }

      //   for (const interaction of node?.interactions ?? []) {
      //     const video = videos.get(interaction.id) as V;
      //     video.content = interaction.content;
      //     videos.set(interaction.id, video);
      //     visitNode(video, isTheme, theme);
      //   }
      // };
      // visitNode(this.project.videos[0] as V);
      console.log({ choosenTheme });
      console.log(this.project.videos)
    }
  }

  setPopup(value: boolean) {
    this.showPopup = value;
  }

  async setAndInitProject(entrypointId?: string) {
    const projects = await this.projectService.getPlayers();
    const project = projects.filter((project) => {
      if (project.description == this.projectId) return project;
      else return;
    });
    this.project = project[0];
    this.init();
  }

  async init(entrypointId?: string) {
    const player: PlayerElement | null =
      document.querySelector('shammas-player');
    if (player != null) {
      player.initProject(this.project as Project, false);
    }
  }
}
