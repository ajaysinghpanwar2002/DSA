/**
 * 0/1 knapsack
 * 
 * weight   3    4     5
 * value   30    50   60 
 * try to get max value but the weigth upper limit is 8
 */

function knapsack(wt: number[], val: number[], n: number, w: number): number {
    let dp = new Array(n).fill(-1).map(() => new Array(w + 1).fill(-1));
    return knapsackUtil(wt, val, n - 1, w, dp);
}

function knapsackUtil(wt: number[], val: number[], ind: number, w: number, dp: number[][]): number {
    if (ind == 0 || w == 0) return 0;

    if (dp[ind][w] != -1) return dp[ind][w];

    let notTaken = knapsackUtil(wt, val, ind - 1, w, dp);
    let taken = 0;
    if (wt[ind] <= w) taken = val[ind] + knapsackUtil(wt, val, ind - 1, w - wt[ind], dp);

    return dp[ind][w] = Math.max(notTaken, taken);
}
function main() {
    const wt = [1, 2, 4, 5];
    let val = [5, 4, 8, 6];
    let w = 5;
    let n = wt.length;

    console.log("The Maximum value of items the thief can steal is ", knapsack(wt, val, n, w));
}

main()

// Time Complexity: O(N*W), Space Complexity: O(N*W) + O(N)
