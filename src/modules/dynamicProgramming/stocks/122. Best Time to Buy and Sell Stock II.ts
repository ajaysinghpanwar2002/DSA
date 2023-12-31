// basic recursion. Time Complexity: O(2^n), space: O(n);
function f(ind: number, buy: number, prices: number[], n: number) {
    if (ind === n) return 0;
    let profit = 0;

    /**
     * @buy
     * suppose if we can buy. there are 2 possibilities we buy that stock and we don't buy that stock. 
     * 1) if we buy there will decrese in money and the move to the next state with buy = 0 (so we cannot buy on the immediate next day prior selling). 
     * 2) if we don't buy that stock we move to the next state and with buy = 1 (can buy the next stock).
     * now we'll be considering the maximum of both the states to consider the profit.
     */
    if (buy) profit = Math.max(-prices[ind] + f(ind + 1, 0, prices, n), 0 + f(ind + 1, 1, prices, n));

    /**
     * @sell
     * if we cannot buy(bought the stock previously and have to sell to before buy another). there are 2 possibilites we sell the stock and we don't sell that stock
     * 1) if we sell, there will be increse the money and move to the next state with buy = 1,
     * 2) if we don't sell there will be no addition to the money and move to the next state with buy = 0 (so we cannot buy before we sell any stock)
     */
    else profit = Math.max(prices[ind] + f(ind + 1, 1, prices, n), 0 + f(ind + 1, 0, prices, n));

    return profit;
}

// memoization  Time Complexity: O(n*2), space: O(n)+O(n*2);
function memof(ind: number, buy: number, prices: number[], n: number, dp: number[][]): number {
    if (ind === n) return 0;
    let profit = 0;

    if (dp[ind][buy] !== -1) return dp[ind][buy];

    if (buy) profit = Math.max(-prices[ind] + memof(ind + 1, 0, prices, n, dp), 0 + memof(ind + 1, 1, prices, n, dp));
    else profit = Math.max(prices[ind] + memof(ind + 1, 1, prices, n, dp), 0 + memof(ind + 1, 0, prices, n, dp));

    return dp[ind][buy] = profit;
}

// tabulation Time complexity: O(n*2), space: O(n*2)
function tabulationF(prices: number[]): number {
    let n = prices.length;
    let dp = new Array(n).fill(0).map(() => new Array(2).fill(0))

    // Base case: profit is 0 on the last day for both buying and selling
    dp[n][0] = dp[n][1] = 0;

    // External loop for days (from the second to the first)
    for (let ind = n - 1; ind >= 0; ind--) {
        // Internal loop for transactions (buying or selling)
        for (let buy = 0; buy <= 1; buy++) {
            let profit = 0;

            // If the value is already computed, return it
            if (dp[ind][buy] !== -1) return dp[ind][buy];

            // Calculate the profit based on the current action (buy or sell)
            if (buy) {
                profit = Math.max(-prices[ind] + dp[ind + 1][0], 0 + dp[ind + 1][1]);
            } else {
                profit = Math.max(prices[ind] + dp[ind + 1][1], 0 + dp[ind + 1][0]);
            }

            // Store the computed profit in the dp array
            dp[ind][buy] = profit;
        }
    }

    // The final result is stored in dp[0][1] because we want to maximize profit when selling
    return dp[0][1];
}

// space optimization. Time complexity: O(N*2), space: O(1);
function spaceOptimised(prices: number[]): number {
    const n = prices.length;
    let ahead = [0, 0];
    let cur = [0, 0];

    // Base condition
    ahead[0] = ahead[1] = 0;

    for (let ind = n - 1; ind >= 0; ind--) {
        for (let buy = 0; buy <= 1; buy++) {
            let profit = 0;

            if (buy) profit = Math.max(-prices[ind] + ahead[0], 0 + ahead[1]);
            else profit = Math.max(prices[ind] + ahead[1], 0 + ahead[0]);

            cur[buy] = profit;
        }

        // The final result is stored in cur[0] because we want to maximize profit when buying
        ahead = cur;
    }
    return ahead[1];
}

// leetcode discussion space optimised, using 4 variables
function spaceOptimisedVariables(prices: number[]): number {
    let n = prices.length;
    let aheadNotBuy, aheadBuy, curBuy, curNotBuy;

    aheadNotBuy = aheadBuy = 0;

    for (let ind = n - 1; ind >= 0; ind--) {
        curNotBuy = Math.max(prices[ind] + aheadBuy, 0 + aheadNotBuy);
        curBuy = Math.max(-prices[ind] + aheadNotBuy, 0 + aheadBuy);

        aheadBuy = curBuy;
        aheadNotBuy = curNotBuy;
    }
    return aheadBuy;
}

function maxProfit(prices: number[]): number {
    let n = prices.length;
    // basic recursion
    // return f(0, 1, prices, n);

    // memoization
    // let dp = new Array(n).fill(-1).map(() => new Array(2).fill(-1))
    // return memof(0, 1, prices, n, dp);

    // tabulation
    // return tabulationF(prices);

    // space optimisation
    // return spaceOptimised(prices);

    // leetcode space optimised
    return spaceOptimisedVariables(prices);
};

export { maxProfit }