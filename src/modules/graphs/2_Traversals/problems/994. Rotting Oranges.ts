/**
 * @param {number[][]} grid
 * @return {number}
 */

/**
 * Algorithm : BFS 
 * we want the minimum time, and want to get them rotten equally in all 4 directions
 */

type QueueElement = [[[number, number], number]];

var orangesRotting = function (grid: number[][]): number {
    let n = grid.length;
    let m = grid[0].length;

    let queue: any = []; // [[r,c],t]
    const visited = new Array(n).fill(false).map(() => new Array(m).fill(false));

    // Create a function to check if a cell is valid
    const isValid = (r: number, c: number): boolean => {
        return r >= 0 && r < n && c >= 0 && c < m;
    };

    const enqueue = (queue: QueueElement, r: number, c: number, t: number): void => {
        queue.push([[r, c], t]);
    }

    for (let i = 0; i < n; i++) { 
        for (let j = 0; j < m; j++) {
            if (grid[i][j] === 2) {
                enqueue(queue, i, j, 0);
                visited[i][j] = true;
            }
        }
    }

    let time = 0;

    // Define the four possible directions (up, down, left, right)
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];

    while (queue.length > 0) {
        let current = queue.shift() as [[number, number], number];
        let r = current[0][0];
        let c = current[0][1];

        time = current[1];

        for (let [dr, dc] of directions) {
            let newRow = r + dr;
            let newCol = c + dc;

            if (isValid(newRow, newCol) && grid[newRow][newCol] === 1 && !visited[newRow][newCol]) {
                enqueue(queue, newRow, newCol, time + 1);
                visited[newRow][newCol] = true;
            }
        }
    }

    // Check if there are any fresh oranges left
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (grid[i][j] === 1 && !visited[i][j]) {
                return -1; // There are fresh oranges left that can't be reached
            }
        }
    }

    return time;
};