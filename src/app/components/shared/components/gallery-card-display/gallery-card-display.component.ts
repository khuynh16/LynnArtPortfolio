import { Component, OnInit } from '@angular/core';

import { Card } from '../../interfaces/card';
import { Cards } from '../../models/cards';

@Component({
  selector: 'app-gallery-card-display',
  templateUrl: './gallery-card-display.component.html',
  styleUrls: ['./gallery-card-display.component.css']
})
export class GalleryCardDisplayComponent implements OnInit {
  cards: Card[];

  constructor() { }

  ngOnInit(): void {
    this.cards = Cards;
  }

}
