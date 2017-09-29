import {Component, Inject} from '@angular/core';
import {MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';
import {MdFormFieldModule } from '@angular/material';

@Component({
  selector: 'app-scoring-popup',
  templateUrl: './scoring-popup.component.html',
  styleUrls: ['./scoring-popup.component.css']
})
export class ScoringPopupComponent {

  animal: string;
  name: string;

  constructor(public dialog: MdDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(ScoringDialog, {
      width: '400px',
      data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.animal = result;
    });
  }

}

@Component({
  selector: 'app-scoring-dialog',
  templateUrl: 'scoring-dialog.html',
})
export class ScoringDialog {

  constructor(
    public dialogRef: MdDialogRef<ScoringDialog>,
    @Inject(MD_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
