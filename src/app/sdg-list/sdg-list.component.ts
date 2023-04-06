import {Component, OnInit} from '@angular/core';
import {ProjectService} from '../services/project.service';
import {Project} from '../models/projects';

@Component({
  selector: 'app-sdg-list',
  templateUrl: './sdg-list.component.html',
  styleUrls: ['./sdg-list.component.scss'],
})
export class SdgListComponent implements OnInit {
  public backgroundImage = '';
  public currentProject: Project | null = null;

  onMouseMove(e: any) {
    const speed = 30;
    const move = (element: HTMLElement, value: number) => {
      element.scrollLeft = element.scrollLeft + value;
    };

    if (this.cardsWrapper) {
      if (e.movementX > 0) {
        move(this.cardsWrapper, speed);
      } else if (e.movementX < 0) {
        move(this.cardsWrapper, speed * -1);
      }
    }
  }

  public projects: Project[] = [];
  public lastX = 0;
  private cardsWrapper: HTMLElement | null = null;

  constructor(private api: ProjectService) {
  }

  async fetchProject() {
    const projects = await this.api.getPlayers();
    if (projects) {
      this.projects = projects;
      this.setDefaultProject(projects[0]);
    }
  }

  setDefaultProject(project: Project) {
    this.currentProject = project;
    this.setImage(project.coverImage);
  }

  onCardIsHover(project: Project | null) {
    if (project) {
      this.setImage(project.coverImage);
      this.currentProject = project;
    }
  }

  setImage(image: string) {
    this.backgroundImage = `background-image:url('${image}')`;
  }

  ngOnInit(): void {
    this.fetchProject();
    const cards = document.querySelector('.cards') as HTMLElement;
    this.cardsWrapper = cards;
    setTimeout(() => {
      if (cards) {
        cards.scrollLeft = (cards.scrollWidth - cards.clientWidth) / 2;
      }
    }, 500);
  }
}
