import {sumNumbers} from "../../common/utils";

export class Day22 {
    private initials: number[];

    constructor(lines: string[]) {
        this.initials = lines.map(value => parseInt(value));
    }

    solvePart1(): number {
        return this.initials.map(value => {
            const secret = new SecretNumber(value);
            secret.multi(2000);
            return secret.getNumber;
        }).reduce(sumNumbers, 0);
    }

    solvePart2(): number {
        const secrets: SecretNumber[] = [];
        let keys: Set<number> = new Set<number>();
        for (let num of this.initials) {
            const secret = new SecretNumber(num);
            secret.multiDiffs(2000);
            secrets.push(secret);
            keys = new Set([...keys, ...secret.diffSeqs.keys()]);
        }
        let maxSum = 0;
        for (let key of keys) {
            let sum = 0;
            for (let secret of secrets) {
                sum += secret.diffSeqs.get(key) || 0;
            }
            maxSum = Math.max(maxSum, sum);
        }
        return maxSum;
    }

}

export class SecretNumber {
    private _initial: number;

    private _diffSeqs: Map<number, number> = new Map<number, number>();

    constructor(initial: number) {
        this._initial = initial;
    }

    get getNumber(): number {
        return Number(this._initial);
    }

    get diffSeqs(): Map<number, number> {
        return this._diffSeqs;
    }

    multi(cycles: number) {
        for (let i = 0; i < cycles; i++) {
            this.next();
        }
    }

    multiDiffs(cycles: number) {
        const diffs: number[] = [];
        for (let i = 0; i < cycles; i++) {
            const before = this._initial % 10;//Number(this._initial % BigInt(10));
            this.next();
            const after = this._initial % 10; //Number(this._initial % BigInt(10));
            diffs.push(after - before);
            this.updateDiffSeqs(diffs, after);
        }
    }

    next() {
        this._initial = ((this._initial << 6) ^ this._initial) & 16777215;
        this._initial = ((this._initial >> 5) ^ this._initial) & 16777215;
        this._initial = ((this._initial << 11) ^ this._initial) & 16777215;
    }

    private updateDiffSeqs(diffs: number[], value: number) {
        if (4 <= diffs.length) {
            //const key = diffs.slice(diffs.length - 4).join();
            const key = (diffs[diffs.length - 4] + 10) * 20 * 20 * 20
                                + (diffs[diffs.length - 3] + 10) * 20 * 20
                                + (diffs[diffs.length - 2] + 10) * 20
                                + (diffs[diffs.length - 1] + 10);
            if (!this._diffSeqs.has(key)) {
                this._diffSeqs.set(key, value);
            }
        }
    }
}
