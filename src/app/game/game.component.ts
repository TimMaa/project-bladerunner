import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  playerID: string;

  constructor() { }

  ngOnInit() {

  }

  getMousePosition(event) {
    let x = event.x;
    let y = event.y;

    let c = (<HTMLCanvasElement>document.getElementById('gameCanvas'));
    let ctx = c.getContext('2d');

    x -= c.offsetLeft;
    y -= c.offsetTop;

    ctx.fillStyle = '#133769';

    ctx.fillRect(Math.floor(x / 10) * 10, Math.floor(y / 10) * 10, 10, 10);
}

}
