import { Routes } from '@angular/router';
import { TrainerProfileSetupComponent } from './trainer-profile-setup/trainer-profile-setup';
import { LoadingScreen } from './loading-screen/loading-screen'; // Lo crearemos en el paso 2
import { PokemonSelection } from './pokemon-selection/pokemon-selection'; // Lo crearemos en el paso 3

export const routes: Routes = [
  { path: '', redirectTo: 'profile-setup', pathMatch: 'full' },
  { path: 'profile-setup', component: TrainerProfileSetupComponent },
  { path: 'loading', component: LoadingScreen },
  { path: 'pokemon-selection', component: PokemonSelection },
  { path: '**', redirectTo: 'profile-setup' }
];