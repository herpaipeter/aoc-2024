import {Direction, DIRECTIONS, Point} from "../../common/point";
import {sumNumbers} from "../../common/utils";

export class Day20 {

    private parser: Day20Parser;

    constructor(lines: string[]) {
        this.parser = new Day20Parser(lines);
    }

    solvePart1(threshold: number): number {
        if (this.parser.start && this.parser.end) {
            const endState = this.findPathOptimal(this.parser.start, this.parser.end);
            if (endState) {
                const shortCuts = this.findShortCuts(endState.route);
                return shortCuts.filter(value => threshold <= value).length;
            }
        }
        return 0;
    }

    solvePart2(threshold: number): number {
        if (this.parser.start && this.parser.end) {
            const endState = this.findPathOptimal(this.parser.start, this.parser.end);
            if (endState) {
                const shortCuts = this.findShortCutsWithDistance(endState.route, 20);
                return [...shortCuts.entries()]
                    .filter(value => threshold <= value[0])
                    .map(value => value[1]).reduce(sumNumbers, 0);
            }
        }
        return 0;
    }

    private findPathOptimal(start: Point, end: Point) {
        let states: PathState[] = [new PathState(start, 0, [start])];
        let visited: Map<number, PathState> = new Map;
        let foundEnd = false;
        while (0 < states.length && !foundEnd) {
            states.sort((a, b) => a.value - b.value);
            const less = states.splice(0, 1)[0];
            states.push(...this.findNextsNotVisited(less, visited));
            visited.set(this.getId(less.position), less);
            if (less.position.isSame(end)) {
                foundEnd = true;
            }
        }
        return visited.get(this.getId(end));
    }

    private findPathOptimalStoreMinimal(start: Point, end: Point) {
        let states: Map<number, PathState> = new Map;
        states.set(this.getId(start), new PathState(start, 0, [start]));
        let visited: Map<number, PathState> = new Map;
        let foundEnd = false;
        while (!foundEnd) {
            const sorted = [...states.values()].sort((a, b) => a.value - b.value);
            const less = sorted[0];
            states.delete(this.getId(less.position));
            this.addNextsNotVisited(less, visited, states);
            visited.set(this.getId(less.position), less);
            if (less.position.isSame(end)) {
                foundEnd = true;
            }
        }
        return visited.get(this.getId(end));
    }

    private getId(p: Point) {
        return p.row * this.parser.colCount + p.col;
    }

    private findNextsNotVisited(state: PathState, visited: Map<number, PathState>) {
        const states: PathState[] = [];
        this.addValidNextNotVisited(states, visited, state, DIRECTIONS[Direction.UP]);
        this.addValidNextNotVisited(states, visited, state, DIRECTIONS[Direction.RIGHT]);
        this.addValidNextNotVisited(states, visited, state, DIRECTIONS[Direction.DOWN]);
        this.addValidNextNotVisited(states, visited, state, DIRECTIONS[Direction.LEFT]);
        return states;
    }

    private addValidNextNotVisited(states: PathState[], visited: Map<number, PathState>, state: PathState, direction: Point) {
        const next = state.position.add(direction);
        if (this.isNotWall(next) && !visited.has(this.getId(next))) {
            states.push(new PathState(next, state.value + 1, [...state.route, next]));
        }
    }

    private isNotWall(pos: Point) {
        return !this.parser.maze.some(value => value.isSame(pos));
    }

    private isWall(pos: Point) {
        return this.parser.maze.some(value => value.isSame(pos));
    }

    private findShortCuts(route: Point[]) {
        const lengths: number[] = [];
        for (let p of route) {
            lengths.push(...this.getShortCutsLength(p, route));
        }
        return lengths;
    }

    private findShortCutsWithDistance(route: Point[], maxShortCut: number) {
        const lengths: Map<number, number> = new Map<number, number>();
        const indices: Map<Point, number> = new Map<Point, number>();
        for (let i = 0; i < route.length; i++) {
            indices.set(route[i], route.findIndex(value => value.isSame(route[i])));
        }
        for (let i = 0; i < route.length; i++) {
            const pointIndex = indices.get(route[i])!;
            for (let j = i + 4; j < route.length; j++) {
                const otherIndex = indices.get(route[j])!;
                const distance = Point.distanceManhattan(route[i], route[j]);
                if (distance < otherIndex - pointIndex && distance <= maxShortCut) {
                    const shortCut = otherIndex - pointIndex - distance;
                    const actCount = lengths.get(shortCut);
                    lengths.set(shortCut, (actCount || 0) + 1);
                }
            }
        }
        return lengths;
    }

