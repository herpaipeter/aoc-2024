import {readBlocks} from "../../common/utils";
import {Builder, Day19, Day19Parser, Matcher} from "../../src/day19/day19";

test('empty lines part 1', () => {
    expect(new Day19([]).solvePart1()).toBe(0);
});

test('empty lines part 2', () => {
    expect(new Day19([]).solvePart2()).toBe(0);
});

test('parser empty', () => {
    const parser = new Day19Parser([]);
    expect(parser.patterns).toStrictEqual([]);
    expect(parser.designs).toStrictEqual([]);
});

test('parser elements', () => {
    const parser = new Day19Parser(["br, gr, b", "grbu\nbwrug"]);
    expect(parser.patterns).toStrictEqual(["br", "gr", "b"]);
    expect(parser.designs).toStrictEqual(["grbu", "bwrug"]);
});

test('matcher empty', () => {
    const matcher = new Matcher([]);
    expect(matcher.match("")).toStrictEqual(false);
});

test('matcher one element', () => {
    const matcher = new Matcher(["a"]);
    expect(matcher.match("a")).toStrictEqual(true);
});

test('matcher same elements', () => {
    const matcher = new Matcher(["a"]);
    expect(matcher.match("aa")).toStrictEqual(true);
});

test('matcher second pattern', () => {
    const matcher = new Matcher(["a", "b"]);
    expect(matcher.match("b")).toStrictEqual(true);
});

test('matcher sequential pattern', () => {
    const matcher = new Matcher(["a", "b"]);
    expect(matcher.match("ab")).toStrictEqual(true);
});

test('matcher more pattern 1', () => {
    const matcher = new Matcher(["a", "ab", "ba"]);
    expect(matcher.match("aba")).toStrictEqual(true);
});

test('matcher more pattern 2', () => {
    const matcher = new Matcher(["a", "ab"]);
    expect(matcher.match("aba")).toStrictEqual(true);
});

test('matcher more pattern 3', () => {
    const matcher = new Matcher(["r", "wr", "b", "g", "bwu", "rb", "gb", "br"]);
    expect(matcher.match("ubwu")).toStrictEqual(false);
});


test('builder empty', () => {
    const builder = new Builder([]);
    expect(builder.buildCount("")).toBe(0);
});

test('builder one element', () => {
    const builder = new Builder(["a"]);
    expect(builder.buildCount("a")).toBe(1);
});

test('builder brwrr', () => {
    const builder = new Builder(["r", "wr", "b", "g", "bwu", "rb", "gb", "br"]);
    expect(builder.buildCount("brwrr")).toBe(2);
});

test('builder rrbgbr', () => {
    const builder = new Builder(["r", "wr", "b", "g", "bwu", "rb", "gb", "br"]);
    expect(builder.buildCount("rrbgbr")).toBe(6);
});


test('test example', () => {
     const lines = readBlocks(__dirname + "/example.txt");
     expect(new Day19(lines).solvePart1()).toBe(6);
});

test('test example part 2', () => {
     const lines = readBlocks(__dirname + "/example.txt");
     expect(new Day19(lines).solvePart2()).toBe(16);
});


test('part 1', () => {
     const lines = readBlocks(__dirname + "/input.txt");
     console.log("Day 19 part 1: " + new Day19(lines).solvePart1());
});

test('part 2', () => {
    const lines = readBlocks(__dirname + "/input.txt");
     console.log("Day 19 part 2: " + new Day19(lines).solvePart2());
});


test('part 1 pkovacs', () => {
    const lines = readBlocks(__dirname + "/input_pkovacs.txt");
    console.log("Day 19 part 1: " + new Day19(lines).solvePart1());
});

test('part 2 pkovacs', () => {
    const lines = readBlocks(__dirname + "/input_pkovacs.txt");
    console.log("Day 19 part 2: " + new Day19(lines).solvePart2());
});
