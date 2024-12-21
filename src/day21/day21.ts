import {Direction, DIRECTIONS, Point} from "../../common/point";

export class Day21 {
    private _lines: string[];


    constructor(lines: string[]) {
        this._lines = lines;
    }

    solvePart1(): number {
        let sum = 0;
        for (let line of this._lines) {
            const keypad1 = new NumericKeypad(line);
            let directions1 = new Set(keypad1.getDirections());
            let directions2: Set<string> = new Set();
            const keypad = new DirectionalKeypad();
            for (let direction1 of directions1) {
                const dirs2 = keypad.getDirections(direction1);
                directions2 = new Set([...directions2, ...dirs2]);
            }
            let directions3: Set<number> = new Set();
            for (let direction2 of directions2) {
                const dirs3 = keypad.getDirectionsMinSize(direction2);
                directions3 = new Set([...directions3, dirs3]);
            }
            const min = Math.min(...[...directions3.values()]);
            sum += parseInt(line.substring(0, 3)) * min;
        }
        return sum;
    }

    solvePart2(): number {
        let sum = 0;
        for (let line of this._lines) {
            const keypad1 = new NumericKeypad(line);
            let keyPadDirections = new Set(keypad1.getDirections());
            let humanDirectionSizes: Set<number> = new Set();
            const keypad = new DirectionalKeypad();
            for (let direction1 of keyPadDirections) {
                humanDirectionSizes.add(keypad.getDirectionsMinSizeOnLevel(direction1, 25));
            }
            const min = Math.min(...[...humanDirectionSizes.values()]);
            sum += parseInt(line.substring(0, 3)) * min;
        }
        return sum;
    }

}

class KeypadPosition {
    private _key: string;
    private _position: Point;

    constructor(key: string, position: Point) {
        this._key = key;
        this._position = position;
    }

    get key(): string {
        return this._key;
    }

    get position(): Point {
        return this._position;
    }
}

export class NumericKeypad {
    private readonly NUMPAD_KEYS: KeypadPosition[] = [
        new KeypadPosition("7", new Point(0,0)), new KeypadPosition("8", new Point(0,1)), new KeypadPosition("9", new Point(0,2)),
        new KeypadPosition("4", new Point(1,0)), new KeypadPosition("5", new Point(1,1)), new KeypadPosition("6", new Point(1,2)),
        new KeypadPosition("1", new Point(2,0)), new KeypadPosition("2", new Point(2,1)), new KeypadPosition("3", new Point(2,2)),
                                                 new KeypadPosition("0", new Point(3,1)), new KeypadPosition("A", new Point(3,2)),
    ];
    private readonly FORBIDDEN_POSITION = new Point(3,0);
    private readonly routeFinder: RouteFinder = new RouteFinder(this.NUMPAD_KEYS, this.FORBIDDEN_POSITION);
    private _num: string;

    constructor(num: string) {
        this._num = num;
    }

    getDirections() {
        if (0 === this._num.length)
            return [];

        let actual = "A";
        let results = [""];
        for (let c of this._num) {
            let routes = this.routeFinder.getRoutes(actual, c);
            const newResults = []
            for (let prefix of results) {
                for (let route of routes) {
                    newResults.push(prefix + route + "A");
                }
            }
            results = newResults;
            actual = c;
        }
        return results;
    }

}

export class DirectionalKeypad {
    private readonly DIRECTION_KEYS: KeypadPosition[] = [
                                                 new KeypadPosition("^", new Point(0,1)), new KeypadPosition("A", new Point(0,2)),
        new KeypadPosition("<", new Point(1,0)), new KeypadPosition("v", new Point(1,1)), new KeypadPosition(">", new Point(1,2))
    ];

    private dirMapAClosed: Map<string, string[]> = new Map<string, string[]>();
    private readonly FORBIDDEN_POSITION = new Point(0,0);
    private readonly routeFinder: RouteFinder = new RouteFinder(this.DIRECTION_KEYS, this.FORBIDDEN_POSITION);
    private dirLevelSizes: Map<string, number> = new Map<string, number>();

    constructor() {
    }

    getDirections(directions: string) {
        if (0 === directions.length)
            return [];

        if (directions[directions.length] !== "A") {
            return this.getDirectionsAClosed(directions);
        }

        let splitted = directions.split("A").filter(value => 0 < value.length).map(value => value + "A");
        splitted = 0 < splitted.length ? splitted : ["A"];
        const parts: string[][] = [];
        for (let split of splitted) {
            parts.push(this.getDirectionsAClosed(split));
        }

        return this.permutations(parts);
    }

