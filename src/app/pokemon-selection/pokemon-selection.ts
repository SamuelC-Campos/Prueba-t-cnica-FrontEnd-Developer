// src/app/pokemon-selection/pokemon-selection.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http'; // Para hacer solicitudes HTTP
import { Router } from '@angular/router'; // Para futuras navegaciones

// Opcional: define una interfaz para los datos de Pokémon para mejor tipado
interface Pokemon {
  name: string;
  url: string;
  id?: number;
  imageUrl?: string;
  isSelected?: boolean; // Para controlar la selección en la UI
}

@Component({
  selector: 'app-pokemon-selection',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './pokemon-selection.html',
  styleUrl: './pokemon-selection.css'
})
export class PokemonSelection implements OnInit { 

  pokemonList: Pokemon[] = []; // Para almacenar la lista de Pokémon
  selectedPokemon: Pokemon[] = []; // Para almacenar los 3 Pokémon seleccionados
  maxSelections: number = 3; // Límite de Pokémon a seleccionar

  // Inyectamos HttpClient y Router
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    // Cuando el componente se inicializa, carga los Pokémon
    this.loadPokemon();
  }

  loadPokemon(): void {
    
    const limit = 151; // numero de pokemons
    this.http.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`).subscribe({
      next: (response: any) => {
        // Mapeamos la respuesta para obtener los IDs y URLs de imagen
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
        console.log('Pokémon cargados:', this.pokemonList);
      },
      error: (error) => {
        console.error('Error al cargar Pokémon:', error);
      }
    });
  }

  // Pequeña función para extraer el ID del Pokémon de su URL
  private extractPokemonId(url: string): number {
    const parts = url.split('/');
    return parseInt(parts[parts.length - 2]);
  }

  // Lógica para seleccionar/deseleccionar un Pokémon
  togglePokemonSelection(pokemon: Pokemon): void {
    const index = this.selectedPokemon.findIndex(p => p.id === pokemon.id);

    if (index > -1) {
      // Si el Pokémon ya está seleccionado, lo deselecciona
      this.selectedPokemon.splice(index, 1);
      pokemon.isSelected = false;
    } else {
      // Si el Pokémon no está seleccionado y aún no hemos alcanzado el límite
      if (this.selectedPokemon.length < this.maxSelections) {
        this.selectedPokemon.push(pokemon);
        pokemon.isSelected = true;
      } else {
        console.log(`Ya has seleccionado el máximo de ${this.maxSelections} Pokémon.`);
        // Opcional: Mostrar un mensaje al usuario
      }
    }
    console.log('Pokémon seleccionados:', this.selectedPokemon);
  }

  // Getter para saber si el botón de continuar debe estar habilitado
  get isContinueButtonEnabled(): boolean {
    return this.selectedPokemon.length === this.maxSelections;
  }

  // Método para manejar el clic en el botón "Continuar"
  onContinue(): void {
    if (this.isContinueButtonEnabled) {
      console.log('Selección de Pokémon completa. Navegando a la siguiente página...');
      alert('¡Pokémon seleccionados con éxito! (Navegación pendiente)');
    }
  }


}