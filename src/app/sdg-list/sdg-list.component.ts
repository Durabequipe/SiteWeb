import { Component, OnInit, HostListener } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { Project } from '@shammas44/interactive-video-player';

@Component({
  selector: 'app-sdg-list',
  templateUrl: './sdg-list.component.html',
  styleUrls: ['./sdg-list.component.scss'],
})
export class SdgListComponent implements OnInit {
  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: any) {
    const speed = 30;
    const move = (element: HTMLElement, value: number) => {
      const moveValue = element.scrollLeft + value;
      element.scrollLeft = moveValue;
    };

    if (this.cardsWrapper) {
      if (e.movementX > 0) {
        move(this.cardsWrapper, speed );
      } else if (e.movementX < 0) {
        move(this.cardsWrapper, speed * -1);
      }
    }
  }

  public projects: Project[] = [];
  public lastX = 0;
  private cardsWrapper: HTMLElement | null = null;

  constructor(private api: ProjectService) {}

  async fetchProject() {
    const projectsIds: string[] | null = await this.api.getProjectsIds();
    if (projectsIds) {
      for (const id of projectsIds) {
        try {
          const project = await this.api.getPlayer(id);
          for (let i = 0; i < 5; i++) {
            this.projects.push(project);
          }
          // console.log({ project });
        } catch (error) {
          return console.warn(`project ${id} unexistant`);
        }
      }
    }
  }

  ngOnInit(): void {
    this.fetchProject();
    const cards = document.querySelector('.cards');
    this.cardsWrapper = cards as HTMLElement;
  }
}
