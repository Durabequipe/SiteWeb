import { Component } from '@angular/core';
import { ProjectService } from '../services/project.service';
import '@shammas44/interactive-video-player';
import {
  Player as PlayerElement,
  Project,
} from '@shammas44/interactive-video-player';

@Component({
  selector: 'app-intro',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(private projectService: ProjectService) {}
}