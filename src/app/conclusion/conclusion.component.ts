import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-conclusion',
  templateUrl: './conclusion.component.html',
  styleUrls: ['./conclusion.component.scss'],
})
export class ConclusionComponent {
  public videoPaths = {
    desktop:
      environment.baseUrl +
      '/storage/videos/standalones/desktop/conclusion.mp4',
    mobile:
      environment.baseUrl + '/storage/videos/standalones/mobile/conclusion.mp4',
  };
}
