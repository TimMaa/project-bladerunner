import {Component, OnInit} from '@angular/core';
import {UserManagementService} from '../services/user-management.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public userService: UserManagementService) {
  }

  ngOnInit() {
  }

  /**
   * Styles the Guesser-Button depending on the choice made
   * Returns the color
   * @returns {any}
   */
  getGColor() {
    if (this.userService.user.type === 2) {
      return 'rgba(194, 194, 194, 1)';
    } else {
      return 'rgba(221, 221, 221, 1)';
    }
  }

  /**
   * Styles the Painter-Button depending on the choice made
   * Returns the color
   * @returns {any}
   */
  getPColor() {
    if (this.userService.user.type === 1) {
      return 'rgba(194, 194, 194, 1)';
    } else {
      return 'rgba(221, 221, 221, 1)';
    }

  }


  /**
   * Enables the Start-Button depending on the choices
   * @returns {any}
   */
  enableButton() {
    if (this.userService.user.name && (this.userService.user.type === 1 || this.userService.user.type === 2)) {
      return false;
    } else {
      return true;
    }
  }
}
