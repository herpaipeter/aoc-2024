import {readBlocks} from "../../common/utils";
import {Day25, Day25Parser} from "../../src/day25/day25";

test('empty lines part 1', () => {
    expect(new Day25([]).solvePart1()).toBe(0);
});

test('empty lines part 2', () => {
    expect(new Day25([]).solvePart2()).toBe(0);
});

test('parser empty', () => {
    const parser = new Day25Parser([]);
    expect(parser.locks).toStrictEqual([]);
    expect(parser.keys).toStrictEqual([]);
});

test('parser read lock', () => {
    const parser = new Day25Parser(["#####\n" +
    ".####\n" +
    ".####\n" +
    ".####\n" +
    ".#.#.\n" +
    ".#...\n" +
    "....."]);
    expect(parser.locks).toStrictEqual([[0,5,3,4,3]])
});

test('parser read key', () => {
    const parser = new Day25Parser([".....\n" +
    "#....\n" +
    "#....\n" +
    "#...#\n" +
    "#.#.#\n" +
    "#.###\n" +
    "#####"]);
    expect(parser.keys).toStrictEqual([[5,0,2,1,3]])
});

test('test example', () => {
     const lines = readBlocks(__dirname + "/example.txt");
     expect(new Day25(lines).solvePart1()).toBe(3);
});

test('test example part 2', () => {
     const lines = readBlocks(__dirname + "/example.txt");
     expect(new Day25(lines).solvePart2()).toBe(0);
});


test('part 1', () => {
     const lines = readBlocks(__dirname + "/input.txt");
     console.log("Day 25 part 1: " + new Day25(lines).solvePart1());
});

test('part 2', () => {
    const lines = readBlocks(__dirname + "/input.txt");
     console.log("Day 25 part 2: " + new Day25(lines).solvePart2());
});
