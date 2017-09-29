import { Component, OnInit, OnChanges, DoCheck, Output, Input, EventEmitter } from '@angular/core';
import { HostListener } from '@angular/core';
import { NgFor } from '@angular/common';
import { Gameboard } from '../gameboard.module';
import { Tetrimino } from './tetrimino.model';
import { GameOverPopupComponent } from '../game-over-popup/game-over-popup.component';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css'],
  host: { '(document:keydown)': 'handleKeyboardEvents($event)' }
})

export class GridComponent implements OnInit {
  @Input('DataFromAppComponent') dataReceived: any;
  @Output('DataFromGrid') outgoingData = new EventEmitter<any>();
  @HostListener('document:keypress', ['$event'])

  private d_height: number;
  private d_width: number;
  private d_matrix: number[][];
  private d_behindMatrix: number[][];
  private rowNumbers: number[];
  private colNumbers: number[];
  private d_currentHeight: number;
  private d_score: number;
  private d_dropSpeed: number;
  private d_nextTetrimino: Tetrimino;
  private d_currentTetrimino: Tetrimino;
  private d_holdTetrimino: Tetrimino;
  private d_isPaused: boolean;
  private d_showShadow: boolean;
  private d_linesleft: number;
  private d_msDropSpeed: number;
  private d_gameOver: boolean;
  private d_speedChanged: boolean;
  private interval_id;
  private tetriminoAtBottom: boolean;
  private canMoveDown = true && !this.isPaused();
  private canMoveRight = true && !this.isPaused();
  private canMoveLeft = true && !this.isPaused();

  constructor() {
    this.d_height = Gameboard.GRID_HEIGHT;
    this.d_width = Gameboard.GRID_WIDTH;
    this.d_matrix = this.d_initZeroMatrix(Gameboard.GRID_HEIGHT, Gameboard.GRID_WIDTH);
    this.d_behindMatrix = this.d_deepCopyMatrix(this.d_matrix);
    this.d_currentHeight = 0;
    this.d_score = 0;
    this.d_dropSpeed = 0;
    this.rowNumbers = this.d_initNums(Gameboard.GRID_HEIGHT);
    this.colNumbers = this.d_initNums(Gameboard.GRID_WIDTH);
    this.d_currentTetrimino = new Tetrimino(Math.floor(Math.random() * Gameboard.MAX_TETRIMINO_TYPES));
    this.d_isPaused = false;
    this.d_showShadow = true;
    this.d_linesleft = Gameboard.LINES_PER_LEVEL;
    this.d_msDropSpeed = Gameboard.MS_SPEEDS_PER_LEVEL[this.d_dropSpeed];
    this.d_gameOver = false;
    this.d_speedChanged = false;
    this.tetriminoAtBottom = false;
  }

  private d_resetGridMetadata() {
    this.d_matrix = this.d_initZeroMatrix(Gameboard.GRID_HEIGHT, Gameboard.GRID_WIDTH);
    this.d_behindMatrix = this.d_deepCopyMatrix(this.d_matrix);
    this.d_currentHeight = 0;
    this.d_score = 0;
    this.d_dropSpeed = 0;
    this.rowNumbers = this.d_initNums(Gameboard.GRID_HEIGHT);
    this.colNumbers = this.d_initNums(Gameboard.GRID_WIDTH);
    this.d_currentTetrimino = new Tetrimino(Math.floor(Math.random() * Gameboard.MAX_TETRIMINO_TYPES));
    this.d_isPaused = false;
    this.d_showShadow = true;
    this.d_linesleft = Gameboard.LINES_PER_LEVEL;
    this.d_msDropSpeed = Gameboard.MS_SPEEDS_PER_LEVEL[this.d_dropSpeed];
    this.d_gameOver = false;
    this.d_speedChanged = false;
    this.tetriminoAtBottom = false;
  }

  public sendDataToAppComponent() {
      const object = {
        dropSpeed : this.d_dropSpeed,
        holdTetrimino : this.d_holdTetrimino,
        score : this.d_score,
        nextTetrimino : this.d_nextTetrimino,
        linesleft: this.d_linesleft,
      };
    this.outgoingData.emit(object);
  }

  private d_deepCopyMatrix(arr: number[][]): number[][] {
    const clone = [];
    for (let i = 0; i < arr.length; i++) {
      clone.push( arr[i].slice(0) );
    }
    return clone;
  }

