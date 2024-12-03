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