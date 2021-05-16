import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterViewInit {
  @ViewChild('line1', { static: true }) line1: ElementRef;
  @ViewChild('line2', { static: true }) line2: ElementRef;
  @ViewChild('line3', { static: true }) line3: ElementRef;
  @ViewChild('dropdownMenu', { static: true }) input: ElementRef;
  isMenuOpen = false;
  currentRoute: string;
  screenHeight: number;
  screenWidth: number;

  constructor(private route: ActivatedRoute) {
    this.currentRoute = route.snapshot.url[0].path;
    this.getScreenSize();
  }

  @HostListener('window:resize', ['$event'])
    getScreenSize(event?) {
      this.screenHeight = window.innerHeight;
      this.screenWidth = window.innerWidth;
      console.log(this.screenHeight, this.screenWidth);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    // style to header buttons when on gallery page
    if (this.currentRoute === 'gallery') {
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
