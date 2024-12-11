import {Day11, Day11Parser, Stoner} from "../../src/day11/day11";
import {readAll} from "../../common/utils";

test('empty lines part 1', () => {
    expect(new Day11("").solvePart1(0)).toBe(0);
});

test('empty lines part 2', () => {
    expect(new Day11("").solvePart2(0)).toBe(0);
});

test('parser empty', () => {
    const parser = new Day11Parser([]);
    expect(parser.colCount).toBe(0);
    expect(parser.rowCount).toBe(0);
});


test('stoner get next for 0', () => {
    expect(new Stoner().getNextNumbers(0)).toStrictEqual([1]);
});

test('stoner get next for odd digits', () => {
    expect(new Stoner().getNextNumbers(1)).toStrictEqual([2024]);
});

test('stoner get next for even digits', () => {
    expect(new Stoner().getNextNumbers(11)).toStrictEqual([1, 1]);
});

test('stoner get next for 3 length digits', () => {
    expect(new Stoner().getNextNumbers(111)).toStrictEqual([224664]);
});

test('stoner get next for even digits', () => {
    expect(new Stoner().getNextNumbers(2000)).toStrictEqual([20, 0]);
});


test('stoner for 0 step 0', () => {
    expect(new Stoner().stoneCount(0, 0)).toBe(1);
});

test('stoner for 0 step 1', () => {
    expect(new Stoner().stoneCount(0, 1)).toBe(1);
});

test('stoner for 1 step 1', () => {
    expect(new Stoner().stoneCount(1, 1)).toBe(1);
});

test('stoner for even length step 1', () => {
    expect(new Stoner().stoneCount(11, 1)).toBe(2);
});

test('stoner for 17 step 1', () => {
    expect(new Stoner().stoneCount(17, 1)).toBe(2);
});

test('stoner for 17 step 2', () => {
    expect(new Stoner().stoneCount(17, 2)).toBe(2);
});

test('stoner for 17 step 3', () => {
    expect(new Stoner().stoneCount(17, 3)).toBe(3);
});

test('stoner for 17 step 4', () => {
    expect(new Stoner().stoneCount(17, 4)).toBe(6);
});


test('simple example test', () => {
    expect(new Day11("125 17").solvePart1(6)).toBe(22);
});


test('test example', () => {
     const lines = readAll(__dirname + "/example.txt");
     expect(new Day11(lines).solvePart1(25)).toBe(55312);
});

test('test example part 2', () => {
     const lines = readAll(__dirname + "/example.txt");
     expect(new Day11(lines).solvePart2(75)).toBe(65601038650482);
});



test('part 1', () => {
     const lines = readAll(__dirname + "/input.txt");
     console.log("Day 11 part 1: " + new Day11(lines).solvePart1(25));
});

test('part 2', () => {
    const lines = readAll(__dirname + "/input.txt");
     console.log("Day 11 part 2: " + new Day11(lines).solvePart2(75));
});
