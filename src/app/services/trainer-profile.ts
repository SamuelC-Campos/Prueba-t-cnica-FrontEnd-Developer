import { Injectable } from '@angular/core';

// Interface for defining the structure of the trainer's profile data
export interface TrainerProfile {
  name: string;
  profileImageUrl: string;
  hobby: string;
  age: number; 
  document: string; 
  isAdult: boolean; 
}

@Injectable({
  providedIn: 'root'
})
export class TrainerProfileService {
  private _trainerProfile: TrainerProfile | null = null; // Will store the profile data

  constructor() { }

  /**
   * Sets the trainer's profile data.
   * @param profile The profile data to save.
   */
  setProfile(profile: TrainerProfile): void {
    this._trainerProfile = profile;
    console.log('Perfil de entrenador guardado en el servicio:', this._trainerProfile);
  }

  /**
   * Gets the trainer's profile data.
   * @returns the profile data, or null if not set.
   */
  getProfile(): TrainerProfile | null {
    return this._trainerProfile;
  }

  /**
   * Clears profile data (e.g. when logging out).
   */
  clearProfile(): void {
    this._trainerProfile = null;
    console.log('Perfil de entrenador limpiado.');
  }
}