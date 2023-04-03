import { Component, OnInit, Renderer2 } from '@angular/core';

import '@shammas44/interactive-video-player';

import {
  Player as PlayerElement,
  Project,
} from '@shammas44/interactive-video-player';

import { ProjectService } from './services/project.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'SiteWeb';

  constructor(
    private projectService: ProjectService,
    private render: Renderer2
  ) {}

  ngOnInit() {
    this.init();
  }

  async init() {
    const project = await this.projectService.getPlayer(
      '98cdc820-e51e-4636-9ada-bb3d7e132f4a'
    );

    const player: PlayerElement | null =
      document.querySelector('shammas-player');

    console.log(project);

    if (player != null) {
      console.log(player);
      player.initProject(project as Project);
    }
  }
}
