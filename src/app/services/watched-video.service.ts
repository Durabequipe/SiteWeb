import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WatchedSequenceService {
  watchedIds: string[] = [];

  constructor() {
    this.watchedIds = JSON.parse(localStorage.getItem('watchedIds') ?? '[]');
    console.log('watched ids', this.watchedIds);
  }

  addId(id: string): WatchedSequenceService {
    this.watchedIds.push(id);
    this.save();
    return this;
  }

  addUniqueId(id: string): WatchedSequenceService {
    if (!this.watchedIds.includes(id)) {
      this.watchedIds.push(id);
      this.save();
    }
    return this;
  }

  getIds(): string[] {
    return this.watchedIds;
  }

  clearIds(): WatchedSequenceService {
    this.watchedIds = [];
    this.save();
    return this;
  }

  removeId(id: string): WatchedSequenceService {
    const index = this.watchedIds.indexOf(id);
    if (index > -1) {
      this.watchedIds.splice(index, 1);
    }
    this.save();
    return this;
  }

  isWatched(id: string): boolean {
    return this.watchedIds.includes(id);
  }

  private save(): void {
    localStorage.setItem('watchedIds', JSON.stringify(this.watchedIds));
  }
}
