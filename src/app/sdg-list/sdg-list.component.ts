import { Component, OnInit, HostListener } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { Project  } from '../models/projects';

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
    for (let i = 1; i < 16; i++) {
      projects.push({} as Project);
    }
    this.projects = projects
  }

  onMouseMove(e: any) {
    const speed = 30;
    const move = (element: HTMLElement, value: number) => {
      const moveValue = element.scrollLeft + value;
      element.scrollLeft = moveValue;
    };

    if (this.cardsWrapper) {
      if (e.movementX > 0) {
        move(this.cardsWrapper, speed);
      } else if (e.movementX < 0) {
        move(this.cardsWrapper, speed * -1);
      }
    }
  }

  async fetchProject() {
    const projects = await this.api.getPlayers();
    const newProjects = []
    if (projects) {
      for (const project of projects) {
        for (let i = 0; i < 8; i++) {
          newProjects.push(project);
        }
        console.log({ project });
      }
      this.projects = newProjects
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
