import {readLines} from "../../common/utils";
import {Day21, DirectionalKeypad, NumericKeypad} from "../../src/day21/day21";

test('empty lines part 1', () => {
    expect(new Day21([]).solvePart1()).toBe(0);
});

test('empty lines part 2', () => {
    expect(new Day21([]).solvePart2()).toBe(0);
});


test('numeric keypad', () => {
    const keypad = new NumericKeypad("");
    expect(keypad.getDirections()).toStrictEqual([]);
});

test('numeric keypad A', () => {
    const keypad = new NumericKeypad("A");
    expect(keypad.getDirections()).toStrictEqual(["A"]);
});

test('numeric keypad 0', () => {
    const keypad = new NumericKeypad("0");
    expect(keypad.getDirections()).toStrictEqual(["<A"]);
});

test('numeric keypad 1', () => {
    const keypad = new NumericKeypad("1");
    expect(keypad.getDirections()).toStrictEqual(["^<<A", "<^<A"]);
});

test('numeric keypad 2', () => {
    const keypad = new NumericKeypad("2");
    expect(keypad.getDirections()).toStrictEqual(["^<A", "<^A"]);
});

test('numeric keypad 7', () => {
    const keypad = new NumericKeypad("7");
    expect(keypad.getDirections()).toStrictEqual(["^^^<<A", "^^<^<A", "^^<<^A", "^<^^<A", "^<^<^A", "^<<^^A", "<^^^<A", "<^^<^A", "<^<^^A"]);
});

test('numeric keypad 01', () => {
    const keypad = new NumericKeypad("01");
    expect(keypad.getDirections()).toStrictEqual(["<A^<A"]);
});

test('numeric keypad 10', () => {
    const keypad = new NumericKeypad("10");
    expect(keypad.getDirections()).toStrictEqual(["^<<A>vA", "<^<A>vA"]);
});


test('directional keypad', () => {
    const keypad = new DirectionalKeypad();
    expect(keypad.getDirections("")).toStrictEqual([]);
});

test('directional keypad A', () => {
    const keypad = new DirectionalKeypad();
    expect(keypad.getDirections("A")).toStrictEqual(["A"]);
});

test('directional keypad >', () => {
    const keypad = new DirectionalKeypad();
    expect(keypad.getDirections(">")).toStrictEqual(["vA"]);
});

test('directional keypad ^', () => {
    const keypad = new DirectionalKeypad();
    expect(keypad.getDirections("^")).toStrictEqual(["<A"]);
});

test('directional keypad v', () => {
    const keypad = new DirectionalKeypad();
    expect(keypad.getDirections("v")).toStrictEqual(["v<A", "<vA"]);
});

test('directional keypad <', () => {
    const keypad = new DirectionalKeypad();
    expect(keypad.getDirections("<")).toStrictEqual(["v<<A", "<v<A"]);
});

test('directional keypad <^', () => {
    const keypad = new DirectionalKeypad();
    expect(keypad.getDirections("<^")).toStrictEqual(["v<<A>^A", "<v<A>^A"]);
});

test('directional keypad ^<', () => {
    const keypad = new DirectionalKeypad();
    expect(keypad.getDirections("^<")).toStrictEqual(["<Av<A"]);
});

test('directional keypad <Av<A', () => {
    const keypad = new DirectionalKeypad();
    expect(keypad.getDirections("<Av<A").length).toBe(16);
});



test('test example', () => {
     const lines = readLines(__dirname + "/example.txt");
     expect(new Day21(lines).solvePart1()).toBe(126384);
});

test('test example part 2', () => {
     const lines = readLines(__dirname + "/example.txt");
     expect(new Day21(lines).solvePart2()).toBe(0);
});



test('part 1', () => {
     const lines = readLines(__dirname + "/input.txt");
     console.log("Day 21 part 1: " + new Day21(lines).solvePart1());
});

test('part 2', () => {
    const lines = readLines(__dirname + "/input.txt");
     console.log("Day 21 part 2: " + new Day21(lines).solvePart2());
});
