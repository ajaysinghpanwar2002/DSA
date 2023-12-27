function f(i: number, j: number, a: number[][], N: number): number {
    if (i === N - 1) return a[i][j];

    let down = a[i][j] + f(i + 1, j, a, N);
    let diagonal = a[i][j] + f(i + 1, j + 1, a, N);

    return Math.min(down, diagonal);
}

// time: O(N*N), space: O(N*N) + O(N)
function memoF(i: number, j: number, a: number[][], N: number, dp: number[][]): number {
    if (i === N - 1) return a[i][j];

    if (dp[i][j] !== 0) return dp[i][j];
    let down = a[i][j] + f(i + 1, j, a, N);
    let diagonal = a[i][j] + f(i + 1, j + 1, a, N);

    return dp[i][j] = Math.min(down, diagonal);
}

function tabulation(triangle: number[][]): number {
    let n = triangle.length;
    let dp = new Array(n).fill(0).map(() => new Array(n).fill(0));

    // Initialize the bottom row of the DP array with the values from the triangle
    for (let j = 0; j < n; j++) {
        dp[n - 1][j] = triangle[n - 1][j];
    }

    // Start from the second-to-last row and work upwards
    for (let i = n - 2; i >= 0; i--) {
        for (let j = 0; j <= i; j++) {
            // Calculate the minimum path sum by considering the down and diagonal moves
            const down = triangle[i][j] + dp[i + 1][j];
            const diagonal = triangle[i][j] + dp[i + 1][j + 1];

            // Store the minimum of down and diagonal in the DP array
            dp[i][j] = Math.min(down, diagonal);
        }
    }
    return dp[0][0];
}

function minimumTotal(triangle: number[][]): number {
    let rows = triangle.length;
    // basic recursion
    // return f(0, 0, triangle, rows);

    // memoization  
    // let dp = new Array(rows).fill(0).map(() => new Array(rows).fill(0));
    // return memoF(0, 0, triangle, rows, dp);

    // tabulation
    return tabulation(triangle);
};