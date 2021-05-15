import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterViewInit {
  @ViewChild('dropdownMenu', { static: true }) input: ElementRef;
  isMenuOpen = false;
  currentRoute: string;

  constructor(private route: ActivatedRoute) {
    this.currentRoute = route.snapshot.url[0].path;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    // style to header buttons when on gallery page
    if (this.currentRoute === 'gallery') {
      for (let button of this.input.nativeElement.children) {
        button.style.border = "1px solid black";
        button.style.color = "black";
      }
    }
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
