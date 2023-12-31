function maxProfit(k: number, prices: number[]): number {
    const n = prices.length;

    // Create two arrays 'ahead' and 'cur' to store dynamic programming values
    const ahead = new Array(2).fill(null).map(() => new Array(k+1).fill(0));

    const cur = new Array(2).fill(null).map(() => new Array(k+1).fill(0));

    // Loop through the array to calculate the maximum profit
    for (let ind = n - 1; ind >= 0; ind--) {
        for (let buy = 0; buy <= 1; buy++) {
            for (let cap = 1; cap <= k; cap++) {

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

    return ahead[0][k];
};

export{}