    getDirectionsAClosed(directions: string) {
        if (this.dirMapAClosed.has(directions))
            return this.dirMapAClosed.get(directions)!

        let actual = "A";
        let results = [""];
        for (let c of directions) {
            let routes = this.routeFinder.getRoutes(actual, c);
            const newResults = []
            for (let prefix of results) {
                for (let route of routes) {
                    newResults.push(prefix + route + "A");
                }
            }
            results = newResults;
            actual = c;
        }

        this.dirMapAClosed.set(directions, results);
        return results;
    }

    private permutations(remains: string[][]) {
        if (1 < remains.length) {
            let result: string[] = [];
            for (let part of remains[0]) {
                const remainPerms = this.permutations(remains.slice(1));
                for (let remainPerm of remainPerms) {
                    result.push(part + remainPerm);
                }
            }
            return result;
        } else {
            return remains[0];
        }
    }

    getDirectionsMinSize(directions: string): number {
        if (0 === directions.length)
            return 0;

        if (directions[directions.length - 1] !== "A") {
            return Math.min(...this.getDirectionsAClosed(directions).map(value => value.length));
        }

        let splitted = directions.split("A").map(value => value + "A");
        splitted = 0 < splitted.length ? splitted.slice(0, splitted.length - 1) : ["A"];
        let size: number = 0;
        for (let split of splitted) {
            size += Math.min(...this.getDirectionsAClosed(split).map(value => value.length));
        }

        return size;
    }

    getDirectionsMinSizeOnLevel(directions: string, level: number): number {
        if (0 === directions.length)
            return 0;

        if (0 === level)
            return directions.length;

        const dirLevelKey = directions + "," + level;
        if (this.dirLevelSizes.has(dirLevelKey))
            return this.dirLevelSizes.get(dirLevelKey)!;

        let splitted = directions.split("A").map(value => value + "A");
        splitted = 0 < splitted.length ? splitted.slice(0, splitted.length - 1) : ["A"];
        let size: number = 0;
        for (let split of splitted) {
            let directionsAClosed = this.getDirectionsAClosed(split);
            size += Math.min(...directionsAClosed.map(value => this.getDirectionsMinSizeOnLevel(value, level - 1)));
        }

        this.dirLevelSizes.set(dirLevelKey, size);
        return size;
    }
}

class RouteFinder {
    private readonly _keys: KeypadPosition[];
    private readonly _forbiddenPosition: Point;

    constructor(keys: KeypadPosition[], forbiddenPosition: Point) {
        this._keys = keys;
        this._forbiddenPosition = forbiddenPosition;
    }

    getRoutes(from: string, to: string) {
        const fromPos = this.getPosition(from);
        const toPos = this.getPosition(to);
        const direction = toPos.sub(fromPos);
        return this.getRouteRQ("", fromPos, direction);
    }

    private getPosition(key: string) {
        return this._keys.find(value => value.key === key)!.position;
    }

    private getRouteRQ(prefix: string, actual: Point, direction: Point): string[] {
        let result: string[] = [];
        if (direction.row > 0) {
            const next = actual.add(DIRECTIONS[Direction.DOWN]);
            if (!next.isSame(this._forbiddenPosition))
                result.push(...this.getRouteRQ(prefix + "v", next, new Point(direction.row - 1, direction.col)));
        }
        if (direction.row < 0) {
            const next = actual.add(DIRECTIONS[Direction.UP]);
            if (!next.isSame(this._forbiddenPosition))
                result.push(...this.getRouteRQ(prefix + "^", next, new Point(direction.row + 1, direction.col)));
        }
        if (direction.col > 0) {
            const next = actual.add(DIRECTIONS[Direction.RIGHT]);
            if (!next.isSame(this._forbiddenPosition))
                result.push(...this.getRouteRQ(prefix + ">", next, new Point(direction.row, direction.col - 1)));
        }
        if (direction.col < 0) {
            const next = actual.add(DIRECTIONS[Direction.LEFT]);
            if (!next.isSame(this._forbiddenPosition))
                result.push(...this.getRouteRQ(prefix + "<", next, new Point(direction.row, direction.col + 1)));
        }
        if (direction.row == 0 && direction.col == 0) {
            result.push(prefix);
        }

        return result;
    }

}