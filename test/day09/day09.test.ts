import {Day09, Day09Parser, Defragmenter, DefragmenterWholeFile, DiskFile} from "../../src/day09/day09";
import {readAll} from "../../common/utils";

test('empty lines part 1', () => {
    expect(new Day09("").solvePart1()).toBe(0);
});

test('empty lines part 2', () => {
    expect(new Day09("").solvePart2()).toBe(0);
});

test('parser empty', () => {
    const parser = new Day09Parser("");
    expect(parser.files).toStrictEqual([]);
});

test('parser one file', () => {
    const parser = new Day09Parser("1");
    expect(parser.files).toStrictEqual([new DiskFile(0, 0, 1)]);
});

test('parser one file longer', () => {
    const parser = new Day09Parser("2");
    expect(parser.files).toStrictEqual([new DiskFile(0, 0, 2)]);
});

test('parser two files', () => {
    const parser = new Day09Parser("101");
    expect(parser.files).toStrictEqual([new DiskFile(0, 0, 1), new DiskFile(1, 1, 1)]);
});

test('parser two files with space', () => {
    const parser = new Day09Parser("111");
    expect(parser.files).toStrictEqual([new DiskFile(0, 0, 1), new DiskFile(1, 2, 1)]);
});

test('parser two longer files with longer space', () => {
    const parser = new Day09Parser("234");
    expect(parser.files).toStrictEqual([new DiskFile(0, 0, 2), new DiskFile(1, 5, 4)]);
});

test('parser three longer files with longer space', () => {
    const parser = new Day09Parser("12345");
    expect(parser.files).toStrictEqual([new DiskFile(0, 0, 1), new DiskFile(1, 3, 3), new DiskFile(2, 10, 5)]);
});

test('defragmenter one file', () => {
    const defragmenter = new Defragmenter([new DiskFile(0, 0, 1)]);
    expect(defragmenter.run()).toStrictEqual([new DiskFile(0, 0, 1)]);
});

test('defragmenter two files one space', () => {
    const defragmenter = new Defragmenter([new DiskFile(0, 0, 1), new DiskFile(1, 2, 1)]);
    expect(defragmenter.run()).toStrictEqual([new DiskFile(0, 0, 1), new DiskFile(1, 1, 1)]);
});

test('defragmenter two files big space', () => {
    const defragmenter = new Defragmenter([new DiskFile(0, 0, 1), new DiskFile(1, 10, 1)]);
    expect(defragmenter.run()).toStrictEqual([new DiskFile(0, 0, 1), new DiskFile(1, 1, 1)]);
});

test('defragmenter three files one space', () => {
    const defragmenter = new Defragmenter([new DiskFile(0, 0, 1), new DiskFile(1, 2, 1), new DiskFile(2, 4, 1)]);
    expect(defragmenter.run()).toStrictEqual([new DiskFile(0, 0, 1), new DiskFile(2, 1, 1), new DiskFile(1, 2, 1)]);
});

test('defragmenter three files two spaces', () => {
    const defragmenter = new Defragmenter([new DiskFile(0, 0, 1), new DiskFile(1, 3, 1), new DiskFile(2, 6, 1)]);
    expect(defragmenter.run()).toStrictEqual([new DiskFile(0, 0, 1), new DiskFile(2, 1, 1), new DiskFile(1, 2, 1)]);
});

test('defragmenter three files less space', () => {
    const defragmenter = new Defragmenter([new DiskFile(0, 0, 1), new DiskFile(1, 2, 1), new DiskFile(2, 4, 10)]);
    expect(defragmenter.run()).toStrictEqual([new DiskFile(0, 0, 1), new DiskFile(2, 1, 1), new DiskFile(1, 2, 1), new DiskFile(2, 3, 1), new DiskFile(2, 4, 8)]);
});

test('defragmenter whole one file', () => {
    const defragmenter = new DefragmenterWholeFile([new DiskFile(0, 0, 1)]);
    expect(defragmenter.run()).toStrictEqual([new DiskFile(0, 0, 1)]);
});

test('defragmenter whole two files one space', () => {
    const defragmenter = new DefragmenterWholeFile([new DiskFile(0, 0, 1), new DiskFile(1, 2, 1)]);
    expect(defragmenter.run()).toStrictEqual([new DiskFile(0, 0, 1), new DiskFile(1, 1, 1)]);
});


test('test example', () => {
    const lines = readAll(__dirname + "/example.txt");
    expect(new Day09(lines).solvePart1()).toBe(1928);
});

test('test example part 2', () => {
    const lines = readAll(__dirname + "/example.txt");
    expect(new Day09(lines).solvePart2()).toBe(2858);
});


test('part 1', () => {
    const lines = readAll(__dirname + "/input.txt");
    console.log("Day 09 part 1: " + new Day09(lines).solvePart1());
});

test('part 2', () => {
    const lines = readAll(__dirname + "/input.txt");
    console.log("Day 09 part 2: " + new Day09(lines).solvePart2());
});
