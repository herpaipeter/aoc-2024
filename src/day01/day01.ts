import {sumNumbers} from "../../common/utils";

export function solvePart1(lines: string[]): number {
    let {array1, array2} = getNumberArrays(lines);
    array1.sort();
    array2.sort();

    return array1.map((_, index) => Math.abs(array1[index] - array2[index]))
        .reduce(sumNumbers, 0);
}

export function solvePart2(lines: string[]): number {
    let {array1, array2} = getNumberArrays(lines);
    let numCounts = new Map<number, number>();
    array2.forEach((num) => {
        const value = numCounts.get(num);
        numCounts.set(num, value === undefined ? 1 : value + 1)
    })
    return array1.map((num) => {
        const multi = numCounts.get(num)
        return num * (multi === undefined ? 0 : multi);
    }).reduce(sumNumbers, 0);
}

function getNumberArrays(lines: string[]) {
    let array1: number[] = [];
    let array2: number[] = [];
    lines.forEach(line => {
        const nums = line.split(" ").filter(value => 0 < value.length);
        array1.push(parseInt(nums[0]));
        array2.push(parseInt(nums[1]));
    });
    return {array1, array2};
}
