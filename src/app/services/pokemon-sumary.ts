import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

// --- Interfaces para los datos de Pokémon ---

// Interfaz para la estadística individual del Pokémon
export interface PokemonStat {
  name: string; // Ej: 'hp', 'attack'
  value: number; // Ej: 45
}

// Interfaz para el tipo individual del Pokémon
export interface PokemonType {
  name: string; // Ej: 'grass', 'poison'
}

// Interfaz principal para un Pokémon (adaptada de la estructura de PokeAPI y tus necesidades)
export interface Pokemon {
  id: number;
  name: string;
  url: string;
  imageUrl: string; // Usado para la imagen principal del Pokémon
  isSelected?: boolean; // Propiedad para el estado de selección en la lista
  types: PokemonType[]; // Array de objetos con el nombre del tipo
  stats: PokemonStat[]; // Array de objetos con el nombre y valor de la estadística
  // Agrega cualquier otra propiedad que uses en tus componentes
}

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  // Usamos BehaviorSubject para almacenar los Pokémon seleccionados
  // Esto permite que los componentes se 'suscriban' a los cambios
  private _selectedPokemon = new BehaviorSubject<Pokemon[]>([]);
  // Exponemos un Observable para que los componentes puedan leer los datos
  public readonly selectedPokemon$: Observable<Pokemon[]> = this._selectedPokemon.asObservable();

  constructor() { }

  /**
   * Guarda la lista de Pokémon seleccionados.
   * @param pokemonList La lista de Pokémon que el usuario ha seleccionado.
   */
  saveSelectedPokemon(pokemonList: Pokemon[]): void {
    this._selectedPokemon.next(pokemonList);
  }

  /**
   * Retorna la lista actual de Pokémon seleccionados.
   * Esto es útil si un componente necesita el valor actual de forma síncrona.
   * Si un componente necesita reaccionar a cambios, debería suscribirse a `selectedPokemon$`.
   * @returns La lista actual de Pokémon seleccionados.
   */
  getSelectedPokemon(): Pokemon[] {
    return this._selectedPokemon.getValue();
  }

  // Si necesitas un método para cargar todos los Pokémon o filtrar, iría aquí.
  // fetchAllPokemon(): Observable<Pokemon[]> { ... }
  // getPokemonById(id: number): Observable<Pokemon> { ... }
}