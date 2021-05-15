import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  isMenuOpen = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleHamburger(dropdownMenu: HTMLElement) {
    dropdownMenu.classList.add('addTransitionSpeed');

    if (this.isMenuOpen === false) {
      dropdownMenu.classList.add('displayDropdown');
      dropdownMenu.classList.remove('hideDropdown');
      this.isMenuOpen = true;
    } else if (this.isMenuOpen === true) {
      dropdownMenu.classList.add('hideDropdown');
      dropdownMenu.classList.remove('displayDropdown');
      this.isMenuOpen = false;
    }
    setTimeout(function(){ 
      dropdownMenu.classList.remove('addTransitionSpeed');
    }, 500);
  }
}
