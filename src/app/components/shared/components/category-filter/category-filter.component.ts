import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CardService } from '../../services/card.service';
import { Subcategory } from '../../interfaces/subcategory';
import { SUB_CATEGORIES } from '../../models/subcategories';
import { MAIN_CATEGORIES } from '../../models/maincategories';

@Component({
  selector: 'app-category-filter',
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.css']
})
export class CategoryFilterComponent implements OnInit {
  currentRoute: string;
  subCategories: Subcategory[];
  currentFilters: String[] = [];

  constructor(private route: ActivatedRoute, public cardService: CardService) {
    this.currentRoute = route.snapshot.routeConfig.path;
  }

  ngOnInit(): void {
    if (this.currentRoute === 'gallery/traditional') {
      this.subCategories = SUB_CATEGORIES.filter(category => MAIN_CATEGORIES['Traditional'].includes(category.name));
    }
    else if (this.currentRoute === 'gallery/digital') {
      this.subCategories = SUB_CATEGORIES.filter(category => MAIN_CATEGORIES['Digital'].includes(category.name));
    }
  }

  toggleFilter(event) {
    // value of button e.g. 'Painting'
    let buttonValue = event.srcElement.innerText;

    for (let element in this.subCategories) {
      if (buttonValue === this.subCategories[element].name) {

        // variable to contain current boolean value of pressed filter button
        let currentButtonFilterStatus = this.subCategories[element].filterActivated;

        // apply css depending on whether or not category filter is active
        if (currentButtonFilterStatus === false) {
          event.currentTarget.style.color = "black";
          event.currentTarget.style.backgroundColor = "rgb(219, 217, 217)";
          event.currentTarget.style.border = "2px solid black";
        }
        else if (currentButtonFilterStatus === true) {
          event.currentTarget.style.color = "black";
          event.currentTarget.style.border = "1px solid black";
          event.currentTarget.style.backgroundColor = "transparent";
        }

        // toggle filter boolean value for current button
        this.subCategories[element].filterActivated = !this.subCategories[element].filterActivated;

        this.currentFilters = [];
        this.subCategories.forEach(category => {
          if (category.filterActivated === true && !this.currentFilters.includes(category.name))  
            this.currentFilters.push(category.name.toLowerCase());
        });

        // call to service to update cards that are currently displayed (based on filters)
        this.cardService.adjustFilterView(this.currentFilters);
      }
    }
  }
}
