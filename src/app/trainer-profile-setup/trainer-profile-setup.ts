import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // <-- Importa Router


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
  
  documentValue: string = '';
  nameValue: string = '';

  // Nuevas propiedades para la lógica de cumpleaños/documento
  birthdayValue: string | null = null; // Para el valor del campo de cumpleaños
  documentLabel: string = 'Documento'; // Etiqueta inicial
  documentPlaceholder: string = ' '; // Placeholder inicial (un espacio para el efecto de floating label)


   constructor(private router: Router) { }
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

  // Nuevo método para detectar el cambio de fecha de cumpleaños y actualizar el documento
  onBirthdayChange(): void {
    if (this.birthdayValue) {
      const birthDate = new Date(this.birthdayValue);
      const today = new Date();

      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      // Ajustar edad si el cumpleaños de este año aún no ha pasado
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      if (age >= 18) {
        this.documentLabel = 'DUI*';
        this.documentPlaceholder = '00000000-0'; // Formato de DUI
        this.documentValue = '';
      } else {
        this.documentLabel = 'Carnet de minoridad';
        this.documentPlaceholder = ''; 
      }
    } else {
      // Si el campo de fecha de cumpleaños se vacía, restablecer el documento a su estado inicial
      this.documentLabel = 'Documento';
      this.documentPlaceholder = ' ';
      // Opcional: limpiar el valor del documento
      this.documentValue = '';
    }
  }

  // Este getter determinará si el formulario es válido para habilitar el botón
  get isFormValid(): boolean {
    // 1. El campo "Nombre" es obligatorio
    if (!this.nameValue || this.nameValue.trim().length === 0) {
      return false;
    }

    // 2. El campo "Cumpleaños" es obligatorio
    if (!this.birthdayValue) {
      return false;
    }

    // 3. Lógica condicional para el campo "Documento"
    if (this.documentLabel === 'DUI*') {
      // Si la etiqueta es "DUI" (mayor de edad), el campo documento es obligatorio
      if (!this.documentValue || this.documentValue.trim().length === 0) {
        return false;
      }
    }
    // Si la etiqueta es "Carnet de minoridad" (menor de edad), el campo documento NO es obligatorio,
    // por lo tanto, no necesitamos un 'return false' aquí.

    // Si todas las validaciones anteriores pasan, el formulario es válido
    return true;
  }

  onSubmit(): void {
    if (this.isFormValid) {
      console.log('Formulario válido. Navegando a la pantalla de carga...');
      // Navega a la pantalla de carga. La ruta '/loading' debe estar definida en app.routes.ts
      this.router.navigate(['/loading']); 

      // Simula un tiempo de carga (por ejemplo, 3 segundos) antes de navegar a la siguiente página
      setTimeout(() => {
        console.log('Carga completa. Navegando a la selección de Pokémon...');
        // Navega a la página de selección de Pokémon. La ruta '/pokemon-selection' debe estar definida en app.routes.ts
        this.router.navigate(['/pokemon-selection']);
      }, 3000); // 3000 milisegundos = 3 segundos
    } else {
      console.log('Formulario inválido. Por favor, completa todos los campos requeridos.');
      // Opcional: podrías mostrar una alerta o mensajes de error al usuario aquí
    }
  }
}
