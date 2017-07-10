import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {UserManagementService} from './services/user-management.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  loggedIn: boolean = false;

  constructor(private router: Router, private userService: UserManagementService) {
    if (!this.userService.user.name || !(this.userService.user.type === 1 || this.userService.user.type === 2)) {
      router.navigateByUrl('/login');
    }
  }

  logInPlayer(event: boolean) {
      this.loggedIn = event;
  }
}
