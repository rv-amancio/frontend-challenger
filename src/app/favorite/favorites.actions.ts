import { Character } from '../components/character/character.model';

export class AddFavorite {
  static readonly type = '[Favorites] Add Favorite';
  constructor(public character: Character) {}
}

export class RemoveFavorite {
  static readonly type = '[Favorites] Remove Favorite';
  constructor(public character: Character) {}
}
