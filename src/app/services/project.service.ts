import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Project } from '../models/projects';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private http: HttpService) {}

  async getPlayers(): Promise<Project[]> {
    const key = `?api_key=${environment.apiToken}`;
    return this.http.get(`players${key}`) as Promise<Project[]>;
  }
}
