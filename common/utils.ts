import fs from 'fs';

export function readAll(path: string): string {
    return fs.readFileSync(path, 'utf-8');
}

export function readLines(path: string): string[] {
    const lines = fs.readFileSync(path, 'utf-8');
    return lines.split("\n");
}

export function sumNumbers(accumulator: number, value: number): number {
    return accumulator + value;
}

export function concatArrays<T>(accumulator: Array<T>, value:  Array<T>):  Array<T> {
    accumulator.push(...value);
    return accumulator;
}

export function getMatches(input: string, regexp: string): string[] {
    const regex = new RegExp(regexp, "gi");
    return [...input.matchAll(regex)].map(value => value[0]);
}