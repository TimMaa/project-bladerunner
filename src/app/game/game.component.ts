import {Component, OnInit} from '@angular/core';
import {ApiService} from "../services/api.service";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  canvasWidth: number;
  canvasHeight: number;

  posTop: number;
  posRight: number;
  posLeft: number;
  posBottom: number;

  movingInterval;

  zoom: number = 1;

  constructor(private apiService: ApiService) {
    this.getCurrentCanvas();
  }

  ngOnInit() {
    /**
     * Set Canvas Starting Position (Top, Left) and Canvas Dimension (Height and Width) on Init
     * Right and Bottom are for scrolling
     */
    this.posTop = 0;
    this.posLeft = 0;
    this.canvasHeight = 2000;
    this.canvasWidth = 2000;
    this.posRight = this.canvasWidth - window.innerWidth + this.posLeft;
    this.posBottom = this.canvasHeight - window.innerHeight + this.posTop;
  }

  changeZoom() {
    /**
     * To get an overview of the entire drawing, you can zoom
     * Zoom should be proportional to the device size and dont change the ratio of the canvas
     */
    // Zoom out when zoomed in (zoom = 1) and the other way around
    if (this.zoom === 1) {
      // Get necessary Zoomlevel
      // Check which canvas dimension overlaps more and use this (-10% to have some margin)
      this.zoom = 1 / (Math.max(this.canvasHeight / window.innerHeight, this.canvasWidth / window.innerHeight) + 0.1);
      // Reposition the canvas so it is centered
      this.posTop = (window.innerHeight - this.canvasHeight * this.zoom) / 2;
      this.posLeft = (window.innerWidth - this.canvasWidth * this.zoom) / 2;
    } else {
      // Zoom back in
      this.zoom = 1;
      // Place the canvas back to the top-left
      this.posTop = 0;
      this.posLeft = 0;
    }
  }

  moveWindow(element: number) {
    let dh = window.innerHeight;
    let dw = window.innerWidth;
    this.posBottom = this.canvasHeight - dh + this.posTop;
    this.posRight = this.canvasWidth - dw + this.posLeft;

    switch (element) {
      case 1:
        if (this.posTop < 0) {
          this.posTop += 20;
        }
        if (this.posTop > 0) {
          this.posTop = 0;
        }
        break;
      case 2:
        if (this.posRight > 0) {
          this.posLeft -= 20;
        }
        if (this.posRight < 0) {
          this.posLeft = -this.canvasWidth + dw;
        }
        break;
      case 3:
        if (this.posBottom > 0) {
          this.posTop -= 20;
        }
        if (this.posBottom < 0) {
          this.posTop = -this.canvasHeight + dh;
        }
        break;
      case 4:
        if (this.posLeft < 0) {
          this.posLeft += 20;
        }
        if (this.posLeft > 0) {
          this.posLeft = 0;
        }
        break;
      default:
        console.log('error');
        break;
    }
  }

  getCurrentCanvas() {
  this.apiService.getAllPoints()
    .subscribe(
        data => {
          console.log(data);
        },
        error =>  console.log(error)
      );
  }

  getMousePosition(event) {
    if (this.zoom === 1) {
      let x = event.x;
      let y = event.y;

      let c = (<HTMLCanvasElement>document.getElementById('gameCanvas'));
      let ctx = c.getContext('2d');

      x -= c.offsetLeft;
      y -= c.offsetTop;

      this.apiService.submitPoint(Math.floor(x / 10), Math.floor(y / 10), '#133769');

      /*
      ctx.fillStyle = '#133769';

      ctx.fillRect(Math.floor(x / 10) * 10, Math.floor(y / 10) * 10, 10, 10);
      */
    }
  }

}
