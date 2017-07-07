import {Component, OnInit} from '@angular/core';
import {UserManagementService} from '../services/user-management.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isDisabled: boolean = true;

  constructor(private userService: UserManagementService) {
  }

  ngOnInit() {
  }

  getGColor() {
    if (this.userService.user.type === 2) {
      return 'rgba(194, 194, 194, 1)';
    } else {
      return 'rgba(221, 221, 221, 1)';
    }
  }

  getPColor() {
    if (this.userService.user.type === 1) {
      return 'rgba(194, 194, 194, 1)';
    } else {
      return 'rgba(221, 221, 221, 1)';
    }

  }

  enableButton() {
    if (this.userService.user.name && (this.userService.user.type === 1 || this.userService.user.type === 2)) {
      return false;
    } else {
      return true;
    }
  }
}
