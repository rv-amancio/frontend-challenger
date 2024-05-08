
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Character } from './character.model'
import { CharacterResponse } from './character.model'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CharacterService {

    private apiUrl = environment.baseUrlAPI;

    constructor(private readonly httpClient: HttpClient) { }

    public searchCharacters(name: string): Observable<Character[]> {
        return this.httpClient.get<any>(`${this.apiUrl}/?name=${name}`).pipe(
            map(response => response.results)
        );
    }

    getAllCharacters(page: number, pageSize: number): Observable<CharacterResponse> {
        const url = `${this.apiUrl}/?page=${page}&pageSize=${pageSize}`;
        return this.httpClient.get<CharacterResponse>(url);
    }

}
