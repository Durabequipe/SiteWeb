import { Component, OnInit, Input } from '@angular/core';
import '@shammas44/interactive-video-player';
import {
  Player as PlayerElement,
  Project,
  InteractionPosition,
} from '@shammas44/interactive-video-player';
import { Router } from '@angular/router';

type VideoPaths = {
  desktop: string;
  mobile: string;
};
@Component({
  selector: 'app-single-video',
  templateUrl: './singleVideo.component.html',
  styleUrls: ['./singleVideo.component.scss'],
})
export class SingleVideoComponent implements OnInit {
  @Input() type: 'intro' | 'conclusion' = 'intro';
  @Input() videoPaths: VideoPaths | null = null;

  onVideoEnd() {
    this.router.navigate(['/sdg-list']);
  }

  constructor(private router: Router) {}

  ngOnInit() {
    let project: Project | null = null;
    if (this.videoPaths) {
      project = {
        entrypointId: '1',
        id: 'standalone',
        videos: [
          {
            id: '1',
            name: '',
            paths: [this.videoPaths.desktop, this.videoPaths.mobile],
            animation: {
              duration: 0,
              position: InteractionPosition.BOTTOM,
              title: '',
            },
          },
        ],
      };
    }

    const player: PlayerElement | null =
      document.querySelector('shammas-player');
    if (player && project) {
      player.initProject(project);
    }
  }
}
