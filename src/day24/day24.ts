import {sumNumbers} from "../../common/utils";

export class Day24 {

    private parser: Day24Parser;

    constructor(lines: string[]) {
        this.parser = new Day24Parser(lines);
    }

    solvePart1(): number {
        if (0 === this.parser.wires.length || 0 === this.parser.gates.length)
            return 0;

        const calculator = new Calculator(this.parser.wires, this.parser.gates);
        return calculator.execute();
    }

    solvePart2(): number {
        if (0 === this.parser.wires.length || 0 === this.parser.gates.length)
            return 0;

        const gates = this.parser.gates;
        console.log("gates: " + gates.length);
        const xGates = gates.filter(value => value.wireIn1.id.startsWith("x") || value.wireIn2.id.startsWith("x"))
            .sort((a, b) => parseInt(a.wireIn1.id.substring(1)) - parseInt(b.wireIn1.id.substring(1)));
        this.logGates(xGates);

        const seconds = gates.filter(value => xGates.some(prev => prev.wireOut.id === value.wireIn1.id || prev.wireOut.id === value.wireIn2.id));
        this.logGates(seconds);

        const calculator = new Calculator(this.parser.wires, this.parser.gates);
        const result = calculator.execute();
        const x = calculator.toNumber(calculator.getWiresFor("x"));
        const y = calculator.toNumber(calculator.getWiresFor("y"));
        const wrong = [...result.toString(2)].reverse();
        const right = [...(x+y).toString(2)].reverse();
        const wrongZs = wrong.map((value, index) => {
            if (value !== right[index]) {
                return "z" + index.toLocaleString("hu", {minimumIntegerDigits: 2});
            } else {
                return "";
            }
        }).filter(value => 0 < value.length);
        console.log("wrongZs: " + wrongZs);

        let wrongZGates: Gate[] = [];
        for (let z of wrongZs) {
            wrongZGates.push(...gates.filter(value => value.wireOut.id === z));
        }

        for (let zGate of wrongZGates) {
            let wrongGates: Gate[] = [];
            wrongGates.push(zGate);
            let notChanged = false;
            let lastSize = wrongGates.length;
            let i = 0
            for (; i < 100 && !notChanged; i++) {
                let wg: Gate[] = []
                for (let gate of wrongGates) {
                    wg.push(...gates.filter(value => value.wireOut.id === gate.wireIn1.id || value.wireOut.id === gate.wireIn2.id));

                }
                wrongGates.push(...wg);
                wrongGates = [...new Set(wrongGates)];
                if (lastSize === wrongGates.length)
                    notChanged = true;
                lastSize = wrongGates.length;
            }
            console.log(zGate.wireOut.id + " iteration: " + i);
            this.logGates(wrongGates);
        }
        // for (let levelGates of wrongGates) {
        // }

        this.logCompare(result, x + y);
        return 0;
    }

    private logGates(gates: Gate[]) {
        let size = gates.length.toString(10);
        let line1 = gates.map(value => value.wireIn1.id).join(" ");
        let lineOp = gates.map(value => " " + value.operation + " ").join(" ");
        let line2 = gates.map(value => value.wireIn2.id).join(" ");
        let line3 = gates.map(value => value.wireOut.id).join(" ");
        console.log(size + "\n" + line1 + "\n" + lineOp + "\n"+ line2 + "\n" + line3);
    }

    private logCompare(w: number, r: number) {
        const wrong = [...w.toString(2)].reverse();
        const right = [...r.toString(2)].reverse();
        const tens = wrong.map((value, index) => Math.floor(index / 10)).join(" ");
        const ones = wrong.map((value, index) => index % 10).join(" ");
        console.log("wrong: " + wrong + "\n" + "right: " + right + "\n" + "       " + tens + "\n" + "       " + ones);
    }
}

export class Calculator {
    private _wires: Map<string, Wire> = new Map();
    private _gates: Gate[] = [];

    constructor(wires: Wire[], gates: Gate[]) {
        wires.forEach(value => this._wires.set(value.id, value));
        this._gates = gates;
    }

