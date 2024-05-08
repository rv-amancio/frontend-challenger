import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { FavoritesState } from '../../favorite/favorite.state';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Select(FavoritesState.getFavorites) favorites$!: Observable<any[]>;
  @Output() eventSpinner: EventEmitter<boolean> = new EventEmitter();
  favoritesCount$!: Observable<number>;
  routeName: String = '';


  constructor(
    private router: Router,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateComponentClass();
      });

      this.favoritesCount$ = this.favorites$.pipe(
        map(favorites => favorites.length)
      );
  }

  spinner() {
    this.eventSpinner.emit();
  }

  updateComponentClass(): void {
    const currentUrl = this.router.url;
    const isHome = currentUrl === '/';
    const isFavorite = currentUrl === '/favorite';

    if (isHome) {
      this.routeName = 'home';
    }
    if (isFavorite) {
      this.routeName = 'favorite';
    }
  }


}
