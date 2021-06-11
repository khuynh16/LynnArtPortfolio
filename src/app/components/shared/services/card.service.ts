import { ElementRef, Injectable, QueryList } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Card } from '../interfaces/card';
import { CARDS } from '../models/cards';

import { SUB_CATEGORIES } from '../models/subcategories';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private cardsSubject: BehaviorSubject<any> = new BehaviorSubject({ cards: [] });
  cards: Card[] = [];
  subCategories;
  previousCards: Card[];
  readdedCards: Card[];
  galleryWallReference: QueryList<ElementRef>;

  constructor() { 
    this.cards = CARDS;
    this.cardsSubject.next(this.cards);
    this.subCategories = SUB_CATEGORIES;
  }

  getCards() {
    return this.cardsSubject.asObservable();
  }

  assignGalleryWallReference(galleryCards) {
    this.galleryWallReference = galleryCards;
  }

  adjustFilterView(currentFilters) {
    // keeps track of the available gallery cards (before taking into clicked filter)
    this.previousCards = this.cards;
  
    // provides an array of all cards that are visible, based on available filters
    this.cards = CARDS.filter(card => currentFilters.includes(card.subcategory));

    // array of cards that become visible again (when user reactivates a filter; excludes
    // already visible cards)
    this.readdedCards = this.cards.filter(card => !this.previousCards.includes(card));

    // setTimeout needed to allow galleryWallReference (ElementRef) to be updated accordingly
    setTimeout(() => {
      // loop through array containing re-added cards (e.g., removing filter category and
      // readding category again) and looping through every element in 
      // ElementRef galleryWallReference variable:
      // - if current element in galleryWallReference ElementRef variable matches the 
      //   current variable from  the readdedCards array:
      //      - assign the card's data-caption property (via .attributes[2]) to its innerText
      //        (this is to assign the fancybox caption)
      //      - if the current card utilizes openprocessing, assign its data-type to iframe
      //        (to create a popup within the website to view the sketch)
      for (let addedCard in this.readdedCards) {
        this.galleryWallReference.toArray().forEach(card => {
          if (card.nativeElement.innerText === this.readdedCards[addedCard].alt) {
            card.nativeElement.attributes[2].value = card.nativeElement.innerText;
            if (card.nativeElement.hostname === "openprocessing.org") {
              card.nativeElement.attributes[3].value = "iframe";
            }
          }
        });
      }
    }, 1);
    
    this.cardsSubject.next(this.cards);
  }
}
