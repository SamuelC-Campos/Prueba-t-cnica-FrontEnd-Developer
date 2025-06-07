import { Component } from '@angular/core';
import { TrainerProfileSetupComponent } from './trainer-profile-setup/trainer-profile-setup';

@Component({
  selector: 'app-root',
  imports: [ TrainerProfileSetupComponent ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'pruebaTecnica';
}
