import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { Project } from '../models/projects';

@Component({
  selector: 'app-sdg-list',
  templateUrl: './sdg-list.component.html',
  styleUrls: ['./sdg-list.component.scss'],
})
export class SdgListComponent implements OnInit {
  public backgroundImage = '';
  public currentProject: Project | null = null;
  public projects: Project[];
  private images: string[] = [];
  public style = '';

  constructor(private api: ProjectService) {
    const projects = [] as Project[];
    // just to avoid having nothing to display
    // if page loading is really slow
    /* for (let i = 1; i < 16; i++) {
      projects.push({} as Project);
    } */
    this.projects = projects;
  }

  async fetchProject() {
    const projects = await this.api.getPlayers();
    const newProjects = [];
    if (projects) {
      for (const project of projects) {
        // just for developement time
        // allow to have multiple project to show
        //for (let i = 0; i < 8; i++) {
        newProjects.push(project);
        this.images.push(project.coverImage);
        //}
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
            #0b0415 88.02%
          ),
          url("${url}");
          `;
    };

    this.style = getStyle(this.images[0]);

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

  ngOnInit(): void {
    this.fetchProject();
    const cards = document.querySelector('.cards') as HTMLElement;
    setTimeout(() => {
      if (cards) {
        cards.scrollLeft = (cards.scrollWidth - cards.clientWidth) / 2;
      }
    }, 500);
  }
}
