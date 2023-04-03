import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private http: HttpService) {}

  async getProjects() {
    return this.http.get('projects');
  }

  async getProject(id: string) {
    return this.http.get(`projects/${id}`);
  }

  async getPlayer(id: string) {
    return this.http.get(`player/${id}`);
  }
}
