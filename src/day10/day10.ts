import {DIRECTIONS, Point} from "../../common/point";
import {concatArrays, sumNumbers} from "../../common/utils";

export class Day10 {

    private parser: Day10Parser;

    constructor(lines: string[]) {
        this.parser = new Day10Parser(lines);
    }

    solvePart1(): number {
        return new PathFinder(this.parser.heights).pathesCount(0, 9);
    }

    solvePart2(): number {
        return new PathFinder(this.parser.heights).pathesCountNoDistinct(0, 9);
    }

}

export class PathFinder {
    private _rowCount: number = 0;
    private _colCount: number = 0;
    private _heights: number[][];

    constructor(heights: number[][]) {
        this._heights = heights;
        this._rowCount = heights.length;
        if (0 < this._rowCount)
            this._colCount = heights[0].length;
    }

    pathesCount(from: number, to: number) {
        if (from === to)
            return 0;

        const starts = this.findStarts(from);
        const endpoints = this.getRouteEndpoints(starts, from, to);
        return endpoints.map(p => this.distinctSize(p)).reduce(sumNumbers, 0);
    }

    pathesCountNoDistinct(from: number, to: number) {
        if (from === to)
            return 0;

        const starts = this.findStarts(from);
        const endpoints = this.getRouteEndpoints(starts, from, to);
        return endpoints.map(p => p.length).reduce(sumNumbers, 0);
    }

    private getRouteEndpoints(starts: any[], from: number, to: number) {
        let routes: Point[][] = [];
        for (let start of starts) {
            let neighbours = [start];
            for (let i = from + 1; i <= to; i++) {
                neighbours = neighbours.map(n => this.getNeighbours(n, i)).reduce(concatArrays, []);
            }
            routes.push(neighbours);
        }
        return routes;
    }

    private getNeighbours(position: Point, to: number) {
        return DIRECTIONS
            .map(d => position.add(d))
            .filter(n => this.matchNeighbour(n, to));
    }

    private isInside(row: number, col: number) {
        return 0 <= row && row < this._rowCount
            && 0 <= col && col < this._colCount
    }

    private findStarts(start: number) {
        const starts = []
        for (let r = 0; r < this._rowCount; r++) {
            for (let c = 0; c < this._colCount; c++) {
                if (this._heights[r][c] === start) {
                    starts.push(new Point(r, c));
                }
            }
        }
        return starts;
    }

    private matchNeighbour(coord: Point, to: number) {
        return this.isInside(coord.row, coord.col)
            && this._heights[coord.row][coord.col] === to;
    }

    private distinctSize(neighbours: Point[]) {
        const ids = neighbours.map(p => this.getId(p));
        return new Set(ids).size;
    }

    private getId(p: Point) {
        return p.row * this._rowCount + p.col;
    }
}

export class Day10Parser {
    private _rowCount: number = 0;
    private _colCount: number = 0;

    private _heights: number[][] = [];

    constructor(lines: string[]) {
        this._rowCount = lines.length;
        lines.map((line, r) => this.parseLine(line, r));
    }

    private parseLine(line: string, row: number) {
        if (0 === line.length)
            return;

        this._colCount = line.length;
        const nums= line.split("").map(c => parseInt(c));
        this._heights.push(nums);
    }

    get heights(): number[][] {
        return this._heights;
    }

    get rowCount(): number {
        return this._rowCount;
    }

    get colCount(): number {
        return this._colCount;
    }
}
