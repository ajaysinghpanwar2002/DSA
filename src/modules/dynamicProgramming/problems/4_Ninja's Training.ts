// basic recursion
function f(day: number, last: number, points: number[][]): number {
    if (day === 0) {
        let maxi = 0;
        for (let task = 0; task < 3; task++) {
            if (task !== last) {
                maxi = Math.max(maxi, points[0][task]);
            }
        }
        return maxi;
    }
    let maxi = 0;
    for (let task = 0; task < 3; task++) {
        if (task !== last) {
            let point = points[day][task] + f(day - 1, task, points);
            maxi = Math.max(maxi, point);
        }
    }
    return maxi;
}

// Time: O(n*4) *3, space: O(n) + O(n*4)
function memoF(day: number, last: number, points: number[][], dp: number[][]): number {
    if (day === 0) {
        let maxi = 0;
        for (let task = 0; task < 3; task++) {
            if (task !== last) {
                maxi = Math.max(maxi, points[0][task]);
            }
        }
        return maxi;
    }

    if (dp[day][last] !== -1) return dp[day][last];

    let maxi = 0;
    for (let task = 0; task < 3; task++) {
        if (task !== last) {
            let point = points[day][task] + memoF(day - 1, task, points, dp);
            maxi = Math.max(maxi, point);
        }
    }
    return dp[day][last] = maxi;
}

// Time: O(n*4) *3, space: O(n*4)
function Tabulation(n: number, points: number[][]): number {
    let dp = new Array(n).fill(-1).map(() => new Array(4).fill(-1));

    // base cases
    dp[0][0] = Math.max(points[0][1], points[0][2]);
    dp[0][1] = Math.max(points[0][0], points[0][2]);
    dp[0][2] = Math.max(points[0][0], points[0][1]);
    dp[0][3] = Math.max(points[0][0], Math.max(points[0][1], points[0][2]));

    for (let day = 1; day < n; day++) {
        for (let last = 0; last < 4; last++) {
            dp[day][last] = 0;
            for (let task = 0; task < 3; task++) {
                if (task !== last) {
                    let point = points[day][task] + dp[day - 1][task]
                    dp[day][last] = Math.max(dp[day][last], point);
                }
            }
        }
    }
    return dp[n - 1][3];
}

function spaceOptimisation(n: number, points: number[][]): number {
    let dp = new Array(4).fill(-1);

    // base cases
    dp[0] = Math.max(points[0][1], points[0][2]);
    dp[1] = Math.max(points[0][0], points[0][2]);
    dp[2] = Math.max(points[0][0], points[0][1]);
    dp[3] = Math.max(points[0][0], Math.max(points[0][1], points[0][2]));
}

function ninjaTraining(n: number, points: number[][]): number {
    // basic recursion
    // return f(n - 1, 3, points);

    // memoization
    let dp = new Array(n).fill(-1).map(() => new Array(4).fill(-1));
    return memoF(n - 1, 3, points, dp);
}

export { }

// https://www.youtube.com/watch?v=AE39gJYuRog&list=PLgUwDviBIf0qUlt5H_kiKYaNSqJ81PMMY&index=8