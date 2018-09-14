import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { AppLoaderService } from './app-loader.service';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('loaderState', [
      state(
        'false',
        style({
          opacity: 0
        })
      ),
      state(
        'true',
        style({
          opacity: 1
        })
      ),
      transition('false => true', [animate(250, style({ opacity: 1 }))]),
      transition('true => false', [animate(250, style({ opacity: 0 }))])
    ])
  ]
})
export class AppComponent implements OnInit {
  private navigation = new Map([
    [
      '/cv/my',
      {
        path: '/cv/my',
        title: 'My CV',
        icon: 'assignment_ind',
        sidebar: true,
        authority: ['USER', 'ADMIN']
      }
    ],
    [
      '/cv/all',
      {
        path: '/cv/all',
        title: `All CV's`,
        icon: 'all_inbox',
        sidebar: true,
        authority: ['ADMIN']
      }
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

  public loading$ = this.appLoaderService.loading$.asObservable();

  public isAuthenticated$ = this.auth.isAuthenticated$;
  public currentUser$ = this.auth.currentUser$;
  public navigationItems$ = this.currentUser$.pipe(
    filter(user => !!user),
    map(user => user.authorities[0].authority),
    map(authority =>
      [...this.navigation.values()].filter(
        v => v.sidebar && v.authority.includes(authority)
      )
    )
  );

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
