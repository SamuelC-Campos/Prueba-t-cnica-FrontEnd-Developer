import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TrainerProfileService, TrainerProfile } from '../services/trainer-profile';
import { PokemonService, Pokemon, PokemonType, PokemonStat } from '../services/pokemon-sumary';
import { FormsModule } from '@angular/forms';
import { forkJoin, map, switchMap, tap, of } from 'rxjs'; // 'of' es para el caso de lista vacía

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

  isLoading: boolean = false;

  // Inyectamos HttpClient, Router y TrainerProfileService
  constructor(
    private http: HttpClient,
    private router: Router,
    private trainerProfileService: TrainerProfileService,
    private pokemonService: PokemonService
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
  const limit = 125; // Número de Pokémon a cargar inicialmente

  this.http.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`).pipe(
    // Paso 1: Mapear la respuesta inicial para obtener una lista básica de Pokémon
    map((response: any) => response.results.map((pokemon: any) => {
      const id = this.extractPokemonId(pokemon.url);
      return {
        name: pokemon.name,
        url: pokemon.url, // Necesitamos esta URL para la segunda llamada de detalle
        id: id,
        imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
        isSelected: false,
        types: [], // Inicializamos vacíos, se llenarán en el siguiente paso
        stats: []  // Inicializamos vacíos, se llenarán en el siguiente paso
      };
    })),
    // Paso 2: Usar switchMap para hacer una nueva serie de llamadas HTTP para cada Pokémon.
    // switchMap es útil aquí porque si se llama a loadPokemon() varias veces rápidamente,
    // cancela las solicitudes anteriores y solo procesa la última.
    switchMap((basicPokemonList: Pokemon[]) => {
      if (basicPokemonList.length === 0) {
        return of([]); // Retorna un Observable que emite un array vacío si no hay Pokémon
      }

      // Creamos un array de Observables, uno por cada llamada de detalle de Pokémon
      const detailRequests = basicPokemonList.map(pokemon =>
        this.http.get(pokemon.url).pipe(
          map((detailResponse: any) => {
            // Mapeamos las estadísticas del formato de PokeAPI a tu interfaz PokemonStat
            const stats: PokemonStat[] = detailResponse.stats.map((statEntry: any) => ({
              name: statEntry.stat.name,
              value: statEntry.base_stat // ¡Aquí asignamos 'base_stat' a 'value'!
            }));

            // Mapeamos los tipos del formato de PokeAPI a tu interfaz PokemonType
            const types: PokemonType[] = detailResponse.types.map((typeEntry: any) => ({
              name: typeEntry.type.name
            }));

            return {
              ...pokemon, // Mantiene las propiedades básicas que ya teníamos (id, name, imageUrl, etc.)
              types: types, // Asigna los tipos obtenidos
              stats: stats  // Asigna las estadísticas obtenidas
            };
          })
        )
      );
      // forkJoin espera a que TODOS los Observables dentro del array 'detailRequests' se completen
      // y luego emite un único array con todos los Pokémon ya con sus detalles.
      return forkJoin(detailRequests);
    }),
    // Paso 3: Una vez que todos los detalles se han cargado, actualizamos las listas del componente.
    tap((detailedPokemonList: Pokemon[]) => {
      this.pokemonList = detailedPokemonList;
      this.filteredPokemonList = [...this.pokemonList]; // Inicializa la lista filtrada
      console.log('Pokémon cargados con detalles:', this.pokemonList);
    })
  ).subscribe({
    error: (error) => {
      console.error('Error al cargar Pokémon con detalles:', error);
    }
  });
}

  // Small function to extract the Pokémon's ID from its URL
  private extractPokemonId(url: string): number {
    const parts = url.split('/');
    return parseInt(parts[parts.length - 2]);
  }

  // Filter the list of Pokémon
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
      // 1. Mostrar la pantalla de carga estableciendo isLoading a true
      this.isLoading = true;

      // 2. Guardar los Pokémon seleccionados en el servicio
      this.pokemonService.saveSelectedPokemon(this.selectedPokemon);
      this.router.navigate(['/loading']);
      // 3. Usar setTimeout para simular un retardo de carga antes de navegar
      setTimeout(() => {
        this.router.navigate(['/pokemon-summary']);
        // No es necesario poner isLoading = false aquí, ya que el componente
        // se destruirá al navegar a la nueva ruta.
      }, 2000); // Retardo de 2 segundos (ajusta este valor si lo deseas)
    }
  }
  goBack(): void {
    this.router.navigate(['/trainer-profile-setup']); // Ajusta esta ruta a tu componente anterior
  }
}