import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrainerProfileSetupComponent } from './trainer-profile-setup'; 
import { FormsModule } from '@angular/forms'; 
import { RouterTestingModule } from '@angular/router/testing'; 

describe('TrainerProfileSetupComponent', () => { 
  let component: TrainerProfileSetupComponent;
  let fixture: ComponentFixture<TrainerProfileSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TrainerProfileSetupComponent, 
        FormsModule, 
        RouterTestingModule 
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainerProfileSetupComponent); 
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});