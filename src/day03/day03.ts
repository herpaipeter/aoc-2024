import {getMatches, sumNumbers} from "../../common/utils";

export function solvePart1(line: string): number | undefined {
    const result = getMatches(line, "mul\\([0-9]*,[0-9]*\\)");
    return result.map(str => multiply(str)).reduce(sumNumbers, 0);
}

export function solvePart2(line: string): number {
    const result = getMatches(line, "mul\\([0-9]*,[0-9]*\\)|do\\(\\)|don't\\(\\)");
    let doIt = true;
    let sum = 0;
    for (let res of result) {
        if (res.startsWith("mul") && doIt) {
            sum += multiply(res);
        } else if (res === "don't()") {
            doIt = false;
        } else if (res === "do()") {
            doIt = true;
        }
    }
    return sum;
}

function multiply(str: string) {
    let parts = str.split(new RegExp("[(),]"));
    return parseInt(parts[1]) * parseInt(parts[2]);
}
