import { Component, Inject, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { MdFormFieldModule } from '@angular/material';

@Component({
  selector: 'app-game-over-popup',
  templateUrl: './game-over-popup.component.html',
  styleUrls: ['./game-over-popup.component.css']
})

export class GameOverPopupComponent implements OnInit {
  @Input('Score') score: number;
  @Output('newGameSignal') newGameSignal = new EventEmitter<boolean>();

  constructor(public dialog: MdDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(GameOverDialog, {
      width: '400px',
      data: { score: this.score }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.newGameSignal.emit(true);
    });
  }

  ngOnInit() {
    this.openDialog();
  }
}

@Component({
  selector: 'app-gameover-dialog',
  templateUrl: 'gameover-dialog.html',
})
export class GameOverDialog {

  constructor(
    public dialogRef: MdDialogRef<GameOverDialog>,
    @Inject(MD_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  openFbPopUp() {
    const sharerURL = `https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Ftetris.ivaylopavlov.com&
    picture=http%3A%2F%2Fwww.ivaylopavlov.com%2Fwp-content%2Fuploads%2F2017%2F09%2Fheader_image.png&
    title=I+played+IvoTetris&quote=I%20%20played%20IvoTetris%20and%20scored%20` + this.data.score + `%20Points.&
    description=I%20%20Played%20IvoTetris%20and%20scored%20` + this.data.score + `%20Points.`;
    window.open(
      sharerURL,
      'facebook-share-dialog',
      'width=626,height=436');
    return  false;
  }

}
