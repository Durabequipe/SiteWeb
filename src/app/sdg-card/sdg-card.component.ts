import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Project } from '../models/projects';

@Component({
  selector: 'app-sdg-card',
  templateUrl: './sdg-card.component.html',
  styleUrls: ['./sdg-card.component.scss'],
})
export class SdgCardComponent implements OnInit {
  @Output() cardIsHover = new EventEmitter<Project>();
  @Input() project: Project | null = null;
  @Input() sdgNumber: number | undefined = undefined;
  public video: string | undefined = undefined;

  onMouseEnter(e: any) {
    const sdgProject = this.project as Project;
    if (sdgProject) {
      this.cardIsHover.emit(sdgProject);
    }
  }

  ngOnInit() {
    if (this.project?.videos || false) {
      this.video = this.project?.videos[0].paths[0];
    }
  }

  setImage() {
    if (this.project && this.project.videos) {
      return `background-image:url('${this.project.thumbnailImage}'); object-fit: cover;`;
    } else {
      return '';
    }
  }
}
