import {readLines} from "../../common/utils";
import {Day20, Day20Parser} from "../../src/day20/day20";

test('empty lines part 1', () => {
    expect(new Day20([]).solvePart1(0)).toBe(0);
});

test('empty lines part 2', () => {
    expect(new Day20([]).solvePart2(0)).toBe(0);
});

test('parser empty', () => {
    const parser = new Day20Parser([]);
    expect(parser.colCount).toStrictEqual(0);
    expect(parser.rowCount).toStrictEqual(0);
});


test('test example', () => {
     const lines = readLines(__dirname + "/example.txt");
     expect(new Day20(lines).solvePart1(0)).toBe(44);
});

test('test example part 2', () => {
     const lines = readLines(__dirname + "/example.txt");
     expect(new Day20(lines).solvePart2(50)).toBe(285);
});


test('part 1', () => {
    //TOO LOW: 1330
     const lines = readLines(__dirname + "/input.txt");
     console.log("Day 20 part 1: " + new Day20(lines).solvePart1(100));
});

test('part 2', () => {
    const lines = readLines(__dirname + "/input.txt");
     console.log("Day 20 part 2: " + new Day20(lines).solvePart2(100));
});
