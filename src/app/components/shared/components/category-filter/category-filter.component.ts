import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category-filter',
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.css']
})
export class CategoryFilterComponent implements OnInit {
  currentRoute: string;
  subCategories = [
    {
      name: 'Painting',
      filterActivated: true
    },
    {
      name: 'Sculpture',
      filterActivated: true
    },
    {
      name: 'Video',
      filterActivated: true
    },
    {
      name: 'Picture',
      filterActivated: true
    },
  ];
  mainCategories = {
    'Traditional': [
      'Painting', 
      'Sculpture'
    ],
    'Digital': [
      'Video', 
      'Picture'
    ]
  };

  constructor(private route: ActivatedRoute) {
    this.currentRoute = route.snapshot.routeConfig.path;
  }

  ngOnInit(): void {
    if (this.currentRoute === 'gallery/traditional') {
      this.subCategories = this.subCategories.filter(category => this.mainCategories['Traditional'].includes(category.name));
    }
    else if (this.currentRoute === 'gallery/digital') {
      this.subCategories = this.subCategories.filter(category => this.mainCategories['Digital'].includes(category.name));
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

        // call to service to update cards that are currently displayed (based on filters)
      }
    }
  }
}
