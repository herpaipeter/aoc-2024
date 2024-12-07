import {sumNumbers} from "../../common/utils";

export class Day05 {

    private rules: Map<number, Set<number>> = new Map();
    private pageOrders: Array<number[]> = [];

    constructor(lines: string) {
        this.parseInput(lines);
    }

    parseInput(lines: string) {
        const parts = lines.split("\n\n");
        const rulesTxt = parts[0].split("\n");
        for (let rule of rulesTxt) {
            const ruleNums = rule.split("|");
            const before = parseInt(ruleNums[0]);
            const after = parseInt(ruleNums[1]);
            if (!this.rules.has(before)) {
                this.rules.set(before, new Set<number>());
            }
            this.rules.get(before)?.add(after);
        }
        const pages = parts[1].split("\n");
        for (let page of pages) {
            let pageOrder = page.split(",").map(num => parseInt(num));
            this.pageOrders.push(pageOrder);
        }
    }

    solvePart1(): number {
        return this.pageOrders
            .filter(pageOrder => this.isPassed(pageOrder))
            .map(pageOrder => this.getMiddlePage(pageOrder))
            .reduce(sumNumbers, 0);
    }

    solvePart2(): number {
        return this.pageOrders
            .filter(pageOrder => !this.isPassed(pageOrder))
            .map(pageOrder => this.order(pageOrder))
            .map(pageOrder => this.getMiddlePage(pageOrder))
            .reduce(sumNumbers, 0);
    }

    private isPassed(pageOrder: number[]) {
        let passed = true;
        for (let i = 0; i < pageOrder.length - 1 && passed; i++) {
            for (let j = i + 1; j < pageOrder.length && passed; j++) {
                if (!this.rules.get(pageOrder[i])?.has(pageOrder[j])) {
                    passed = false;
                }
            }
        }
        return passed;
    }

    private getMiddlePage(pageOrder: number[]) {
        let middle = Math.floor(pageOrder.length / 2);
        return pageOrder[middle];
    }

    private order(pageOrder: number[]) : number[] {
        let rankMap = new Map<number, number>();
        for (let i = 0; i < pageOrder.length; i++) {
            let rank = 0;
            for (let j = 0; j < pageOrder.length; j++) {
                if (i != j && this.rules.get(pageOrder[i])?.has(pageOrder[j])) {
                    rank++;
                }
            }
            rankMap.set(pageOrder[i], rank);
        }
        let ordered = [...pageOrder];
        for (let num of pageOrder) {
            ordered[pageOrder.length - 1 - rankMap.get(num)!] = num;
        }
        return ordered;
    }
}
