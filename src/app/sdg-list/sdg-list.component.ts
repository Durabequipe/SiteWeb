import { Component, OnInit, HostListener } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { Project, SdgProject } from '../models/projects';

@Component({
  selector: 'app-sdg-list',
  templateUrl: './sdg-list.component.html',
  styleUrls: ['./sdg-list.component.scss'],
})
export class SdgListComponent implements OnInit {
  public backgroundImage = '';
  public currentProject: SdgProject | null = null;

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

  public projects: Project[] = [];
  public lastX = 0;
  private cardsWrapper: HTMLElement | null = null;

  constructor(private api: ProjectService) {}

  async fetchProject() {
    const projects = await this.api.getPlayers();
    if (projects) {
      for (const project of projects) {
        for (let i = 0; i < 5; i++) {
          this.projects.push(project);
        }
        console.log({ project });
      }
      this.setDefaultProject(projects[0]);
    }
  }

  setDefaultProject(project: Project) {
    const newProject: SdgProject = project as SdgProject;
    newProject.sdgNo = 0;
    this.currentProject = newProject;
    this.setImage(newProject.coverImage);
  }

  onCardIsHover(project: SdgProject | null) {
    if (project) {
      this.setImage(project.coverImage);
      this.currentProject = project;
    }
  }

  setImage(image: string) {
    this.backgroundImage = `background-image:url('${image}')`;
  }

  formatSdgNumber() {
    const no = this.currentProject?.sdgNo || 1;
    return no < 10 ? `0${String(no)}` : `${String(no)}`;
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
