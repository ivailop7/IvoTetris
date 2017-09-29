import { Component, Inject } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { MdFormFieldModule } from '@angular/material';
import { Gameboard } from '../gameboard.module';

@Component({
  selector: 'app-settings-popup',
  templateUrl: './settings-popup.component.html',
  styleUrls: ['./settings-popup.component.css']
})
export class SettingsPopupComponent{
  
  cb1: boolean;
  name: string;

  constructor(public dialog: MdDialog) {}

  openDialog(): void {
    let dialogRef = this.dialog.open(SettingsDialog, {
      width: '350px',
      data: { cb1: this.cb1 }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.cb1 = result;
      if(this.cb1) {
        Gameboard.TetriminoLayout = {
          'Z' : [[0, 3],[3, 3],[3, 0]],
          'S' : [[3, 0],[3, 3],[0, 3]],
          'I' : [[3],[3],[3],[3]],
          'T' : [[3, 3, 3],[0, 3, 0]],
          'J' : [[0, 3],[0, 3],[3, 3]],
          'L' : [[3, 0],[3, 0],[3, 3]],
          'O' : [[3, 3],[3, 3]]
          };
      }
      else {
        Gameboard.TetriminoLayout = {
          'Z' : [[0, 1],[1, 1],[1, 0]],
          'S' : [[2, 0],[2, 2],[0, 2]],
          'I' : [[3],[3],[3],[3]],
          'T' : [[4, 4, 4],[0, 4, 0]],
          'J' : [[0, 5],[0, 5],[5, 5]],
          'L' : [[6, 0],[6, 0],[6, 6]],
          'O' : [[7, 7],[7, 7]]
          };
      }
    });
  }

}

@Component({
  selector: 'settings-dialog',
  templateUrl: 'settings-dialog.html',
})
export class SettingsDialog {

  constructor(
    public dialogRef: MdDialogRef<SettingsDialog>,
    @Inject(MD_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }


}