  private d_initZeroMatrix(rows: number, cols: number): number[][] {
    const zeroMatrix = [];
    const row = [];
    while (cols--) { row.push(0); }
    while (rows--) { zeroMatrix.push(row.slice()); }
    return zeroMatrix;
  }

  private d_initNums(n: number): number[] {
    const temp = [];
    for (let i = 0; i < n; i++) {
      temp.push(i);
    }
    return temp;
  }

  public togglePlayPaused(): void {
    console.log('P - Pause');
    this.d_isPaused = !this.d_isPaused;
  }

  public isPaused(): boolean {
      return this.d_isPaused;
  }

  public getHoldTetrimino(): Tetrimino {
      return this.d_holdTetrimino;
  }

  public updateHoldTetrimino(): void {
      let tempTetrimino: Tetrimino;
      if (!this.d_holdTetrimino) {
        this.d_holdTetrimino = this.d_currentTetrimino;
        this.d_currentTetrimino = this.d_nextTetrimino;
        this.setNextTetrimino(new Tetrimino(Math.floor(Math.random() * Gameboard.MAX_TETRIMINO_TYPES)));
      } else {
        tempTetrimino = this.d_holdTetrimino;
        this.d_holdTetrimino = this.d_currentTetrimino;
        this.d_currentTetrimino = tempTetrimino;
        Gameboard.globalY = 0;
        Gameboard.globalX = 4;
      }
  }

  public getNextTetrimino(): Tetrimino {
      return this.d_nextTetrimino;
  }

  public setNextTetrimino(next: Tetrimino): void {
      this.d_nextTetrimino = next;
  }

  public cleanMatrix() {
    for (let i = 0; i < this.d_matrix.length; i++) {
        this.d_matrix[i].fill(0);
    }
    this.d_matrix = this.d_deepCopyMatrix(this.d_behindMatrix);
  }

  public applyTetrimino(tetrimino: Tetrimino, heightPos: number, widthPos: number): void {
      this.cleanMatrix();
      const tetriminoLayout: number[][] = tetrimino.getLayout();

      for (let i = heightPos; i < (heightPos + tetriminoLayout.length); i++) {
          for (let j = widthPos; j < (widthPos + tetriminoLayout[i - heightPos].length); j++) {
              if (tetriminoLayout[i - heightPos][j - widthPos] > 0) {
                  this.d_matrix[i][j] = tetriminoLayout[i - heightPos][j - widthPos];
              }
          }
      }
  }

  public appendMatrixNewTetrimino(tetrimino: Tetrimino, heightPos: number, widthPos: number): void {
      const tetriminoLayout: number[][] = tetrimino.getLayout();
      const copyBehind = this.d_deepCopyMatrix(this.d_behindMatrix);

      for (let i = heightPos; i < (heightPos + tetriminoLayout.length); i++) {
          for (let j = widthPos; j < (widthPos + tetriminoLayout[i - heightPos].length); j++) {
              if (tetriminoLayout[i - heightPos][j - widthPos] > 0) {
                  copyBehind[i][j] = tetriminoLayout[i - heightPos][j - widthPos];
                  this.d_behindMatrix = this.d_deepCopyMatrix(copyBehind);
              }
          }
      }
  }

  public getMatrix(): number[][] {
      return this.d_matrix;
  }

  public getMatrixCell(row: number, col: number) {
      return this.d_matrix[row][col];
  }

  public getBehindMatrix(): number[][] {
      return this.d_behindMatrix;
  }

  public printMatrix(): void {
      let arrText = '';
      for (let i = 0; i < this.d_matrix.length; i++) {
              for (let j = 0; j < this.d_matrix[i].length; j++) {
                      arrText += this.d_matrix[i][j] + ' ';
                  }
              arrText += '\n';
          }
      console.log(arrText);
  }

  public printBehindMatrix(): void {
      let arrText = '';
      for (let i = 0; i < this.d_behindMatrix.length; i++) {
              for (let j = 0; j < this.d_behindMatrix[i].length; j++) {
                      arrText += this.d_behindMatrix[i][j] + ' ';
                  }
              arrText += '\n';
          }
      console.log(arrText);
  }

  public currentHeight(): number {
      return this.d_currentHeight;
  }

  public currentScore(): number {
      return this.d_score;
  }

  public updateCurrentHeight(newlevel: number): void {
      this.d_currentHeight = newlevel;
  }

