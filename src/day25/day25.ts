export class Day25 {

    private parser: Day25Parser;

    constructor(lines: string[]) {
        this.parser = new Day25Parser(lines);
    }

    solvePart1(): number {
        let sum = 0;
        for (let lock of this.parser.locks) {
            for (let key of this.parser.keys) {
                let fit = true;
                for (let i = 0; i < lock.length && fit; i++) {
                    if (6 <= lock[i] + key[i])
                        fit = false;
                }
                sum += fit ? 1 : 0;
            }
        }
        return sum;
    }

    solvePart2(): number {
        return 0;
    }

}

export class Day25Parser {
    private readonly _locks: number[][] = [];
    private readonly _keys: number[][] = [];

    constructor(blocks: string[]) {
        if (0 === blocks.length)
            return;

        for (let block of blocks) {
            const lines = block.split("\n");
            if (lines[0] === "#####") {
                this.parseLock(lines);
            } else {
                this.parseKey(lines);
            }
        }
    }

    private parseLine(line: string, row: number) {
    }

    get locks(): number[][] {
        return this._locks;
    }

    get keys(): number[][] {
        return this._keys;
    }

    private parseLock(lines: string[]) {
        const result = [];
        for (let c = 0; c < lines[0].length; c++) {
            let r = 0
            for (; r < lines.length; r++) {
                if (lines[r][c] === ".")
                    break;
            }
            result.push(r-1);
        }
        this._locks.push(result);
    }

    private parseKey(lines: string[]) {
        const result = [];
        for (let c = 0; c < lines[0].length; c++) {
            let r = 0
            for (; r < lines.length; r++) {
                if (lines[lines.length - 1 - r][c] === ".")
                    break;
            }
            result.push(r-1);
        }
        this._keys.push(result);
    }
}
