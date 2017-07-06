import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  canvasWidth: number;
  canvasHeight: number;
  
  posTop: number;
  posLeft: number;

  playerID: string;

  constructor() {
  }

  ngOnInit() {
    this.posTop = 0;
    this.posLeft = 0;
    this.canvasHeight = 2000;
    this.canvasWidth = 2000;
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
    let ct = c.offsetTop;
    let cl = c.offsetLeft;
    let cb = this.canvasHeight - dh + c.offsetTop;
    let cr = this.canvasWidth - dw + c.offsetLeft;
    switch (element) {
      case 1:
        if (ct < 0) {
          this.posTop += 50;
        }
        break;
      case 2:
        if (cl < 0) {
          this.posLeft -= 50;
        }
        break;
      case 3:
        if (cb < 0) {
          this.posTop -= 50;
        }
        break;
      case 4:
        if (cr < 0) {
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
