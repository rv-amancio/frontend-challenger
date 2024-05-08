import { addFavorite, removeFavorite } from './favorites.actions';
import { FavoritesState } from './favorite.state';
import { createReducer, on } from '@ngxs/store';

const initialState: FavoritesState = {
  characters: []
};

export const favoritesReducer = createReducer(
  initialState,
  on(addFavorite, (state, { character }) => ({
    ...state,
    characters: [...state.characters, character]
  })),
  on(removeFavorite, (state, { character }) => ({
    ...state,
    characters: state.characters.filter(c => c.id !== character.id)
  }))
); 
