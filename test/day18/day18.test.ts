import {readLines} from "../../common/utils";
import {Day18, Day18Parser} from "../../src/day18/day18";
import {Point} from "../../common/point";

test('empty lines part 1', () => {
    expect(new Day18([], 0, 0, 0).solvePart1()).toBe(0);
});

test('empty lines part 2', () => {
    expect(new Day18([], 0, 0, 0).solvePart2()).toBe("");
});

test('parser empty', () => {
    const parser = new Day18Parser([], 0, 0);
    expect(parser.colCount).toStrictEqual(0);
    expect(parser.rowCount).toStrictEqual(0);
});

test('parser elements', () => {
    const parser = new Day18Parser(["5,4", "4,2"], 6, 7);
    expect(parser.bytes).toStrictEqual([new Point(4,5), new Point(2,4)]);
    expect(parser.rowCount).toStrictEqual(6);
    expect(parser.colCount).toStrictEqual(7);
});


test('test example', () => {
     const lines = readLines(__dirname + "/example.txt");
     expect(new Day18(lines, 7, 7, 12).solvePart1()).toBe(22);
});

test('test example part 2', () => {
     const lines = readLines(__dirname + "/example.txt");
     expect(new Day18(lines, 7, 7, 12).solvePart2()).toBe("6,1");
});


test('part 1', () => {
     const lines = readLines(__dirname + "/input.txt");
     console.log("Day 18 part 1: " + new Day18(lines, 71, 71, 1024).solvePart1());
});

test('part 2', () => {
    const lines = readLines(__dirname + "/input.txt");
     console.log("Day 18 part 2: " + new Day18(lines, 71, 71, 1024).solvePart2());
});
