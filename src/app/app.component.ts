import { Component, Input, Output, EventEmitter } from '@angular/core';
import { GridComponent } from './grid/grid.component';
import { Gameboard } from './gameboard.module';
import { Tetrimino } from './grid/tetrimino.model';
import { LeftPanelComponent} from './left-panel/left-panel.component';
import { RightPanelComponent} from './right-panel/right-panel.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ScoringPopupComponent } from './scoring-popup/scoring-popup.component';
import { GameOverPopupComponent } from './game-over-popup/game-over-popup.component';
import { ViewContainerRef, ViewChild, ReflectiveInjector, ComponentFactoryResolver } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'IvoTetris';
  dropSpeed = 1;
  holdTetrimino;
  score = 0;
  linesleft;
  nextTetrimino;
  LeftPanelData: any;
  RightPanelData: any;
  GridPanelData: any;
  gameOver: boolean;
  constructor() { }

  public handleDataFromGrid(object: any) {
    this.dropSpeed = object.dropSpeed;
    this.holdTetrimino = object.holdTetrimino;
    this.score = object.score;
    this.nextTetrimino = object.nextTetrimino;
    this.linesleft = object.linesleft;
    this.gameOver = object.gameOver;

    this.LeftPanelData = {
      dropSpeed: this.dropSpeed,
      holdTetrimino : this.holdTetrimino,
      score : this.score,
      linesleft: this.linesleft
    };

    this.RightPanelData = {
      nextTetrimino : this.nextTetrimino
    };

    this.GridPanelData = {
      newGame: false
    };

  }
}
