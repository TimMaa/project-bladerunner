import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  posTop: number;
  posLeft: number;

  playerID: string;

  constructor() {
  }

  ngOnInit() {
    this.posTop = 0;
    this.posLeft = 0;
  }

  getData() {
    /*
    let c = (<HTMLCanvasElement>document.getElementById('gameCanvas'));
    let ctx = c.getContext('2d');

    console.log(ctx.getImageData(0, 0, c.width, c.height).data);
     */
  }

  moveWindow(element: number) {
    let c = (<HTMLCanvasElement>document.getElementById('gameCanvas'));
    let dh = document.body.clientHeight;
    let dw = document.body.clientWidth;
    let cy = c.offsetTop;
    let cx = c.offsetLeft;

    switch (element) {
      case 1:
        if (cy < 0) {
          this.posTop += 50;
        }
        break;
      case 2:
        if (cx < 0) {
          this.posLeft -= 50;
        }
        break;
      case 3:
        if (cy < 0) {
          this.posTop -= 50;
        }
        break;
      case 4:
        if (cx < 0) {
          this.posLeft += 50;
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
