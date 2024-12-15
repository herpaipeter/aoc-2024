import {readLines} from "../../common/utils";
import {Day14, Day14Parser, Robot} from "../../src/day14/day14";
import {Point} from "../../common/point";

test('empty lines part 1', () => {
    expect(new Day14([], 0, 0, 0).solvePart1()).toBe(0);
});


test('parser empty', () => {
    const parser = new Day14Parser([], 7, 11);
    expect(parser.colCount).toStrictEqual(11);
    expect(parser.rowCount).toStrictEqual(7);
});

test('parser one line', () => {
    const parser = new Day14Parser(["p=0,4 v=3,-3"], 7, 11);
    expect(parser.robots).toStrictEqual([new Robot(new Point(4,0), new Point(-3, 3))]);
});

test('parser lines', () => {
    const parser = new Day14Parser(["p=0,4 v=3,-3", "p=6,3 v=-1,-3", "p=10,3 v=-1,2"], 7, 11);
    expect(parser.robots).toStrictEqual([
        new Robot(new Point(4,0), new Point(-3, 3)),
        new Robot(new Point(3,6), new Point(-3, -1)),
        new Robot(new Point(3,10), new Point(2, -1))]);
});


test('test example', () => {
     const lines = readLines(__dirname + "/example.txt");
     expect(new Day14(lines, 7, 11, 100).solvePart1()).toBe(12);
});


test('part 1', () => {
     const lines = readLines(__dirname + "/input.txt");
     console.log("Day 14 part 1: " + new Day14(lines, 103, 101, 100).solvePart1());
});

test('part 2', () => {
    //too low: 1937, 3874, 6445
    const lines = readLines(__dirname + "/input.txt");
     console.log("Day 14 part 2: " + new Day14(lines, 103, 101, 100).solvePart2());
});
