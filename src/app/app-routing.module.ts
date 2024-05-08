import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { FavoriteComponent } from './views/favorite/favorite.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'favorite', component: FavoriteComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
