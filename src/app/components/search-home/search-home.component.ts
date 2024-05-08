import { Component, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-search-home',
  templateUrl: './search-home.component.html',
  styleUrls: ['./search-home.component.css']
})

export class SearchHomeComponent implements OnInit {

  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
  }
  onSearch(value: string) {
    this.searchService.search(value);
  }
}
