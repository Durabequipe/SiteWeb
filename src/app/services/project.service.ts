import { Injectable } from '@angular/core';
import { Project } from '@shammas44/interactive-video-player';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private http: HttpService) {}

  async getProjectsIds(): Promise<string[]> {
    return this.http.get('projectsIds') as Promise<string[]>;
  }

  async getPlayer(id: string): Promise<Project> {
    return this.http.get(`player/${id}`) as Promise<Project>;
  }
}
