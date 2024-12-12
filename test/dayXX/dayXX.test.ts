import {DayXX, DayXXParser} from "../../src/dayXX/dayXX";
import {readLines} from "../../common/utils";

test('empty lines part 1', () => {
    expect(new DayXX([]).solvePart1()).toBe(0);
});

test('empty lines part 2', () => {
    expect(new DayXX([]).solvePart2()).toBe(0);
});

test('parser empty', () => {
    const parser = new DayXXParser([]);
    expect(parser.colCount).toStrictEqual(0);
    expect(parser.rowCount).toStrictEqual(0);
});


test('test example', () => {
     const lines = readLines(__dirname + "/example.txt");
     expect(new DayXX(lines).solvePart1()).toBe(0);
});

test('test example part 2', () => {
     const lines = readLines(__dirname + "/example.txt");
     expect(new DayXX(lines).solvePart2()).toBe(0);
});


test('part 1', () => {
     const lines = readLines(__dirname + "/input.txt");
     console.log("Day XX part 1: " + new DayXX(lines).solvePart1());
});

test('part 2', () => {
    const lines = readLines(__dirname + "/input.txt");
     console.log("Day XX part 2: " + new DayXX(lines).solvePart2());
});
