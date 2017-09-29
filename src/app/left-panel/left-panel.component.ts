import { Component, EventEmitter, Output, NgModule, OnInit, OnChanges, Input } from '@angular/core';
import { GridComponent } from '../grid/grid.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Tetrimino } from '../grid/tetrimino.model';

@NgModule({
  imports: [ BrowserModule,FormsModule ],
  declarations: [ LeftPanelComponent ],
  bootstrap: [ LeftPanelComponent ]
})

@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.css']
})
export class LeftPanelComponent implements OnInit {

  @Input('DataFromAppComponent') dataReceived: any;  

  constructor() { }

  ngOnInit() {  }

}
