// Tabulation or Bottoms Up

// The Tabulation (also called as Bottoms up approach) is a systematic strategy within Dynamic Programming that involves solving subproblems iteratively, starting from the smallest subproblem and building towards the original problem. Instead of relying on recursive calls or memoization, this approach employs an array or table to store solutions to subproblems. By directly computing solutions from smaller subproblems, it eliminates redundant calculations and enhances efficiency.

//  Fibonacci Numbers

function fibonacci(n: number) {
    const dp = new Array(n + 1);
    dp[1] = dp[2] = 1;
    for (let i = 3; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp[n];
}

const n = 10;
console.log(`Fibonacci(${n}) = ${fibonacci(n)}`);


//Coin Change Problem

// In the Coin Change Problem, the goal is to find the minimum number of coins required to make a given amount. The Tabulation calculates solutions iteratively and stores them in an array, building towards the optimal solution.

function coinChange(coins: number[], amount: number) {
    const dp = new Array(amount + 1).fill(amount + 1);
    dp[0] = 0;

    for (let i = 1; i <= amount; i++) {
        for (let j = 0; j < coins.length; j++) {
            if (i >= coins[j]) {
                dp[i] = Math.min(dp[i], dp[i - coins[j]] + 1);
            }
        }
    }

    return dp[amount] > amount ? -1 : dp[amount];
}

const coins = [1, 2, 5];
const amount = 11;
console.log("Minimum number of coins:", coinChange(coins, amount));


// Longest Common Subsequence

// The Longest Common Subsequence problem aims to find the longest subsequence common to two sequences. The Tabulation constructs solutions for all possible subproblems and stores them in a table.


function longestCommonSubsequence(text1: string, text2: string) {
    const m = text1.length;
    const n = text2.length;
    const dp = new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(0));

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (text1[i - 1] === text2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }

    return dp[m][n];
}

const text1 = "abcde";
const text2 = "ace";
console.log("Longest Common Subsequence:", longestCommonSubsequence(text1, text2));


export { }


