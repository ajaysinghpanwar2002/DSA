function maxProfit(prices: number[]): number {
    let mini = prices[0];
    let maxProfit = 0;
    let n = prices.length;

    for (let i = 1; i < n; i++) {
        let cost = prices[i] - mini;
        maxProfit = Math.max(maxProfit, cost);
        mini = Math.min(mini, prices[i]);
    }
    return maxProfit;
};

export { }