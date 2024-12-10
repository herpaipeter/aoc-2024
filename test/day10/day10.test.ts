import {readLines} from "../../common/utils";
import {Day10, Day10Parser, PathFinder} from "../../src/day10/day10";

test('empty lines part 1', () => {
    expect(new Day10([""]).solvePart1()).toBe(0);
});

test('empty lines part 2', () => {
    expect(new Day10([""]).solvePart2()).toBe(0);
});

test('parser empty', () => {
    const parser = new Day10Parser([""]);
    expect(parser.heights).toStrictEqual([]);
});

test('parser multilines', () => {
    const parser = new Day10Parser(["123", "456"]);
    expect(parser.heights).toStrictEqual([[1,2,3], [4,5,6]]);
    expect(parser.colCount).toBe(3);
    expect(parser.rowCount).toBe(2);
});

test('pathfinder empty', () => {
    const pathFinder = new PathFinder([[0]]);
    expect(pathFinder.pathesCount(0,0)).toBe(0);
});

test('pathfinder one line', () => {
    const pathFinder = new PathFinder([[0, 1]]);
    expect(pathFinder.pathesCount(0,1)).toBe(1);
});

test('pathfinder one line reverse', () => {
    const pathFinder = new PathFinder([[1, 0]]);
    expect(pathFinder.pathesCount(0,1)).toBe(1);
});

test('pathfinder 2x2', () => {
    const pathFinder = new PathFinder([[0, 1], [1, 2]]);
    expect(pathFinder.pathesCount(0,1)).toBe(2);
});

test('pathfinder 2x2 reverse', () => {
    const pathFinder = new PathFinder([[1, 0], [2, 1]]);
    expect(pathFinder.pathesCount(0,1)).toBe(2);
});

test('pathfinder 2x2 multi start', () => {
    const pathFinder = new PathFinder([[1, 0], [0, 1]]);
    expect(pathFinder.pathesCount(0,1)).toBe(4);
});

test('pathfinder 2x2 2 distance', () => {
    const pathFinder = new PathFinder([[0, 1], [1, 2]]);
    expect(pathFinder.pathesCount(0,2)).toBe(1);
});

test('pathfinder 3 distance', () => {
    const pathFinder = new PathFinder([[0, 1, 3], [1, 2, 3]]);
    expect(pathFinder.pathesCount(0,3)).toBe(1);
});

test('pathfinder 3 distance', () => {
    const pathFinder = new PathFinder([[0, 1, 3], [1, 2, 3], [1, 3, 4]]);
    expect(pathFinder.pathesCount(0,3)).toBe(2);
});

test('pathfinder 4 distance', () => {
    const pathFinder = new PathFinder([[0, 1, 3], [1, 2, 3], [1, 3, 4]]);
    expect(pathFinder.pathesCount(0,4)).toBe(1);
});

test('pathfinder multistart 4 distance', () => {
    const pathFinder = new PathFinder([[0, 1, 3], [1, 2, 3], [0, 3, 4]]);
    expect(pathFinder.pathesCount(0,4)).toBe(2);
});

test('test example', () => {
     const lines = readLines(__dirname + "/example.txt");
     expect(new Day10(lines).solvePart1()).toBe(36);
});

test('test example part 2', () => {
     const lines = readLines(__dirname + "/example.txt");
     expect(new Day10(lines).solvePart2()).toBe(81);
});
//
//
//
test('part 1', () => {
     const lines = readLines(__dirname + "/input.txt");
     console.log("Day 10 part 1: " + new Day10(lines).solvePart1());
});

test('part 2', () => {
    const lines = readLines(__dirname + "/input.txt");
     console.log("Day 10 part 2: " + new Day10(lines).solvePart2());
});
