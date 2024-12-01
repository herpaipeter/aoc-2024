import fs from 'fs';

export function readLines(path: string): string[] {
    const lines = fs.readFileSync(path, 'utf-8');
    return lines.split("\n");
}

export function sumNumbers(accumulator: number, value: number): number {
    return accumulator + value;
}