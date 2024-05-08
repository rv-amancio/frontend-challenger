import { Component, OnInit } from '@angular/core';
import { Character } from '../../components/character/character.model';
import { CharacterService } from '../../components/character/character.service';
import { SearchService } from '../../components/services/search.service';
import { catchError } from 'rxjs/operators';
import { MESSAGES } from '../../message';
import { CharacterResponse } from '../../components/character/character.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  characters!: Character[];
  pageSize = 21;
  pageIndex = 0;
  totalCharacters = 0;
  messages = MESSAGES;


  constructor(
    private characterService: CharacterService,
    private searchService: SearchService

  ) { }

  ngOnInit(): void {
    this.getCharacters();

    this.searchService.getSearchObservable().subscribe(term => {
      this.searchCharacters(term);
    });
  }

  getCharacters(): void {
    this.characterService.getAllCharacters(this.pageIndex + 1, this.pageSize)
      .subscribe((response: CharacterResponse) => {
        this.characters = response.results;
        this.totalCharacters = response.info.count;
      });
  }

  searchCharacters(name: string) {
    if (name.trim()) {
      this.characterService.searchCharacters(name)
        .pipe(
          catchError(error => {
            if (error.status === 404) {
              this.characters = [];
              console.log(this.characters);
              console.error('Personagens não encontrados.');
              return [];
            }
            throw error;
          })
        )
        .subscribe(
          characters => {
            this.characters = characters;
          }
        );
    }
  }
}
