import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-trainer-profile-setup',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './trainer-profile-setup.html',
  styleUrl: './trainer-profile-setup.css'
})
export class TrainerProfileSetupComponent implements OnInit {
  profileImageUrl: string | ArrayBuffer | null = null; // Para mostrar la imagen previsualizada
  selectedHobby: string = "";
  isHobbySelected: boolean = false;

  nameValue: string = '';
  documentValue: string = '';
  birthdayValue: string = '';

  constructor() { }
  ngOnInit(): void {
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.profileImageUrl = reader.result; // Asigna la URL base64 para la previsualización
      };

      reader.readAsDataURL(file); // Lee el archivo como una URL base64
    } else {
      this.profileImageUrl = null;
    }
  }

 onHobbyChange(): void {
    this.isHobbySelected = !!this.selectedHobby; // true si selectedHobby tiene un valor (no vacío)
  }

}
