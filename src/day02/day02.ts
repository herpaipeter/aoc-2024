export function solvePart1(lines: string[]): number {
    let safeCount = 0;
    for (let line of lines) {
        const nums = line.split(" ").map(str => parseInt(str));
        const safe = isSafe(nums);
        safeCount += safe ? 1 : 0;
    }
    return safeCount;
}

export function solvePart2(lines: string[]): number {
    let safes = 0;
    for (let line of lines) {
        const nums = line.split(" ").map(str => parseInt(str));
        let safe = isSafe(nums);
        if (!safe) {
            for (let i = 0; i < nums.length && !safe; i++) {
                let newNums = Array.from(nums);
                newNums.splice(i, 1);
                safe = isSafe(newNums);
            }
        }
        safes += safe ? 1 : 0;
    }
    return safes;
}

function isSafe(nums: number[]) {
    let safe = true;
    let signum = undefined;
    for (let i = 0; i < nums.length - 1 && safe; i++) {
        let diff = nums[i] - nums[i + 1];
        safe = (Math.abs(diff) <= 3);
        if (signum === undefined) {
            signum = Math.sign(diff);
        }
        if (signum === 0 || signum !== Math.sign(diff)) {
            safe = false;
        }
    }
    return safe;
}
