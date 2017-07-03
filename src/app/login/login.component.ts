import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title = 'This is the super sick game of life!!!';
  isDisabled: boolean = true;
  username: string;

  @Output() login: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  enableButton() {
    if (this.username) {
      this.isDisabled = false;
    }
  }

}
