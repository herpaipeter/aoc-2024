export class Day23 {

    private parser: Day23Parser;

    constructor(lines: string[]) {
        this.parser = new Day23Parser(lines);
    }

    solvePart1(): number {
        const network = new Network(this.parser.nodePairs);
        const nodeWithT = this.parser.nodePairs.map(value => value.first).filter(value => value.startsWith("t"));
        let paths: string[] = [];
        for (let t of nodeWithT) {
            paths.push(...network.getPath(t, 2, undefined));
        }
        const cleaned = network.distinct(paths);
        const filtered = network.filterCompleteSubs([...cleaned]);
        return filtered.size;
    }

    solvePart2Slow(): string {
        const network = new Network(this.parser.nodePairs);
        const verticis = network.verticis();
        let bigger = true;
        let filteredGood: Set<string> = new Set<string>();
        for (let i = 2; i < this.parser.nodePairs.length && bigger; ++i) {
            let paths: string[] = [];
            for (let t of verticis) {
                paths.push(...network.getPath(t, i, undefined));
            }
            const cleaned = network.distinct(paths);
            const filtered = network.filterCompleteSubs([...cleaned]);
            if (0 < filtered.size) {
                filteredGood = filtered;
            } else {
                bigger = false;
            }
        }
        return [...filteredGood].sort().join();
    }

    solvePart2() {
        const network = new Network(this.parser.nodePairs);
        const bk = new BronKerbosch(network);
        const longest = bk.cliques.sort((a, b) => b.size - a.size)[0];
        return [...longest].sort().join();
    }
}

export class Network {
    private _nodes: NodePair[];
    private _network: Map<string, string[]> = new Map<string, string[]>();

    constructor(nodes: NodePair[]) {
        this._nodes = nodes;
        this.buildNetwork();
    }

    verticis() {
        return [...this._network.keys()];
    }

    private buildNetwork() {
        for (let node of this._nodes) {
            if (this._network.has(node.first)) {
                this._network.get(node.first)!.push(node.second);
            } else {
                this._network.set(node.first, [node.second]);
            }
            if (this._network.has(node.second)) {
                this._network.get(node.second)!.push(node.first);
            } else {
                this._network.set(node.second, [node.first]);
            }
        }
    }

    getNeighbours(node: string) {
        return this._network.get(node);
    }

    getPath(node: string, depth: number, parent: string | undefined) {
        if (0 < depth) {
            const ns = this._network.get(node);
            if (ns) {
                const result: string[] = [];
                for (let n of ns) {
                    const subPaths = this.getPath(n, depth - 1, node);
                    for (let sub of subPaths) {
                        if (-1 === sub.indexOf(node))
                            result.push(node + "," + sub);
                    }
                }
                const cleaned = this.distinct(result);
                return [...cleaned];
            }
            return [];
        }
        return [node];
    }

    distinct(paths: string[]) {
        const result: Set<string> = new Set();
        for (let str of paths) {
            const parts = str.split(",");
            result.add(parts.sort().join());
        }
        return result;
    }

    filterCompleteSubs(paths: string[]) {
        const result: Set<string> = new Set();
        for (let str of paths) {
            const parts = str.split(",");
            let sumLength = 0;
            for (let p of parts) {
                sumLength += this.getNeighbours(p)!.filter(value => parts.some(value1 => value1 === value)).length
            }
            if (sumLength === parts.length * (parts.length - 1)) {
                result.add(parts.sort().join());
            }
        }
        return result;
    }
}

export class NodePair {
    private readonly _first: string;
    private readonly _second: string;

    constructor(first: string, second: string) {
        this._first = first;
        this._second = second;
    }

    get first(): string {
        return this._first;
    }

    get second(): string {
        return this._second;
    }
}


export class Day23Parser {
    private _nodePairs: NodePair[] = [];

    constructor(lines: string[]) {
        lines.map((line, r) => this.parseLine(line, r));
    }

    private parseLine(line: string, row: number) {
        const nodes = line.split("-");
        this._nodePairs.push(new NodePair(nodes[0], nodes[1]));
    }

    get nodePairs(): NodePair[] {
        return this._nodePairs;
    }

}

export class BronKerbosch {
    private _network: Network;

    constructor(network: Network) {
        this._network = network;
    }

    get cliques() {
        const p = new Set(this._network.verticis());
        let cliques: Array<Set<string>> = []
        this.execute(new Set(), p, new Set(), cliques);
        return cliques;
    }

    private execute(r: Set<string>, p: Set<string>, x: Set<string>, cliques: Array<Set<string>>) {
        if (0 === p.size && 0 === x.size) {
            cliques.push(r);
        } else {
            let cycleP = new Set(p);
            let cycleX = new Set(x);
            for (let v of p) {
                const vNeighbours = this._network.getNeighbours(v)!;
                const newR = new Set(r).add(v);
                const newP = new Set(vNeighbours.filter(i => cycleP.has(i)));
                const newX = new Set(vNeighbours.filter(i => cycleX.has(i)));
                this.execute(newR, newP, newX, cliques);
                cycleP.delete(v);
                cycleX.add(v);
            }
        }
    }
}