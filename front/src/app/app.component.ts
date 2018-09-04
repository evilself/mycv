import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private navigation = new Map([
    [
      '/mycv',
      { path: '/mycv', title: 'My CV', icon: 'assignment_ind', sidebar: true }
    ],
    [
      '/allcv',
      { path: '/allcv', title: `All CV's`, icon: 'all_inbox', sidebar: true }
    ],
    ['/login', { path: '/login', title: 'Login', sidebar: false }]
  ]);

  public title$ = this.router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    map(
      (event: NavigationEnd) =>
        event.url === '/'
          ? this.navigation.get(event.urlAfterRedirects).title
          : this.navigation.get(event.url).title
    )
  );

  public navigationItems$ = of(
    [...this.navigation.values()].filter(v => !!v.sidebar)
  );

  constructor(public router: Router, public auth: AuthService) {}

  ngOnInit(): void {}
}
