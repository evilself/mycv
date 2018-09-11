import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CVsService } from '../cv.service';
import { filter, share } from 'rxjs/operators';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-my',
  templateUrl: './my.component.html',
  styleUrls: ['./my.component.scss'],
  animations: [
    trigger('containerState', [
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
      transition('false => true', [animate(750, style({ opacity: 1 }))])
    ])
  ]
})
export class MyComponent implements OnInit, AfterViewInit {
  myData$;

  constructor(private cvService: CVsService) {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.myData$ = this.cvService.getMy().pipe(
      filter((v: any) => !!v.id),
      share()
    );
  }
}
