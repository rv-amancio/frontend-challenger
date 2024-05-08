import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Character } from './character.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CharacterService } from './character.service';
import { SearchService } from '../services/search.service';
import { CharacterResponse } from './character.model';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { AddFavorite, RemoveFavorite } from '../../favorite/favorites.actions';
import { FavoritesState } from '../../favorite/favorite.state';


@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit {
  pageSize = 20;
  pageIndex = 0;
  totalCharacters = 0;
  pageSizeOptions: number[] = [20];
  favoritesMap: { [id: number]: boolean } = {};
  breakpoint: number = 0;

  @Select(FavoritesState.getFavorites) favorites$!: Observable<Character[]>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Input() characters!: Character[];
  @Input() isInFavoritesPage: boolean = false;

  constructor(
    private readonly service: CharacterService,
    private searchService: SearchService,
    private store: Store
  ) { }

  ngOnInit(): void {

    this.searchService.getSearchObservable().subscribe(term => {
      this.searchCharacters(term);
    });

    this.getCharacters();

    this.favorites$.subscribe(favorites => {
      this.favoritesMap = {};
      favorites.forEach(favorite => {
        this.favoritesMap[favorite.id] = true;
      });
    });
    
    this.breakpoint = (window.innerWidth <= 425) ? 2 : 4;

  }

  onResize(event: any) {
    this.breakpoint = (event.target.innerWidth <= 425) ? 2 : 4;
  }

  searchCharacters(name: string) {
    if (name.trim()) {
      this.service.searchCharacters(name).subscribe(characters => {
        this.characters = characters;
        this.totalCharacters = characters.length;
      },
        error => {
          this.characters = [];
        }
      );
    } else {
      this.getCharacters();
    }
  }

  getCharacters(): void {

    if (this.isInFavoritesPage) {
      this.favorites$.pipe(
        map(favorites => favorites.slice(this.pageIndex * this.pageSize, (this.pageIndex + 1) * this.pageSize)),
      ).subscribe(characters => {
        this.characters = characters;
        this.totalCharacters = characters.length;
      });
    } else {
      this.service.getAllCharacters(this.pageIndex + 1, this.pageSize)
        .subscribe((response: CharacterResponse) => {
          this.characters = response.results;
          this.totalCharacters = response.info.count;
        });
    }

  }

  onPageAllChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.getCharacters();
  }

  toggleFavorite(character: Character) {
    const isFavorite = !!this.favoritesMap[character.id];
    if (isFavorite) {
      this.store.dispatch(new RemoveFavorite(character));
    } else {
      this.store.dispatch(new AddFavorite(character));
    }
  }

  isFavorite(character: Character): Observable<boolean> {
    return this.favorites$.pipe(
      map(favorites => favorites.some(favorite => favorite.id === character.id))
    );
  }

}
