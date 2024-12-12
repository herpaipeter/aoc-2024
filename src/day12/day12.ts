import {Direction, DIRECTIONS, Point} from "../../common/point";
import {sortReverse, sumNumbers} from "../../common/utils";

export class Day12 {

    private parser: RangeParser;

    constructor(lines: string[]) {
        this.parser = new RangeParser(lines);
    }

    solvePart1(): number {
        return this.parser.ranges.map(value => value.area * value.perimeter).reduce(sumNumbers, 0);
    }

    solvePart2(): number {
        return this.parser.ranges.map(value => value.area * value.sides).reduce(sumNumbers, 0);
    }

}

export class RangeParser {
    private _rowCount: number = 0;
    private _colCount: number = 0;
    private _ids: string[] = [];
    private _ranges: FieldRange[] = [];

    constructor(lines: string[]) {
        this._rowCount = lines.length;
        this._ids = lines;
        if (0 < lines.length)
            this._colCount = lines[0].length;
        this.parseRange();
    }

    get rowCount(): number {
        return this._rowCount;
    }

    get colCount(): number {
        return this._colCount;
    }

    get ids(): string[] {
        return this._ids;
    }

    get ranges(): FieldRange[] {
        return this._ranges;
    }

    private parseRange() {
        for (let r = 0; r < this.rowCount; r++) {
            for (let c = 0; c < this.colCount; c++) {
                const location = new Point(r, c);
                const borders = this.getBorderCount(this.ids[r][c], location);
                this.addToRange(this.ids[r][c], location, borders);
            }
        }
    }

    private getBorderCount(id: string, location: Point) {
        let borders = 4;
        for (let d of DIRECTIONS) {
            const neighbour = location.add(d);
            if (this.isInside(neighbour) && id === this._ids[neighbour.row][neighbour.col]) {
                borders--;
            }
        }
        return borders;
    }

    private isInside(pos: Point) {
        return 0 <= pos.row && pos.row < this._rowCount
            && 0 <= pos.col && pos.col < this._colCount;
    }

    private addToRange(id: string, position: Point, borders: number) {
        const neighbours = this.getSameNeighbourRanges(id, position);
        if (0 < neighbours.size) {
            const merged = [...neighbours.values()].reduce((a, b) => a.mergeRange(b));
            merged.addField(position, borders);
            [...neighbours.keys()].sort(sortReverse).forEach(value => this.ranges.splice(value, 1));
            this._ranges.push(merged);
        } else {
            this._ranges.push(new FieldRange(id, 1, borders, [position]))
        }
    }

    private getSameNeighbourRanges(id: string, position: Point) {
        const neighbours: Map<number, FieldRange> = new Map();
        for (let i = 0; i < this.ranges.length; i++) {
            if (this.ranges[i].id === id && this.ranges[i].fields.some(pos => this.isNeighbour(pos, position))) {
                neighbours.set(i, this.ranges[i]);
            }
        }
        return neighbours;
    }

    private isNeighbour(pos1: Point, pos2: Point) {
        for (let d of DIRECTIONS) {
            if (pos1.isSame(pos2.add(d))) {
                return true;
            }
        }
        return false;
    }
}

export class FieldRange {
    private _id: string;
    private _area: number;
    private _perimeter: number;
    private _fields: Point[] = [];

    constructor(id: string, area: number, perimeter: number, fields: Point[]) {
        this._id = id;
        this._area = area;
        this._perimeter = perimeter;
        this._fields = fields;
    }

    get area(): number {
        return this._area;
    }

    get perimeter(): number {
        return this._perimeter;
    }

    get id(): string {
        return this._id;
    }

    get fields(): Point[] {
        return this._fields;
    }

    get sides(): number {
        return new SideCounter(this.fields).getSides();
    }

    addField(position: Point, borders: number) {
        this._area++;
        this._perimeter += borders;
        this._fields.push(position);
    }

    mergeRange(other: FieldRange) {
        let newFields = [...this._fields];
        newFields.push(...other._fields);
        return new FieldRange(this.id, this.area + other.area, this.perimeter + other.perimeter, newFields);
    }
}

export class SideCounter {

    private readonly _fields: Point[];

    constructor(fields: Point[]) {
        this._fields = fields;
    }

    getSides() {
        let sumOuter = 0;
        let sumInner = 0;
        for (let f of this._fields) {
            const cornerCount = this.getCorners(f);
            sumOuter += cornerCount.outer;
            sumInner += cornerCount.inner;
        }
        return sumOuter + sumInner / 3;
    }

    private getCorners(f: Point) {
        const up = !this._fields.some(p => p.isSame(f.add(DIRECTIONS[Direction.UP])));
        const upLeft = !this._fields.some(p => p.isSame(f.add(DIRECTIONS[Direction.UP].add(DIRECTIONS[Direction.LEFT]))));
        const left = !this._fields.some(p => p.isSame(f.add(DIRECTIONS[Direction.LEFT])));
        const leftDown = !this._fields.some(p => p.isSame(f.add(DIRECTIONS[Direction.LEFT].add(DIRECTIONS[Direction.DOWN]))));
        const down = !this._fields.some(p => p.isSame(f.add(DIRECTIONS[Direction.DOWN])));
        const downRight = !this._fields.some(p => p.isSame(f.add(DIRECTIONS[Direction.DOWN].add(DIRECTIONS[Direction.RIGHT]))));
        const right = !this._fields.some(p => p.isSame(f.add(DIRECTIONS[Direction.RIGHT])));
        const rightUp = !this._fields.some(p => p.isSame(f.add(DIRECTIONS[Direction.RIGHT].add(DIRECTIONS[Direction.UP]))));
        const outerCorner = (up && left ? 1 : 0)
                                    + (left && down ? 1 : 0)
                                    + (down && right ? 1 : 0)
                                    + (right && up ? 1 : 0);
        const innerCorner = (up && !upLeft && !left || !up && upLeft && !left || !up && !upLeft && left ? 1 : 0)
            + (left && !leftDown && !down || !left && leftDown && !down || !left && !leftDown && down ? 1 : 0)
            + (down && !downRight && !right || !down && downRight && !right || !down && !downRight && right ? 1 : 0)
            + (right && !rightUp && !up || !right && rightUp && !up || !right && !rightUp && up ? 1 : 0);
        return new CornerCount(outerCorner, innerCorner);
    }
}

class CornerCount {
    private readonly _outer: number;
    private readonly _inner: number;

    constructor(outer: number, inner: number) {
        this._outer = outer;
        this._inner = inner;
    }

    get outer(): number {
        return this._outer;
    }

    get inner(): number {
        return this._inner;
    }
}