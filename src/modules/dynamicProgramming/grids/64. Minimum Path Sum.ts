//basic recursion

function f(i: number, j: number, a: number[][]): number {
    if (i === 0 && j === 0) return a[0][0];
    if (i < 0 || j < 0) return Infinity;

    let up = a[i][j] + f(i - 1, j, a);
    let left = a[i][j] + f(i, j - 1, a);

    return Math.min(up, left);
}

function memoF(i: number, j: number, a: number[][], dp: number[][]): number {
    if (i === 0 && j === 0) return a[0][0];
    if (i < 0 || j < 0) return Infinity;

    if (dp[i][j] !== 0) return dp[i][j];

    let up = a[i][j] + f(i - 1, j, a);
    let left = a[i][j] + f(i, j - 1, a);

    return dp[i][j] = Math.min(up, left);
}

function tabulation(grid: number[][]): number {
    let m = grid.length;
    let n = grid[0].length;
    let dp = new Array(m).fill(0).map(() => new Array(n).fill(0));

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (i == 0 && j == 0) dp[i][j] = grid[0][0];
            else {
                let up = grid[i][j]
                let left = grid[i][j];
                
                if (i > 0) up = up + dp[i - 1][j];
                else up += Infinity;

                if (j > 0) left = left + dp[i][j - 1];
                else left += Infinity;

                dp[i][j] = Math.min(up, left);
            }
        }
    }
    return dp[m - 1][n - 1];
}

function minPathSum(grid: number[][]): number {
    let m = grid.length;
    let n = grid[0].length;

    // basic recursion
    // return f(m - 1, n - 1, grid)

    // applying memoization
    // let dp = new Array(m).fill(0).map(() => new Array(n).fill(0));
    // return memoF(m - 1, n - 1, grid, dp);

    // tabulation
    return tabulation(grid);
};  