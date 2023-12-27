function cherryPickup(grid: number[][]): number {
    const n = grid.length;
    const m = grid[0].length;
    const dp = new Array(n).fill(-1).map(() => new Array(m).fill(-1).map(() => new Array(m).fill(-1)));

    return maxCherryUtil(0, 0, m - 1, n, m, grid, dp);
};

function maxCherryUtil(i: number, j1: number, j2: number, n: number, m: number, grid: number[][], dp: number[][][]): number {
    // check if indices are out of bounds
    if (j1 < 0 || j1 >= m || j2 < 0 || j2 >= m) return -1e9; // avery large -ve value

    // Base case: If we are at the last row
    if (i === n - 1) {
        if (j1 === j2) return grid[i][j1]; // if both the indices are same, return the value at that position
        else return grid[i][j1] + grid[i][j2]; // if indeices different, return the sum of values.
    }

    if (dp[i][j1][j2] !== -1) return dp[i][j1][j2];

    let maxi = Number.MIN_SAFE_INTEGER;

    // Iterate
    for (let di = -1; di <= 1; di++) {
        for (let dj = -1; dj <= 1; dj++) {
            let ans;
            if (j1 === j2) ans = grid[i][j1] + maxCherryUtil(i + 1, j1 + di, j2 + di, n, m, grid, dp);
            else ans = grid[i][j1] + grid[i][j2] + maxCherryUtil(i + 1, j1 + di, j2 + dj, n, m, grid, dp);

            maxi = Math.max(maxi, ans);
        }
    }

    return dp[i][j1][j2] = maxi;
}