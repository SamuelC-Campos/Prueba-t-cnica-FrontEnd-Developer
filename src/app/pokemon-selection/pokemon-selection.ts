import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TrainerProfileService, TrainerProfile } from '../services/trainer-profile';
import { FormsModule } from '@angular/forms';

interface Pokemon {
  name: string;
  url: string;
  id: number;
  imageUrl: string;
  isSelected: boolean;
}

@Component({
  selector: 'app-pokemon-selection',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pokemon-selection.html',
  styleUrl: './pokemon-selection.css'
})
export class PokemonSelection implements OnInit {

  pokemonList: Pokemon[] = []; // Stores the complete Pokémon list
  filteredPokemonList: Pokemon[] = []; //<-- Stores the list of Pokémon displayed (filtered).
  selectedPokemon: Pokemon[] = []; // Stores the 3 selected Pokémon
  maxSelections: number = 3; // Limit of Pokémon to be selected

  trainerProfile: TrainerProfile | null = null;
  searchQuery: string = '';

  // Inyectamos HttpClient, Router y TrainerProfileService
  constructor(
    private http: HttpClient,
    private router: Router,
    private trainerProfileService: TrainerProfileService
  ) { }

  ngOnInit(): void {
    // Load the trainer's profile when the component is started
    this.loadTrainerProfile();
    // 2. Load the Pokémon list
    this.loadPokemon();
  }

  //Loads the trainer's service profile
  loadTrainerProfile(): void {
    this.trainerProfile = this.trainerProfileService.getProfile();
    if (this.trainerProfile) {
      console.log('Perfil de entrenador cargado en PokemonSelection:', this.trainerProfile);
    } else {
      console.warn('No se encontró un perfil de entrenador. Asegúrate de haberlo configurado.');
    }
  }

  loadPokemon(): void {
    const limit = 125; // numbers de pokemons
    this.http.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`).subscribe({
      next: (response: any) => {
        this.pokemonList = response.results.map((pokemon: any) => {
          const id = this.extractPokemonId(pokemon.url);
          return {
            name: pokemon.name,
            url: pokemon.url,
            id: id,
            imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`, // URL de la imagen del sprite
            isSelected: false
          };
        });
        // Initializes the filtered list with all the Pokémon loaded.
        this.filteredPokemonList = [...this.pokemonList];
        console.log('Pokémon cargados:', this.pokemonList);
      },
      error: (error) => {
        console.error('Error al cargar Pokémon:', error);
      }
    });
  }

  // Small function to extract the Pokémon's ID from its URL
  private extractPokemonId(url: string): number {
    const parts = url.split('/');
    return parseInt(parts[parts.length - 2]);
  }

  // <-- NEW METHOD! Filter the list of Pokémon
  filterPokemon(): void {
    const query = this.searchQuery.toLowerCase().trim();
    if (!query) {
      this.filteredPokemonList = [...this.pokemonList]; // If the search is empty, displays all
      return;
    }

    this.filteredPokemonList = this.pokemonList.filter(pokemon => {
      // Search by name (case insensitive)
      const nameMatch = pokemon.name.toLowerCase().includes(query);
      // Search by ID (converts ID to string for comparison)
      const idMatch = pokemon.id.toString().includes(query);

      return nameMatch || idMatch;
    });
  }

  // Logic for selecting/deselecting a Pokémonn
  togglePokemonSelection(pokemon: Pokemon): void {
    const index = this.selectedPokemon.findIndex(p => p.id === pokemon.id);

    if (index > -1) {
      // If the Pokémon is already selected, deselects it.
      this.selectedPokemon.splice(index, 1);
      pokemon.isSelected = false;
    } else {
      // If the Pokémon is not selected and the limit has not yet been reached
      if (this.selectedPokemon.length < this.maxSelections) {
        this.selectedPokemon.push(pokemon);
        pokemon.isSelected = true;
      } else {
        console.log(`Ya has seleccionado el máximo de ${this.maxSelections} Pokémon.`);
        alert(`Solo puedes seleccionar hasta ${this.maxSelections} Pokémon.`);
      }
    }
    console.log('Pokémon seleccionados:', this.selectedPokemon);
  }
  // Getter to find out if the continue button should be enabled
  get isContinueButtonEnabled(): boolean {
    return this.selectedPokemon.length === this.maxSelections;
  }

  // Method for handling the click on the “Continue” button.
  onContinue(): void {
    if (this.isContinueButtonEnabled) {
      console.log('Selección de Pokémon completa. Navegando a la siguiente página...');
      alert('¡Pokémon seleccionados con éxito! (Navegación pendiente)');
      // this.router.navigate(['/resumen-seleccion']);
    }
  }
}