import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';
import '@shammas44/interactive-video-player';
import { Project} from '../models/projects'
import {
  Player as PlayerElement,
} from '@shammas44/interactive-video-player';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit {
  constructor(private projectService: ProjectService) {}
  ngOnInit() {
    this.init();
  }

  async init() {
    const project = await this.projectService.getPlayers();
    console.log(project)

    const player: PlayerElement | null =
      document.querySelector('shammas-player');

    if (player != null) {
      // player.initProject(project as Project);
    }
  }
}
