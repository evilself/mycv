import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../users.interfaces';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {

  @Input() data: User;
  @Input() showUserActions: boolean;

  @Output() addEditUser: EventEmitter<User> = new EventEmitter();
  @Output() deleteUser: EventEmitter<User> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
