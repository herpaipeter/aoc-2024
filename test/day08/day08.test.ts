import {readLines} from "../../common/utils";
import {Day08, Day08Parser} from "../../src/day08/day08";
import {Point} from "../../common/point";

test('empty lines part 1', () => {
    expect(new Day08([""]).solvePart1()).toBe(0);
});

test('empty lines part 2', () => {
    expect(new Day08([""]).solvePart2()).toBe(0);
});

test('parser empty', () => {
    const parser = new Day08Parser([""]);
    expect(parser.antennas).toStrictEqual(new Map());
});

test('parser dot not matter', () => {
    const parser = new Day08Parser(["...."]);
    const antennas = new Map();
    expect(parser.antennas).toStrictEqual(antennas);
});

test('parser one element', () => {
    const parser = new Day08Parser(["a"]);
    const antennas = new Map();
    antennas.set("a", [new Point(0,0)]);
    expect(parser.antennas).toStrictEqual(antennas);
});

test('parser two diff element', () => {
    const parser = new Day08Parser(["a.b"]);
    const antennas = new Map();
    antennas.set("a", [new Point(0,0)]);
    antennas.set("b", [new Point(0,2)]);
    expect(parser.antennas).toStrictEqual(antennas);
});

test('parser two same element', () => {
    const parser = new Day08Parser(["a.a"]);
    const antennas = new Map();
    antennas.set("a", [new Point(0,0), new Point(0,2)]);
    expect(parser.antennas).toStrictEqual(antennas);
});

test('parser multi lines', () => {
    const parser = new Day08Parser(["a.a", ".b.", "..b"]);
    const antennas = new Map();
    antennas.set("a", [new Point(0,0), new Point(0,2)]);
    antennas.set("b", [new Point(1,1), new Point(2,2)]);
    expect(parser.antennas).toStrictEqual(antennas);
});

test('new points out', () => {
    expect(new Day08(["a.a"]).solvePart1()).toBe(0);
});

test('new points one in', () => {
    expect(new Day08(["a.a...."]).solvePart1()).toBe(1);
});

test('new points two in', () => {
    expect(new Day08(["......a.a...."]).solvePart1()).toBe(2);
});

test('new points multiline', () => {
    expect(new Day08(["...........", "....a......", "......a....", "..........."]).solvePart1()).toBe(2);
});

test('new points multiline one new point', () => {
    expect(new Day08(["....a......", "......a....", "..........."]).solvePart1()).toBe(1);
});


test('test example', () => {
     const lines = readLines(__dirname + "/example.txt");
     expect(new Day08(lines).solvePart1()).toBe(14);
});

test('test example part 2', () => {
     const lines = readLines(__dirname + "/example.txt");
     expect(new Day08(lines).solvePart2()).toBe(34);
});


test('part 1', () => {
     const lines = readLines(__dirname + "/input.txt");
     console.log("Day 08 part 1: " + new Day08(lines).solvePart1());
});

test('part 2', () => {
    const lines = readLines(__dirname + "/input.txt");
     console.log("Day 08 part 2: " + new Day08(lines).solvePart2());
});
