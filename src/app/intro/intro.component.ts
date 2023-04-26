import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss'],
})
export class IntroComponent {
  public videoPaths = {
    desktop:
      environment.baseUrl +
      '/storage/videos/standalones/desktop/introduction.mp4',
    mobile:
      environment.baseUrl +
      '/storage/videos/standalones/mobile/introduction.mp4',
  };
}
