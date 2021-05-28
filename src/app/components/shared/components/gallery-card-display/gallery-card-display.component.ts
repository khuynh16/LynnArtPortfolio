import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Card } from '../../interfaces/card';
import { Cards } from '../../models/cards';

@Component({
  selector: 'app-gallery-card-display',
  templateUrl: './gallery-card-display.component.html',
  styleUrls: ['./gallery-card-display.component.css']
})
export class GalleryCardDisplayComponent implements OnInit {
  cards: Card[];
  currentRoute;

  constructor(private route: ActivatedRoute) {
    this.currentRoute = route.snapshot.routeConfig.path;
  }

  ngOnInit(): void {
    this.cards = Cards;
    if (this.currentRoute === 'gallery/traditional') {
      this.cards = this.cards.filter(card => card.category === 'traditional');
    } else if (this.currentRoute === 'gallery/digital') {
      this.cards = this.cards.filter(card => card.category === 'digital');
    }
  }

}
