import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent {

  @Input() currentPage: number;
  @Input() totalPages: number;
  @Input() pageSize: number;

  @Output() nextPage: EventEmitter<number> = new EventEmitter();
  @Output() nextSize: EventEmitter<number> = new EventEmitter();

  constructor() { }
}
