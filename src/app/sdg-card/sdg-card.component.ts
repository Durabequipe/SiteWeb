import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Project, SdgProject } from '../models/projects';

@Component({
  selector: 'app-sdg-card',
  templateUrl: './sdg-card.component.html',
  styleUrls: ['./sdg-card.component.scss'],
})
export class SdgCardComponent implements OnInit {
  @Output() cardIsHover = new EventEmitter<SdgProject>();
  @Input() project: Project | null = null;
  @Input() sdgNumber: number | undefined = undefined;
  public sdgNumberPlusOne = -1;
  public video: string | undefined = undefined;

  onMouseEnter(e: any) {
    const sdgProject = this.project as SdgProject;
    if (sdgProject) {
      sdgProject.sdgNo = this.sdgNumberPlusOne;
      this.cardIsHover.emit(sdgProject);
    }
  }

  ngOnInit() {
    if (this.project && this.project.videos) {
      this.video = this.project?.videos[0].paths[0];
      this.sdgNumberPlusOne = (this.sdgNumber || 0) + 1;
    }
  }

  setImage() {
    if (this.project && this.project.videos) {
      return `background-image:url('${this.project.thumbnailImage}')`;
    } else {
      return '';
    }
  }
}
