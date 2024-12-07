import {sumNumbers} from "../../common/utils";

export class Day07 {

    private parser: Day07Parser;

    constructor(lines: string[]) {
        this.parser = new Day07Parser(lines);
    }

    solvePart1(): number {
        return this.parser.results
            .filter((value, i) => this.isValid(value, this.parser.numbers[i]))
            .reduce(sumNumbers, 0);
    }

    solvePart2(): number {
        return this.parser.results
            .filter((value, i) => this.isValid3Way(value, this.parser.numbers[i]))
            .reduce(sumNumbers, 0);
    }

    private isValid(result: number, numbers: number[]): boolean {
        if (numbers.length === 1)
            return result === numbers[0];

        const lastNumIdx = numbers.length - 1;
        return this.isValid(result / numbers[lastNumIdx], numbers.slice(0, lastNumIdx))
                || this.isValid(result - numbers[lastNumIdx], numbers.slice(0, lastNumIdx))
    }

    private isValid3Way(result: number, numbers: number[]): boolean {
        if (numbers.length === 1)
            return result === numbers[0];

        const resStr = result.toString(10);
        const lastNumIdx = numbers.length - 1;
        const lastNumStr = numbers[lastNumIdx].toString();
        let valid = false;
        if (lastNumStr === resStr.substring(resStr.length - lastNumStr.length, resStr.length))
            valid ||= this.isValid3Way(parseInt(resStr.substring(0, resStr.length - lastNumStr.length)), numbers.slice(0, lastNumIdx));

        let divided = result / numbers[lastNumIdx];
        valid ||= divided === Math.floor(divided) && this.isValid3Way(divided, numbers.slice(0, lastNumIdx))
                  || this.isValid3Way(result - numbers[lastNumIdx], numbers.slice(0, lastNumIdx));
        return valid;
    }
}

export class Day07Parser {

    private _results: number[] = [];
    private _numbers: number[][] = [];

    constructor(lines: string[]) {
        this.parseInput(lines);
    }

    private parseInput(lines: string[]) {
        lines.map(line => this.parseLine(line));
    }

    private parseLine(line: string) {
        if (0 === line.length)
            return;
        const parts = line.split(":");
        this._results.push(parseInt(parts[0]));
        const nums= parts[1].split(" ").filter(value => 0 < value.length).map(value => parseInt(value));
        this._numbers.push(nums);
    }

    get results(): number[] {
        return this._results;
    }

    get numbers(): number[][] {
        return this._numbers;
    }
}
