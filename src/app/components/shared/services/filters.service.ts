import { Injectable, ElementRef, HostListener } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FiltersService {
  isOpen = false;
  private filtersSubject: BehaviorSubject<any> = new BehaviorSubject({ filtersRef: ElementRef });
  private currentFilterToggleSubject: BehaviorSubject<any> = new BehaviorSubject({ isOpen: false });

  constructor() { }

  getFiltersDiv() {
    return this.filtersSubject.asObservable();
  }

  updateFiltersDiv(filtersDivReference) {
    this.filtersSubject.next(filtersDivReference);
  }

  getCurrentFilterToggleState() {
    return this.currentFilterToggleSubject.asObservable();
  }

  updateCurrentFilterToggleState(booleanValue) {
    this.currentFilterToggleSubject.next(booleanValue);
  }

  closeFilterPanel(div) {
    div.style.transform = "translateX(-120%)";
    div.style.transition = "0.3s";
  }

  toggleFilterPanel(filtersDiv) {
    this.isOpen = !this.isOpen;
    filtersDiv.style.transform = "translateX(0%)";
    filtersDiv.style.transition = "0.3s";

    
  }
}
