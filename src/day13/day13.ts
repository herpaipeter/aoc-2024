import {Point} from "../../common/point";
import {getMatches, sumNumbers} from "../../common/utils";

export class Day13 {

    private readonly MAX_ITERATION = 100;
    private readonly A_TOKEN_VALUE = 3;

    private machines: ClawMachine[];

    constructor(lines: string[], prizePlus: number) {
        this.machines = lines.map(line => new Day13Parser(line, prizePlus).clawMachine);
    }

    solvePart1(): number {
        if (this.machines.length === 0)
            return 0;
        return this.machines.map(m => this.getTokens(m)).reduce(sumNumbers, 0);
    }

    solvePart2(): number {
        if (this.machines.length === 0)
            return 0;
        return this.machines.map(m => this.getTokensEquastion(m)).reduce(sumNumbers, 0);
    }

    private getTokens(machine: ClawMachine) {
        let tokenA = 0;
        let tokenB = 0;
        for (let i = 1; i <= this.MAX_ITERATION; i++) {
            if ((machine.prize.row - i * machine.buttonB.row) % machine.buttonA.row === 0) {
                const tempTokenB = i;
                const tempTokenA = (machine.prize.row - i * machine.buttonB.row) / machine.buttonA.row;
                if (tempTokenA * machine.buttonA.col + tempTokenB * machine.buttonB.col === machine.prize.col) {
                    tokenA = tempTokenA;
                    tokenB = tempTokenB;
                }
            }
        }
        return tokenA * this.A_TOKEN_VALUE + tokenB;
    }

    private getTokensEquastion(machine: ClawMachine) {
        const up = machine.prize.row * machine.buttonA.col - machine.prize.col * machine.buttonA.row;
        const down = machine.buttonB.row * machine.buttonA.col - machine.buttonB.col * machine.buttonA.row;
        const tokenB = up / down;
        if (tokenB === Math.floor(tokenB)) {
            const tokenA = (machine.prize.row - machine.buttonB.row * tokenB) / machine.buttonA.row;
            if (tokenA === Math.floor(tokenA)) {
                return tokenA * this.A_TOKEN_VALUE + tokenB;
            }
        }
        return 0;
    }
}

export class Day13Parser {
    private _clawMachine: ClawMachine;

    constructor(block: string, prizePlus: number) {
        const xs = getMatches(block, "X\\+[0-9]+");
        const ys = getMatches(block, "Y\\+[0-9]+");
        const xeq = getMatches(block, "X=[0-9]+");
        const yeq = getMatches(block, "Y=[0-9]+");
        const xadds = xs.map(value => parseInt(value.split("+")[1]));
        const yadds = ys.map(value => parseInt(value.split("+")[1]));
        const prizeX = parseInt(xeq[0].split("=")[1]) + prizePlus;
        const prizeY = parseInt(yeq[0].split("=")[1]) + prizePlus;
        this._clawMachine = new ClawMachine(new Point(xadds[0], yadds[0]), new Point(xadds[1], yadds[1]), new Point(prizeX, prizeY))
    }

    get clawMachine(): ClawMachine {
        return this._clawMachine;
    }

}

export class ClawMachine {
    private readonly _buttonA: Point;
    private readonly _buttonB: Point;
    private readonly _prize: Point;

    constructor(buttonA: Point, buttonB: Point, prize: Point) {
        this._buttonA = buttonA;
        this._buttonB = buttonB;
        this._prize = prize;
    }

    get buttonA(): Point {
        return this._buttonA;
    }

    get buttonB(): Point {
        return this._buttonB;
    }

    get prize(): Point {
        return this._prize;
    }
}
