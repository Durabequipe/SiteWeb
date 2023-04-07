import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';
import '@shammas44/interactive-video-player';
import { Project } from '../models/projects';
import { Player as PlayerElement } from '@shammas44/interactive-video-player';
import { Location } from '@angular/common';

type LocationData = {
  navigationId:number;
  project:Project;
}

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit {
  private project: Project | null;
  private projectId: string;

  constructor(
    private projectService: ProjectService,
    private location: Location
  ) {
    const project = this.location.getState() as LocationData;
    this.project = project.project;
    const projectId = document.location.pathname.split('/')[2];
    this.projectId = projectId;
  }

  ngOnInit() {
    if (!this.project) {
      this.setAndInitProject();
    } else {
      this.init();
    }
  }

  async setAndInitProject() {
    const projects = await this.projectService.getPlayers();
    const project = projects.filter((project) => {
      if (project.description == this.projectId) return project;
      else return;
    });
    this.project = project[0];
    this.init();
  }

  async init() {
    const player: PlayerElement | null =
      document.querySelector('shammas-player');
    if (player != null) {
      player.initProject(this.project as Project);
    }
  }
}
