// memoization
function f(i: number, j: number, s: string, t: string, dp: number[][]): number {
    if (j < 0) return 1;
    if (i < 0) return 0;

    if (dp[i][j] !== -1) return dp[i][j];

    if (s[i] === t[j]) return f(i - 1, j - 1, s, t, dp) + f(i - 1, j, s, t, dp);
    return dp[i][j] = f(i - 1, j, s, t, dp);
}

// tabulation
function numDistinctTabulation(s: string, t: string): number {
    let n = s.length;
    let m = t.length;

    let dp = new Array(n + 1).fill(0).map(() => new Array(m + 1).fill(0));

    for (let i = 0; i <= n; i++) dp[i][0] = 1;

    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= m; j++) {
            if (s[i - 1] === t[j - 1]) dp[i][j] = dp[i - 1][j - 1] + dp[i - 1][j];
            else dp[i][j] = dp[i - 1][j];
        }
    }
    return dp[n][m];
}

function numDistinct(s: string, t: string): number {
    let n = s.length;
    let m = t.length;

    // using memoization
    // let dp = new Array(n).fill(-1).map(() => new Array(m).fill(-1))
    // return f(n - 1, m - 1, s, t, dp);

    // using tabulation
    return numDistinctTabulation(s, t);
};

export { }