function largestDivisibleSubset(nums: number[]): number[] {
    const n = nums.length;

    nums.sort((a, b) => a - b);

    const dp = new Array(n).fill(1);
    const hash = new Array(n).fill(0);

    // iterate through elements of the input array
    for (let i = 0; i < n; i++) {
        hash[i] = i; // iterate has with current index
        for (let prevIndex = 0; prevIndex < i; prevIndex++) {
            if (nums[i] % nums[prevIndex] === 0 && 1 + dp[prevIndex] > dp[i]) {
                dp[i] = 1 + dp[prevIndex];
                hash[i] = prevIndex;
            }
        }
    }

    // find maximum length ans its corresponding index in dp
    let ans = -1;
    let lastIndex = -1;
    for (let i = 0; i < n; i++) {
        if (dp[i] > ans) {
            ans = dp[i];
            lastIndex = i;
        }
    }

    // reconstruct the longest divisble 
    const temp = [];
    temp.push(nums[lastIndex]);

    while (hash[lastIndex] !== lastIndex) {
        lastIndex = hash[lastIndex];
        temp.push(nums[lastIndex]);
    }

    temp.reverse();
    return temp;
};

/**
 * The algorithm approach is stated as follows:
1) First of all sort the array,
2) Then find the longest divisible subsequence of the array.
3) In order to find the longest divisible subsequence, we will follow the algorithm used to find the longest increasing subsequence discussed.
4) The distinguishing factor between longest increasing subsequence and longest divisible subsequence is that we used to insert the element if arr[i] > arr[prev] but here we will insert the element when arr[i] % arr[prev] == 0.
5) At last return the hash array as the answer.
 * 
 */