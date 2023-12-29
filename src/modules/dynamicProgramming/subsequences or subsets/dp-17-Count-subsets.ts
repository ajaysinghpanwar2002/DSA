function main() {
    const arr = [1, 2, 2, 3];
    const k = 3;

    console.log("the number of subsets found are: " + findWays(arr, k));
}

function findWays(nums: number[], k: number) {
    const n = nums.length;
    const dp = new Array(n).fill(-1).map(() => new Array(k + 1).fill(-1));

    return findWaysUtils(n - 1, k, nums, dp);
}

function findWaysUtils(ind: number, target: number, arr: number[], dp: number[][]) {
    if (ind === 0) {
        if (target === 0 && arr[0] === 0) return 2;
        if (target === 0 || target === arr[0]) return 1;
        return 0;
    }

    if (dp[ind][target] !== -1) return dp[ind][target];

    const notTaken: number = findWaysUtils(ind - 1, target, arr, dp);

    let taken: number = 0;
    if (arr[ind] <= target) taken = findWaysUtils(ind - 1, target - arr[ind], arr, dp);

    return dp[ind][target] = notTaken + taken;
}

main() // Time Complexity: O(N*K), Space Complexity: O(N*K) + O(N)

// Tabulation Time Complexity: O(N*K), Space Complexity: O(N*K)
function findWaysTabulation(num: number[], k: number) {
    let n = num.length;
    let dp = new Array(n).fill(0).map(() => new Array(k + 1).fill(0));

    // base case: if the target sum is zero
    for (let i = 0; i < n; i++) dp[i][0] = 1;

    // initialise the first row based on the first element of the array
    if (num[0] <= k) dp[0][num[0]] = 1;

    for (let ind = 1; ind < n; ind++) {
        for (let target = 1; target <= k; target++) {

            let notTaken = dp[ind - 1][target];
            let taken = 0;
            if (num[ind] <= target) taken = dp[ind - 1][target - num[ind]];

            dp[ind][target] = notTaken + taken;
        }
    }

    return dp[n - 1][k];
}

export { }