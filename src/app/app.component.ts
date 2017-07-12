import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {UserManagementService} from './services/user-management.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  /**
   * Is triggered when the page is first loaded
   * Navigates the client to login if no name or type is specified
   * @param router
   * @param userService
   */
  constructor(private router: Router, public userService: UserManagementService) {
    if (!this.userService.user.name || !(this.userService.user.type === 1 || this.userService.user.type === 2)) {
      router.navigateByUrl('/login');
      // this.userService.user.type = 1;
    }
  }
}
