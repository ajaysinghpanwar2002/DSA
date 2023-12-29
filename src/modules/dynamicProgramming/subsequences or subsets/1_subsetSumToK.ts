// Function to check if there is a subset of 'arr' with a sum equal to 'target'
function subsetSumUtil(ind: number, target: number, arr: number[], dp: number[][]): boolean {
    // If the target sum is 0, we have found a subset
    if (target === 0) return true;

    // If we have reached the first element in 'arr'
    if (ind === 0) return arr[0] === target;

    // If the result for this subproblem has already been computed, return it
    if (dp[ind][target] !== -1) return dp[ind][target] !== 0;

    // Try not taking the current element into the subset
    const notTaken: boolean = subsetSumUtil(ind - 1, target, arr, dp);

    // Try taking the current element into the subset if it doesn't exceed the target
    let taken: boolean = false;
    if (arr[ind] <= target)
        taken = subsetSumUtil(ind - 1, target - arr[ind], arr, dp);

    // Store the result in the dp array to avoid recomputation
    dp[ind][target] = notTaken || taken ? 1 : 0;
    return dp[ind][target] === 1;
}

// Function to check if there is a subset of 'arr' with a sum equal to 'k'
function subsetSumToK(n: number, k: number, arr: number[]): boolean {
    // Initialize a 2D DP array for memoization
    const dp: number[][] = Array.from({ length: n }, () => Array(k + 1).fill(-1));

    // Call the recursive subsetSumUtil function
    return subsetSumUtil(n - 1, k, arr, dp);
}

const arr: number[] = [1, 2, 3, 4];
const k: number = 4;
const n: number = arr.length;

// Call the subsetSumToK function and print the result
if (subsetSumToK(n, k, arr))
    console.log("Subset with the given target found");
else
    console.log("Subset with the given target not found");

export { }