import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { Project } from '../models/projects';
import { percentageBetween } from '../lib/utils';

const MIN_DESKTOP_WIDTH = 1000

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
    window.addEventListener('resize', () => {
      this.setOverflow();
    });
  }

  onMouseMove(e: MouseEvent) {
    if (this.cardsWrapper) {
      const windowPosition = percentageBetween(e.x, 0, screen.width);
      const scrollWidth = this.cardsWrapper.scrollWidth;
      this.cardsWrapper.scrollLeft =
        (windowPosition * scrollWidth) / 100 - screen.width / 2;
    }
  }

  setOverflow() {
    if (this.cardsWrapper) {
      const isDesktop = screen.width > MIN_DESKTOP_WIDTH;
      isDesktop
        ? (this.cardsWrapper.style.overflow = 'hidden')
        : (this.cardsWrapper.style.overflow = 'scroll');
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
    this.setOverflow();
    setTimeout(() => {
      if (cards) {
        cards.scrollLeft = (cards.scrollWidth - cards.clientWidth) / 2;
      }
    }, 500);
  }
}
