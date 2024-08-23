function minimizeCost(n: number, k: number, height: number[]) {
    // basic recursion
    // return recursiveFunc(n - 1, k, height);

    // memoization
    // let dp = new Array(n + 1).fill(-1);
    // return memoMinCost(n - 1, k, height, dp);

    // tabulation
    return tabulateMinCost(n, k, height);
}

// Time: O(n*k), space: O(n);
function tabulateMinCost(n: number, k: number, height: number[]) {
    let dp = new Array(n + 1).fill(Infinity);

    dp[0] = 0;
    for (let ind = 1; ind <= n; ind++) {
        let minSteps = Infinity;
        for (let i = 1; i <= k && ind - i >= 0; i++) {
            let jump = dp[ind - i] + Math.abs(height[ind] - height[ind - i]);
            minSteps = Math.min(minSteps, jump);
        }
        dp[ind] = minSteps;
    }
    return dp[n - 1];
}

// Time : O(n), spaceL O(2n)
function memoMinCost(ind: number, k: number, height: number[], dp: number[]) {
    if (ind === 0) return 0;
    let minSteps = Infinity;

    if (dp[ind] !== -1) return dp[ind];

    for (let i = 1; i <= k && ind - i >= 0; i++) {
        let jump = memoMinCost(ind - i, k, height, dp) + Math.abs(height[ind] - height[ind - i]);
        minSteps = Math.min(minSteps, jump);
    }
    return dp[ind] = minSteps;
}

// Time : O(n^k), Space: O(n)
function recursiveFunc(ind: number, k: number, height: number[]) {
    if (ind === 0) return 0;
    let minSteps = Infinity;
    for (let i = 1; i <= k && ind - i >= 0; i++) {
        let jump = recursiveFunc(ind - i, k, height) + Math.abs(height[ind] - height[ind - i]);
        minSteps = Math.min(minSteps, jump);
    }
    return minSteps;
}

const output = minimizeCost(4, 2, [10, 40, 30, 10])
console.log(output); // 40

export { }

/**
 * 
 * Problem statement
There is an array of heights corresponding to 'n' stones. You have to reach from stone 1 to stone ‘n’.
From stone 'i', it is possible to reach stones 'i'+1, ‘i’+2… ‘i’+'k' , and the cost incurred will be | Height[i]-Height[j] |, where 'j' is the landing stone.
Return the minimum possible total cost incurred in reaching the stone ‘n’.

Example:
For 'n' = 3 , 'k' = 1, height = {2, 5, 2}.
Answer is 6.
Initially, we are present at stone 1 having height 2. We can only reach stone 2 as ‘k’ is 1. So, cost incurred is |2-5| = 3. Now, we are present at stone 2, we can only reach stone 3 as ‘k’ is 1. So, cost incurred is |5-2| = 3. So, the total cost is 6
 */