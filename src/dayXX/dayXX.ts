export class DayXX {

    private parser: DayXXParser;

    constructor(lines: string[]) {
        this.parser = new DayXXParser(lines);
    }

    solvePart1(): number {
        return 0;
    }

    solvePart2(): number {
        return 0;
    }

}

export class DayXXParser {
    private readonly _rowCount: number = 0;
    private readonly _colCount: number = 0;

    constructor(lines: string[]) {
        this._rowCount = lines.length;
        if (0 < lines.length)
            this._colCount = lines[0].length;
        lines.map((line, r) => this.parseLine(line, r));
    }

    private parseLine(line: string, row: number) {
    }

    get rowCount(): number {
        return this._rowCount;
    }

    get colCount(): number {
        return this._colCount;
    }
}
