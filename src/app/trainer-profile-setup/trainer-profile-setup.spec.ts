import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerProfileSetup } from './trainer-profile-setup';

describe('TrainerProfileSetup', () => {
  let component: TrainerProfileSetup;
  let fixture: ComponentFixture<TrainerProfileSetup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainerProfileSetup]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainerProfileSetup);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
