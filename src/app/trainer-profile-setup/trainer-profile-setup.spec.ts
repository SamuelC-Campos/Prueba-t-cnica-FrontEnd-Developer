import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrainerProfileSetupComponent } from './trainer-profile-setup'; // <-- CORRECCIÓN: Nombre del componente y .component
import { FormsModule } from '@angular/forms'; // <-- AÑADE ESTO
import { RouterTestingModule } from '@angular/router/testing'; // <-- AÑADE ESTO

describe('TrainerProfileSetupComponent', () => { // <-- CORRECCIÓN: Usar el nombre completo del componente
  let component: TrainerProfileSetupComponent;
  let fixture: ComponentFixture<TrainerProfileSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TrainerProfileSetupComponent, // <-- CORRECCIÓN: Usar el nombre completo del componente
        FormsModule, // <-- AÑADE ESTO
        RouterTestingModule // <-- AÑADE ESTO
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainerProfileSetupComponent); // <-- CORRECCIÓN: Usar el nombre completo del componente
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});