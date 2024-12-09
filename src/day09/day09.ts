export class Day09 {

    private parser: Day09Parser;

    constructor(line: string) {
        this.parser = new Day09Parser(line);
    }

    solvePart1(): number {
        const defragmented = new Defragmenter(this.parser.files).run();
        return this.sumDiskFiles(defragmented);
    }

    solvePart2(): number {
        const defragmented = new DefragmenterWholeFile(this.parser.files).run();
        return this.sumDiskFiles(defragmented);
    }

    private sumDiskFiles(diskFiles: DiskFile[]) {
        let sum = 0;
        for (let file of diskFiles) {
            for (let i = 0; i < file.length; i++) {
                sum += file.id * (file.start + i);
            }
        }
        return sum;
    }

}

class Space {
    private readonly _space: number;
    private readonly _index: number;

    constructor(index: number, space: number) {
        this._index = index;
        this._space = space;
    }

    get index(): number {
        return this._index;
    }

    get space(): number {
        return this._space;
    }
}

export class Defragmenter {

    private _files: DiskFile[] = [];

    constructor(files: DiskFile[]) {
        this._files = files;
    }

    run(): DiskFile[] {
        if (this._files.length < 2)
            return this._files;

        let ordered = [...this._files];
        let space = this.findFirstSpace(ordered);
        while (0 < space.space) {
            const last = ordered[ordered.length - 1];
            const before = ordered[space.index];
            const newLength = Math.min(last.length, space.space);
            ordered = [...ordered.slice(0, space.index + 1),
                new DiskFile(last.id, before.start + before.length, newLength),
                ...ordered.slice(space.index + 1)
            ];
            ordered.pop();
            if (last.length > space.space) {
                ordered.push(new DiskFile(last.id, last.start, last.length - space.space));
            }
            space = this.findFirstSpace(ordered);
        }
        return ordered;
    }

    private findFirstSpace(ordered: DiskFile[]) {
        for (let i = 0; i < ordered.length - 1; i++) {
            const first = ordered[i];
            const second = ordered[i + 1];
            const space = second.start - (first.start + first.length);
            if (0 < space) {
                return new Space(i, space);
            }
        }
        return new Space(ordered.length, 0);
    }
}

export class DefragmenterWholeFile {

    private _files: DiskFile[] = [];

    constructor(files: DiskFile[]) {
        this._files = files;
    }

    run(): DiskFile[] {
        if (this._files.length < 2)
            return this._files;

        let orig = this._files;
        let ordered = [...this._files];
        for (let i = orig.length - 1; 0 <= i; i--) {
            let space = this.findFirstSpaceGT(ordered, orig[i].length, orig[i].start);
            if (0 < space.space) {
                const moveable = orig[i];
                const before = ordered[space.index];
                let removeIndex = ordered.findIndex(value => value.id === orig[i].id);
                ordered = [...ordered.slice(0, removeIndex), ...ordered.slice(removeIndex + 1)];
                ordered = [...ordered.slice(0, space.index + 1),
                    new DiskFile(moveable.id, before.start + before.length, moveable.length),
                    ...ordered.slice(space.index + 1)
                ];
            }
        }
        return ordered;
    }

    private findFirstSpaceGT(ordered: DiskFile[], size: number, maxPosition: number) {
        for (let i = 0; i < ordered.length - 1 && ordered[i].start < maxPosition; i++) {
            const first = ordered[i];
            const second = ordered[i + 1];
            const space = second.start - (first.start + first.length);
            if (size <= space) {
                return new Space(i, space);
            }
        }
        return new Space(ordered.length, 0);
    }

}

export class DiskFile {
    private _id: number;
    private _start: number;
    private _length: number;

    constructor(id: number, start: number, length: number) {
        this._id = id;
        this._start = start;
        this._length = length;

    }

    get id(): number {
        return this._id;
    }

    get start(): number {
        return this._start;
    }

    get length(): number {
        return this._length;
    }
}

export class Day09Parser {
    private _files: DiskFile[] = [];

    constructor(line: string) {
        this.parseLine(line);
    }

    private parseLine(line: string) {
        if (0 === line.length)
            return;
        let pos = 0;
        for (let i = 0; i < line.length; i++) {
            const length = parseInt(line[i]);
            if (i % 2 === 0) {
                this._files.push(new DiskFile(i / 2, pos, length));
            }
            pos += length;
        }
    }

    get files(): DiskFile[] {
        return this._files;
    }
}
