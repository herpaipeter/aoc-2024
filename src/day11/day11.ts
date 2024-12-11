import {sumNumbers} from "../../common/utils";

export class Day11 {

    private numbers: number[] = [];

    constructor(line: string) {
        if (0 < line.length)
            this.numbers = line.split(" ").map(value => parseInt(value));
    }

    solvePart1(step: number): number {
        return this.getStoneCount(step);
    }

    solvePart2(step: number): number {
        return this.getStoneCount(step);
    }

    private getStoneCount(step: number) {
        const stoner = new Stoner();
        return this.numbers.map(value => stoner.stoneCount(value, step)).reduce(sumNumbers, 0);
    }

}

export class Stoner {

    private memory: Map<number, Map<number, number>> = new Map();

    constructor() {
    }

    stoneCount(initial: number, step: number) {
        return this.stoneCountFor(initial, step);
    }

    private stoneCountFor(num: number, step: number): number {
        if (0 < step) {
            if (this.memory.has(num) && this.memory.get(num)?.has(step)) {
                return this.memory.get(num)!.get(step)!;
            }

            const nums = this.getNextNumbers(num);
            const sum = nums.map(n => this.stoneCountFor(n, step - 1)).reduce(sumNumbers, 0);
            this.storeSum(num, step, sum);
            return sum;
        }
        return 1;
    }

    private storeSum(num: number, step: number, sum: number) {
        if (!this.memory.has(num)) {
            this.memory.set(num, new Map([[step, sum]]))
        } else {
            this.memory.get(num)!.set(step, sum);
        }
    }

    getNextNumbers(number: number) {
        if (number === 0) {
            return [1];
        } else if (number.toString(10).length % 2 === 0) {
            const numStr = number.toString(10);
            return [parseInt(numStr.substring(0, numStr.length / 2)),
                parseInt(numStr.substring(numStr.length / 2))];
        } else {
            return [2024 * number];
        }
    }
}


export class Day11Parser {
    private _rowCount: number = 0;
    private _colCount: number = 0;

    constructor(lines: string[]) {
        this._rowCount = lines.length;
    }

    private parseLine(line: string, row: number) {
        this._colCount = line.length;
    }

    get rowCount(): number {
        return this._rowCount;
    }

    get colCount(): number {
        return this._colCount;
    }
}
