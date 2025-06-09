import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TrainerProfileService, TrainerProfile } from '../services/trainer-profile';
import { DuiMaskDirective } from '../directives/dui-mask';

@Component({
  selector: 'app-trainer-profile-setup',
  standalone: true,
  imports: [FormsModule, CommonModule, DuiMaskDirective ],
  templateUrl: './trainer-profile-setup.html',
  styleUrl: './trainer-profile-setup.css'
})
export class TrainerProfileSetupComponent implements OnInit {
  profileImageUrl: string | ArrayBuffer | null = null; // display the preview image
  selectedHobby: string = "";
  isHobbySelected: boolean = false; // Property for the conditional style of the select

  documentValue: string = '';
  nameValue: string = '';

  // Birthday logic/document
  birthdayValue: string | null = null;
  documentLabel: string = 'Documento';
  documentPlaceholder: string = ' ';


  // Router y el TrainerProfileService
  constructor(private router: Router, private trainerProfileService: TrainerProfileService) { }

  ngOnInit(): void {
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.profileImageUrl = reader.result; // Assigns the base64 URL for previewing
      };

      reader.readAsDataURL(file); // Reads the file as a base64 URL
    } else {
      this.profileImageUrl = null;
    }
  }

  onHobbyChange(): void {
    this.isHobbySelected = !!this.selectedHobby;
  }

  // method to detect the change of birthday and update the document
  onBirthdayChange(): void {
    if (this.birthdayValue) {
      const birthDate = new Date(this.birthdayValue);
      const today = new Date();

      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      // Set age if this year's birthday has not yet passed
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      if (age >= 18) {
        this.documentLabel = 'DUI*';
        this.documentPlaceholder = '00000000-0'; // Format DUI
        this.documentValue = '';
      } else {
        this.documentLabel = 'Carnet de minoridad';
        this.documentPlaceholder = ''; //Carnet
        this.documentValue = '';
      }
    } else {
      // If the birthday date field becomes empty, reset the document to its initial state
      this.documentLabel = 'Documento';
      this.documentPlaceholder = ' ';
      this.documentValue = '';
    }
  }

  // This getter will determine if the form is valid to enable the button.
  get isFormValid(): boolean {
    // The “Name” field is mandatory.
    if (!this.nameValue || this.nameValue.trim().length === 0) {
      return false;
    }

    // The “Hobby” field is mandatory (assuming that the option disabled selected with value="" makes it required).
    if (!this.selectedHobby) {
      return false;
    }

    //The birthday field uis mandatory
    if (!this.birthdayValue) {
      return false;
    }

    // Conditional logic for the "Document" field
    // Calculate the age to know if DUI is required.
    const age = this.birthdayValue ? this.calculateAge(this.birthdayValue) : 0;
    const isAdult = age >= 18;

    if (isAdult) {
      // If you are of legal age, the DUI is mandatory and must be in a basic format (e.g. not empty)
      if (!this.documentValue || this.documentValue.trim().length === 0) {
        return false;
      }
    }
    return true;
  }

  // Auxiliary function to calculate age (used in isFormValid)
  private calculateAge(birthdayString: string): number {
    const birthDate = new Date(birthdayString);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  onSubmit(): void {
    if (this.isFormValid) {
      // We calculate age and if adult just before saving
      const age = this.calculateAge(this.birthdayValue!);
      const isAdult = age >= 18;

      // Create the object with the profile data
      const trainerProfile: TrainerProfile = {
        name: this.nameValue,
        profileImageUrl: this.profileImageUrl?.toString() || '',
        hobby: this.selectedHobby,
        age: age,
        document: this.documentValue,
        isAdult: isAdult
      };

      // SAVE THE PROFILE IN THE SERVICE
      this.trainerProfileService.setProfile(trainerProfile);

      console.log('Formulario válido. Datos guardados. Navegando a la pantalla de carga...');
      this.router.navigate(['/loading']);

      // Simulates a loading time (e.g., 3 seconds) before navigating to the next page
      setTimeout(() => {
        console.log('Carga completa. Navegando a la selección de Pokémon...');
        this.router.navigate(['/pokemon-selection']);
      }, 3000); // 3000 miliseconds = 3 seconds
    } else {
      console.log('Formulario inválido. Por favor, completa todos los campos requeridos.');
    }
  }
}