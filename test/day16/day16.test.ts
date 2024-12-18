import {Day16, Day16Parser} from "../../src/day16/day16";
import {readLines} from "../../common/utils";

test('empty lines part 1', () => {
    expect(new Day16([]).solvePart1()).toBe(0);
});

test('empty lines part 2', () => {
    expect(new Day16([]).solvePart2()).toBe(0);
});

test('parser empty', () => {
    const parser = new Day16Parser([]);
    expect(parser.colCount).toStrictEqual(0);
    expect(parser.rowCount).toStrictEqual(0);
});


test('test example', () => {
     const lines = readLines(__dirname + "/example.txt");
     expect(new Day16(lines).solvePart1()).toBe(7036);
});

test('test example 2', () => {
    const lines = readLines(__dirname + "/example2.txt");
    expect(new Day16(lines).solvePart1()).toBe(11048);
});

test('test example 3', () => {
    const lines = readLines(__dirname + "/example3.txt");
    expect(new Day16(lines).solvePart1()).toBe(3021);
});

test('test example empty maze', () => {
    const lines = readLines(__dirname + "/empty_maze.txt");
    expect(new Day16(lines).solvePart1()).toBe(5078);
});

test('test example part 2', () => {
     const lines = readLines(__dirname + "/example.txt");
     expect(new Day16(lines).solvePart2()).toBe(45);
});

test('test example part 2 2.', () => {
    const lines = readLines(__dirname + "/example2.txt");
    expect(new Day16(lines).solvePart2()).toBe(64);
});

test('test example empty maze part 2', () => {
    const lines = readLines(__dirname + "/empty_maze.txt");
    expect(new Day16(lines).solvePart2()).toBe(413);
});


test('part 1', () => {
    const lines = readLines(__dirname + "/input.txt");
    console.log("Day 16 part 1: " + new Day16(lines).solvePart1());
});

test('part 2', () => {
    const lines = readLines(__dirname + "/input.txt");
    console.log("Day 16 part 2: " + new Day16(lines).solvePart2());
});
