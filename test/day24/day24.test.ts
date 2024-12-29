import {readBlocks} from "../../common/utils";
import {Day24, Day24Parser, Gate, Wire} from "../../src/day24/day24";

test('empty lines part 1', () => {
    expect(new Day24([]).solvePart1()).toBe(0);
});

test('empty lines part 2', () => {
    expect(new Day24([]).solvePart2()).toBe(0);
});

test('parser empty', () => {
    const parser = new Day24Parser([]);
    expect(parser.wires).toStrictEqual([]);
    expect(parser.gates).toStrictEqual([]);
});

test('parser one wire', () => {
    const parser = new Day24Parser(["x00: 1", ""]);
    expect(parser.wires).toStrictEqual([new Wire("x00", 1)]);
    expect(parser.gates).toStrictEqual([]);
});

test('parser two wires', () => {
    const parser = new Day24Parser(["x00: 1\ny00: 0", ""]);
    expect(parser.wires).toStrictEqual([new Wire("x00", 1), new Wire("y00", 0)]);
    expect(parser.gates).toStrictEqual([]);
});

test('parser two wires, one gates, and op', () => {
    const parser = new Day24Parser(["x00: 1\ny00: 0", "x00 AND y00 -> z00"]);
    const wireX00 = new Wire("x00", 1);
    const wireY00 = new Wire("y00", 0);
    const wireZ00 = new Wire("z00", undefined);
    expect(parser.wires).toStrictEqual([wireX00, wireY00, wireZ00]);
    expect(parser.gates).toStrictEqual([new Gate(wireX00, wireY00, wireZ00, "&")]);
});

test('parser two wires, one gates, or op', () => {
    const parser = new Day24Parser(["x00: 1\ny00: 0", "x00 OR y00 -> z00"]);
    const wireX00 = new Wire("x00", 1);
    const wireY00 = new Wire("y00", 0);
    const wireZ00 = new Wire("z00", undefined);
    expect(parser.wires).toStrictEqual([wireX00, wireY00, wireZ00]);
    expect(parser.gates).toStrictEqual([new Gate(wireX00, wireY00, wireZ00, "|")]);
});

test('parser two wires, one gates, xor op', () => {
    const parser = new Day24Parser(["x00: 1\ny00: 0", "x00 XOR y00 -> z00"]);
    const wireX00 = new Wire("x00", 1);
    const wireY00 = new Wire("y00", 0);
    const wireZ00 = new Wire("z00", undefined);
    expect(parser.wires).toStrictEqual([wireX00, wireY00, wireZ00]);
    expect(parser.gates).toStrictEqual([new Gate(wireX00, wireY00, wireZ00, "^")]);
});


test('test example', () => {
     const lines = readBlocks(__dirname + "/example.txt");
     expect(new Day24(lines).solvePart1()).toBe(4);
});

test('test example larger', () => {
    const lines = readBlocks(__dirname + "/large_example.txt");
    expect(new Day24(lines).solvePart1()).toBe(2024);
});


// test('test example part 2', () => {
//      const lines = readBlocks(__dirname + "/example.txt");
//      expect(new Day24(lines).solvePart2()).toBe(0);
// });


test('part 1', () => {
     const lines = readBlocks(__dirname + "/input.txt");
     console.log("Day 24 part 1: " + new Day24(lines).solvePart1());
});

test('part 2', () => {
    /// dqr,dtk,pfw,shh,vgs,z21,z33,z39
    const lines = readBlocks(__dirname + "/input.txt");
     console.log("Day 24 part 2: " + new Day24(lines).solvePart2());
});
