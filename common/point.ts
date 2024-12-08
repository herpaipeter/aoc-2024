export class Point {
    private readonly _row: number;
    private readonly _col: number;

    constructor(r: number, c: number) {
        this._row = r;
        this._col = c;
    }

    private static _displayName = "Point";

    static distance(a: Point, b: Point): number {
        const dx = a._row - b._row;
        const dy = a._col - b._col;

        return Math.hypot(dx, dy);
    }

    add(other: Point): Point {
        return new Point(this._row + other.row, this._col + other.col);
    }

    get row(): number {
        return this._row;
    }

    get col(): number {
        return this._col;
    }

    isSame(other: Point) {
        return this._row === other.row && this._col === other.col;
    }

    sub(other: Point): Point {
        return new Point(this._row - other.row, this._col - other.col);
    }

    negate(): Point {
        return new Point(-this._row, -this._col);
    }
}

export enum Direction {
    UP, RIGHT, DOWN, LEFT
}

export const DIRECTIONS = [new Point(-1, 0), new Point(0, 1), new Point(1, 0), new Point(0, -1)];
