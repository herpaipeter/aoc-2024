export class Day17 {

    private computer: Computer;
    private _program: number[];

    constructor(a: number, b: number, c: number, program: number[]) {
        this._program = program;
        this.computer = new Computer(a, b, c, program);
    }

    solvePart1(): string {
        this.computer.run();
        return this.computer.output;
    }

    solvePart2(): number[] {
        const computer = new Computer(0, 0, 0, this._program);
        const digits = [...this._program].reverse();
        let aValues = [0];
        for (let i = 0; i < digits.length; i++) {
            let newAValues = [];
            for (let a of aValues) {
                for (let probAbility = 8 * a; probAbility < 8 * (a + 1); probAbility++) {
                    let outStr = computer.getOneCycleOutput(probAbility, 0, 0);
                    let out = parseInt(outStr);
                    if (probAbility !== 0 && digits[i] === out) {
                        newAValues.push(probAbility);
                    }
                }
            }
            aValues = newAValues;
        }
        return aValues;
    }

}

export class Computer {
    private _a: number;
    private _b: number;
    private _c: number;
    private _pointer: number = 0;
    private pointerMove = true;
    private _output = "";
    program: number[];

    constructor(a: number, b: number, c: number, program: number[]) {
        this._a = a;
        this._b = b;
        this._c = c;
        this.program = program;
    }

    get a(): number {
        return this._a;
    }

    get b(): number {
        return this._b;
    }

    get c(): number {
        return this._c;
    }

    get pointer(): number {
        return this._pointer;
    }

    get output(): string {
        return this._output;
    }

    increasePointer() {
        if (this.pointerMove)
            this._pointer += 2;
        this.pointerMove = true;
    }

    run() {
        while (this.pointer < this.program.length - 1) {
            this.instruction(this.program[this.pointer], this.program[this.pointer + 1]);
            this.increasePointer();
        }
    }

    getOneCycleOutput(a: number, b: number, c: number) {
        this._a = a;
        this._b = b;
        this._c = c;
        this._output = "";
        for (let i = 0; i < this.program.length - 1; i += 2) {
            this.instruction(this.program[i], this.program[i + 1]);
        }
        return this.output;
    }

    getComboOperand(operand: number): number {
        if (0 <= operand && operand <= 3)
            return operand;
        else if (4 === operand)
            return this._a;
        else if (5 === operand)
            return this._b;
        else if (6 === operand)
            return this._c;
        return 0;
    }

    instruction(opcode: number, operand: number) {
        if (0 === opcode) {
            this._a = Number(BigInt(this.a) >> BigInt(this.getComboOperand(operand)));
        } else if (1 === opcode) {
            this._b = Number(BigInt(this.b) ^ BigInt(operand));
        } else if (2 === opcode) {
            this._b = this.getComboOperand(operand) % 8;
        } else if (3 === opcode) {
            if (this.a !== 0) {
                this._pointer = operand;
                this.pointerMove = false;
            }
        } else if (4 === opcode) {
            this._b = Number(BigInt(this.b) ^ BigInt(this.c));
        } else if (5 === opcode) {
            const outputValue = this.getComboOperand(operand) % 8;
            this._output += (0 < this._output.length ? "," : "") + outputValue.toString(10);
        } else if (6 === opcode) {
            this._b = Number(BigInt(this.a) >> BigInt(this.getComboOperand(operand)));
        } else if (7 === opcode) {
            this._c = Number(BigInt(this.a) >> BigInt(this.getComboOperand(operand)));
        }
    }
}
