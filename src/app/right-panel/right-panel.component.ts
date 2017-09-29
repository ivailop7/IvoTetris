import { Component, EventEmitter, Output, NgModule, OnInit, OnChanges, Input } from '@angular/core';
import { GridComponent } from '../grid/grid.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Tetrimino } from '../grid/tetrimino.model';

@Component({
  selector: 'app-right-panel',
  templateUrl: './right-panel.component.html',
  styleUrls: ['./right-panel.component.css']
})
export class RightPanelComponent implements OnInit {
  @Input('DataFromAppComponent') dataReceived: any;

  constructor() { }
  ngOnInit() { }

}
