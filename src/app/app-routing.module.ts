import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutPageComponent } from './components/about-page/about-page.component';
import { ContactComponent } from './components/contact/contact.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { HomePageComponent } from './components/home-page/home-page.component';

const routes: Routes = [
   { path: '', redirectTo: '/home-page', pathMatch: 'full' },
   { path: 'home-page', component: HomePageComponent },
   { path: 'gallery', component: GalleryComponent },
   { path: 'about', component: AboutPageComponent },
   { path: 'contact', component: ContactComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
