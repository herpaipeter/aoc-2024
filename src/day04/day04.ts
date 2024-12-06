import {Point} from "../../common/point";

const WORDS = ["XMAS", "SAMX"];
const DIRECTIONS = [new Point(1, 0), new Point(0, 1), new Point(1, 1), new Point(-1, 1)];

function wordMatch(lines: string[], r: number, c: number, direction: Point, word: string) {
    if (0 <= c + (word.length - 1) * direction.row
        && c + (word.length - 1) * direction.row < lines[r].length
        && r + (word.length - 1) * direction.col < lines.length) {
        for (let i = 0, j = 0; i < word.length && j < word.length; i += direction.col, j += direction.row) {
            if (lines[r + i][c + j] !== word[Math.max(i, j)]) {
                return false;
            }
        }
        return true;
    }
    return false;
}

export function solvePart1(lines: string[]): number {
    let sum = 0;
    for (let r = 0; r < lines.length; r++) {
        for (let c = 0; c < lines[r].length; c++) {
            for (let word of WORDS) {
                for (let direction of DIRECTIONS) {
                    sum += wordMatch(lines, r, c, direction, word) ? 1 : 0;
                }
            }
        }
    }
    return sum;
}

const ENDCHARS= ["MSMS", "SMSM", "MMSS", "SSMM"];

function masMatch(lines: string[], r: number, c: number, endchars: string) {
    if (r + 2 < lines.length && c + 2 < lines[r].length) {
        return lines[r][c] === endchars[0] && lines[r][c+2] === endchars[1]
            && lines[r+1][c+1] === "A"
            && lines[r+2][c] === endchars[2] && lines[r+2][c+2] === endchars[3];
    }
}

export function solvePart2(lines: string[]): number {
    let sum = 0;
    for (let r = 0; r < lines.length; r++) {
        for (let c = 0; c < lines[r].length; c++) {
            for (let ends of ENDCHARS) {
                sum += masMatch(lines, r, c, ends) ? 1 : 0;
            }
        }
    }
    return sum;
}
