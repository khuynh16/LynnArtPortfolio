import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, HostListener, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { FiltersService } from '../../services/filters.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('line1', { static: true }) line1: ElementRef;
  @ViewChild('line2', { static: true }) line2: ElementRef;
  @ViewChild('line3', { static: true }) line3: ElementRef;
  @ViewChild('dropdownMenu', { static: true }) input: ElementRef;
  isMenuOpen = false;
  isHomePage = false;
  isGallery = false;
  currentRoute: string;
  galleryNestedRoute;
  screenHeight: number;
  screenWidth: number;
  subscription: Subscription;

  constructor(private route: ActivatedRoute, public filtersService: FiltersService) {
    this.currentRoute = route.snapshot.url[0].path;
    this.galleryNestedRoute = route.snapshot.url.toString().replace(',', '/');
    // this.getScreenSize();
  }

  @HostListener('document:click', ['$event'])
  handleOutsideClick(event) {
    // activates the toggleHamburger function (closing the dropdown) when user clicks anywhere
    // outside the dropdown menu
    if (this.isMenuOpen === true && 
        !event.target.classList.contains('displayDropdown') && 
        !event.target.classList.contains('hamburger') &&
        !event.target.classList.contains('line') && 
        !event.target.classList.contains('mat-button-wrapper')) {
      this.toggleHamburger(this.input.nativeElement);
    }
  }

  ngOnInit(): void {
    if (this.currentRoute === 'home-page') {
      this.isHomePage = true;
    }
    if (this.galleryNestedRoute === 'gallery/traditional' || this.galleryNestedRoute === 'gallery/digital') {
      this.isGallery = true;
    }
  }

  ngAfterViewInit() {
    // style to header buttons when on gallery page
    if (this.currentRoute === 'gallery' || 
        this.currentRoute === 'about' ||
        this.currentRoute === 'contact') {
      this.line1.nativeElement.style.backgroundColor = "black";
      this.line2.nativeElement.style.backgroundColor = "black";
      this.line3.nativeElement.style.backgroundColor = "black";

      for (let button of this.input.nativeElement.children) {
        button.style.color = "black";
        button.style.border = "1px solid black";
      }
    }
  }

  toggleHamburger(dropdownMenu: HTMLElement) {
    dropdownMenu.classList.add('addTransitionSpeed');
    if (this.isMenuOpen === false) {
      dropdownMenu.classList.add('displayDropdown');
      dropdownMenu.classList.remove('hideDropdown');
    } else if (this.isMenuOpen === true) {
      dropdownMenu.classList.add('hideDropdown');
      dropdownMenu.classList.remove('displayDropdown');
    }
    setTimeout(function(){ 
      dropdownMenu.classList.remove('addTransitionSpeed');
    }, 500);

    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleFilterPanel() {
    // retrieve the filters div reference from service and pass to toggle filter method in service
    this.subscription = this.filtersService.getFiltersDiv().subscribe(div => {
      this.filtersService.toggleFilterPanel(div);
    });
  }

  ngOnDestroy() {
    if (this.subscription)
      this.subscription.unsubscribe();
  }
}
