import { Gameboard } from '../gameboard.module';

export class Tetrimino {

    private d_type: Gameboard.Type;
    private d_position: number[][];
    private d_layout: number[][];

    constructor(type: Gameboard.Type) {
        this.d_type = type;
        this.d_layout = Gameboard.TetriminoLayout[Gameboard.Type[type]];
    }

    rotateRight(): void {
        const rows = this.d_layout.length;
        const cols = this.d_layout[0].length;

        const newMatrix = [];

        for (let i = 0; i < cols; i++) {
            newMatrix[i] = [];
            for (let j = rows - 1; j >= 0; j--) {
                newMatrix[i].push(this.d_layout[j][i]);
            }
        }
        this.d_layout = newMatrix;
    }

    printLayout(): void {
        let arrText = '';
        for (let i = 0; i < this.d_layout.length; i++) {
            for (let j = 0; j < this.d_layout[i].length; j++) {
                arrText += this.d_layout[i][j] + ' ';
            }
            arrText += '\n';
        }
        console.log(arrText);
    }

    printHTMLLayout(): string {
        let arrText = '<tr>';
        for (let i = 0; i < this.d_layout.length; i++) {
            for (let j = 0; j < this.d_layout[i].length; j++) {
                arrText += '<td><img src="../../assets/minos/' + this.d_layout[i][j] + '.png" width="24px" height="24px"/></td>';
            }
            arrText += '</tr>\n';
        }
        return arrText;
    }

    getLayout(): number[][] {
        return this.d_layout;
    }

    getWidth(): number {
        return this.d_layout[0].length;
    }

    getHeight(): number {
        return this.d_layout.length;
    }

    getLowestOnesPerColumn(): number[] {
        const lowestOnesCoordinates: number[] = [];

        for (let i = 0; i < this.getWidth(); i++) {
            lowestOnesCoordinates[i] = 0;
            for (let j = 0; j < this.getHeight(); j++) {
                if (this.d_layout[j][i] > 0) {
                    if (lowestOnesCoordinates[i] < j) {
                        lowestOnesCoordinates[i] = j;
                    }
                }
            }
        }

        if (lowestOnesCoordinates.length !== this.getWidth()) {
            console.log('Number of endpoints collected don\'t match Tetrimino width!');
        }

        return lowestOnesCoordinates;
    }

    getRightestOnesPerRows(): number[] {
        const rightestOnesCoordinates: number[] = [];

        for (let i = 0; i < this.getHeight(); i++) {
            rightestOnesCoordinates[i] = 0;
            for (let j = 0; j < this.getWidth(); j++) {
                if (this.d_layout[i][j] > 0) {
                    if (rightestOnesCoordinates[i] < j) {
                        rightestOnesCoordinates[i] = j;
                    }
                }
            }
        }

        if (rightestOnesCoordinates.length !== this.getHeight()) {
            console.log('Number of endpoints collected don\'t match Tetrimino width!');
        }

        return rightestOnesCoordinates;
    }

    getLeftestOnesPerRows(): number[] {
        const leftestOnesCoordinates: number[] = [];

        for (let i = 0; i < this.getHeight(); i++) {
            leftestOnesCoordinates[i] = 1;
            for (let j = this.getWidth() - 1; j >= 0 ; j--) {
                if (this.d_layout[i][j] > 0 ) {
                    if (leftestOnesCoordinates[i] > j) {
                        leftestOnesCoordinates[i] = j;
                    }
                }
            }
        }

        if (leftestOnesCoordinates.length !== this.getHeight()) {
            console.log('Number of endpoints collected don\'t match Tetrimino width!');
        }

        return leftestOnesCoordinates;
    }
    rotateLeft(): void {
        // Lazier than I'm ashamed
        this.rotateRight();
        this.rotateRight();
        this.rotateRight();
    }
}
