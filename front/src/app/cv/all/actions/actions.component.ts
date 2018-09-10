import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CVListItem } from '../../cv.interface';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {

  @Input() data: CVListItem;
  @Input() showUserActions: boolean;

  @Output() addEditUser: EventEmitter<CVListItem> = new EventEmitter();
  @Output() deleteUser: EventEmitter<CVListItem> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
