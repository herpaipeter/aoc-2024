import {solvePart1} from "../../src/day04/day04";
import {solvePart2} from "../../src/day04/day04";
import {readLines} from "../../common/utils";

test('empty lines part 1', () => {
    expect(solvePart1([])).toBe(0);
});

test('empty lines part 2', () => {
    expect(solvePart2([])).toBe(0);
});

test('empty is no match', () => {
    expect(solvePart1([""])).toBe(0);
});

test('horizontal', () => {
    expect(solvePart1(["XMAS"])).toBe(1);
});

test('horizontal back', () => {
    expect(solvePart1(["SAMX"])).toBe(1);
});

test('horizontal more', () => {
    expect(solvePart1(["XXXMASMMMXMASM"])).toBe(2);
});

test('vertical', () => {
    expect(solvePart1(["XXXX", "MXXX", "AXXX", "SXXX"])).toBe(1);
});

test('vertical more', () => {
    expect(solvePart1(["XXXX", "MXMX", "AXAX", "SXSX"])).toBe(2);
});

test('vertical back', () => {
    expect(solvePart1(["SXXX", "AXXX", "MXXX", "XXXX"])).toBe(1);
});

test('diagonal', () => {
    expect(solvePart1(["XXXX", "XMXX", "XXAX", "XXXS"])).toBe(1);
});

test('diagonal back', () => {
    expect(solvePart1(["SXXX", "XAXX", "XXMX", "XXXX"])).toBe(1);
});

test('diagonal cross', () => {
    expect(solvePart1(["XXXX", "XXMX", "XAXX", "SXXX"])).toBe(1);
});

test('diagonal cross back', () => {
    expect(solvePart1(["XXXS", "XXAX", "XMXX", "XXXX"])).toBe(1);
});

test('MAS crossed', () => {
    expect(solvePart2(["MXS", "XAX", "MXS"])).toBe(1);
});

test('MAS crossed other', () => {
    expect(solvePart2(["SXM", "XAX", "SXM"])).toBe(1);
});

test('MAS forward', () => {
    expect(solvePart2(["MXM", "XAX", "SXS"])).toBe(1);
});

test('MAS back', () => {
    expect(solvePart2(["SXS", "XAX", "MXM"])).toBe(1);
});


test('test example', () => {
    const lines = readLines(__dirname + "/example.txt");
    expect(solvePart1(lines)).toBe(18);
});

test('test example part 2', () => {
    const lines = readLines(__dirname + "/example.txt");
    expect(solvePart2(lines)).toBe(9);
});


test('part 1', () => {
    const lines = readLines(__dirname + "/input.txt");
    console.log("Day 04 part 1: " + solvePart1(lines));
});

test('part 2', () => {
    const lines = readLines(__dirname + "/input.txt");
    console.log("Day 04 part 2: " + solvePart2(lines));
});
