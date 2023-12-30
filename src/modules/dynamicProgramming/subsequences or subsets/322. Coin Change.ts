function coinChange(coins: number[], amount: number): number {
    let n = coins.length;
    let dp = new Array(n).fill(-1).map(() => new Array(amount + 1).fill(-1));

    let ans = coinChangeUtils(coins, n - 1, amount, dp);

    // If 'ans' is still very large, it means it's not possible to form the target sum
    if (ans >= 1e9) return -1;
    return ans;
};

function coinChangeUtils(arr: number[], ind: number, T: number, dp: number[][]): number {
    if (ind === 0) {
        if (T % arr[0] === 0) return T / arr[0];
        else return 1e9;
    }

    if (dp[ind][T] !== -1) return dp[ind][T];

    let notTaken = 0 + coinChangeUtils(arr, ind - 1, T, dp);
    let taken = 1e9;
    if (arr[ind] <= T) taken = 1 + coinChangeUtils(arr, ind, T - arr[ind], dp);

    return dp[ind][T] = Math.min(notTaken, taken);
}

// Time Complexity: O(N*T), Space Complexity: O(N*T) + O(N)

function TabulateCoinChange(coins: number[], amount: number): number {
    let n = coins.length;
    let dp = new Array(n).fill(0).map(() => new Array(amount + 1).fill(0));

    for (let T = 0; T <= amount; T++) {
        if (T % coins[0] === 0) dp[0][T] = T / coins[0];
        else dp[0][T] = Infinity; 
    }

    for (let ind = 1; ind < n; ind++) {
        for (let T = 0; T <= amount; T++) {
            let notTake = dp[ind - 1][T]; 
            let take = Infinity; 
            if (coins[ind] <= T) take = 1 + dp[ind][T - coins[ind]];

            dp[ind][T] = Math.min(notTake, take);
        }
    }

    let ans = dp[n - 1][amount];
    // If 'ans' is still 'Infinity', it means it's not possible to form the target sum
    if (ans === Infinity) return -1;
    return ans;
}

export {}