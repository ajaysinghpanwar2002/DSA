function change(amount: number, coins: number[]): number {
    let n = coins.length;
    let dp = new Array(n).fill(-1).map(() => new Array(amount + 1).fill(-1));

    return changeUtils(coins, n - 1, amount, dp);
};

function changeUtils(arr: number[], ind: number, T: number, dp: number[][]): number {
    if (ind === 0) {
        if (T % arr[0] === 0) return 1;
        else return 0;
    }
    if (dp[ind][T] !== -1) return dp[ind][T];

    let notTaken = changeUtils(arr, ind - 1, T, dp);
    let taken = 0;
    if (arr[ind] <= T) taken = changeUtils(arr, ind, T - arr[ind], dp);

    return dp[ind][T] = notTaken + taken;
}

// Time Complexity: O(N*T), Space Complexity: O(N*T) + O(N)