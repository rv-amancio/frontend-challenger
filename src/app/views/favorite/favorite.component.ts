import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Character } from '../../components/character/character.model';
import { AddFavorite, RemoveFavorite } from '../../favorite/favorites.actions';
import { FavoritesState } from '../../favorite/favorite.state';
import { MESSAGES } from '../../message';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {
  @Select(FavoritesState.getFavorites) favorites$!: Observable<Character[]>;
  favoritesMap: { [id: number]: boolean } = {};
  messages = MESSAGES;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.favorites$.subscribe(favorites => {
      this.favoritesMap = {};
      favorites.forEach(favorite => {
        this.favoritesMap[favorite.id] = true;
      });
    });
  }

  toggleFavorite(character: Character) {
    const isFavorite = !!this.favoritesMap[character.id];
    if (isFavorite) {
      this.store.dispatch(new RemoveFavorite(character));
    } else {
      this.store.dispatch(new AddFavorite(character));
    }
  }
}
