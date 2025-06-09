import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainerProfileService, TrainerProfile } from '../services/trainer-profile';
import { PokemonService, Pokemon } from '../services/pokemon-sumary';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-summary',
  standalone: true,
  imports: [CommonModule],
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
    // Obtain the trainer's profile
    this.trainerProfile = this.trainerProfileService.getProfile();

    // Obtain the selected Pokémon
    this.selectedPokemonList = this.pokemonService.getSelectedPokemon();

    // If there is no profile or Pokémon selected, you could redirect back
    if (!this.trainerProfile || this.selectedPokemonList.length === 0) {
      // this.router.navigate(['/pokemon-selection']); // Redirige si no hay datos
    }
  }

  goBack(): void {
    this.router.navigate(['/pokemon-selection']); // Returns to the previous screen
  }

  // Nuevos métodos para navegación
  editProfile(): void {
      this.router.navigate(['/loading']);
      setTimeout(() => {
        this.router.navigate(['/profile-setup']);
      }, 2000);
  }

  editPokemon(): void {
    this.router.navigate(['/loading']);
      setTimeout(() => {
        this.router.navigate(['/pokemon-selection']);
      }, 2000);
  }
}