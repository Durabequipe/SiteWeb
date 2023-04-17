import { TestBed } from '@angular/core/testing';

import { WatchedSequenceService } from './watched-video.service';

describe('WatchedVideoService', () => {
  let service: WatchedSequenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WatchedSequenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
