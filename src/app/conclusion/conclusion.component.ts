import { Component } from '@angular/core';

@Component({
  selector: 'app-conclusion',
  templateUrl: './conclusion.component.html',
  styleUrls: ['./conclusion.component.scss']
})
export class ConclusionComponent {
public videoPaths = {
    desktop: 'https://admin.durabilia.tarrit.ch/storage/videos/standalones/desktop/conclusion.mp4',
    mobile: 'https://admin.durabilia.tarrit.ch/storage/videos/standalones/mobile/conclusion.mp4',
  }
}
