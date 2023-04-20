import { Component } from '@angular/core';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})

export class IntroComponent {
public videoPaths = {
    desktop: 'https://admin.durabilia.tarrit.ch/storage/videos/standalones/desktop/introduction.mp4',
    mobile: 'https://admin.durabilia.tarrit.ch/storage/videos/standalones/mobile/introduction.mp4',
  }
}
