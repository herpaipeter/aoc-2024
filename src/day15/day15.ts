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
                    this.boxes.splice(this.boxes.indexOf(box), 1, newBoxPosition);
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

    overPoint(point: Point) {
        return this.start.isSame(point) || this.end.isSame(point);
    }

    overlapped(other: LargeBox) {
        return this.start.isSame(other.start) || this.end.isSame(other.start)
                || this.start.isSame(other.end) || this.end.isSame(other.end);
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
        let newPosition = this.getNewPosition(this.robot!, direction);
        if (!newPosition.isSame(this.robot)) {
            newPosition = this.moveBoxIfPresentPoint(this.robot!, direction);
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

    private getNewPositionBox(box: LargeBox, direction: Point): LargeBox {
        const newPositionStart = box.start.add(direction);
        const newPositionEnd= box.end.add(direction);
        if (!this.walls.some(value => value.isSame(newPositionStart))
            && !this.walls.some(value => value.isSame(newPositionEnd))) {
            return new LargeBox(newPositionStart, newPositionEnd);
        }
        return box;
    }

    private moveBoxIfPresentPoint(position: Point, direction: Point) {
        let newPosition = position.add(direction);
        const box = this.boxes.find(value => value.overPoint(newPosition));
        if (box) {
            let newBoxPosition = this.getNewPositionBox(box, direction);
            if (!newBoxPosition.overlapped(box)) {
                newBoxPosition = this.moveBoxIfPresentBox(box, direction);
                if (!newBoxPosition.overlapped(box)) {
                    this.boxes.splice(this.boxes.indexOf(box), 1, newBoxPosition);
                    return newPosition;
                }
                return position;
            }
            return position;
        }
        return newPosition;
    }

    private moveBoxIfPresentBox(boxPos: LargeBox, direction: Point) {
        const newPositionStart = boxPos.start.add(direction);
        const newPositionEnd= boxPos.end.add(direction);
        const newBox = new LargeBox(newPositionStart, newPositionEnd);
        // const boxes = this.boxes.filter(value => value.overlapped(newBox));
        // if (0 < boxes.length) {
        //     let newBoxPosition = boxes.map(box => this.getNewPositionBox(box, direction));
        //     if (!newBoxPosition.overlapped(box)) {
        //         newBoxPosition = this.moveBoxIfPresentBox(box, direction);
        //         if (!newBoxPosition.overlapped(box)) {
        //             this.boxes.splice(this.boxes.indexOf(box), 1, newBoxPosition);
        //             return newBox;
        //         }
        //         return boxPos;
        //     }
        //     return boxPos;
        // }
        return newBox;
    }
}
