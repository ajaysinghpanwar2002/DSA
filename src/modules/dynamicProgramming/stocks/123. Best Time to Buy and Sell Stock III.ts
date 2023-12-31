// Time: O(2^n) i.e exponential, Space: O(n)
function f(ind: number, buy: number, cap: number, prices: number[]): number {
    let n = prices.length;
    let profit = 0;

    // base conditions
    if (ind === n) return 0;
    if (cap === 0) return 0;

    if (buy) profit = Math.max(-prices[ind] + f(ind + 1, 0, cap, prices), 0 + f(ind + 1, 1, cap, prices));
    else profit = Math.max(prices[ind] + f(ind + 1, 1, cap - 1, prices), 0 + f(ind + 1, 0, cap, prices))

    return profit;
}

// Time: O(n*3*2), Space: (n*2*3) + O(n)
function memoF(ind: number, buy: number, cap: number, prices: number[], dp: number[][][]): number {
    let n = prices.length;
    let profit = 0;

    // base conditions
    if (ind === n) return 0;
    if (cap === 0) return 0;

    // memo check 
    if (dp[ind][buy][cap] !== -1) return dp[ind][buy][cap];

    if (buy) profit = Math.max(-prices[ind] + f(ind + 1, 0, cap, prices), 0 + f(ind + 1, 1, cap, prices));
    else profit = Math.max(prices[ind] + f(ind + 1, 1, cap - 1, prices), 0 + f(ind + 1, 0, cap, prices));

    return dp[ind][buy][cap] = profit;
}

// Time: O(n*3*2), Space: O(n*3*2)
function tabulationF(prices: number[]): number {
    let n = prices.length;
    let dp = new Array(n + 1).fill(0).map(() => new Array(2).fill(0).map(() => new Array(3).fill(0)));

    for (let ind = n - 1; ind >= 0; ind--) {
        for (let buy = 0; buy <= 1; buy++) {
            for (let cap = 1; cap <= 2; cap++) {
                if (buy) dp[ind][buy][cap] = Math.max(-prices[ind] + dp[ind + 1][0][cap], 0 + dp[ind + 1][1][cap]);
                else dp[ind][buy][cap] = Math.max(prices[ind] + dp[ind + 1][1][cap - 1], 0 + dp[ind + 1][0][cap]);
            }
        }
    }
    return dp[0][1][2];
}

// Time: O(n*3*2), Space: O(1)
function spaceOptimisedF(prices: number[]): number {
    const n = prices.length;

    // Create two arrays 'ahead' and 'cur' to store dynamic programming values
    const ahead = new Array(2).fill(null).map(() => new Array(3).fill(0));

    const cur = new Array(2).fill(null).map(() => new Array(3).fill(0));

    // Loop through the array to calculate the maximum profit
    for (let ind = n - 1; ind >= 0; ind--) {
        for (let buy = 0; buy <= 1; buy++) {
            for (let cap = 1; cap <= 2; cap++) {

                if (buy === 0) { // We can buy the stock
                    cur[buy][cap] = Math.max(
                        0 + ahead[0][cap],
                        -prices[ind] + ahead[1][cap]
                    );
                }

                if (buy === 1) { // We can sell the stock
                    cur[buy][cap] = Math.max(
                        0 + ahead[1][cap],
                        prices[ind] + ahead[0][cap - 1]
                    );
                }
            }
        }
        ahead[0] = [...cur[0]]; // Update 'ahead' with the values from 'cur'
        ahead[1] = [...cur[1]]; // Update 'ahead' with the values from 'cur'
    }

    return ahead[0][2];
}

function maxProfit(prices: number[]): number {
    // basic recursion
    // return f(0, 1, 2, prices);

    // memoization
    // let n = prices.length;
    // let dp = new Array(n).fill(n).fill(-1).map(() => new Array(2).fill(-1).map(() => new Array(3).fill(-1)));
    // return memoF(0, 1, 2, prices, dp);

    // tabulation
    // return tabulationF(prices);

    // space optimisation
    return spaceOptimisedF(prices);
};

//----------------------------------------------------------------discussion section codes----------------------------------------------------------------------
function maxProfitdiscussion(prices: number[], n: number): number {
    // Memoization
    function f(ind: number, ts: number, prices: number[], dp: number[][]): number {
        // Base cases
        if (ind === n || ts === 4) return 0;
        if (dp[ind][ts] !== -1) return dp[ind][ts];
        if (ts % 2 === 0) {
            return (dp[ind][ts] = Math.max(
                -prices[ind] + f(ind + 1, ts + 1, prices, dp),
                f(ind + 1, ts, prices, dp)
            ));
        } else {
            return (dp[ind][ts] = Math.max(
                prices[ind] + f(ind + 1, ts + 1, prices, dp),
                f(ind + 1, ts, prices, dp)
            ));
        }
    }

    const dpMemo: number[][] = Array.from({ length: n }, () => Array(4).fill(-1));
    return f(0, 0, prices, dpMemo);
}

// Tabulation
function maxProfitDiscussionTabulation(prices: number[], n: number): number {
    const dp: number[][] = Array.from({ length: n + 1 }, () => Array(5).fill(-1));

    for (let i = 0; i <= 4; i++) {
        dp[n][i] = 0;
    }

    for (let i = 0; i <= n; i++) {
        dp[i][4] = 0;
    }

    for (let ind = n - 1; ind >= 0; ind--) {
        for (let ts = 3; ts >= 0; ts--) {
            if (ts % 2 === 0) {
                dp[ind][ts] = Math.max(-prices[ind] + dp[ind + 1][ts + 1], dp[ind + 1][ts]);
            } else {
                dp[ind][ts] = Math.max(prices[ind] + dp[ind + 1][ts + 1], dp[ind + 1][ts]);
            }
        }
    }

    return dp[0][0];
}

// 1-D Space Optimization
function maxProfitDiscussionSpaceOptimization(prices: number[], n: number): number {
    const ahead: number[] = Array(5).fill(-1);
    const cur: number[] = Array(5).fill(-1);

    for (let i = 0; i <= 4; i++) {
        ahead[i] = 0;
    }

    cur[4] = 0;

    for (let ind = n - 1; ind >= 0; ind--) {
        for (let ts = 3; ts >= 0; ts--) {
            if (ts % 2 === 0) {
                cur[ts] = Math.max(-prices[ind] + ahead[ts + 1], ahead[ts]);
            } else {
                cur[ts] = Math.max(prices[ind] + ahead[ts + 1], ahead[ts]);
            }
        }
        ahead.splice(0, ahead.length, ...cur);
    }

    return ahead[0];
}

export{}