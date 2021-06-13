import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
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
export class GalleryCardDisplayComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChildren('galleryWallCards') galleryWallCards: QueryList<ElementRef>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  cards: Card[];
  currentRoute: string;
  subscription: Subscription;
  filterPanelSub: Subscription
  filterToggleSub: Subscription
  filterDivReference: HTMLElement;
  currentFilterToggleState: boolean;
  screenWidth: number;
  routeFlag: string = "";
  mainCategoryTotalNumCards: number;
  originalMainCategoryCards: Card[];
  currentPaginationData: PageEvent;


  constructor(private route: ActivatedRoute, public cardService: CardService, private eRef: ElementRef, public filtersService: FiltersService) {
    this.currentRoute = route.snapshot.routeConfig.path;
  }

  // if filterPanel is hidden on a resolution with a width < 700px and user increases 
  // resolution past 700 px, the below style.transform will slide the filter buttons towards
  // the right to be visible again
  @HostListener('window:resize', ['$event'])
    getScreenSize() {
      this.screenWidth = window.innerWidth;
      if (this.screenWidth > 700) {
        this.filterDivReference.style.transform = "translateX(0%)";
      } else if (this.screenWidth <= 700 && this.currentFilterToggleState) {
        this.filterDivReference.style.transform = "translateX(-120%)";
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

    /*
          -  'this.cards = Cards' initializes this.cards to the original Cards object containing 
             all of the individual art pieces on the site.
          -  'this.cards = cards' updates the template depending on selected or unselected 
             filters, adjusting what the user sees on the page.
          -  because this.routeFlag gets reinitalized to empty string whenever user leaves 
             a given route (either gallery/traditional or gallery/digital), it determines when
             to initialize the given template reference variable (this.cards) accordingly.
      */
    this.subscription = this.cardService.getCards().subscribe(cards => {
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

      this.mainCategoryTotalNumCards = this.cards.length;
      this.originalMainCategoryCards = this.cards;
      // the original view of gallery should be 10 loaded images; user can adjust view
      // utilizing the paginators, either at bottom or top of page
      this.cards = this.cards.slice(0, 10);
    });
  }

  ngAfterViewInit() {
    // pass reference to service so that when user adjusts filter, a function within 
    // service can procedurally add data-caption and data-type attribute values (all 
    // because fancybox library does not support string interpolation.. (FIX THIS FANCYBOX 
    // DEVS PLEASE)
    this.cardService.assignGalleryWallReference(this.galleryWallCards);
    // function called here to procedurally add values to data-caption and data-type 
    // attributes for fancybox and its images
    this.assignCaptionAndDatatype();
  }

  topPaginationChange(pageData: PageEvent) {

    setTimeout(() => {
      this.assignCaptionAndDatatype();
    }, 1);

    this.currentPaginationData = pageData;
    // update the cards to actively only display paginated view, as this.cards is the 
    // template variable of what the user sees at any given point in gallery
    this.cards = this.originalMainCategoryCards.slice(pageData.pageIndex*pageData.pageSize, pageData.pageIndex*pageData.pageSize + pageData.pageSize);

  }

  bottomPaginationChange(pageData: PageEvent) {
    this.paginator.pageSize = pageData.pageSize;
    this.paginator.pageIndex = pageData.pageIndex;
    this.paginator.page.emit(pageData);
  }

  // for some reason, fancybox's 'data-caption' property can not utilize string interpoplation
    // so necessary ViewChildren component to access and manually change caption is as follows:
    // 1) looping through the ElementRef cards and assigning data-caption value for
    //        each card their respective text (via innerText property)
    // 2) if the current element's src is from openprocessing.org (e.g., an non-local src),
    //    assign the value "iframe" to 'data-type' attribute (for fancybox implementation)

  /**
   * Add data-caption and data-type attribute values procedurally (provided by fancybox
   * library). 
   */
  assignCaptionAndDatatype() {
    this.galleryWallCards.toArray().forEach(card => {
      card.nativeElement.attributes[2].value = card.nativeElement.innerText;
      if (card.nativeElement.hostname === "openprocessing.org") {
        card.nativeElement.attributes[3].value = "iframe";
      }
    });
  }

  ngOnDestroy() {
    this.filterPanelSub.unsubscribe();
    this.filterToggleSub.unsubscribe();
    this.subscription.unsubscribe();
  }
}
