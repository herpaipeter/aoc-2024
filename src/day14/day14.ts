import {Point} from "../../common/point";

export class Day14 {

    private parser: Day14Parser;
    private _cicle: number;

    constructor(lines: string[], rowCount: number, colCount: number, cicle: number) {
        this._cicle = cicle;
        this.parser = new Day14Parser(lines, rowCount, colCount);
    }

    solvePart1(): number {
        let endRobots = this.getNewPositions(this.parser.robots, this._cicle);
        let upLeft = 0;
        let downLeft = 0;
        let upRight = 0;
        let downRight = 0;
        let endPositions = endRobots.map(value => value.position);
        for (let position of endPositions) {
            if (position.row < Math.floor(this.parser.rowCount / 2)) {
                if (position.col < Math.floor(this.parser.colCount / 2)) {
                    upLeft++
                } else if (position.col > Math.floor(this.parser.colCount / 2)) {
                    downLeft++
                }
            } else if (position.row > Math.floor(this.parser.rowCount / 2)) {
                if (position.col < Math.floor(this.parser.colCount / 2)) {
                    upRight++
                } else if (position.col > Math.floor(this.parser.colCount / 2)) {
                    downRight++
                }
            }
        }
        return upLeft * downLeft * upRight * downRight;
    }

    private getNewPositions(robots: Robot[], steps: number) {
        let endPositions = [];
        for (let robot of robots) {
            const position = robot.position.add(robot.velocity.multi(steps));
            const row = position.row % this.parser.rowCount;
            const col = position.col % this.parser.colCount;
            endPositions.push(new Robot(new Point(row < 0 ? this.parser.rowCount + row : row, col < 0 ? this.parser.colCount + col : col), robot.velocity));
        }
        return endPositions;
    }

    solvePart2(): number {
        let endPositions = this.parser.robots;
        let i = 1;
        for (; i < 1000000000000; i++) {
            endPositions = this.getNewPositions(endPositions, 1);
            if (this.isInBlock(endPositions)) {
                this.logRobots(endPositions, i);
                break;
            }
        }
        return i;
    }

    private logRobots(endPositions: Robot[], i: number) {
        endPositions.sort((a, b) => a.position.row === b.position.row ? a.position.col - b.position.col : a.position.row - b.position.row);
        let lastRow = 0;
        let lastCol = 0;
        let log = i.toString(10) + ": ===========================\n";
        for (let p of endPositions) {
            if (lastRow !== p.position.row) {
                log += "\n".repeat(p.position.row - lastRow);
                lastRow = p.position.row;
                lastCol = 0;
            }
            const colDiff = p.position.col - lastCol;
            if (0 < colDiff) {
                if (1 < colDiff) {
                    log += " ".repeat(colDiff - 1);
                }
                log += "#";
            }
            lastCol = p.position.col;
        }
        console.log(log);
    }

    private isInBlock(endPositions: Robot[]) {
        endPositions.sort((a, b) => a.position.row === b.position.row ? a.position.col - b.position.col : a.position.row - b.position.row);
        let lastRow = 0;
        let lastCol = 0;
        let conti = 0;
        let contiRows: number[] = []
        for (let p of endPositions) {
            if (lastRow !== p.position.row) {
                contiRows.push(conti);
                conti = 0;
            }
            if (lastRow === p.position.row && lastCol === p.position.col - 1) {
                conti++;
            }
            lastRow = p.position.row;
            lastCol = p.position.col;
        }
        return 5 < contiRows.filter(value => 10 < value).length;
    }
}

export class Day14Parser {
    private readonly _rowCount: number = 0;
    private readonly _colCount: number = 0;
    private _robots: Robot[] = [];

    constructor(lines: string[], rowCount: number, colCount: number) {
        this._rowCount = rowCount;
        this._colCount = colCount;
        lines.map((line) => this.parseLine(line));
    }

    private parseLine(line: string) {
        const svTxt = line.split(" ");
        const speedTxt = svTxt[0].split("=");
        const velTxt = svTxt[1].split("=");
        const sCoords = speedTxt[1].split(",");
        const vCoords = velTxt[1].split(",");
        this._robots.push(
            new Robot(new Point(parseInt(sCoords[1]), parseInt(sCoords[0])),
                new Point(parseInt(vCoords[1]), parseInt(vCoords[0]))))
    }

    get robots(): Robot[] {
        return this._robots;
    }

    get rowCount(): number {
        return this._rowCount;
    }

    get colCount(): number {
        return this._colCount;
    }
}

export class Robot {
    private _position: Point;
    private _velocity: Point;

    constructor(position: Point, velocity: Point) {
        this._position = position;
        this._velocity = velocity;

    }

    get position(): Point {
        return this._position;
    }

    get velocity(): Point {
        return this._velocity;
    }
}

