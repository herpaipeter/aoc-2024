import {solvePart1} from "../../src/day03/day03";
import {solvePart2} from "../../src/day03/day03";
import {readAll} from "../../common/utils";

test('empty lines part 1', () => {
    expect(solvePart1("")).toBe(0);
});

test('empty lines part 2', () => {
    expect(solvePart2("")).toBe(0);
});

test('simple multi', () => {
    expect(solvePart1("mul(1,1)")).toBe(1);
});

test('bigger numbers', () => {
    expect(solvePart1("mul(44,46)")).toBe(2024);
});

test('more multi', () => {
    expect(solvePart1("mul(1,2)mul(3,4)")).toBe(14);
});

test('test example part 1', () => {
    const line = readAll(__dirname + "/example.txt");
    expect(solvePart1(line)).toBe(161);
});

test('test example part 2', () => {
    const lines = readAll(__dirname + "/example2.txt");
    expect(solvePart2(lines)).toBe(48);
});

test('part 1', () => {
    const lines = readAll(__dirname + "/input.txt");
    console.log("Day 03 part 1: " + solvePart1(lines));
});

test('part 2', () => {
    const lines = readAll(__dirname + "/input.txt");
    console.log("Day 02 part 2: " + solvePart2(lines));
});
