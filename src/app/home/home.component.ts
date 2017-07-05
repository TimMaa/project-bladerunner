import { Component, OnInit } from '@angular/core';
import {ApiService} from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [
    ApiService
  ],
})
export class HomeComponent implements OnInit {

  soldierAmount: number = 10;

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

  armyColor: string = '#133769';
  username: string = 'DerDreiJuniWallach';
  password: string = '*********';

  apiCall: string;

  constructor(private apiService: ApiService) {
    this.getBaseAPITest();
  }

  ngOnInit() {
  }

  getBaseAPITest() {
    this.apiService.getBase()
      .subscribe(
        data => {
          this.apiCall = data;
          console.log(this.apiCall);
        },
            error =>  console.log(error)
      );
  }
}
