import {Component, OnInit, AfterViewInit, ElementRef, ViewChild} from '@angular/core';
import {ApiService} from '../services/api.service';
import {UserManagementService} from '../services/user-management.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, AfterViewInit {

  canvasWidth: number;
  canvasHeight: number;

  posTop: number;
  posRight: number;
  posLeft: number;
  posBottom: number;

  colorsShown: boolean = false;
  inputShown: boolean = true;
  guessedSolution: string;
  zoom: number = 1;

  colors: string[] = [
    '#000',
    '#800',
    '#F00',
    '#F0F',
    '#088',
    '#080',
    '#0F0',
    '#0FF',
    '#008',
    '#808',
    '#00F',
    '#888',
    '#880',
    '#FF0',
    '#FFF',
    '#C0C0C0',
  ];

  @ViewChild('canvas') canvas: ElementRef;

  constructor(private apiService: ApiService, private userService: UserManagementService) {
  }

  /**
   * Set Canvas Starting Position (Top, Left) and Canvas Dimension (Height and Width) on Init
   * Right and Bottom are for scrolling
   */
  ngOnInit() {
    this.posTop = 0;
    this.posLeft = 0;
    this.canvasHeight = 2000;
    this.canvasWidth = 2000;
    this.posRight = this.canvasWidth - window.innerWidth + this.posLeft;
    this.posBottom = this.canvasHeight - window.innerHeight + this.posTop;
  }

  ngAfterViewInit() {
    this.getCurrentCanvas();
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

  /**
   * Gets all the points and draws them
   * Only used when opening the GameComponent
   */
  getCurrentCanvas() {
    try {
    this.apiService.getAllPoints()
      .subscribe(
        data => {
          this.drawBoard(data);
        },
        error => console.log(error)
      );
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * Draws a JSON of Points on the board
   * @param points
   */
  drawBoard(points) {
    let c = (<HTMLCanvasElement>document.getElementById('gameCanvas'));
    let ctx = c.getContext('2d');

    for (let point of points) {
      ctx.fillStyle = point.color;
      ctx.fillRect(point.x * 10, point.y * 10, 10, 10);
    }
  }

  /**
   * Registers a Click
   * Forwards the Click Location and the Current Color to the Backend
   * @param event
   */
  getMousePosition(event) {
    if (this.zoom === 1 && this.userService.user.type === 1) {
      let c = (<HTMLCanvasElement>document.getElementById('gameCanvas'));

      let x = event.x - c.offsetLeft;
      let y = event.y - c.offsetTop;

      this.apiService.submitPoint(Math.floor(x / 10), Math.floor(y / 10), this.userService.user.color);
    }
  }

  /**
   * Triggers the InputField for Guesses
   * Also Triggers the Field for Painters
   */
  showInput() {
    this.inputShown = !this.inputShown;
  }

  /**
   * Triggers the ColorPalette, to allow for DifferentColors
   */
  showColorPalette() {
    this.colorsShown = !this.colorsShown;
  }

  /**
   * Changes the colors of the player
   * @param color
   */
  setColor(color) {
    this.userService.user.color = this.colors[color];
    this.colorsShown = !this.colorsShown;
  }

  submitSolution() {
    this.apiService.submitSolution(this.guessedSolution);
  }

}
