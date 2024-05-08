import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Character } from '../components/character/character.model';
import { AddFavorite, RemoveFavorite } from './favorites.actions';

export interface FavoritesStateModel {
  characters: Character[];
}

@State<FavoritesStateModel>({
  name: 'favorites',
  defaults: {
    characters: []
  }
})
@Injectable()
export class FavoritesState {
  @Selector()
  static getFavorites(state: FavoritesStateModel) {
    return state.characters;
  }

  @Action(AddFavorite)
  addFavorite(ctx: StateContext<FavoritesStateModel>, action: AddFavorite) {
    const state = ctx.getState();
    const characters = [...state.characters, action.character];
    ctx.patchState({ characters });
  }

  @Action(RemoveFavorite)
  removeFavorite(ctx: StateContext<FavoritesStateModel>, action: RemoveFavorite) {
    const state = ctx.getState();
    const characters = state.characters.filter(c => c.id !== action.character.id);
    ctx.patchState({ characters });
  }
}
