import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-home-response-default',
  templateUrl: './home-response-default.component.html',
  styleUrls: ['./home-response-default.component.css']
})
export class HomeResponseDefaultComponent implements OnInit {
  @Input() title: string = '';
  @Input() text: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
