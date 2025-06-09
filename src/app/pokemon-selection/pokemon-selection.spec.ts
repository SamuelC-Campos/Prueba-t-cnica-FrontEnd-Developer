import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonSelection } from './pokemon-selection';

describe('PokemonSelection', () => {
  let component: PokemonSelection;
  let fixture: ComponentFixture<PokemonSelection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonSelection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonSelection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
