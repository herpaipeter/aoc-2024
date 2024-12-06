import {DIRECTIONS, Point} from "../../common/point";

export class Day06 {

    private parser: Day06Parser;

    constructor(lines: string[]) {
        this.parser = new Day06Parser(lines);
    }

    solvePart1(): number {
        let pos = this.parser.getGuard();
        if (pos === undefined)
            return 0;

        let directionIndex = 0;
        let visited = new Set<number>();
        visited.add(this.getId(pos));
        while (this.isInside(pos)) {
            const next: Point = pos.add(DIRECTIONS[directionIndex]);
            if (this.isObstruction(this.parser.getObstructions(), next)) {
                directionIndex = (directionIndex + 1) % 4;
            } else {
                visited.add(this.getId(next));
                pos = next;
            }
        }
        return visited.size - 1;
    }

    private isObstruction(obstructions:Point[], next: Point) {
        return obstructions.some(value => value.isSame(next));
    }

    solvePart2(): number {
        let pos = this.parser.getGuard();
        if (pos === undefined)
            return 0;

        let visitedPos= this.calculateVisited(pos);
        let loops = 0;
        for (let visited of visitedPos) {
            const obst = [...this.parser.getObstructions(), visited];
            loops += this.isLoopMax(obst, pos, visitedPos.length) ? 1 : 0;
        }
        return loops;
    }

    private calculateVisited(start: Point) {
        let directionIndex = 0;
        let visitedPos = [start]
        let pos = start;

        while (this.isInside(pos)) {
            const direction = DIRECTIONS[directionIndex];
            const next: Point = pos.add(direction);
            if (this.isObstruction(this.parser.getObstructions(), next)) {
                directionIndex = (directionIndex + 1) % 4;
            } else {
                this.pushIfNotIn(visitedPos, next);
                pos = next;
            }
        }
        return visitedPos;
    }

    private isInside(pos: Point | undefined) {
        if (pos === undefined)
            return false;

        return 0 <= pos.row && pos.row < this.parser.rowsSize
            && 0 <= pos.col && pos.col < this.parser.colsSize;
    }

    private getId(pos: Point) {
        return pos.row * this.parser.colsSize + pos.col;
    }

    private pushIfNotIn(visitedPos: Point[], next: Point) {
        if (!this.isInside(next))
            return;
        if (!visitedPos.some(value => value.isSame(next))) {
            visitedPos.push(next);
        }
    }

    private isLoop(obst: Point[], start: Point) {
        let directionIndex = 0;
        let visitedTile = [new PathTile(start, DIRECTIONS[directionIndex])];
        let pos = start;

        while (this.isInside(pos)) {
            const direction = DIRECTIONS[directionIndex];
            const next: Point = pos.add(direction);
            if (this.isObstruction(obst, next)) {
                directionIndex = (directionIndex + 1) % 4;
            } else {
                const nextTile = new PathTile(next, direction);
                if (visitedTile.some(value => value.isSame(nextTile))) {
                    return true;
                }
                visitedTile.push(nextTile);
                pos = next;
            }
        }
        return false;
    }

    private isLoopMax(obst: Point[], start: Point, maxIterations: number) {
        let directionIndex = 0;
        let pos = start;
        let steps = 0;

        while (this.isInside(pos) && steps < 2 * maxIterations) {
            const direction = DIRECTIONS[directionIndex];
            const next: Point = pos.add(direction);
            if (this.isObstruction(obst, next)) {
                directionIndex = (directionIndex + 1) % 4;
            } else {
                steps++;
                pos = next;
            }
        }
        return steps == 2 * maxIterations;
    }
}

export class Day06Parser {

    private obstructions: Point[] = [];
    private guard: Point | undefined;
    private _rowsSize: number = 0;
    private _colsSize: number = 0;

    constructor(lines: string[]) {
        this.parseInput(lines);
    }

    private parseInput(lines: string[]) {
        this._rowsSize = lines.length;
        lines.forEach((line, index) => this.parseLine(line, index))
    }

    private parseLine(line: string, row: number) {
        this._colsSize = line.length
        for (let i = 0; i < line.length; i++) {
            if (line.charAt(i) === "#") {
                this.obstructions.push(new Point(row, i));
            } else if (line.charAt(i) === "^") {
                this.guard = new Point(row, i);
            }
        }
    }

    getObstructions(): Point[] {
        return this.obstructions;
    }

    getGuard() {
        return this.guard;
    }

    get rowsSize(): number {
        return this._rowsSize;
    }

    get colsSize(): number {
        return this._colsSize;
    }
}

class PathTile {
    position: Point;
    direction: Point;

    constructor(position: Point, direction: Point) {
        this.position = position;
        this.direction = direction;
    }

    isSame(other: PathTile) {
        return this.position.isSame(other.position) && this.direction.isSame(other.direction);
    }
}