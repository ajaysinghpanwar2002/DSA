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
    let temp1 = [], temp2 = [];

    if (n == 1) return nums[0];

    for (let i = 0; i < n; i++) {
        if (i !== 0) temp1.push(nums[i])
        if (i !== n - 1) temp2.push(nums[i])
    }

    return Math.max(spaceOptimisation(temp1), spaceOptimisation(temp2));
}
