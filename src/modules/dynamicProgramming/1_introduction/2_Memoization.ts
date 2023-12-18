// Memoization: The Top-Down Approach

// The Top-Down Approach to Memoization in Dynamic Programming involves solving a problem recursively by breaking it down into smaller subproblems. However, unlike regular recursion, Memoization saves the results of expensive function calls and reuses them when the same inputs are encountered again. It combines the elegance of recursion with the efficiency of avoiding redundant calculations. This approach is particularly suitable for problems with overlapping subproblems.

// Fibonacci Numbers

function fibonacci(n: number, memo: number[]) {
    if (n <= 1) {
        return n;
    }
    if (memo[n] !== -1) {
        return memo[n];
    }
    memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
    return memo[n];
}

const n = 10;
const memo = Array(n + 1).fill(-1);
console.log(`Fibonacci(${n}) = ${fibonacci(n, memo)}`);


// Coin Change Problem

// In the Coin Change Problem, the goal is to find the minimum number of coins required to make a given amount. Memoization enhances efficiency by preventing redundant calculations in recursive solutions.

function coinChange(coins: number[], amount: number, memo: number[]) {
    if (amount === 0) {
        return 0;
    }
    if (memo[amount] !== undefined) {
        return memo[amount];
    }
    let minCoins = Infinity;
    for (const coin of coins) {
        if (amount >= coin) {
            minCoins = Math.min(minCoins, 1 + coinChange(coins, amount - coin, memo));
        }
    }
    memo[amount] = minCoins;
    return minCoins;
}

const coins = [1, 2, 5];
const amount = 11;
const memo = [];
console.log("Minimum coins needed:", coinChange(coins, amount, memo));

// Longest Common Subsequence

// The Longest Common Subsequence problem aims to find the longest subsequence common to two sequences. Memoization stores previously computed solutions for subproblems, reducing the need for recalculations.

function longestCommonSubsequence(text1: string, text2: string, i:number, j:number) {
    if (i === 0 || j === 0) {
        return 0;
    }
    if (memo[i][j] !== -1) {
        return memo[i][j];
    }
    if (text1[i - 1] === text2[j - 1]) {
        memo[i][j] = 1 + longestCommonSubsequence(text1, text2, i - 1, j - 1);
    } else {
        memo[i][j] = Math.max(longestCommonSubsequence(text1, text2, i - 1, j), longestCommonSubsequence(text1, text2, i, j - 1));
    }
    return memo[i][j];
}

const text1 = "abcde";
const text2 = "ace";
const m = text1.length;
const n = text2.length;
const memo = new Array(m + 1).fill(null).map(() => new Array(n + 1).fill(-1));

console.log("Longest Common Subsequence:", longestCommonSubsequence(text1, text2, m, n));


export { }