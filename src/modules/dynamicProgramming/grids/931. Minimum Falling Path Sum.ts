// memoization
function getMinUtil(i: number, j: number, m: number, matrix: number[][], dp: number[][]): number {
    // base case
    if (j < 0 || j >= m) return Infinity;
    if (i === 0) return matrix[0][j];

    if (dp[i][j] !== -1) return dp[i][j];

    // Calculate the maximum path sum by considering three possible directions: up, left diagonal, and right diagonal
    const up = matrix[i][j] + getMinUtil(i - 1, j, m, matrix, dp);
    const leftDiagonal = matrix[i][j] + getMinUtil(i - 1, j - 1, m, matrix, dp);
    const rightDiagonal = matrix[i][j] + getMinUtil(i - 1, j + 1, m, matrix, dp);

    // Store the maximum of the three paths in dp
    return dp[i][j] = Math.min(up, leftDiagonal, rightDiagonal);
}

//tabulation
function tabulation(matrix: number[][]) {
    const n = matrix.length;
    const m = matrix[0].length;

    // Initialize a 2D array dp to store maximum path sums
    const dp = new Array(n).fill(0).map(() => new Array(m).fill(0));

    // Initialize the first row of dp with values from the matrix
    for (let j = 0; j < m; j++) {
        dp[0][j] = matrix[0][j];
    }

    // Iterate over the matrix to calculate maximum path sums
    for (let i = 1; i < n; i++) {
        for (let j = 0; j < m; j++) {
            const up = matrix[i][j] + dp[i - 1][j];

            let leftDiagonal = matrix[i][j];
            if (j - 1 >= 0) leftDiagonal += dp[i - 1][j - 1];
            else leftDiagonal += 1e9; // Subtract a large negative value for invalid index

            let rightDiagonal = matrix[i][j];
            if (j + 1 < m) rightDiagonal += dp[i - 1][j + 1];
            else rightDiagonal += 1e9; // Subtract a large negative value for invalid index

            // Store the maximum of up, leftDiagonal, and rightDiagonal in dp
            dp[i][j] = Math.min(up, leftDiagonal, rightDiagonal);
        }
    }

    // Find the maximum value in the last row of dp
    let mini = Number.MAX_SAFE_INTEGER;
    for (let j = 0; j < m; j++) {
        mini = Math.min(mini, dp[n - 1][j]);
    }

    return mini;
}

function minFallingPathSum(matrix: number[][]): number {
    let rows = matrix.length;
    let columns = matrix[0].length;

    const dp: number[][] = Array.from({ length: rows }, () => Array(columns).fill(-1));
    let mini = Number.MAX_SAFE_INTEGER;

    // iterate through each cell in the first row to find the maximum path sum starting fromm each of them
    for (let j = 0; j < columns; j++) {
        const ans = getMinUtil(rows - 1, j, columns, matrix, dp);
        mini = Math.min(mini, ans);
    }

    return mini;
};