    execute() {
        const zWires = this.getWiresFor("z");
        while (zWires.some(value => value.value === undefined)) {
            for (let gate of this._gates) {
                if (gate.wireIn1.value !== undefined && gate.wireIn2.value !== undefined) {
                    if (gate.operation === "&") {
                        gate.wireOut.value = gate.wireIn1.value & gate.wireIn2.value;
                    } else if (gate.operation === "|") {
                        gate.wireOut.value = gate.wireIn1.value | gate.wireIn2.value;
                    } else if (gate.operation === "^") {
                        gate.wireOut.value = gate.wireIn1.value ^ gate.wireIn2.value;
                    }
                }
            }
        }
        let num = this.toNumber(zWires);
        return num;
    }

    getWiresFor(start: string) {
        const zWires = [...this._wires.values()].filter(value => value.id.startsWith(start));
        return zWires;
    }

    toNumber(wires: Wire[]) {
        wires.sort((a, b) => parseInt(a.id.substring(1)) - parseInt(b.id.substring(1)));
        return wires.map((value, index) => value.value! * Math.pow(2, index)).reduce(sumNumbers, 0);
    }
}

export class Wire {
    private _id: string;
    private _value: number | undefined;

    constructor(id: string, value: number | undefined) {
        this._id = id;
        this._value = value;
    }

    get id(): string {
        return this._id;
    }

    get value(): number | undefined {
        return this._value;
    }

    set value(value: number) {
        this._value = value;
    }
}

export class Gate {
    private _wireIn1: Wire;
    private _wireIn2: Wire;
    private _wireOut: Wire;
    private _operation: string;

    constructor(wireIn1: Wire, wireIn2: Wire, wireOut: Wire, operation: string) {
        this._wireIn1 = wireIn1;
        this._wireIn2 = wireIn2;
        this._wireOut = wireOut;
        this._operation = operation;
    }

    get wireIn1(): Wire {
        return this._wireIn1;
    }

    get wireIn2(): Wire {
        return this._wireIn2;
    }

    get wireOut(): Wire {
        return this._wireOut;
    }

    get operation(): string {
        return this._operation;
    }
}

export class Day24Parser {
    private _gates: Gate[] = [];
    private _wires: Wire[] = [];

    constructor(blocks: string[]) {
        if (0 === blocks.length)
            return;

        this.parseInitials(blocks[0]);
        this.parseGates(blocks[1]);
    }

    get gates(): Gate[] {
        return this._gates;
    }
    get wires(): Wire[] {
        return this._wires;
    }

    private parseInitials(lines: string) {
        if (0 === lines.length)
            return;

        for (let line of lines.split("\n")) {
            const wireTxt = line.split(":");
            this._wires.push(new Wire(wireTxt[0], parseInt(wireTxt[1])));
        }
    }

    private parseGates(lines: string) {
        if (0 === lines.length)
            return;

        for (let line of lines.split("\n")) {
            const wireTxts = line.split("->");
            let id1 = "";
            let id2 = "";
            let operation = "";
            if (wireTxts[0].includes(" AND ")) {
                const ins = wireTxts[0].split(" AND ");
                id1 = ins[0].trim();
                id2 = ins[1].trim();
                operation = "&";
            } else if (wireTxts[0].includes(" OR ")) {
                const ins = wireTxts[0].split(" OR ");
                id1 = ins[0].trim();
                id2 = ins[1].trim();
                operation = "|";
            } else if (wireTxts[0].includes(" XOR ")) {
                const ins = wireTxts[0].split(" XOR ");
                id1 = ins[0].trim();
                id2 = ins[1].trim();
                operation = "^";
            }

            const outId = wireTxts[1].trim();
            this._gates.push(new Gate(this.getWire(id1), this.getWire(id2), this.getWire(outId), operation));
        }
    }

    private getWire(id1: string) {
        let wire = this._wires.find(value => value.id === id1);
        if (!wire) {
            wire = new Wire(id1, undefined);
            this._wires.push(wire);
        }
        return wire;
    }
}
