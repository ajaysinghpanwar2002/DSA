/**
 * steps
 * 1) writing a recursive solution to a problem
 * 2) memoizing it
 * 3) tabulation to it
 * 4) space optimization 
 */
import { measureTime } from "../utits";

function recursive(i: number, n: number): number {
    if (i === n - 1) return 1; // if we are at the last stage still it will be 1
    if (i === n) return 1; // base case reached at the end
    let x = recursive(i + 1, n);
    let y = recursive(i + 2, n);
    return x + y;
}

function MemoizedRecursion(i: number, n: number, arr: number[]): number {
    if (i >= n - 1) return 1;
    if (arr[i] !== -1) return arr[i];
    let x = MemoizedRecursion(i + 1, n, arr);
    let y = MemoizedRecursion(i + 2, n, arr);
    arr[i] = x + y;
    return arr[i];
}

function TabulationClimbingStairs(n: number): number {
    let dp = new Array(n + 1).fill(0);
    dp[0] = 1;
    dp[1] = 1;

    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp[n];
}

function SpaceOptimisedTabulation(n: number): number {
    let prev1 = 1;
    let prev2 = 1;
    for (let i = 2; i <= n; i++) {
        let curi = prev1 + prev2
        prev2 = prev1;
        prev1 = curi;
    }
    return prev1;
}

function climbStairs(n: number): number {
    // basic recursion
    return recursive(0, n);
    return measureTime(recursive, 0, n);

    // memoized recursion
    // let array = new Array(n).fill(-1);
    // return MemoizedRecursion(0, n, array);
    // return measureTime(MemoizedRecursion, 0, n, new Array(n).fill(-1));

    // tabulation
    // return TabulationClimbingStairs(n);
    // return measureTime(TabulationClimbingStairs, n);

    // space optimised tabulation
    // return SpaceOptimisedTabulation(n);
    return measureTime(SpaceOptimisedTabulation, n);

}

// Example usage:
console.log(climbStairs(5)); // Output: 8
