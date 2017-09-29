import {Component, Inject} from '@angular/core';
import {MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';
import {MdFormFieldModule } from '@angular/material';

@Component({
  selector: 'app-controls-popup',
  templateUrl: './controls-popup.component.html',
  styleUrls: ['./controls-popup.component.css']
})
export class ControlsPopupComponent {

  animal: string;
  name: string;

  constructor(public dialog: MdDialog) {}

  openDialog(): void {
    let dialogRef = this.dialog.open(ControlsDialog, {
      width: '400px',
      data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.animal = result;
    });
  }

}

@Component({
  selector: 'controls-dialog',
  templateUrl: 'controls-dialog.html',
})
export class ControlsDialog {

  constructor(
    public dialogRef: MdDialogRef<ControlsDialog>,
    @Inject(MD_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
