import {Day05} from "../../src/day05/day05";
import {readAll} from "../../common/utils";

test('empty lines part 1', () => {
    expect(new Day05("0|0\n\n0,0").solvePart1()).toBe(0);
});

test('empty lines part 2', () => {
    expect(new Day05("0|0\n\n0,0").solvePart2()).toBe(0);
});


test('test example', () => {
    const lines = readAll(__dirname + "/example.txt");
    expect(new Day05(lines).solvePart1()).toBe(143);
});

test('test example part 2', () => {
    const lines = readAll(__dirname + "/example.txt");
    expect(new Day05(lines).solvePart2()).toBe(123);
});


test('part 1', () => {
    const lines = readAll(__dirname + "/input.txt");
    console.log("Day 05 part 1: " + new Day05(lines).solvePart1());
});

test('part 2', () => {
    const lines = readAll(__dirname + "/input.txt");
    console.log("Day 05 part 2: " + new Day05(lines).solvePart2());
});
