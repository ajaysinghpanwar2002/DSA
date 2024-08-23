// https://www.codingninjas.com/studio/problems/frog-jump_3621012

// simple recursion
function f(ind: number, heights: number[]): number {

    if (ind == 0) return 0;

    let left = f(ind - 1, heights) + Math.abs(heights[ind] - heights[ind - 1]);
    let right = Infinity;
    if (ind > 1) right = f(ind - 2, heights) + Math.abs(heights[ind] - heights[ind - 2]);
    return Math.min(left, right);
}

// recusion with memoization
function memoF(ind: number, heights: number[], dp: number[]): number {

    if (ind == 0) return 0;

    if (dp[ind] != -1) return dp[ind];
    let left = memoF(ind - 1, heights, dp) + Math.abs(heights[ind] - heights[ind - 1]);
    let right = Infinity;
    if (ind > 1) right = memoF(ind - 2, heights, dp) + Math.abs(heights[ind] - heights[ind - 2]);
    return dp[ind] = Math.min(left, right);
}

// tabulation
function TabulationFrogJump(n: number, heights: number[]): number {
    let dp = new Array(n + 1).fill(0);
    dp[0] = 0;
    dp[1] = Math.abs(heights[1] - heights[0]);

    for (let i = 2; i <= n; i++) {
        let left = dp[i - 1] + Math.abs(heights[i] - heights[i - 1]);
        let right = Infinity;
        if (i > 1) right = dp[i - 2] + Math.abs(heights[i] - heights[i - 2]);
        dp[i] = Math.min(left, right);
    }
    return dp[n];
}

// space optimised tabulation
function SpaceOptimisedTabulationFrogJump(n: number, heights: number[]): number {
    let prev1 = 0;
    let prev2 = Math.abs(heights[1] - heights[0]);
    for (let i = 2; i <= n; i++) {
        let curi = Math.min(prev1 + Math.abs(heights[i] - heights[i - 1]), prev2 + Math.abs(heights[i] - heights[i - 2]));
        prev2 = prev1;
        prev1 = curi;
    }
    return prev1;
}

function frogJump(n: number, heights: number[]): number {
    //simple recursion
    return f(n - 1, heights);

    // memoization
    let dp = new Array(n + 1).fill(-1);
    return memoF(n - 1, heights, dp);
};

export { }