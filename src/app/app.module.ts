import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from "@angular/material/toolbar";
import { HeaderComponent } from './template/header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HomeComponent } from './views/home/home.component';
import { FavoriteComponent } from './views/favorite/favorite.component';
import { HomeResponseDefaultComponent } from './views/home-response-default/home-response-default.component';
import { SearchHomeComponent } from './components/search-home/search-home.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CharacterComponent } from './components/character/character.component';
import { HttpClientModule } from '@angular/common/http'
import { NgxsModule } from '@ngxs/store';
import { FavoritesState } from './favorite/favorite.state'; 
import { AddFavorite, RemoveFavorite } from './favorite/favorites.actions';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FavoriteComponent,
    HomeResponseDefaultComponent,
    SearchHomeComponent,
    CharacterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    MatGridListModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    MatPaginatorModule,
    NgxsModule.forRoot([FavoritesState])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
