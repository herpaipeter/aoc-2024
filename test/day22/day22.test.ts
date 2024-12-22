import {readLines} from "../../common/utils";
import {Day22, SecretNumber} from "../../src/day22/day22";

test('empty lines part 1', () => {
    expect(new Day22([]).solvePart1()).toBe(0);
});

test('empty lines part 2', () => {
    expect(new Day22([]).solvePart2()).toBe(0);
});


test('secret number initial 0', () => {
    let secretNumber = new SecretNumber(0);
    secretNumber.next();
    expect(secretNumber.getNumber).toBe(0);
});

test('secret number initial 123 sequential', () => {
    let secretNumber = new SecretNumber(123);
    secretNumber.next();
    expect(secretNumber.getNumber).toBe(15887950);
    secretNumber.next();
    expect(secretNumber.getNumber).toBe(16495136);
    secretNumber.next();
    expect(secretNumber.getNumber).toBe(527345);
    secretNumber.next();
    expect(secretNumber.getNumber).toBe(704524);
    secretNumber.next();
    expect(secretNumber.getNumber).toBe(1553684);
    secretNumber.next();
    expect(secretNumber.getNumber).toBe(12683156);
    secretNumber.next();
    expect(secretNumber.getNumber).toBe(11100544);
    secretNumber.next();
    expect(secretNumber.getNumber).toBe(12249484);
    secretNumber.next();
    expect(secretNumber.getNumber).toBe(7753432);
    secretNumber.next();
    expect(secretNumber.getNumber).toBe(5908254);
});

test('secret number 123 cycle 10', () => {
    let secretNumber = new SecretNumber(123);
    secretNumber.multi(10);
    expect(secretNumber.getNumber).toBe(5908254);
});

// test('secret number 123 multiDiffs 10', () => {
//     let secretNumber = new SecretNumber(123);
//     secretNumber.multiDiffs(10);
//     console.log(secretNumber.diffSeqs);
// });


test('test example', () => {
     const lines = readLines(__dirname + "/example.txt");
     expect(new Day22(lines).solvePart1()).toBe(37327623);
});

test('test example part 2', () => {
     const lines = readLines(__dirname + "/example2.txt");
     expect(new Day22(lines).solvePart2()).toBe(23);
});


test('part 1', () => {
     const lines = readLines(__dirname + "/input.txt");
     console.log("Day 22 part 1: " + new Day22(lines).solvePart1());
});

test('part 2', () => {
    const lines = readLines(__dirname + "/input.txt");
     console.log("Day 22 part 2: " + new Day22(lines).solvePart2());
});
