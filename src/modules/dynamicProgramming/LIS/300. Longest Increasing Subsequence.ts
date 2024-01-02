function lengthOfLIS(nums: number[]): number {
    let n = nums.length;

    /**@brute */
    // let maxCount = 0;
    // maxCount = generateSubsequence(0, [], nums, n);
    // return maxCount;

    /**@recurence */
    // return f(0, -1, nums, n);

    /**@memoization */
    // let dp = new Array(n).fill(-1).map(() => new Array(n + 1).fill(-1));
    // return memoF(0, -1, nums, n, dp);

    /**@tabulation */
    // return tabulationF(nums);

    /**@bestSoultion */
    // let dp = new Array(n).fill(1);
    // let maxi = 1;
    // for (let i = 0; i < n; i++) {
    //     for (let prev = 0; prev < i; prev++) {
    //         if (nums[prev] < nums[i]) {
    //             dp[i] = Math.max(dp[i], 1 + dp[prev]);
    //         }
    //     }
    //     maxi = Math.max(maxi, dp[i]);
    // }
    // return maxi;

    /**@binarySearch */
    // Create an empty array 'temp' to store the increasing subsequence
    const temp = [nums[0]];

    // Initialize the length of the longest increasing subsequence
    let len = 1;

    // Iterate through the input array starting from the second element
    for (let i = 1; i < n; i++) {
        if (nums[i] > temp[temp.length - 1]) {
            // If arr[i] is greater than the last element of 'temp', it extends the subsequence
            temp.push(nums[i]);
            len++;
        } else {
            // If not, we find the index where arr[i] can replace an element in 'temp'
            const ind = temp.findIndex((el) => el >= nums[i]);
            temp[ind] = nums[i];
        }
    }

    // 'len' now represents the length of the longest increasing subsequence
    return len;

}

/**@tabulation */
function tabulationF(arr: number[]): number {
    let n = arr.length;
    let dp = new Array(n + 1).fill(-1).map(() => new Array(n + 1).fill(0));

    for (let ind = n - 1; ind >= 0; ind--) {
        for (let prev_ind = ind - 1; prev_ind >= -1; prev_ind--) {
            if (dp[ind][prev_ind + 1] !== 0) return dp[ind][prev_ind + 1]

            //not pick
            let len = 0 + dp[ind + 1][prev_ind + 1]
            // pick case
            if (prev_ind === -1 || arr[ind] > arr[prev_ind]) len = Math.max(len, 1 + dp[ind + 1][ind + 1]);
            dp[ind][prev_ind + 1] = len;
        }
    }
    return dp[0][-1 + 1];
}

/**@memoization */
function memoF(ind: number, prev_ind: number, arr: number[], n: number, dp: number[][]): number {
    if (ind === n) return 0;

    if (dp[ind][prev_ind + 1] !== -1) return dp[ind][prev_ind + 1]

    //not pick
    let len = 0 + memoF(ind + 1, prev_ind, arr, n, dp);
    // pick case
    if (prev_ind === -1 || arr[ind] > arr[prev_ind]) len = Math.max(len, 1 + memoF(ind + 1, ind, arr, n, dp))

    return dp[ind][prev_ind + 1] = len;
}

/**@recurence */
function f(ind: number, prev_ind: number, arr: number[], n: number): number {
    if (ind === n) return 0;

    //not pick
    let len = 0 + f(ind + 1, prev_ind, arr, n);
    // pick case
    if (prev_ind === -1 || arr[ind] > arr[prev_ind]) len = Math.max(len, 1 + f(ind + 1, ind, arr, n))

    return len;
}

/**@brute */
function generateSubsequence(ind: number, ds: number[], arr: number[], n: number): number {
    if (ind === n) {
        let count = 1; // Initialize count to 1 for the last element
        for (let i = 0; i < ds.length - 1; i++) {
            if (ds[i] < ds[i + 1]) {
                count++;
            }
        }
        return count;
    }

    // Pick condition
    ds.push(arr[ind]);
    const pickCount = generateSubsequence(ind + 1, ds, arr, n);
    ds.pop();

    // Not pick condition
    const notPickCount = generateSubsequence(ind + 1, ds, arr, n);

    // Return the maximum count between pick and not pick
    return Math.max(pickCount, notPickCount);
}


export { }