import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { CVsService } from '../cv.service';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
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
export class PreviewComponent implements OnInit {

  previewData$;

  constructor(
    private route: ActivatedRoute,
    private cvService: CVsService
  ) { }

  ngOnInit() {
    this.previewData$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.cvService.getById(params.get('id')))
    );
  }
}
