import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { Project } from '../models/projects';

function onresize(event: any) {
  const gradient = document.querySelector(
    '.background.background--gradient'
  ) as HTMLElement;
  if (window.innerWidth > 800 && gradient) {
    gradient.style.background = '';
  }
}

@Component({
  selector: 'app-sdg-list',
  templateUrl: './sdg-list.component.html',
  styleUrls: ['./sdg-list.component.scss'],
})
export class SdgListComponent implements OnInit, OnDestroy {
  public backgroundImage = '';
  public currentProject: Project | null = null;
  public projects: Project[];
  private images: string[] = [];
  public style = '';

  constructor(private api: ProjectService) {
    const projects = [] as Project[];
    this.projects = projects;
    window.onresize = onresize;
  }

  ngOnInit(): void {
    this.fetchProject();
    const cards = document.querySelector('.cards') as HTMLElement;
    setTimeout(() => {
      if (cards) {
        cards.scrollLeft = (cards.scrollWidth - cards.clientWidth) / 2;
      }
    }, 500);

    if (cards) {
      cards.addEventListener('wheel', (event) => {
        event.preventDefault();
        cards.scrollLeft += event.deltaY;
      });
    }
  }

  ngOnDestroy() {
    window.onresize = null;
  }

  async fetchProject() {
    const projects = await this.api.getPlayers();
    const newProjects = [];
    if (projects) {
      for (const project of projects) {
        newProjects.push(project);
        this.images.push(project.coverImage);
      }
      this.projects = newProjects;
      this.setDefaultProject(projects[0]);
    }
  }

  setDefaultProject(project: Project) {
    const newProject: Project = project as Project;
    this.currentProject = newProject;
    this.setImage(newProject.coverImage);
    this.setBackgroundStyle();
  }

  setBackgroundStyle() {
    const gradient = document.querySelector(
      '.background.background--gradient'
    ) as HTMLElement;
    let i = 0;
    const getStyle = (url: string) => {
      return `
          background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0) 49.79%,
            rgba(0, 0, 0, 0.1797) 60.73%,
            black 88.02%
          ),
          url("${url}");
          `;
    };

    if (window.innerWidth < 800 && gradient) {
      this.style = getStyle(this.images[0]);
    }

    const func = () => {
      if (window.innerWidth < 800 && gradient) {
        i++;
        if (this.images.length - 1 < i) i = 0;
        this.style = getStyle(this.images[i]);
      }
    };
    setInterval(func, 4000);
  }

  onCardIsHover(project: Project | null) {
    if (project) {
      this.setImage(project.coverImage);
      this.currentProject = project;
    }
  }

  setImage(image: string) {
    this.backgroundImage = `background-image:url('${image}'); background-size: cover; background-position: center; background-repeat: no-repeat;transition: all 0.4s ease-in-out 0s;`;
  }
}
