// Time: O(2^n), Space: O(n) + O(n)
function f(ind: number, nums: number[]): number {
    if (ind === 0) return nums[ind];
    if (ind < 0) return 0;

    let pick = nums[ind] + f(ind - 2, nums);
    let notPick = 0 + f(ind - 1, nums);

    return Math.max(pick, notPick);
}

// Time: O(n), Space: O(n) + O(n)
function memoF(ind: number, nums: number[], dp: number[]): number {
    if (ind === 0) return nums[ind];
    if (ind < 0) return 0;

    if (dp[ind] !== -1) return dp[ind];

    let pick = nums[ind] + memoF(ind - 2, nums, dp);
    let notPick = 0 + memoF(ind - 1, nums, dp);

    return (dp[ind] = Math.max(pick, notPick));
}

// Time: O(n), Space: O(n)
function tabulation(nums: number[]): number {
    let n = nums.length;
    let dp = new Array(n).fill(-1);

    let neg = 0;
    dp[0] = nums[0];

    for (let i = 1; i < n; i++) {
        let take = nums[i];
        if (i > 1) take += dp[i - 2];
        let notTake = 0 + dp[i - 1];

        dp[i] = Math.max(take, notTake);
    }

    return dp[n - 1]; // Add this line to return the result
}

// Time: O(n), Space: O(1);
function spaceOptimisation(nums: number[]): number {
    let n = nums.length;
    let prev = nums[0];
    let prev2 = 0;
    for (let i = 1; i < n; i++) {
        let take = nums[i];
        if (i > 1) take += prev2;

        let notTake = 0 + prev;

        let curi = Math.max(take, notTake);
        prev2 = prev;
        prev = curi;
    }
    return prev;
}

function rob(nums: number[]): number {
    let n = nums.length;

    // basic recursion
    // return f(n - 1, nums);

    // memoization
    // let dp = new Array(n).fill(-1);
    // return memoF(n - 1, nums, dp);

    // tabulation
    // return tabulation(nums);

    // space optimisation
    return spaceOptimisation(nums);
}

export { }