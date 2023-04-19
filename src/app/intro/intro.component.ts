import { Component, OnInit } from '@angular/core';
import '@shammas44/interactive-video-player';
import {
  Player as PlayerElement,
  Project,
  InteractionPosition,
} from '@shammas44/interactive-video-player';
import { Router } from '@angular/router';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss'],
})
export class IntroComponent implements OnInit {
  private project:Project|null = null;

  onVideoEnd() {
    console.log('yo')
    this.router.navigate(['/sdg-list']);
  }

  constructor(private router:Router) {
    this.project  = {
      entrypointId: '98f5aee6-d945-4cd7-96f8-45a162978406',
      id: '98f5ab25-56d6-407e-a01a-1e56893eb029',
      videos: [
        {
          id: '98f5aee6-d945-4cd7-96f8-45a162978406',
          name: '',
          paths: [
            'https://admin.durabilia.tarrit.ch/storage/videos/Z6fTdvvpgkuu6yaTyVjtnPATLOx1x0-metaMDEubXA0-.mp4',
            'https://admin.durabilia.tarrit.ch/storage/videos/5LqGcuD5w0IvDiAqZMBebFg38dDxTL-metaMDEubXA0-.mp4',
          ],
          animation: {
            duration: 10,
            position: InteractionPosition.BOTTOM,
            title: '',
          },
        },
      ],
    };
  }
  ngOnInit() {
    const player: PlayerElement | null =
      document.querySelector('shammas-player');
    if (player != null) {
      console.log(player);
      player.initProject(this.project as Project);
    }
  }
}
