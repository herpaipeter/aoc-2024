import {Direction, DIRECTIONS, Point} from "../../common/point";

export class Day18 {

    private readonly _rowCount: number;
    private readonly _colCount: number;
    private _bytes: Point[];
    private _allBytes: Point[];
    private parser: Day18Parser;

    constructor(lines: string[], rowCount: number, colCount: number, maxBytes: number) {
        this._rowCount = rowCount;
        this._colCount = colCount;
        this.parser = new Day18Parser(lines);
        this._allBytes = this.parser.bytes;
        this._bytes = this.parser.bytes.slice(0, maxBytes);
    }

    solvePart1(): number {
        if (0 === this._rowCount || 0 === this._colCount)
            return 0;

        const start = new Point(0, 0);
        const end = new Point(this._rowCount - 1, this._colCount - 1);
        const {values, visited} = this.findRoute(start, end);
        const endValue = values.get(this.getId(end));
        return endValue || 0;
    }

    private findRoute(start: Point, end: Point) {
        const visited: Point[] = [];
        let counted: Point[] = [];
        const values: Map<number, number> = new Map<number, number>();
        counted.push(start);
        values.set(this.getId(start), 0);
        while (!values.get(this.getId(end)) && 0 < counted.length) {
            const next = this.getFirstCheapest(counted, values);
            visited.push(next);
            counted = counted.filter(value => !visited.some(visit => visit.isSame(value)));
            this.countNeighbours(next, counted, values, visited);
        }
        return {values, visited};
    }

    private getFirstCheapest(counted: Point[], values: Map<number, number>) {
        return counted.sort((a, b) => values.get(this.getId(a))! - values.get(this.getId(b))!)[0];
    }

    solvePart2(): string {
        if (0 === this._allBytes.length)
            return "";

        const start = new Point(0, 0);
        const end = new Point(this._rowCount - 1, this._colCount - 1);
        this._bytes = [...this._allBytes];
        let foundRoute = false;
        let lastDropped:Point | undefined = undefined;
        while (!foundRoute) {
            const route = this.findRoute(start, end);
            if (route.values.get(this.getId(end))) {
                foundRoute = true;
                break;
            }
            lastDropped = this._bytes[this._bytes.length - 1];
            this._bytes = this._bytes.slice(0, this._bytes.length - 1);
        }
        return lastDropped ? lastDropped.col + "," + lastDropped.row : "";
    }

    private getId(pos: Point) {
        return pos.row * this._colCount + pos.col;
    }

    private countNeighbours(actual: Point, counted: Point[], values: Map<number, number>, visited: Point[]) {
        const up = actual.add(DIRECTIONS[Direction.UP]);
        const left = actual.add(DIRECTIONS[Direction.LEFT]);
        const down = actual.add(DIRECTIONS[Direction.DOWN]);
        const right = actual.add(DIRECTIONS[Direction.RIGHT]);
        this.addIfValid(up, visited, counted, values, actual);
        this.addIfValid(left, visited, counted, values, actual);
        this.addIfValid(down, visited, counted, values, actual);
        this.addIfValid(right, visited, counted, values, actual);
    }

    private addIfValid(pos: Point, visited: Point[], counted: Point[], values: Map<number, number>, actual: Point) {
        if (this.isValid(pos)
            && !visited.some(value => value.isSame(pos))
            && !this._bytes.some(value => value.isSame(pos))) {
            if (!counted.some(value => value.isSame(pos)))
                counted.push(pos);
            if (!values.get(this.getId(pos)) || values.get(this.getId(actual))! + 1 < values.get(this.getId(pos))!)
                values.set(this.getId(pos), values.get(this.getId(actual))! + 1);
        }
    }

    private isValid(pos: Point) {
        return 0 <= pos.row && pos.row < this._rowCount
                && 0 <= pos.col && pos.col < this._colCount

    }
}

export class Day18Parser {
    private _bytes: Point[] = [];

    constructor(lines: string[]) {
        lines.map((line, r) => this.parseLine(line, r));
    }

    private parseLine(line: string, row: number) {
        const numberTxt = line.split(",");
        this._bytes.push(new Point(parseInt(numberTxt[1]), parseInt(numberTxt[0])));
    }

    get bytes(): Point[] {
        return this._bytes;
    }

}
