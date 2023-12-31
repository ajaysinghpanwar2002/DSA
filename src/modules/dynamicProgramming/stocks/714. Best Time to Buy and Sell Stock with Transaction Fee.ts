function tabulationF(prices: number[], fee: number): number {
    let n = prices.length;
    let dp = new Array(n + 2).fill(0).map(() => new Array(2).fill(0));

    for (let ind = n - 1; ind >= 0; ind--) {
        for (let buy = 0; buy < 2; buy++) {
            if (buy) dp[ind][buy] = Math.max(-prices[ind] + dp[ind + 1][0], 0 + dp[ind + 1][1])
            else dp[ind][buy] = Math.max(prices[ind] - fee + dp[ind + 1][1], 0 + dp[ind + 1][0])
        }
    }
    return dp[0][1];
}

function maxProfit(prices: number[], fee: number): number {
    return tabulationF(prices, fee);
};

export { }