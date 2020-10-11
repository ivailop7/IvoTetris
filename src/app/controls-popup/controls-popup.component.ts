import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {MatFormFieldModule } from '@angular/material';

@Component({
  selector: 'app-controls-popup',
  templateUrl: './controls-popup.component.html',
  styleUrls: ['./controls-popup.component.css']
})
export class ControlsPopupComponent {

  animal: string;
  name: string;

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(ControlsDialog, {
      width: '400px',
      data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.animal = result;
    });
  }

}

@Component({
  selector: 'app-controls-dialog',
  templateUrl: 'controls-dialog.html',
})
export class ControlsDialog {

  constructor(
    public dialogRef: MatDialogRef<ControlsDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