  public clearLines(): number {
      let loopAgain = false;
      let currentStreak = 0;

      do {
          loopAgain = false;
          for (let i = this.d_behindMatrix.length - 1; i >= 0; i--) {
              if (this.d_behindMatrix[i].every(function(box) { return box > 0; })) {
                  this.d_behindMatrix[i].fill(0);
                  this.dropLinesDown(i);
                  currentStreak++;
                  loopAgain = true;
              }
          }
          if (loopAgain) {
              Gameboard.globalY = this.d_behindMatrix.length - 1;
          } else {
              loopAgain = false;
              this.updateScoreLineClear(currentStreak);
              this.updateLinesClearedAndSpeed(currentStreak);
          }
      } while (loopAgain);

      return currentStreak;
  }

  public dropLinesDown(lineCleared: number) {
      for (let i = lineCleared; i > 0; i--) {
          this.d_behindMatrix[i] = this.d_behindMatrix[i - 1];
      }
      this.d_behindMatrix[0].fill(0);
  }

  public updateScoreLineClear(numOfLines: number): void {
      this.d_score += numOfLines * 100 * (this.d_dropSpeed + 1);
  }

  public leftMove(): void {
    console.log('Left - Move left');
    const shape2: number[] = this.d_currentTetrimino.getLeftestOnesPerRows();

    for (let k = 0; k < shape2.length; k++) {
        if (Gameboard.globalX + shape2[k] <= 0) {
            this.canMoveLeft = false;
            break;
        }
        if (this.d_matrix[Gameboard.globalY + k][Gameboard.globalX + shape2[k] - 1] > 0 ) {
            this.canMoveLeft = false;
        }
    }
    if (!this.canMoveLeft) {
      Gameboard.globalX = Gameboard.globalX + 0;
        this.canMoveLeft = true;
    } else {
      Gameboard.globalX--;
    }
  }

  public rightMove(): void {
    console.log('Right - Move right');
    const shape1: number[] = this.d_currentTetrimino.getRightestOnesPerRows();

    for (let k = 0; k < shape1.length; k++) {
        if (Gameboard.globalX + shape1[k] >= Gameboard.GRID_WIDTH - 1) {
            this.canMoveRight = false;
            break;
        }
        if (this.d_matrix[Gameboard.globalY + k][Gameboard.globalX + shape1[k] + 1] > 0 ) {
            this.canMoveRight = false;
        }
    }
    if (!this.canMoveRight) {
        Gameboard.globalX = Gameboard.globalX + 0;
        this.canMoveRight = true;
    } else {
      Gameboard.globalX++;
    }
  }

  public downMove(): void {
    console.log('Down - Soft drop');
    const shape: number[] = this.d_currentTetrimino.getLowestOnesPerColumn();

    for (let k = 0; k < shape.length; k++) {
        if (this.d_matrix[Gameboard.globalY + shape[k] + 1][Gameboard.globalX + k] > 0) {
            this.canMoveDown = false;
        }
    }
    if (!this.canMoveDown && !this.isPaused()) {
        this.tetriminoAtBottom = true;
        this.canMoveDown = true;
    } else {
        if (!this.isPaused()) {
          Gameboard.globalY++;
        }
    }
  }

  public rotateRight(): void {
    console.log('Up - Rotate Right');
    if (!this.isPaused()) {
      if (Gameboard.globalX + this.d_currentTetrimino.getHeight() > (Gameboard.GRID_WIDTH - 1)) {
          const distanceBack = Gameboard.globalX + this.d_currentTetrimino.getHeight() - Gameboard.GRID_WIDTH;
          Gameboard.globalX = Gameboard.globalX - distanceBack;
      }
      if (Gameboard.globalY + this.d_currentTetrimino.getWidth() > (Gameboard.GRID_HEIGHT - 1)) {
          const distanceBack = Gameboard.globalY + this.d_currentTetrimino.getWidth() - Gameboard.GRID_HEIGHT;
          Gameboard.globalY = Gameboard.globalY - distanceBack;
      }
      this.d_currentTetrimino.rotateRight();
    }
  }

  public rotateLeft(): void {
    console.log('C - Rotate left');
    if (!this.isPaused()) {
      this.d_currentTetrimino.rotateLeft();
    }
  }

