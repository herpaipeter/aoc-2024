import {Point} from "../../common/point";

type Calculator = (point1: Point, point2: Point, antinodes: Point[]) => void;

export class Day08 {

    private parser: Day08Parser;

    constructor(lines: string[]) {
        this.parser = new Day08Parser(lines);
    }

    solvePart1(): number {
        const antennas = this.parser.antennas.entries();
        return this.iterateAntennas(antennas, this.calculateAntinodes.bind(this)).length;
    }

    private calculateAntinodes(point1: Point, point2: Point, antinodes: Point[]) {
        const dist = point1.sub(point2);
        this.addAntinode(antinodes, point1.add(dist));
        this.addAntinode(antinodes, point2.sub(dist));
    }

    solvePart2(): number {
        const antennas = this.parser.antennas.entries();
        return this.iterateAntennas(antennas, this.calculateAllAntinodes.bind(this)).length;
    }

    private calculateAllAntinodes(point1: Point, point2: Point, antinodes: Point[]) {
        const dist = point1.sub(point2);
        let next = point1;
        while (this.isInside(next)) {
            this.addAntinode(antinodes, next);
            next = next.add(dist);
        }
        next = point2;
        while (this.isInside(next)) {
            this.addAntinode(antinodes, next);
            next = next.sub(dist);
        }
    }

    private iterateAntennas(antennas: MapIterator<[string, Point[]]>, calculator: Calculator) {
        let antinodes: Point[] = []
        for (const antenna of antennas) {
            const points = antenna[1];
            for (let i = 0; i < points.length - 1; i++) {
                for (let j = i + 1; j < points.length; j++) {
                    calculator(points[i], points[j], antinodes);
                }
            }
        }
        return antinodes;
    }

    private addAntinode(antinodes: Point[], point: Point) {
        if (this.isInside(point)
            && !antinodes.some(value => value.isSame(point))) {
            antinodes.push(point);
        }
    }

    private isInside(point: Point) {
        return 0 <= point.row && point.row < this.parser.rowCount
            && 0 <= point.col && point.col < this.parser.colCount;
    }
}

export class Day08Parser {
    private _antennas: Map<string, Point[]> = new Map<string, Point[]>();
    private _rowCount: number = 0;
    private _colCount: number = 0;

    constructor(lines: string[]) {
        this._rowCount = lines.length;
        lines.map((line, r) => this.parseLine(line, r));
    }

    private parseLine(line: string, row: number) {
        this._colCount = line.length;
        for (let c = 0; c < line.length; c++) {
            const id = line[c];
            if (id !== ".") {
                const position = new Point(row, c);
                if (this.antennas.has(id)) {
                    const points = [... this.antennas.get(id)!, position];
                    this.antennas.set(id, points);
                } else {
                    this.antennas.set(id, [position]);
                }
            }
        }
    }

    get antennas(): Map<string, Point[]> {
        return this._antennas;
    }

    get rowCount(): number {
        return this._rowCount;
    }

    get colCount(): number {
        return this._colCount;
    }
}
