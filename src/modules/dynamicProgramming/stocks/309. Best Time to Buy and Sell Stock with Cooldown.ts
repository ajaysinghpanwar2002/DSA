function f(ind: number, buy: number, prices: number[], n: number, dp: number[][]): number {
    let profit = 0;
    // base condition 
    if (ind === n) return 0;

    if (dp[ind][buy] !== -1) return dp[ind][buy];

    if (buy) profit = Math.max(-prices[ind] + f(ind + 1, 0, prices, n, dp), 0 + f(ind + 1, 1, prices, n, dp))
    else profit = Math.max(prices[ind] + f(ind + 2, 1, prices, n, dp), 0 + f(ind + 1, 0, prices, n, dp))

    return dp[ind][buy] = profit;
}

function tabulationF(prices: number[]): number {
    let n = prices.length;
    let dp = new Array(n+2).fill(0).map(() => new Array(2).fill(0));

    for (let ind = n - 1; ind >= 0; ind--) {
        for (let buy = 0; buy < 2; buy++) {
            if (buy) dp[ind][buy] = Math.max(-prices[ind] + dp[ind + 1][0], 0 + dp[ind + 1][1])
            else dp[ind][buy] = Math.max(prices[ind] + dp[ind + 2][1], 0 + dp[ind + 1][0])
        }
    }
    return dp[0][1];
}

function maxProfit(prices: number[]): number {
    // let n = prices.length;
    // let dp = new Array(n).fill(-1).map(() => new Array(2).fill(-1));
    // return f(0, 1, prices, n, dp);
    return tabulationF(prices);
};

export { }