import {solvePart1} from "../../src/day02/day02";
import {solvePart2} from "../../src/day02/day02";
import {readLines} from "../../common/utils";

test('empty lines part 1', () => {
    expect(solvePart1([])).toBe(0);
});

test('empty lines part 2', () => {
    expect(solvePart2([])).toBe(0);
});

test('one line small diff ok', () => {
    expect(solvePart1(["1 2"])).toBe(1);
});

test('one line small diff ok', () => {
    expect(solvePart1(["1 3"])).toBe(1);
});

test('one line small diff ok', () => {
    expect(solvePart1(["1 4"])).toBe(1);
});

test('one line big diff not ok', () => {
    expect(solvePart1(["1 5"])).toBe(0);
});

test('same number not ok', () => {
    expect(solvePart1(["1 1"])).toBe(0);
});

test('descending numbers ok', () => {
    expect(solvePart1(["7 6 4 2 1"])).toBe(1);
});

test('ascending numbers ok', () => {
    expect(solvePart1(["1 3 6 7 9"])).toBe(1);
});

test('big increase not ok', () => {
    expect(solvePart1(["1 2 7 8 9"])).toBe(0);
});

test('big decrease not ok', () => {
    expect(solvePart1(["9 7 6 2 1"])).toBe(0);
});

test('increase decrease not ok', () => {
    expect(solvePart1(["1 3 2 4 5"])).toBe(0);
});

test('same numbers not ok', () => {
    expect(solvePart1(["8 6 4 4 1"])).toBe(0);
});

test('test example', () => {
    const lines = readLines(__dirname + "/example.txt");
    expect(solvePart1(lines)).toBe(2);
});

test('test example part 2', () => {
    const lines = readLines(__dirname + "/example.txt");
    expect(solvePart2(lines)).toBe(4);
});

test('part 1', () => {
    const lines = readLines(__dirname + "/input.txt");
    console.log("Day 02 part 1: " + solvePart1(lines));
});

test('part 2', () => {
    const lines = readLines(__dirname + "/input.txt");
    console.log("Day 02 part 2: " + solvePart2(lines));
});
