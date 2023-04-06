import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Project } from '../models/projects';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private http: HttpService) {}

  async getPlayers(): Promise<Project[]> {
    return await this.http.get(`players`) as Promise<Project[]>;
  }
}
