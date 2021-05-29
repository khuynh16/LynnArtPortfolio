import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Card } from '../interfaces/card';
import { Cards } from '../models/cards';

import { SUB_CATEGORIES } from '../models/subcategories';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  cards: Card[] = [];
  subCategories;

  private cardsSubject: BehaviorSubject<any> = new BehaviorSubject({ cards: [] });

  constructor() { 
    this.cards = Cards;
    this.cardsSubject.next(this.cards);
    this.subCategories = SUB_CATEGORIES;
  }

  getCards() {
    return this.cardsSubject.asObservable();
  }

  adjustFilterView(currentFilters) {
    this.cards = Cards.filter(card => currentFilters.includes(card.subcategory));
    this.cardsSubject.next(this.cards);
  }
}
