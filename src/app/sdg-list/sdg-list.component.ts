import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { Project } from '../models/projects';

function isBetween(value: number, min: number, max: number) {
  return value >= min && value <= max;
}

@Component({
  selector: 'app-sdg-list',
  templateUrl: './sdg-list.component.html',
  styleUrls: ['./sdg-list.component.scss'],
})
export class SdgListComponent implements OnInit {
  public backgroundImage = '';
  public currentProject: Project | null = null;
  public projects: Project[];
  private cardsWrapper: HTMLElement | null = null;

  constructor(private api: ProjectService) {
    const projects = [] as Project[];
    // just to avoid having nothing to display
    // if page loading is really slow
    for (let i = 1; i < 16; i++) {
      projects.push({} as Project);
    }
    this.projects = projects;
  }

  onMouseMove(e: any) {
    const speed = 30;
    const move = (element: HTMLElement, value: number) => {
      element.scrollLeft = element.scrollLeft + value;
    };

    if (this.cardsWrapper) {
      const min = [0, 20];
      const max = [screen.width - 20, screen.width];

      console.log(e);
      if (isBetween(e.clientX, min[0], min[1])) {
        move(this.cardsWrapper, speed * -1);
      } else if (isBetween(e.clientX, max[0], max[1])) {
        move(this.cardsWrapper, speed);
      } else if (e.movementX > 0) {
        move(this.cardsWrapper, speed);
      } else if (e.movementX < 0) {
        move(this.cardsWrapper, speed * -1);
      }
    }
  }

  async fetchProject() {
    const projects = await this.api.getPlayers();
    const newProjects = [];
    if (projects) {
      for (const project of projects) {
        // just for developement time
        // allow to have multiple project to show
        for (let i = 0; i < 8; i++) {
          newProjects.push(project);
        }
        // console.log({ project });
      }
      this.projects = newProjects;
      this.setDefaultProject(projects[0]);
    }
  }

  setDefaultProject(project: Project) {
    const newProject: Project = project as Project;
    this.currentProject = newProject;
    this.setImage(newProject.coverImage);
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
