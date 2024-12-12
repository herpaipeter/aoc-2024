import {Day12, FieldRange, RangeParser, SideCounter} from "../../src/day12/day12";
import {readLines} from "../../common/utils";
import {Point} from "../../common/point";

test('empty lines part 1', () => {
    expect(new Day12([""]).solvePart1()).toBe(0);
});

test('empty lines part 2', () => {
    expect(new Day12([""]).solvePart2()).toBe(0);
});

test('parser empty', () => {
    const parser = new RangeParser([]);
    expect(parser.colCount).toBe(0);
    expect(parser.rowCount).toBe(0)
});

test('range parser one element', () => {
    const parser = new RangeParser(["A"]);
    expect(parser.colCount).toBe(1);
    expect(parser.rowCount).toBe(1)
    expect(parser.ranges).toStrictEqual([new FieldRange("A", 1, 4, [new Point(0,0)])]);
});

test('range parser two fields range', () => {
    const parser = new RangeParser(["AA"]);
    expect(parser.ranges).toStrictEqual([new FieldRange("A", 2, 6, [new Point(0,0), new Point(0,1)])]);
});

test('range parser three fields range', () => {
    const parser = new RangeParser(["AAA"]);
    expect(parser.ranges).toStrictEqual([new FieldRange("A", 3, 8, [new Point(0,0), new Point(0,1), new Point(0,2)])]);
});

test('range parser vertical fields', () => {
    const parser = new RangeParser(["A", "A"]);
    expect(parser.ranges).toStrictEqual([new FieldRange("A", 2, 6, [new Point(0,0), new Point(1,0)])]);
});

test('range parser square', () => {
    const parser = new RangeParser(["AA", "AA"]);
    expect(parser.ranges).toStrictEqual([new FieldRange("A", 4, 8, [new Point(0,0), new Point(0,1), new Point(1,0), new Point(1,1)])]);
});

test('range parser different regions', () => {
    const parser = new RangeParser(["AB"]);
    expect(parser.ranges).toStrictEqual([new FieldRange("A", 1, 4, [new Point(0,0)]), new FieldRange("B", 1, 4, [new Point(0,1)])]);
});

test('range parser different regions but same again', () => {
    const parser = new RangeParser(["ABA"]);
    expect(parser.ranges).toStrictEqual([new FieldRange("A", 1, 4, [new Point(0,0)]),
        new FieldRange("B", 1, 4, [new Point(0,1)]),
        new FieldRange("A", 1, 4, [new Point(0,2)])
    ]);
});

test('range parser different regions', () => {
    const parser = new RangeParser(["AAAA", "BBCD", "BBCC", "EEEC"]);

    function expectRange(id: string, area: number, perimeter: number) {
        const range = parser.ranges.find(value => value.id === id);
        expect(range!.area).toBe(area);
        expect(range!.perimeter).toBe(perimeter);
    }

    expectRange("A", 4, 10);
    expectRange("B", 4, 8);
    expectRange("C", 4, 10);
    expectRange("D", 1, 4);
    expectRange("E", 3, 8);
});

test('side counter empty', () => {
    const sideCounter = new SideCounter([]);
    expect(sideCounter.getSides()).toBe(0);
});

test('side counter one element', () => {
    const sideCounter = new SideCounter([new Point(0,0)]);
    expect(sideCounter.getSides()).toBe(4);
});

test('side counter horizontal inline', () => {
    const sideCounter = new SideCounter([new Point(0,0), new Point(0,1)]);
    expect(sideCounter.getSides()).toBe(4);
});

test('side counter diagonal', () => {
    const sideCounter = new SideCounter([new Point(0,0), new Point(0,1), new Point(1,1)]);
    expect(sideCounter.getSides()).toBe(6);
});



test('test example', () => {
     const lines = readLines(__dirname + "/example.txt");
     expect(new Day12(lines).solvePart1()).toBe(1930);
});

test('test example part 2', () => {
     const lines = readLines(__dirname + "/example.txt");
     expect(new Day12(lines).solvePart2()).toBe(1206);
});

test('test example 2 part 2', () => {
    const lines = readLines(__dirname + "/example2.txt");
    expect(new Day12(lines).solvePart2()).toBe(368);
});

test('test example 3 part 2', () => {
    const lines = readLines(__dirname + "/example3.txt");
    expect(new Day12(lines).solvePart2()).toBe(236);
});



test('part 1', () => {
     const lines = readLines(__dirname + "/input.txt");
     console.log("Day 12 part 1: " + new Day12(lines).solvePart1());
});

test('part 2', () => {
    const lines = readLines(__dirname + "/input.txt");
    console.log("Day 12 part 2: " + new Day12(lines).solvePart2());
});
