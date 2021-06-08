import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AboutPageComponent } from './components/about-page/about-page.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { ContactComponent } from './components/contact/contact.component';
import { HeaderComponent } from './components/shared/components/header/header.component';
import { TraditionalComponent } from './components/gallery/traditional/traditional.component';
import { DigitalComponent } from './components/gallery/digital/digital.component';
import { GalleryCardDisplayComponent } from './components/shared/components/gallery-card-display/gallery-card-display.component';
import { CategoryFilterComponent } from './components/shared/components/category-filter/category-filter.component';
import { AlphabeticalOrderPipe } from './components/shared/pipes/alphabetical-order.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    AboutPageComponent,
    GalleryComponent,
    ContactComponent,
    HeaderComponent,
    TraditionalComponent,
    DigitalComponent,
    GalleryCardDisplayComponent,
    CategoryFilterComponent,
    AlphabeticalOrderPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