    private getShortCutsLength(point: Point, route: Point[]) {
        const pointIndex = route.findIndex(value => value.isSame(point));
        const length: number[] = []
        const upShort = this.isShortCut(point, pointIndex, route, DIRECTIONS[Direction.UP]);
        if (0 < upShort) {
            length.push(upShort);
        }
        const rightShort = this.isShortCut(point, pointIndex, route, DIRECTIONS[Direction.RIGHT]);
        if (0 < rightShort) {
            length.push(rightShort);
        }
        const downShort = this.isShortCut(point, pointIndex, route, DIRECTIONS[Direction.DOWN]);
        if (0 < downShort) {
            length.push(downShort);
        }
        const leftShort = this.isShortCut(point, pointIndex, route, DIRECTIONS[Direction.LEFT]);
        if (0 < leftShort) {
            length.push(leftShort);
        }
        return length;
    }

    private isShortCut(point: Point, pointIndex: number, route: Point[], direction: Point) {
        const wall = point.add(direction);
        const otherPoint = point.add(direction.multi(2));
        if (this.isWall(wall) && route.some(value => value.isSame(otherPoint))) {
            const otherIndex = route.findIndex(value => value.isSame(otherPoint));
            if (pointIndex < otherIndex) {
                return otherIndex - pointIndex - 2;
            }
        }
        return 0;
    }

    private findCheapest(states: PathState[]) {
        let minValue = Number.MAX_SAFE_INTEGER;
        let index = states.length;
        let pathState: PathState | undefined = undefined;
        for (let i = 0; i < states.length; i++) {
            if (states[i].value < minValue) {
                minValue = states[i].value;
                index = i;
                pathState = states[i];
            }
        }
        return {index, pathState};
    }

    private addNextsNotVisited(state: PathState, visited: Map<number, PathState>, states: Map<number, PathState>) {
        this.addValidNextNotVisitedMinimal(states, visited, state, DIRECTIONS[Direction.UP]);
        this.addValidNextNotVisitedMinimal(states, visited, state, DIRECTIONS[Direction.RIGHT]);
        this.addValidNextNotVisitedMinimal(states, visited, state, DIRECTIONS[Direction.DOWN]);
        this.addValidNextNotVisitedMinimal(states, visited, state, DIRECTIONS[Direction.LEFT]);
    }

    private addValidNextNotVisitedMinimal(states: Map<number, PathState>, visited: Map<number, PathState>, state: PathState, direction: Point) {
        const next = state.position.add(direction);
        const nextId = this.getId(next);
        if (this.isNotWall(next) && !visited.has(nextId)
            && (!states.has(nextId) || state.value + 1 < states.get(nextId)!.value)) {
            const nextState = new PathState(next, state.value + 1, [...state.route, next]);
            states.set(nextId, nextState);
        }
    }
}

export class PathState {
    private _position: Point;
    private _value: number;
    private _route: Point[];

    constructor(position: Point, value: number, route: Point[]) {
        this._position = position;
        this._value = value;
        this._route = route;
    }

    get position(): Point {
        return this._position;
    }

    get value(): number {
        return this._value;
    }

    get route(): Point[] {
        return this._route;
    }
}

export class Day20Parser {
    private readonly _rowCount: number = 0;
    private readonly _colCount: number = 0;

    private _maze: Point[] = [];
    private _start: Point | undefined;
    private _end: Point | undefined;

    constructor(lines: string[]) {
        this._rowCount = lines.length;
        if (0 < lines.length)
            this._colCount = lines[0].length;
        lines.map((line, r) => this.parseLine(line, r));
    }

    private parseLine(line: string, row: number) {
        for (let c = 0; c < line.length; c++) {
            if (line[c] === "#") {
                this._maze.push(new Point(row, c));
            } else if (line[c] === "S") {
                this._start = new Point(row, c);
            } else if (line[c] === "E") {
                this._end = new Point(row, c);
            }
        }
    }

    get maze(): Point[] {
        return this._maze;
    }

    get start(): Point | undefined {
        return this._start;
    }

    get end(): Point | undefined {
        return this._end;
    }

    get rowCount(): number {
        return this._rowCount;
    }

    get colCount(): number {
        return this._colCount;
    }
}
