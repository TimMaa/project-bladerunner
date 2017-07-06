import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  playerID: string;

  constructor() {
  }

  ngOnInit() {

  }

  getData() {
    let c = (<HTMLCanvasElement>document.getElementById('gameCanvas'));
    let ctx = c.getContext('2d');

    console.log(ctx.getImageData(0, 0, c.width, c.height).data);
  }

  moveWindow(element: number) {
    let c = (<HTMLCanvasElement>document.getElementById('gameCanvas'));
    let cy = c.offsetTop;
    let cx = c.offsetLeft;

    switch (element) {
      case 1:
        if (cy < 0) {
          console.log('UP');
        }
        break;
      case 2:
        if (cx < 0) {
          console.log('RIGHT');
        }
        break;
      case 3:
        if (cy < 0) {
          console.log('DOWN');
        }
        break;
      case 4:
        if (cx < 0) {
          console.log('LEFT');
        }
        break;
      default:
        console.log('error');
        break;
    }
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
