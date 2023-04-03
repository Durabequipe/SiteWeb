import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SdgListComponent } from './sdg-list.component';

describe('SdgListComponent', () => {
  let component: SdgListComponent;
  let fixture: ComponentFixture<SdgListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SdgListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SdgListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
