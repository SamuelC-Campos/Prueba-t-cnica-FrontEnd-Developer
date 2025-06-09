// pokemon-summary.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { TrainerProfileService, TrainerProfile } from '../services/trainer-profile'; // Ajusta la ruta a tu servicio
import { PokemonService, Pokemon } from '../services/pokemon-sumary'; // Ajusta la ruta a tu servicio
import { Router } from '@angular/router'; // Importa Router para la navegación

@Component({
  selector: 'app-pokemon-summary',
  standalone: true,
  imports: [CommonModule], // Asegúrate de importar CommonModule para @if y @for
  templateUrl: './pokemon-summary.html',
  styleUrl: './pokemon-summary.css'
})
export class PokemonSummaryComponent implements OnInit {

  trainerProfile: TrainerProfile | null = null;
  selectedPokemonList: Pokemon[] = [];

  constructor(
    private trainerProfileService: TrainerProfileService,
    private pokemonService: PokemonService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Obtener el perfil del entrenador
    this.trainerProfile = this.trainerProfileService.getProfile();

    // Obtener los Pokémon seleccionados
    // NOTA: Asumo que tienes un método en PokemonService para obtener los seleccionados
    // Si no, necesitarás pasar los IDs a través de la ruta o un servicio compartido
    this.selectedPokemonList = this.pokemonService.getSelectedPokemon();

    // Si no hay perfil o Pokémon seleccionados, podrías redirigir de vuelta
    if (!this.trainerProfile || this.selectedPokemonList.length === 0) {
      // this.router.navigate(['/pokemon-selection']); // Redirige si no hay datos
    }
  }

  goBack(): void {
    this.router.navigate(['/pokemon-selection']); // Vuelve a la pantalla anterior
  }

  confirmTeam(): void {
    // Lógica para confirmar el equipo (ej. enviar a un backend, mostrar mensaje)
    console.log('Equipo confirmado:', this.selectedPokemonList);
    // Podrías redirigir a una página de éxito o al home
    // this.router.navigate(['/success']);
  }
}