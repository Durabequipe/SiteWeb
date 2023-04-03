import { Component, Input, OnInit } from '@angular/core';
import { Project } from '@shammas44/interactive-video-player';

@Component({
  selector: 'app-sdg-card',
  templateUrl: './sdg-card.component.html',
  styleUrls: ['./sdg-card.component.scss'],
})
export class SdgCardComponent implements OnInit {
  @Input() project: Project | null = null;
  @Input() sdgNumber: number | undefined = undefined;
  public sdgNumberPlusOne = -1;
  public video: string | undefined = undefined;

  onMouseEnter(e: any) {
    console.log(e);
    const videoTag: HTMLVideoElement = e.target;
    videoTag.muted = true;
    videoTag.play();
  }

  onMouseLeave(e: any) {
    const videoTag: HTMLVideoElement = e.target;
    videoTag.currentTime = 0;
    videoTag.pause();
  }

  ngOnInit() {
    this.video = this.project?.videos[0].paths[0];
    this.sdgNumberPlusOne = (this.sdgNumber || 0) + 1;
  }
}
