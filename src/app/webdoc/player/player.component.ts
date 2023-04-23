import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import '@shammas44/interactive-video-player';
import { Project } from '../../models/projects';
import { Player as PlayerElement } from '@shammas44/interactive-video-player';
import { Location } from '@angular/common';
import { WatchedSequenceService } from 'src/app/services/watched-video.service';
import { ActivatedRoute } from '@angular/router';
import { Video, LocationData } from '../../models/projects';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit {
  public project: Project | null;
  private projectId: string;
  public showPopup = false;
  public themeId = '';

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
    this.setSdgColor(projectId);
  }

  setSdgColor(id: string) {
    document.documentElement.style.setProperty(
      '--current-sdg-color',
      `var(--sdg${id}-color)`
    );
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe((params: any) => {
      if (!this.project) {
        this.setAndInitProject(params.params.id);
      } else {
        this.init(params.params.id);
      }
    });
  }

  onSequenceStart(e: any) {
    const detail = e.detail as Video;
    this.setTheme(detail.themeVideoId);
    this.watchedSequenceService.addUniqueId(detail.id);
  }

  onVideoEnd(e: any) {
    console.log(e);
    this.setPopup(true);
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
    this.init(entrypointId);
  }

  setTheme(themeId: string | null) {
    if (themeId) {
      this.themeId = themeId;
    }
  }

  async init(entrypointId?: string) {
    const player: PlayerElement | null =
      document.querySelector('shammas-player');
    if (player != null) {
      this.setTheme(entrypointId || null);
      console.log(this.project)
      entrypointId
        ? player.initProject(this.project as Project, false, entrypointId)
        : player.initProject(this.project as Project, false);
    }
  }
}
