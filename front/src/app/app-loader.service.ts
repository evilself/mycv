import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppLoaderService {
  public loading$ = new BehaviorSubject(false);

  constructor() {}
}
