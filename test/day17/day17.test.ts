import {Computer, Day17} from "../../src/day17/day17";

test('empty lines part 1', () => {
    expect(new Day17(0, 0, 0, []).solvePart1()).toBe("");
});

test('empty lines part 2', () => {
    expect(new Day17(0, 0, 0, []).solvePart2()).toStrictEqual([0]);
});

test('computer combo operand 0', () => {
    expect(new Computer(11, 12, 13, []).getComboOperand(0)).toBe(0);
});

test('computer combo operand 1', () => {
    expect(new Computer(11, 12, 13, []).getComboOperand(1)).toBe(1);
});

test('computer combo operand 3', () => {
    expect(new Computer(11, 12, 13, []).getComboOperand(3)).toBe(3);
});

test('computer combo operand 4', () => {
    expect(new Computer(11, 12, 13, []).getComboOperand(4)).toBe(11);
});

test('computer combo operand 5', () => {
    expect(new Computer(11, 12, 13, []).getComboOperand(5)).toBe(12);
});

test('computer combo operand 6', () => {
    expect(new Computer(11, 12, 13, []).getComboOperand(6)).toBe(13);
});


test('computer instruction 0 op 0', () => {
    const computer = new Computer(4, 0, 0, []);
    computer.instruction(0, 0);
    expect(computer.a).toBe(4);
});

test('computer instruction 0 op 1', () => {
    const computer = new Computer(4, 0, 0, []);
    computer.instruction(0, 1);
    expect(computer.a).toBe(2);
});

test('computer instruction 1 op 7', () => {
    const computer = new Computer(0, 29, 0, []);
    computer.instruction(1, 7);
    expect(computer.b).toBe(26);
});

test('computer instruction 2 op 0', () => {
    const computer = new Computer(0, 10, 0, []);
    computer.instruction(2, 0);
    expect(computer.b).toBe(0);
});

test('computer instruction 2 op 6', () => {
    const computer = new Computer(0, 10, 9, []);
    computer.instruction(2, 6);
    expect(computer.b).toBe(1);
});

test('computer instruction 3 op 0', () => {
    const computer = new Computer(0, 0, 0, []);
    computer.instruction(3, 10);
    expect(computer.pointer).toBe(0);
    computer.increasePointer();
    expect(computer.pointer).toBe(2);
});

test('computer instruction 3 op 10', () => {
    const computer = new Computer(1, 0, 0, []);
    computer.instruction(3, 10);
    expect(computer.pointer).toBe(10);
    computer.increasePointer();
    expect(computer.pointer).toBe(10);
});

test('computer instruction 4 op 0 simple 0 xor 0', () => {
    const computer = new Computer(0, 0, 0, []);
    computer.instruction(4, 0);
    expect(computer.b).toBe(0);
});

test('computer instruction 4 op 0 simple 1 xor 1', () => {
    const computer = new Computer(0, 1, 1, []);
    computer.instruction(4, 0);
    expect(computer.b).toBe(0);
});

test('computer instruction 4 op 0', () => {
    const computer = new Computer(0, 2024, 43690, []);
    computer.instruction(4, 0);
    expect(computer.b).toBe(44354);
});

test('computer instruction 5 op 0', () => {
    const computer = new Computer(0, 0, 0, []);
    computer.instruction(5, 0);
    expect(computer.output).toBe("0");
});

test('computer instruction 5 multiple times', () => {
    const computer = new Computer(10, 0, 0, []);
    computer.instruction(5, 0);
    computer.instruction(5, 1);
    computer.instruction(5, 4);
    expect(computer.output).toBe("0,1,2");
});

test('computer instruction 6 op 1', () => {
    const computer = new Computer(4, 0, 0, []);
    computer.instruction(6, 1);
    expect(computer.a).toBe(4);
    expect(computer.b).toBe(2);
    expect(computer.c).toBe(0);
});

test('computer instruction 7 op 1', () => {
    const computer = new Computer(4, 0, 0, []);
    computer.instruction(7, 1);
    expect(computer.a).toBe(4);
    expect(computer.b).toBe(0);
    expect(computer.c).toBe(2);
});

test('test example', () => {
     expect(new Day17(729, 0, 0, [0,1,5,4,3,0]).solvePart1()).toBe("4,6,3,5,6,3,5,2,1,0");
});

test('test example 1/2', () => {
    expect(new Day17(117440, 0, 0, [0,3,5,4,3,0]).solvePart1()).toBe("0,3,5,4,3,0");
});


test('part 1', () => {
     console.log("Day 17 part 1: " + new Day17(64012472, 0, 0, [2,4,1,7,7,5,0,3,1,7,4,1,5,5,3,0]).solvePart1());
});

test('part 2', () => {
    const program = [2,4,1,7,7,5,0,3,1,7,4,1,5,5,3,0];
    console.log("Day 17 part 2: " + new Day17(64012472, 0, 0, program).solvePart2());
});

test('computer one cycle', () => {
    const program = [2,4,1,7,7,5,0,3,1,7,4,1,5,5,3,0];

    for (let i = 0; i < 64; i++) {
        let as = "";
        let cs = "";
        let outs = "";
        for (let a = i * 8; a < (i + 1) * 8; a++) {
            const computer = new Computer(0, 0, 0, program);
            const out = computer.getOneCycleOutput(a, 0, 0);
            as += "\t" + a;
            cs += "\t" + computer.c;
            outs += "\t" + out;
        }
        //Uncomment this for results
        //console.log(as + "\n" + cs + "\n" + outs);
    }
});
