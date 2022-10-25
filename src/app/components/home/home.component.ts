import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  articles = [
    {title: 'Lorem ipsum dolor sit amet', image: 'cb1.png'},
    {title: 'Ut enim ad minim veniam', image: 'cb2.png'},
    {title: 'Duis aute irure dolor in', image: 'cb3.png'},
    {title: 'Excepteur sint occaecat', image: 'cb4.png'},
    {title: 'Sed ut perspiciatis unde', image: 'cb5.png'}
  ];

  constructor() { }

}
