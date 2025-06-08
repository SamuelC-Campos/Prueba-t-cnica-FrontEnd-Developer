import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'; // <-- Asegúrate de importar RouterOutlet
import { CommonModule } from '@angular/common'; // Usualmente necesario

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule], // <-- RouterOutlet debe estar aquí
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  title = 'MiAppPokemon';
}