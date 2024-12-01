import {solvePart1, solvePart2} from '../../src/day01/day01';
import {readLines} from "../../common/utils";

test('empty lines', () => {
    expect(solvePart1([])).toBe(0);
});

test('one line data', () => {
    expect(solvePart1(["1 2"])).toBe(1);
});

test('two lines data', () => {
    expect(solvePart1(["1 2", "3 5"])).toBe(3);
});

test('two lines data more spaces', () => {
    expect(solvePart1(["1  2", "3    5"])).toBe(3);
});

test('lines needs sorting', () => {
    expect(solvePart1(["3 2", "2 5"])).toBe(2);
});

test('test example', () => {
    const lines = readLines(__dirname + "/example.txt");
    expect(solvePart1(lines)).toBe(11);
    console.log("Day 01 Example part 1: " + solvePart1(lines));
});

test('test example part2', () => {
    const lines = readLines(__dirname + "/example.txt");
    console.log("Day 01 Example part 2: " + solvePart2(lines));
    expect(solvePart2(lines)).toBe(31);
});

test('part 1', () => {
    const lines = readLines(__dirname + "/input.txt");
    console.log("Day 01 part 1: " + solvePart1(lines));
});

test('part 2', () => {
    const lines = readLines(__dirname + "/input.txt");
    console.log("Day 01 part 2: " + solvePart2(lines));
});
