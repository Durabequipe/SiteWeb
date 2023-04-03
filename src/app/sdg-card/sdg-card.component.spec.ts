import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SdgCardComponent } from './sdg-card.component';

describe('SdgCardComponent', () => {
  let component: SdgCardComponent;
  let fixture: ComponentFixture<SdgCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SdgCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SdgCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
