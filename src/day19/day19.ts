import {sumNumbers} from "../../common/utils";

export class Day19 {

    private parser: Day19Parser;

    constructor(lines: string[]) {
        this.parser = new Day19Parser(lines);
    }

    solvePart1(): number {
        const matcher = new Matcher(this.parser.patterns);
        return this.parser.designs.filter(value => matcher.match(value)).length;
    }

    solvePart2(): number {
        const builder = new Builder(this.parser.patterns);
        return this.parser.designs.map(value => builder.buildCount(value)).reduce(sumNumbers, 0);
    }

}

export class Builder {
    private readonly _patterns: string[];
    private _counts: Map<string, number> = new Map<string, number>();

    constructor(patterns: string[]) {
        this._patterns = patterns;
    }

    buildCount(text: string) {
        if (this._counts.has(text)) {
            return this._counts.get(text)!;
        }

        let sum = 0;
        for (let pattern of this._patterns) {
            if (text.substring(0, pattern.length) === pattern) {
                const postfix = text.substring(pattern.length);
                if (0 === postfix.length) {
                    sum += 1;
                } else {
                    sum += this.buildCount(postfix);
                }
            }
        }

        this._counts.set(text, sum);
        return sum;
    }


}

export class Matcher {
    private readonly _patterns: string[];

    constructor(patterns: string[]) {
        this._patterns = patterns;
    }

    match(text: string) {
        if (0 === this._patterns.length)
            return false;

        let postfixes = new Set([text]);
        while (0 < postfixes.size) {
            const newPostfixes = new Set<string>();
            for (let pf of postfixes) {
                for (let pattern of this._patterns) {
                    if (pf.substring(0, pattern.length) === pattern) {
                        const postfix = pf.substring(pattern.length);
                        if (0 === postfix.length) {
                            return true;
                        }
                        newPostfixes.add(postfix);
                    }
                }
            }
            postfixes = newPostfixes;
        }
        return false;
    }
}

export class Day19Parser {
    patterns: string[] = [];
    designs: string[] = [];

    constructor(lines: string[]) {
        if (2 === lines.length) {
            this.parsePatterns(lines[0]);
            this.parseDesigns(lines[1]);
        }
    }

    private parsePatterns(text: string) {
        this.patterns = text.split(", ");
    }

    private parseDesigns(lines: string) {
        this.designs = lines.split("\n");
    }
}
