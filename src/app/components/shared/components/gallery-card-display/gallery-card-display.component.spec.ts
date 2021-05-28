import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryCardDisplayComponent } from './gallery-card-display.component';

describe('GalleryCardDisplayComponent', () => {
  let component: GalleryCardDisplayComponent;
  let fixture: ComponentFixture<GalleryCardDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GalleryCardDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryCardDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
