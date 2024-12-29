import {readLines} from "../../common/utils";
import {Day23, Day23Parser, Network, NodePair} from "../../src/day23/day23";

test('empty lines part 1', () => {
    expect(new Day23([]).solvePart1()).toBe(0);
});

test('empty lines part 2', () => {
    expect(new Day23([]).solvePart2()).toBe("");
});

test('parser empty', () => {
    const parser = new Day23Parser([]);
    expect(parser.nodePairs).toStrictEqual([])
});

test('parser one line', () => {
    const parser = new Day23Parser(["ab-cd"]);
    expect(parser.nodePairs).toStrictEqual([new NodePair("ab", "cd")])
});

test('parser multi lines', () => {
    const parser = new Day23Parser(["ab-cd", "ef-gh"]);
    expect(parser.nodePairs).toStrictEqual([new NodePair("ab", "cd"), new NodePair("ef", "gh")])
});


test('network empty', () => {
    const network = new Network([]);
    expect(network.getNeighbours("aa")).toStrictEqual(undefined);
});

test('network one pair', () => {
    const network = new Network([new NodePair("ab", "cd")]);
    expect(network.getNeighbours("ab")).toStrictEqual(["cd"]);
});

test('network one pair back', () => {
    const network = new Network([new NodePair("ab", "cd")]);
    expect(network.getNeighbours("cd")).toStrictEqual(["ab"]);
});

test('network two pairs', () => {
    const network = new Network([new NodePair("ab", "cd"), new NodePair("ab", "ef")]);
    expect(network.getNeighbours("ab")).toStrictEqual(["cd", "ef"]);
});

test('network path zero depth', () => {
    const network = new Network([new NodePair("ab", "cd"), new NodePair("ab", "ef")]);
    expect(network.getPath("ab", 0, undefined)).toStrictEqual(["ab"]);
});

test('network path one depth', () => {
    const network = new Network([new NodePair("ab", "cd"), new NodePair("ab", "ef")]);
    expect(network.getPath("ab", 1, undefined)).toStrictEqual(["ab,cd", "ab,ef"]);
});

test('network path two depth', () => {
    const network = new Network([new NodePair("ab", "cd"), new NodePair("ab", "ef"), new NodePair("cd", "ef")]);
    expect(network.getPath("ab", 2, undefined)).toStrictEqual(["ab,cd,ef"]);
});

test('network path two depth more paths', () => {
    const network = new Network([new NodePair("ab", "cd"), new NodePair("ab", "ef"), new NodePair("cd", "ef"), new NodePair("ef", "gh")]);
    expect(network.getPath("ab", 2, undefined)).toStrictEqual(["ab,cd,ef", "ab,ef,gh"]);
});

test('test example verticis', () => {
    const lines = readLines(__dirname + "/example.txt");
    const parser = new Day23Parser(lines);
    expect(new Network(parser.nodePairs).verticis()).toStrictEqual([
        "kh",
        "tc",
        "qp",
        "de",
        "cg",
        "ka",
        "co",
        "yn",
        "aq",
        "ub",
        "tb",
        "vc",
        "wh",
        "ta",
        "td",
        "wq"
    ]);
});

test('test input verticis', () => {
    const lines = readLines(__dirname + "/input.txt");
    const parser = new Day23Parser(lines);
    expect(new Network(parser.nodePairs).verticis().length).toBe(520);
});


test('test example', () => {
     const lines = readLines(__dirname + "/example.txt");
     expect(new Day23(lines).solvePart1()).toBe(7);
});

test('test example part 2', () => {
     const lines = readLines(__dirname + "/example.txt");
     expect(new Day23(lines).solvePart2()).toBe("co,de,ka,ta");
});



test('part 1', () => {
     const lines = readLines(__dirname + "/input.txt");
     console.log("Day 23 part 1: " + new Day23(lines).solvePart1());
});

test('part 2', () => {
    const lines = readLines(__dirname + "/input.txt");
     console.log("Day 23 part 2: " + new Day23(lines).solvePart2());
});
