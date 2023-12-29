// Function to check if it's possible to partition the array into two subsets with equal sum
function subsetSumUtil(ind: number, target: number, arr: number[], dp: number[][]): boolean {
    // Base case: If the target sum is 0, we found a valid partition
    if (target === 0)
        return true;

    // Base case: If we have considered all elements and the target is still not 0, return false
    if (ind === 0)
        return arr[0] === target;

    // If the result for this state is already calculated, return it
    if (dp[ind][target] !== -1)
        return dp[ind][target] !== 0;

    // Recursive cases
    // 1. Exclude the current element
    const notTaken = subsetSumUtil(ind - 1, target, arr, dp);

    // 2. Include the current element if it doesn't exceed the target
    let taken = false;
    if (arr[ind] <= target)
        taken = subsetSumUtil(ind - 1, target - arr[ind], arr, dp);

    // Store the result in the DP table and return
    dp[ind][target] = notTaken || taken ? 1 : 0;
    return dp[ind][target] !== 0;
}

// Function to check if the array can be partitioned into two equal subsets
function canPartition(arr: number[]): boolean {
    const n: number = arr.length;
    let totSum = 0;

    // Calculate the total sum of the array
    for (let i = 0; i < n; i++) {
        totSum += arr[i];
    }

    // If the total sum is odd, it cannot be partitioned into two equal subsets
    if (totSum % 2 === 1)
        return false;
    else {
        const k = totSum / 2;

        // Create a DP table with dimensions n x k+1 and initialize with -1
        const dp: number[][] = Array.from({ length: n }, () => Array(k + 1).fill(-1));

        // Call the subsetSumUtil function to check if it's possible to partition
        return subsetSumUtil(n - 1, k, arr, dp);
    }
}

const arr: number[] = [2, 3, 3, 3, 4, 5];
if (canPartition(arr))
    console.log("The Array can be partitioned into two equal subsets");
else
    console.log("The Array cannot be partitioned into two equal subsets");
