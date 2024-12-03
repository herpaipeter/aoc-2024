import {sumNumbers} from "../../common/utils";

export function solvePart1(line: string): number | undefined {
    const regex = new RegExp("mul\\([0-9]*,[0-9]*\\)", "dgi");
    const result = [...line.matchAll(regex)];
    return result.map(str => multiply(str[0])).reduce(sumNumbers, 0);
}

export function solvePart2(line: string): number {
    const regex = new RegExp("mul\\([0-9]*,[0-9]*\\)|do\\(\\)|don't\\(\\)", "dgi");
    const result = [...line.matchAll(regex)];
    let doIt = true;
    let sum = 0;
    for (let res of result) {
        if (res[0].startsWith("mul") && doIt) {
            sum += multiply(res[0]);
        }
        if (res[0].startsWith("don")) {
            doIt = false;
        } else if (res[0].startsWith("do")) {
            doIt = true;
        }
    }
    return sum;
}

function multiply(str: string) {
    let parts = str.split(new RegExp("\\(|\\)|,"));
    return parseInt(parts[1]) * parseInt(parts[2]);
}
