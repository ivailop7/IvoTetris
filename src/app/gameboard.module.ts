export module Gameboard {

    export const GRID_WIDTH: number = 10;
    export const GRID_HEIGHT: number = 20;
    export const MAX_TETRIMINO_TYPES = 6;
    export const MAX_LEVELS: number = 10;
    export const LINES_PER_LEVEL: number = 45;
    export const MS_SPEEDS_PER_LEVEL: number[] = [1200, 1100, 1000, 900, 800, 700, 600, 500, 400, 300];
    export enum Type {S = 0, Z = 1, O = 2, I = 3, T = 4, J = 5, L = 6}
    export let globalY = 0;
    export let globalX = 4;
    export let TetriminoLayout = {
                                'Z' : [[0, 1], [1, 1], [1, 0]],
                                'S' : [[2, 0], [2, 2], [0, 2]],
                                'I' : [[3], [3], [3], [3]],
                                'T' : [[4, 4, 4], [0, 4, 0]],
                                'J' : [[0, 5], [0, 5], [5, 5]],
                                'L' : [[6, 0], [6, 0], [6, 6]],
                                'O' : [[7, 7], [7, 7]]
                };
}
