import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonSummary } from './pokemon-summary';

describe('PokemonSummary', () => {
  let component: PokemonSummary;
  let fixture: ComponentFixture<PokemonSummary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonSummary]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonSummary);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
