import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isMenuOpen = false;
  currentRoute: string;

  constructor(private route: ActivatedRoute) {
    this.currentRoute = route.snapshot.url[0].path;
  }

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
