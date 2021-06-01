import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'lynn-art-portfolio';
  constructor(private router: Router) {
    this.router.events.subscribe(routerEvent => {
        if (routerEvent instanceof NavigationStart) {
            if (routerEvent.url == "/") {
                this.router.navigate(["home-page"], {skipLocationChange: true})
            }
        }
    });
}
}
