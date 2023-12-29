const mod = 1e9 + 7;

function countPartitionsUtil(
    ind: number,
    target: number,
    arr: number[],
    dp: number[][]
): number {
    if (ind === 0) {
        if (target === 0 && arr[0] === 0) return 2;
        if (target === 0 || target === arr[0]) return 1;
        return 0;
    }

    if (dp[ind][target] !== -1) return dp[ind][target];

    const notTaken = countPartitionsUtil(ind - 1, target, arr, dp);

    let taken = 0;
    if (arr[ind] <= target)
        taken = countPartitionsUtil(ind - 1, target - arr[ind], arr, dp);

    return (dp[ind][target] = (notTaken + taken) % mod);
}

function countPartitions(d: number, arr: number[]): number {
    const n = arr.length;
    let totSum = 0;
    for (let i = 0; i < arr.length; i++) {
        totSum += arr[i];
    }

    // Checking for edge cases
    if (totSum - d < 0) return 0;
    if ((totSum - d) % 2 === 1) return 0;

    const s2 = (totSum - d) / 2;

    const dp: number[][] = Array.from({ length: n }, () =>
        Array(s2 + 1).fill(-1)
    );
    return countPartitionsUtil(n - 1, s2, arr, dp);
}

const arr: number[] = [5, 2, 6, 4];
const d = 3;

console.log("The number of subsets found are", countPartitions(d, arr));

// -----------------------------------------------------------------------------------------------------
const mod = 1e9 + 7;

function findWays(num: number[], tar: number): number {
    const n = num.length;

    const dp: number[][] = Array.from({ length: n }, () =>
        Array(tar + 1).fill(0)
    );

    if (num[0] === 0) dp[0][0] = 2; // 2 cases -pick and not pick
    else dp[0][0] = 1; // 1 case - not pick

    if (num[0] !== 0 && num[0] <= tar) dp[0][num[0]] = 1; // 1 case -pick

    for (let ind = 1; ind < n; ind++) {
        for (let target = 0; target <= tar; target++) {
            const notTaken = dp[ind - 1][target];

            let taken = 0;
            if (num[ind] <= target) taken = dp[ind - 1][target - num[ind]];

            dp[ind][target] = (notTaken + taken) % mod;
        }
    }
    return dp[n - 1][tar];
}

function countPartitionsTabulation(n: number, d: number, arr: number[]): number {
    let totSum = 0;
    for (let i = 0; i < n; i++) {
        totSum += arr[i];
    }

    // Checking for edge cases
    if (totSum - d < 0 || (totSum - d) % 2) return 0;

    return findWays(arr, (totSum - d) / 2);
}

const arr: number[] = [5, 2, 6, 4];
const n: number = arr.length;
const d: number = 3;

console.log("The number of subsets found are", countPartitionsTabulation(n, d, arr));


export { }
