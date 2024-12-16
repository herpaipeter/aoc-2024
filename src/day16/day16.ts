import {Direction, DIRECTIONS, Point} from "../../common/point";

export class Day16 {

    private parser: Day16Parser;

    constructor(lines: string[]) {
        this.parser = new Day16Parser(lines);
    }

    solvePart1(): number {
        if (this.parser.start) {
            return this.findPath(new MazeState(this.parser.start, DIRECTIONS[Direction.RIGHT], 0));
        }
        return 0;
    }

    solvePart2(): number {
        if (this.parser.start) {
            return this.findPathWithRoute(new MazeState(this.parser.start, DIRECTIONS[Direction.RIGHT], 0));
        }
        return 0;
    }

    private findPath(start: MazeState) {
        let states: MazeState[] = [start];
        let visited: Map<number, number> = new Map;
        let endStates: MazeState[] = [];
        visited.set(this.getId(start.position), 0);
        while (0 < states.length) {
            const newStates: MazeState[] = [];
            for (let state of states) {
                newStates.push(...this.findNexts(state));
            }
            endStates.push(...newStates.filter(value => value.position.isSame(this.parser.end)));

            states = [];
            newStates.sort((a, b) => a.score - b.score);
            for (let state of newStates) {
                const id = this.getId(state.position);
                const visitedValue = visited.get(id);
                if (!visitedValue || state.score < visitedValue) {
                    visited.set(id, state.score);
                    states.push(state);
                }
            }
        }
        return Math.min(...endStates.map(value => value.score));
    }

    private findPathWithRoute(start: MazeState) {
        const minScore = this.findPath(start);
        let routes: MazeRoute[] = [new MazeRoute(start, new Set([this.getId(start.position)]))];
        let visited: Map<number, number> = new Map;
        let endRoutes: MazeRoute[] = [];
        visited.set(this.getId(start.position), 0);
        while (0 < routes.length) {
            const newRoutes: MazeRoute[] = [];
            for (let route of routes) {
                for (let state of this.findNexts(route.state)) {
                    const posId = this.getId(state.position);
                    if (!route.route.has(posId)) {
                        newRoutes.push(new MazeRoute(state, new Set([...route.route, posId])));
                    }
                }
            }
            endRoutes.push(...newRoutes.filter(value => value.state.position.isSame(this.parser.end)));

            const notEndRoute = newRoutes.filter(value => !value.state.position.isSame(this.parser.end));
            routes = [];
            for (let route of notEndRoute) {
                if (route.state.score <= minScore) {
                    const id = this.getId(route.state.position);
                    const visitedValue = visited.get(id);
                    if (!visitedValue || route.state.score < visitedValue) {
                        visited.set(id, route.state.score);
                        routes.push(route);
                    } else if (visitedValue && route.state.score < visitedValue + 1001) {
                        routes.push(route);
                    }
                }
            }
        }
        const lessScore = Math.min(...endRoutes.map(value => value.state.score));
        const routeIds = endRoutes.filter(value => value.state.score === lessScore)
            .map(value => value.route).reduce((prev, curr) => new Set([...prev, ...curr]));
        return routeIds.size;
    }

    private getId(p: Point) {
        return p.row * this.parser.colCount + p.col;
    }

    private findNexts(state: MazeState) {
        const states: MazeState[] = [];
        if (state.direction.isSame(DIRECTIONS[Direction.RIGHT])) {
            this.addValidNext(states, state, DIRECTIONS[Direction.RIGHT], false);
            this.addValidNext(states, state, DIRECTIONS[Direction.UP], true);
            this.addValidNext(states, state, DIRECTIONS[Direction.DOWN], true);
        } else if (state.direction.isSame(DIRECTIONS[Direction.DOWN])) {
            this.addValidNext(states, state, DIRECTIONS[Direction.DOWN], false);
            this.addValidNext(states, state, DIRECTIONS[Direction.LEFT], true);
            this.addValidNext(states, state, DIRECTIONS[Direction.RIGHT], true);
        } else if (state.direction.isSame(DIRECTIONS[Direction.LEFT])) {
            this.addValidNext(states, state, DIRECTIONS[Direction.LEFT], false);
            this.addValidNext(states, state, DIRECTIONS[Direction.UP], true);
            this.addValidNext(states, state, DIRECTIONS[Direction.DOWN], true);
        } else if (state.direction.isSame(DIRECTIONS[Direction.UP])) {
            this.addValidNext(states, state, DIRECTIONS[Direction.UP], false);
            this.addValidNext(states, state, DIRECTIONS[Direction.LEFT], true);
            this.addValidNext(states, state, DIRECTIONS[Direction.RIGHT], true);
        }
        return states;
    }

    private addValidNext(states: MazeState[], state: MazeState, direction: Point, turn: boolean) {
        const next = state.position.add(direction);
        if (this.isNotWall(next)) {
            states.push(new MazeState(next, direction, state.score + (turn ? 1001 : 1)));
        }
    }

    private isNotWall(pos: Point) {
        return !this.parser.maze.some(value => value.isSame(pos));
    }
}

export class MazeRoute {
    private _state: MazeState;
    private _route: Set<number>;

    constructor(state: MazeState, route: Set<number>) {
        this._state = state;
        this._route = route;
    }

    get state(): MazeState {
        return this._state;
    }

    get route(): Set<number> {
        return this._route;
    }
}

export class MazeState {
    private _position: Point;
    private _direction: Point;
    private _score: number;

    constructor(position: Point, direction: Point, score: number) {
        this._position = position;
        this._direction = direction;
        this._score = score;
    }

    get position(): Point {
        return this._position;
    }

    get direction(): Point {
        return this._direction;
    }

    get score(): number {
        return this._score;
    }
}

export class Day16Parser {
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
