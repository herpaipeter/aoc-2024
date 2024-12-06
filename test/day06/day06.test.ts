import {Day06, Day06Parser} from "../../src/day06/day06";
import {Point} from "../../common/point";
import {readLines} from "../../common/utils";

test('empty lines part 1', () => {
    expect(new Day06([""]).solvePart1()).toBe(0);
});

test('empty lines part 2', () => {
    expect(new Day06([""]).solvePart2()).toBe(0);
});

test('parser empty line', () => {
    expect(new Day06Parser([""]).getObstructions()).toStrictEqual([]);
});

test('parser one object', () => {
    expect(new Day06Parser(["#"]).getObstructions()).toStrictEqual([new Point(0,0)]);
});

test('parser one object not first', () => {
    expect(new Day06Parser([".#"]).getObstructions()).toStrictEqual([new Point(0,1)]);
});

test('parser multi objects', () => {
    expect(new Day06Parser([".#..#"]).getObstructions()).toStrictEqual([new Point(0,1), new Point(0,4)]);
});

test('parser multi lines', () => {
    expect(new Day06Parser([".#..#", "#..#."]).getObstructions()).toStrictEqual([new Point(0,1), new Point(0,4), new Point(1,0), new Point(1,3)]);
});

test('parser no guard', () => {
    expect(new Day06Parser(["...."]).getGuard()).toBe(undefined);
});

test('parser guard', () => {
    expect(new Day06Parser(["^"]).getGuard()).toStrictEqual(new Point(0,0));
});

test('parser guard in other line', () => {
    expect(new Day06Parser(["...#.", "...#.", ".#.^."]).getGuard()).toStrictEqual(new Point(2,3));
});

test('parser row size', () => {
    expect(new Day06Parser(["...#.", "...#.", ".#.^."]).rowsSize).toBe(3);
});

test('parser col size', () => {
    expect(new Day06Parser(["...#.", "...#.", ".#.^."]).colsSize).toBe(5);
});

test('test example', () => {
    const lines = readLines(__dirname + "/example.txt");
    expect(new Day06(lines).solvePart1()).toBe(41);
});

test('test example part 2', () => {
    const lines = readLines(__dirname + "/example.txt");
    expect(new Day06(lines).solvePart2()).toBe(6);
});


test('part 1', () => {
    const lines = readLines(__dirname + "/input.txt");
    console.log("Day 06 part 1: " + new Day06(lines).solvePart1());
});

test('part 2', () => {
    const lines = readLines(__dirname + "/input.txt");
    console.log("Day 06 part 2: " + new Day06(lines).solvePart2());
});
