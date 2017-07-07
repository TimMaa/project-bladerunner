import {Component, OnInit} from '@angular/core';
import {UserManagementService} from '../services/user-management.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title = 'This is the super sick game of life!!!';
  isDisabled: boolean = true;

  constructor(private userService: UserManagementService) {
  }

  ngOnInit() {
  }

  enableButton() {
    if (this.userService.user.name) {
      this.isDisabled = false;
    }
  }
}
