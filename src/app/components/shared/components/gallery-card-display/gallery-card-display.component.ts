import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Card } from '../../interfaces/card';
import { CARDS } from '../../models/cards';
import { CardService } from '../../services/card.service';

@Component({
  selector: 'app-gallery-card-display',
  templateUrl: './gallery-card-display.component.html',
  styleUrls: ['./gallery-card-display.component.css']
})
export class GalleryCardDisplayComponent implements OnInit, OnDestroy {
  cards: Card[];
  currentRoute;
  subscription: Subscription;
  routeFlag = "";

  constructor(private route: ActivatedRoute, public cardService: CardService) {
    this.currentRoute = route.snapshot.routeConfig.path;
  }

  ngOnInit(): void {
    this.subscription = this.cardService.getCards().subscribe(cards => {
      /*
          -  'this.cards = Cards' initializes this.cards to the original Cards object containing 
             all of the individual art pieces on the site.
          -  'this.cards = cards' updates the template depending on selected or unselected 
             filters, adjusting what the user sees on the page.
          -  because this.routeFlag gets reinitalized to empty string whenever user leaves 
             a given route (either gallery/traditional or gallery/digital), it determines when
             to initialize the given template reference variable (this.cards) accordingly.
      */
      if (this.routeFlag === "") {
        this.routeFlag = this.currentRoute;
        this.cards = CARDS;
      } else {
        this.cards = cards;
      }

      if (this.currentRoute === 'gallery/traditional') {
        this.cards = this.cards.filter(card => card.category === 'traditional');
      } else if (this.currentRoute === 'gallery/digital') {
        this.cards = this.cards.filter(card => card.category === 'digital');
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
