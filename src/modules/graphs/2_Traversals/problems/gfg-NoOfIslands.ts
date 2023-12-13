/**
 * 
Given a grid of size n*m (n is the number of rows and m is the number of columns in the grid) consisting of '0's (Water) and '1's(Land). Find the number of islands.

Note: An island is either surrounded by water or boundary of grid and is formed by connecting adjacent lands horizontally or vertically or diagonally i.e., in all 8 directions.

Example 1:
Input: grid = {{0,1},{1,0},{1,1},{1,0}}
Output: 1
Explanation:
The grid is-
0 1
1 0
1 1
1 0
All lands are connected.

Example 2:
Input: grid = {{0,1,1,1,0,0,0},{0,0,1,1,0,1,0}}
Output:2
Expanation:
The grid is-
0 1 1 1 0 0 0
0 0 1 1 0 1 0 
There are two islands :- one is colored in blue 
and other in orange.
Your Task:

You don't need to read or print anything. Your task is to complete the function numIslands() which takes the grid as an input parameter and returns the total number of islands.

Expected Time Complexity: O(n*m)
Expected Space Complexity: O(n*m)

Constraints:
1 ≤ n, m ≤ 500
 */

class Solution {
    private bfs(grid: number[][], row: number, column: number, visited: boolean[][]): void {

        let n: number = grid.length;
        let m: number = grid[0].length;

        visited[row][column] = true; // step 1

        let queue: number[][] = [];// step2
        queue.push([row, column]);

        while (queue.length > 0) {
            let [row, column] = queue.shift() as number[];
            //********************************************************************************************************************************************
            // let's try to go in all 8 directions
            const neighbors: { delRow: number, delCol: number }[] = [
                { delRow: -1, delCol: 0 },
                { delRow: 1, delCol: 0 },
                { delRow: 0, delCol: -1 },
                { delRow: 0, delCol: 1 },
                { delRow: -1, delCol: -1 },
                { delRow: -1, delCol: 1 },
                { delRow: 1, delCol: -1 },
                { delRow: 1, delCol: 1 },
            ];
            for (const neighbor of neighbors) {
                let nrow = row + neighbor.delRow;
                let ncol = column + neighbor.delCol;
                // check if the neighbor is valid                   and not visited         and is land
                if (nrow >= 0 && nrow < n && ncol >= 0 && ncol < m && !visited[nrow][ncol] && grid[nrow][ncol] === 1) {
                    visited[nrow][ncol] = true;
                    queue.push([nrow, ncol]);
                }
            }
            //*********************************************************************************************************************************************** */
            // going in all 8 directions using 2 loops
            for (let delRow = -1; delRow <= 1; delRow++) {
                for (let delCol = -1; delCol <= 1; delCol++) {
                    let nrow = row + delRow;
                    let ncol = column + delCol;

                    // check if the neighbor is valid                  and not visited          and is land
                    if (nrow >= 0 && nrow < n && ncol >= 0 && ncol < m && !visited[nrow][ncol] && grid[nrow][ncol] === 1) {
                        visited[nrow][ncol] = true;
                        queue.push([nrow, ncol]);
                    }
                }
            }
            //*********************************************************************************************************************************************** */
        }
    }

    public noOfIslands(grid: number[][]): number {
        let n: number = grid.length;
        let m: number = grid[0].length;
        let visited: boolean[][] = new Array(n).fill(null).map(() => new Array(m).fill(false));
        let count: number = 0;
        for (let row = 0; row < n; row++) {
            for (let column = 0; column < m; column++) {
                if (!visited[row][column]) {
                    this.bfs(grid, row, column, visited);
                    count++;
                }
            }
        }
        return count;
    }
}


/**
 * Sudo code
 * for each row
 *      for each column
 *         if ! visited[row][column]
 *            bfs(row,column)
 *            count++
 * 
 * bfs(row,column)
 *  
 */

/**
 * Approach is simple 
 * 1) We will traverse the grid and for each cell(if not visited) we will do bfs
 * 2.0) In bfs we will mark the cell as visited and push it in queue
 * 2.1) In bfs we will traverse all 8 directions and mark all the cells as visited
 */