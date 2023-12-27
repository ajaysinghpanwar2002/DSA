function f(i: number, j: number): number {
    if (i === 0 && j === 0) return 1;
    if (i < 0 || j < 0) return 0;

    let up: number = f(i - 1, j);
    let left: number = f(i, j - 1);

    return up + left;
}

function memoF(i: number, j: number, dp: number[][]): number {
    if (i === 0 && j === 0) return 1;
    if (i < 0 || j < 0) return 0;

    if (dp[i][j] !== -1) return dp[i][j]

    let up: number = memoF(i - 1, j, dp);
    let left: number = memoF(i, j - 1, dp);

    return dp[i][j] = up + left;
}

function tabulation(m: number, n: number): number {
    let dp = new Array(m).fill(-1).map(() => new Array(n).fill(-1));

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (i == 0 && j == 0) dp[i][j] = 1;
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

function uniquePaths(m: number, n: number): number {
    //basic recursion
    // return f(m - 1, n - 1);

    // memoization
    // let dp = new Array(m).fill(-1).map(() => new Array(n).fill(-1));
    // return memoF(m - 1, n - 1, dp);

    // tabulation
    return tabulation(m, n);

};

export { }