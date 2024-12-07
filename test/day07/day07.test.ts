import {Day07, Day07Parser} from "../../src/day07/day07";
import {readLines} from "../../common/utils";

test('empty lines part 1', () => {
    expect(new Day07([""]).solvePart1()).toBe(0);
});

test('empty lines part 2', () => {
    expect(new Day07([""]).solvePart2()).toBe(0);
});

test('parser', () => {
    const parser = new Day07Parser(["190: 10 19"]);
    expect(parser.results).toStrictEqual([190]);
    expect(parser.numbers).toStrictEqual([[10, 19]]);
});

test('parser longer', () => {
    const parser = new Day07Parser(["21037: 9 7 18 13"]);
    expect(parser.results).toStrictEqual([21037]);
    expect(parser.numbers).toStrictEqual([[9, 7, 18, 13]]);
});

test('parse multi line', () => {
    const parser = new Day07Parser(["156: 15 6", "7290: 6 8 6 15"]);
    expect(parser.results).toStrictEqual([156, 7290]);
    expect(parser.numbers).toStrictEqual([[15, 6], [6, 8, 6, 15]]);
});

test('short valid multi', () => {
    expect(new Day07(["1: 1 1"]).solvePart1()).toBe(1);
});

test('short valid add', () => {
    expect(new Day07(["2: 1 1"]).solvePart1()).toBe(2);
});

test('3 elem valid multi', () => {
    expect(new Day07(["1: 1 1 1"]).solvePart1()).toBe(1);
});

test('3 elem valid add', () => {
    expect(new Day07(["3: 1 1 1"]).solvePart1()).toBe(3);
});

test('3 elem valid mixed', () => {
    expect(new Day07(["9: 1 2 3"]).solvePart1()).toBe(9);
});

test('3 elem valid mixed', () => {
    expect(new Day07(["6: 1 2 3"]).solvePart1()).toBe(6);
});

test('invalid', () => {
    expect(new Day07(["7290: 6 8 6 15"]).solvePart1()).toBe(0);
});

test('valid with concat', () => {
    expect(new Day07(["156: 15 6"]).solvePart2()).toBe(156);
});

test('valid with multichar concat', () => {
    expect(new Day07(["12345: 12 345"]).solvePart2()).toBe(12345);
});

test('valid with multi nums concat', () => {
    expect(new Day07(["7290: 6 8 6 15"]).solvePart2()).toBe(7290);
});

test('test example', () => {
    const lines = readLines(__dirname + "/example.txt");
    expect(new Day07(lines).solvePart1()).toBe(3749);
});

test('test example part 2', () => {
    const lines = readLines(__dirname + "/example.txt");
    expect(new Day07(lines).solvePart2()).toBe(11387);
});


test('part 1', () => {
    const lines = readLines(__dirname + "/input.txt");
    console.log("Day 07 part 1: " + new Day07(lines).solvePart1());
});

test('part 2', () => {
    const lines = readLines(__dirname + "/input.txt");
    console.log("Day 07 part 2: " + new Day07(lines).solvePart2());
});
