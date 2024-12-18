import {Point} from "../../common/point";
import {sumNumbers} from "../../common/utils";

export class Day15 {

    private parser: Day15Parser | undefined;

    constructor(blocks: string[]) {
        if (2 === blocks.length)
            this.parser = new Day15Parser(blocks);
    }

    solvePart1(): number {
        if (this.parser) {
            const wh = this.parser.warehouse;
            for (let move of this.parser.movements!) {
                wh?.moveRobot(move);
            }
            if (wh?.boxes) {
                return wh.boxes.map(value => 100 * value.row + value.col).reduce(sumNumbers, 0);
            }
        }
        return 0;
    }

    solvePart2(): number {
        if (this.parser) {
            const wh = this.parser.warehouse;
            if (wh) {
                const largeBoxes = wh.boxes
                    .map(value => new LargeBox(new Point(value.row, 2 * value.col), new Point(value.row, 2 * value.col + 1)));
                const walls = wh.walls
                    .map(value => [new Point(value.row, 2 * value.col), new Point(value.row, 2 * value.col + 1)])
                    .reduce((prev, curr) => [...prev, ...curr]);
                const robot = new Point(wh.robot!.row, 2 * wh.robot!.col);
                const lwh = new LargeWarehouse(walls, largeBoxes, robot);
                for (let move of this.parser.movements!) {
                    lwh.moveRobot(move);
                }
                return lwh.boxes.map(value => 100 * value.start.row + value.start.col).reduce(sumNumbers, 0);
            }
        }
        return 0;
    }

}

export class Warehouse {
    private _walls: Point[];
    private _boxes: Point[];
    private _robot: Point | undefined;

    constructor(walls: Point[], boxes: Point[], robot: Point | undefined) {
        this._walls = walls;
        this._boxes = boxes;
        this._robot = robot;
    }

    get walls(): Point[] {
        return this._walls;
    }

    get boxes(): Point[] {
        return this._boxes;
    }

    get robot(): Point | undefined {
        return this._robot;
    }

    moveRobot(direction: Point) {
        let newPosition = this.getNewPosition(this.robot!, direction);
        if (!newPosition.isSame(this.robot)) {
            newPosition = this.moveBoxIfPresent(this.robot!, direction);
            this._robot = newPosition;
        }
    }

    private getNewPosition(position: Point, direction: Point): Point {
        const newPosition = position.add(direction);
        if (!this.walls.some(value => value.isSame(newPosition))) {
            return newPosition;
        }
        return position;
    }

    private moveBoxIfPresent(position: Point, direction: Point) {
        let newPosition = position.add(direction);
        const box = this.boxes.find(value => value.isSame(newPosition));
        if (box) {
            let newBoxPosition = this.getNewPosition(box, direction);
            if (!newBoxPosition.isSame(box)) {
                newBoxPosition = this.moveBoxIfPresent(box, direction);
                if (!newBoxPosition.isSame(box)) {
                    this.boxes[this.boxes.indexOf(box)] = newBoxPosition;
                    return newPosition;
                }
                return position;
            }
            return position;
        }
        return newPosition;
    }
}

export class Day15Parser {
    private _warehouse: Warehouse | undefined;
    private _movements: Point[] = [];

    constructor(blocks: string[]) {
        this.parseWarehouse(blocks[0]);
        this.parseMovements(blocks[1]);
    }

    private parseWarehouse(warehouseStr: string) {
        const walls = [];
        const boxes = [];
        let robot: Point | undefined;
        const lines = warehouseStr.split("\n");
        for (let r = 0; r < lines.length; r++) {
            for (let c = 0; c < lines[r].length; c++) {
                const position = new Point(r, c);
                if (lines[r][c] === "#") {
                    walls.push(position);
                } else if (lines[r][c] === "O") {
                    boxes.push(position);
                } else if (lines[r][c] === "@") {
                    robot = position;
                }
            }
        }
        this._warehouse = new Warehouse(walls, boxes, robot);
    }

    private parseMovements(movementsStr: string) {
        for (let i = 0; i < movementsStr.length; i++) {
            if (movementsStr[i] === "^") {
                this._movements.push(new Point(-1, 0));
            } else if (movementsStr[i] === ">") {
                this._movements.push(new Point(0, 1));
            } else if (movementsStr[i] === "v") {
                this._movements.push(new Point(1, 0));
            } else if (movementsStr[i] === "<") {
                this._movements.push(new Point(0, -1));
            }
        }
    }

    get warehouse(): Warehouse | undefined {
        return this._warehouse;
    }

    get movements(): Point[] | undefined {
        return this._movements;
    }
}


export class LargeBox {
    private _start: Point;
    private _end: Point;

    constructor(start: Point, end: Point) {
        this._start = start;
        this._end = end;
    }

    get start(): Point {
        return this._start;
    }

    get end(): Point {
        return this._end;
    }

    isPointCollision(point: Point) {
        return this.start.isSame(point) || this.end.isSame(point);
    }

    isBoxCollision(other: LargeBox) {
        return this.start.isSame(other.start) || this.end.isSame(other.start)
                || this.start.isSame(other.end) || this.end.isSame(other.end);
    }

    add(direction: Point) {
        return new LargeBox(this.start.add(direction), this.end.add(direction));
    }
}

export class LargeWarehouse {
    private _walls: Point[];
    private _boxes: LargeBox[];
    private _robot: Point | undefined;

    constructor(walls: Point[], boxes: LargeBox[], robot: Point | undefined) {
        this._walls = walls;
        this._boxes = boxes;
        this._robot = robot;
    }

    get walls(): Point[] {
        return this._walls;
    }

    get boxes(): LargeBox[] {
        return this._boxes;
    }

    get robot(): Point | undefined {
        return this._robot;
    }

    moveRobot(direction: Point) {
        const newPos = this.robot!.add(direction);
        if (this.isNotWallCollosion(newPos)) {
            const boxMoves: Map<LargeBox, LargeBox> = new Map<LargeBox, LargeBox>();
            let boxes = this.getCollisionBoxes(newPos);
            let canMove = true;
            while(0 < boxes.length && canMove) {
                const newBoxMoves: Map<LargeBox, LargeBox> = new Map<LargeBox, LargeBox>();
                boxes.forEach(value => newBoxMoves.set(value, value.add(direction)));
                canMove = ![...newBoxMoves.values()].some(value => !this.isNotWallCollosion(value.start) || !this.isNotWallCollosion(value.end));
                newBoxMoves.forEach((value, key) => boxMoves.set(key, value));
                boxes = this.getBoxCollisionBoxes(newBoxMoves);
            }
            if (canMove) {
                this._robot = newPos;
                boxMoves.forEach((value, key) => this.boxes[this.boxes.indexOf(key)] = value);
            }
        }
    }

    private isNotWallCollosion(position: Point): boolean {
        return !this.walls.some(value => value.isSame(position));
    }

    private getCollisionBoxes(position: Point) {
        return this.boxes.filter(value => value.isPointCollision(position));
    }

    private getBoxCollisionBoxes(boxes: Map<LargeBox, LargeBox>) {
        return this.boxes.filter(value => [...boxes.entries()].some(b => b[0] !== value && b[1].isBoxCollision(value)));
    }

}
