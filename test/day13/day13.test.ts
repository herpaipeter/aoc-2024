import {readBlocks} from "../../common/utils";
import {ClawMachine, Day13, Day13Parser} from "../../src/day13/day13";
import {Point} from "../../common/point";

test('empty lines part 1', () => {
    expect(new Day13([], 0).solvePart1()).toBe(0);
});

test('empty lines part 2', () => {
    expect(new Day13([], 0).solvePart2()).toBe(0);
});

test('parser block', () => {
    const parser = new Day13Parser("Button A: X+94, Y+34\nButton B: X+22, Y+67\nPrize: X=8400, Y=5400", 0);
    expect(parser.clawMachine).toStrictEqual(new ClawMachine(new Point(94, 34), new Point(22, 67), new Point(8400, 5400)));
});

test('simple', () => {
    expect(new Day13(["Button A: X+94, Y+34\nButton B: X+22, Y+67\nPrize: X=8400, Y=5400"], 0).solvePart1()).toBe(280);
});



test('test example', () => {
     const lines = readBlocks(__dirname + "/example.txt");
     expect(new Day13(lines, 0).solvePart1()).toBe(480);
});

test('test example part 2', () => {
     const lines = readBlocks(__dirname + "/example.txt");
     expect(new Day13(lines, 10000000000000).solvePart2()).toBe(875318608908);
});



test('part 1', () => {
     const lines = readBlocks(__dirname + "/input.txt");
     console.log("Day 13 part 1: " + new Day13(lines, 0).solvePart1());
});

test('part 2', () => {
    const lines = readBlocks(__dirname + "/input.txt");
     console.log("Day 13 part 2: " + new Day13(lines, 10000000000000).solvePart2());
});