  public hardDrop(): void {
    console.log('X - Hard drop');
    while (!this.tetriminoAtBottom && !this.isPaused()) {
        const shape3: number[] = this.d_currentTetrimino.getLowestOnesPerColumn();

        for (let k = 0; k < shape3.length; k++) {
            if (Gameboard.globalY + shape3[k] + 1 === Gameboard.GRID_HEIGHT) {
                this.canMoveDown = false;
                break;
            }
            if (this.d_matrix[Gameboard.globalY + shape3[k] + 1][Gameboard.globalX + k] > 0 ) {
                this.canMoveDown = false;
            }
        }
        if (!this.canMoveDown) {
            this.tetriminoAtBottom = true;
            this.canMoveDown = true;
        } else {
          Gameboard.globalY++;
        }
    }
  }

  public holdPiece(): void {
    console.log('Z - Hold piece');
    if (!this.isPaused()) {
      this.updateHoldTetrimino();
    }
  }

  public tetriminoAtBottom1Check() {
    if (Gameboard.globalY + this.d_currentTetrimino.getHeight() === Gameboard.GRID_HEIGHT) {
        this.tetriminoAtBottom = true;
    }
  }

  public updateLinesClearedAndSpeed(lines: number) {
    this.d_linesleft -= lines;
    if (this.d_linesleft <= 0) {
        this.d_dropSpeed++;
        this.d_speedChanged = true;
        this.d_msDropSpeed = Gameboard.MS_SPEEDS_PER_LEVEL[this.d_dropSpeed];
        this.d_linesleft += Gameboard.LINES_PER_LEVEL;
    }
  }

  public handleDataFromGameOverPopup(newGame: boolean) {
    if (newGame) {
        this.d_resetGridMetadata();
    }
  }

  public tetriminoAtBottomProcedure() {
    if (this.tetriminoAtBottom) {
        this.appendMatrixNewTetrimino(this.d_currentTetrimino, Gameboard.globalY, Gameboard.globalX);
        this.clearLines();

        // You have tapped out
        if (this.clearLines() === 0 && Gameboard.globalY === 0) {
            this.d_isPaused = true;
            this.d_gameOver = true;
        }
        const randTetriminoType1: number = Math.floor(Math.random() * Gameboard.MAX_TETRIMINO_TYPES);
        this.d_currentTetrimino = this.getNextTetrimino();
        this.setNextTetrimino(new Tetrimino(randTetriminoType1));
        Gameboard.globalY = 0;
        Gameboard.globalX = 4;
        this.applyTetrimino(this.d_currentTetrimino, Gameboard.globalY, Gameboard.globalX);
        this.tetriminoAtBottom = false;
    }
  }

  public returnInterval() {
    return window.setInterval(() => {
        if (!this.isPaused()) {
            this.downMove();
            this.applyTetrimino(this.d_currentTetrimino, Gameboard.globalY, Gameboard.globalX);
            this.tetriminoAtBottom1Check();
            this.tetriminoAtBottomProcedure();
            this.sendDataToAppComponent();
            if (this.d_speedChanged) {
                this.d_speedChanged = false;
                window.clearInterval(this.interval_id.data.handleId);
                this.returnInterval();
            }
        }
        }, this.d_msDropSpeed);
  }

  handleKeyboardEvents(event: KeyboardEvent) {
    switch (event.keyCode) {
              case 37:
                  this.leftMove();
                  break;
              case 38:
                  this.rotateRight();
                  break;
              case 39:
                  this.rightMove();
                  break;
              case 40:
                  this.downMove();
                  break;
              case 67:
                  this.rotateLeft();
                  break;
              case 80:
                  this.togglePlayPaused();
                  break;
              case 88:
                  this.hardDrop();
                  break;
              case 90:
                  this.holdPiece();
                  break;
              default:
                  console.log('Not supported key press! Key Code: ' + event.keyCode);
                  break;
    }
    this.applyTetrimino(this.d_currentTetrimino, Gameboard.globalY, Gameboard.globalX);
    this.tetriminoAtBottom1Check();
    this.tetriminoAtBottomProcedure();
  }

  ngOnInit() {
    this.applyTetrimino(this.d_currentTetrimino, Gameboard.globalY, Gameboard.globalX);
    this.sendDataToAppComponent();
    const i = 0;
    Gameboard.globalY++;
    this.setNextTetrimino(new Tetrimino(Math.floor(Math.random() * Gameboard.MAX_TETRIMINO_TYPES)));
    while (this.currentHeight() <= 0) {
      this.interval_id = this.returnInterval();
      this.updateCurrentHeight(Gameboard.globalY);
    }
  }
}
