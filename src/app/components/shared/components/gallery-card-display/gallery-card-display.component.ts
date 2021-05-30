import { Component, ElementRef, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Card } from '../../interfaces/card';
import { CARDS } from '../../models/cards';
import { CardService } from '../../services/card.service';
import { FiltersService } from '../../services/filters.service';

@Component({
  selector: 'app-gallery-card-display',
  templateUrl: './gallery-card-display.component.html',
  styleUrls: ['./gallery-card-display.component.css']
})
export class GalleryCardDisplayComponent implements OnInit, OnDestroy {
  cards: Card[];
  currentRoute;
  subscription: Subscription;
  filterPanelSub: Subscription
  filterToggleSub: Subscription
  filterDivReference;
  currentFilterToggleState: boolean;
  screenWidth: number;
  routeFlag = "";

  constructor(private route: ActivatedRoute, public cardService: CardService, private eRef: ElementRef, public filtersService: FiltersService) {
    this.currentRoute = route.snapshot.routeConfig.path;
  }

  // if filterPanel is hidden on a resolution with a width < 700px and user increases 
  // resolution past 700 px, the below style.transform will slide the filter buttons towards
  // the right to be visible again
  @HostListener('window:resize', ['$event'])
    getScreenSize(event?) {
      this.screenWidth = window.innerWidth;
      if (this.screenWidth > 700) {
        this.filterDivReference.style.transform = "translateX(0%)";
      } else if (this.screenWidth <= 700 && this.currentFilterToggleState) {
        this.filterDivReference.style.transform = "translateX(-100%)";
      }

  }

  @HostListener('document:click', ['$event'])
  handleOutsideClick(event) {
    // update behavior subject in filters Service to denote that filter panel is open
    if (event.target.classList.contains('filterPanel')) {
      this.filtersService.updateCurrentFilterToggleState(true);
    }

    // checks where user clicks on the gallery page
    // once the filterPanel has been open, it checks the various places user clicks on page
    // if user doesn't click any of the following:
    // - the filterCategories div, 
    // - any filter button, 
    // - the text on the filter button (the added && condition is because the hamburger icon
    //        seems to have the same classList, so needed condition to separate click locations),
    // - the individual circles in the filter sidebar menu when in < 700 px width resolution,
    // - the initial three dot button to expose the filter categories
    // ... the 'else' class with call service functions to close the filterPanel
    if (event.target.classList.contains('filterCategories') || 
        event.target.classList.contains('filterButton') || 
        (event.target.classList.contains('mat-button-wrapper') && (event.srcElement.children.length === 0)) ||
        event.target.classList.contains('circle') ||
        event.target.classList.contains('filterPanel')) {
      // nothing needs to happen; good to go
    } else {
      if (this.currentFilterToggleState === true) {
        this.filtersService.closeFilterPanel(this.filterDivReference);
      }
    }
  }

  ngOnInit(): void {

    this.filterPanelSub = this.filtersService.getFiltersDiv().subscribe(div => {
      this.filterDivReference = div;
    });

    this.filterToggleSub = this.filtersService.getCurrentFilterToggleState().subscribe(state => {
      this.currentFilterToggleState = state;
    });

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
    this.filterPanelSub.unsubscribe();
    this.filterToggleSub.unsubscribe();
    this.subscription.unsubscribe();
  }
}
