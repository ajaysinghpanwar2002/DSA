function f(i: number, j: number, a: number[][]): number {
    if (i === 0 && j === 0) return 1;
    if (i < 0 || j < 0) return 0;
    if (i >= 0 && j >= 0 && a[i][j] === -1) return 0;

    let up: number = f(i - 1, j, a);
    let left: number = f(i, j - 1, a);

    return up + left;
}

function memoF(i: number, j: number, a: number[][], dp: number[][]): number {
    if (i === 0 && j === 0) return 1;
    if (i < 0 || j < 0) return 0;
    if (i >= 0 && j >= 0 && a[i][j] === -1) return 0;

    if (dp[i][j] !== -1) return dp[i][j];

    let up: number = memoF(i - 1, j, a, dp);
    let left: number = memoF(i, j - 1, a, dp);

    return dp[i][j] = up + left;
}

function tabulation(obstacleGrid: number[][]): number {
    let m = obstacleGrid.length;
    let n = obstacleGrid[0].length;

    let dp = new Array(m).fill(0).map(() => new Array(n).fill(0));

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (obstacleGrid[i][j] === 1) dp[i][j] = 0;
            else if (i === 0 && j === 0) dp[i][j] = 1;
            else {
                let up = 0;
                let left = 0;
                if (i > 0) up = dp[i - 1][j];
                if (j > 0) left = dp[i][j - 1];
                dp[i][j] = up + left;
            }
        }
    }
    return dp[m - 1][n - 1];
}

function uniquePathsWithObstacles(obstacleGrid: number[][]): number {
    let m = obstacleGrid.length;
    let n = obstacleGrid[0].length;

    // basic recursion
    // return f(m - 1, n - 1, obstacleGrid)

    // memoised recursion
    // let dp = new Array(m).fill(-1).map(() => new Array(n).fill(-1));
    // return memoF(m - 1, n - 1, obstacleGrid, dp);

    // tabulation
    return tabulation(obstacleGrid);
};

export { }