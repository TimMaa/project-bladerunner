import {Component, OnInit} from '@angular/core';
import {UserManagementService} from 'app/services/user-management.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [],
})
export class HomeComponent implements OnInit {

  previousBattles: Object[] = [
    {
      start: 1497780630000,
      end: 1497780810000,
      score: 42,
    },
    {
      start: 1497966870000,
      end: 1497968010000,
      score: 9001,
    },
    {
      start: 1497968070000,
      end: 1497968310000,
      score: 243,
    },
    {
      start: 1497979470000,
      end: 1497979770000,
      score: 759,
    },
  ];

  friends: Object[] = [
    {
      name: 'Ozzy',
      highscore: 7892,
    },
    {
      name: 'Freddy',
      highscore: 87123,
    },
    {
      name: 'Paul',
      highscore: 1960,
    },
    {
      name: 'Billie Joe',
      highscore: 2171857883,
    }
  ];

  colors: Object[] = [
    {
      name: 'Sparkly',
      price: 9.95
    },
    {
      name: 'Dreamy',
      price: 12.95
    },
    {
      name: 'Cloudy',
      price: 7.99
    },
  ];

  username: string;

  constructor(public userService: UserManagementService) {
    this.username = userService.user.name;
  }

  ngOnInit() {
  }

  /**
   * Logs the user out of the application
   * Clears the name and resets the type
   * Thereby the client will be forced to log in again before being able to access game functions
   */
  logout() {
    this.userService.user.name = '';
    this.userService.user.type = 0;
  }
}
