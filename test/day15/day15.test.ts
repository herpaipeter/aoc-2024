import {Day15, Day15Parser, Warehouse} from "../../src/day15/day15";
import {readBlocks} from "../../common/utils";
import {Point} from "../../common/point";

test('empty lines part 1', () => {
    expect(new Day15([]).solvePart1()).toBe(0);
});

test('empty lines part 2', () => {
    expect(new Day15([]).solvePart2()).toBe(0);
});

test('parser one wall, one direction', () => {
    const parser = new Day15Parser(["#","^"]);
    expect(parser.warehouse).toStrictEqual(new Warehouse([new Point(0,0)], [], undefined));
    expect(parser.movements).toStrictEqual(([new Point(-1,0)]));
});

test('parser one box, one direction', () => {
    const parser = new Day15Parser(["O","^"]);
    expect(parser.warehouse).toStrictEqual(new Warehouse([], [new Point(0,0)], undefined));
    expect(parser.movements).toStrictEqual(([new Point(-1,0)]));
});

test('robot position', () => {
    const parser = new Day15Parser(["@","^"]);
    expect(parser.warehouse).toStrictEqual(new Warehouse([], [], new Point(0,0)));
    expect(parser.movements).toStrictEqual(([new Point(-1,0)]));
});

test('both element', () => {
    const parser = new Day15Parser(["#O@","^"]);
    expect(parser.warehouse).toStrictEqual(new Warehouse([new Point(0,0)], [new Point(0,1)], new Point(0,2)));
    expect(parser.movements).toStrictEqual(([new Point(-1,0)]));
});

test('more lines', () => {
    const parser = new Day15Parser(["#O@\n#O#","^"]);
    expect(parser.warehouse).toStrictEqual(new Warehouse([new Point(0,0), new Point(1,0), new Point(1,2)], [new Point(0,1), new Point(1,1)], new Point(0,2)));
    expect(parser.movements).toStrictEqual(([new Point(-1,0)]));
});

test('parser direction right', () => {
    const parser = new Day15Parser(["",">"]);
    expect(parser.movements).toStrictEqual(([new Point(0,1)]));
});

test('parser direction down', () => {
    const parser = new Day15Parser(["","v"]);
    expect(parser.movements).toStrictEqual(([new Point(1,0)]));
});

test('parser direction left', () => {
    const parser = new Day15Parser(["","<"]);
    expect(parser.movements).toStrictEqual(([new Point(0,-1)]));
});

test('parser all directions', () => {
    const parser = new Day15Parser(["","<>^v"]);
    expect(parser.movements).toStrictEqual(([new Point(0,-1), new Point(0,1), new Point(-1,0), new Point(1,0)]));
});

test('move robot up', () => {
    const warehouse = new Warehouse(
        [],
        [],
        new Point(1,1));
    warehouse.moveRobot(new Point(-1, 0));
    expect(warehouse.robot).toStrictEqual(new Point(0,1));
});

test('cant move robot up because of walls', () => {
    const warehouse = new Warehouse(
        [new Point(0,0), new Point(0,1), new Point(0,2)],
        [],
        new Point(1,1));
    warehouse.moveRobot(new Point(-1, 0));
    expect(warehouse.robot).toStrictEqual(new Point(1,1));
});

test('move robot and box up', () => {
    const warehouse = new Warehouse(
        [],
        [new Point(1,1)],
        new Point(2,1));
    warehouse.moveRobot(new Point(-1, 0));
    expect(warehouse.boxes).toStrictEqual([new Point(0,1)]);
    expect(warehouse.robot).toStrictEqual(new Point(1,1));
});

test('move robot and boxes up', () => {
    const warehouse = new Warehouse(
        [],
        [new Point(0,1), new Point(1,1)],
        new Point(2,1));
    warehouse.moveRobot(new Point(-1, 0));
    expect(warehouse.boxes).toStrictEqual([new Point(-1,1), new Point(0,1)]);
    expect(warehouse.robot).toStrictEqual(new Point(1,1));
});

test('cant move robot and boxes up because of walls', () => {
    const warehouse = new Warehouse(
        [new Point(0,0), new Point(0,1), new Point(0,2)],
        [new Point(1,1), new Point(2,1)],
        new Point(3,1));
    warehouse.moveRobot(new Point(-1, 0));
    expect(warehouse.boxes).toStrictEqual([new Point(1,1), new Point(2,1)]);
    expect(warehouse.robot).toStrictEqual(new Point(3,1));
});



test('test example', () => {
     const lines = readBlocks(__dirname + "/small_example.txt");
     expect(new Day15(lines).solvePart1()).toBe(2028);
});

test('test example', () => {
    const lines = readBlocks(__dirname + "/example.txt");
    expect(new Day15(lines).solvePart1()).toBe(10092);
});

test('test example part 2', () => {
     const lines = readBlocks(__dirname + "/example.txt");
     expect(new Day15(lines).solvePart2()).toBe(0);
});


test('part 1', () => {
     const lines = readBlocks(__dirname + "/input.txt");
     console.log("Day XX part 1: " + new Day15(lines).solvePart1());
});

test('part 2', () => {
    const lines = readBlocks(__dirname + "/input.txt");
     console.log("Day XX part 2: " + new Day15(lines).solvePart2());
});
