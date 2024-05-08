import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchSubject: Subject<string> = new Subject<string>();

  constructor() { }

  search(term: string) {
    this.searchSubject.next(term);
  }

  getSearchObservable() {
    return this.searchSubject.asObservable();
  }
}
