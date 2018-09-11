import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { AppLoaderService } from './app-loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private navigation = new Map([
    [
      '/cv/my',
      { path: '/cv/my', title: 'My CV', icon: 'assignment_ind', sidebar: true }
    ],
    [
      '/cv/all',
      { path: '/cv/all', title: `All CV's`, icon: 'all_inbox', sidebar: true }
    ],
    ['/login', { path: '/login', title: 'Login', menu: false }]
  ]);

  public title$ = this.router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    map(
      (event: NavigationEnd) =>
        event.url === '/'
          ? this.navigation.get(event.urlAfterRedirects).title
          : this.navigation.get(event.url)
            ? this.navigation.get(event.url).title
            : ''
    )
  );

  public navigationItems$ = of(
    [...this.navigation.values()].filter(v => v.sidebar)
  );

  public loading$ = this.appLoaderService.loading$.asObservable();

  public isAuthenticated$ = this.auth.isAuthenticated.asObservable();

  constructor(
    public router: Router,
    public auth: AuthService,
    private appLoaderService: AppLoaderService
  ) {}

  ngOnInit(): void {}

  logout() {
    this.auth.logout().subscribe();
  }
}
