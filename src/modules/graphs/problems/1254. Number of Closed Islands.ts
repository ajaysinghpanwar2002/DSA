function bfs(row: number, column: number, grid: number[][], visited: number[][]) {
    visited[row][column] = 1;
    let queue = [];
    queue.push([row, column])

    while (queue.length > 0) {
        let [row, column] = queue.shift();
        //check for the neighbors 
        const neighbors = [
            { delrow: 1, delcol: 0 },
            { delrow: -1, delcol: 0 },
            { delrow: 0, delcol: 1 },
            { delrow: 0, delcol: -1 }
        ]
        for (const neighbor of neighbors) {
            let neighborColumn = column + neighbor.delcol
            let neighborRow = row + neighbor.delrow

            // perform some validation 
            if (neighborRow >= 0 && neighborRow < grid.length &&
                neighborColumn >= 0 && neighborColumn < grid[0].length &&
                visited[neighborRow][neighborColumn]===0 &&
                grid[neighborRow][neighborColumn] === 0
            ) {
                visited[neighborRow][neighborColumn] = 1;
                queue.push([neighborRow, neighborColumn])
            }
        }
    }
}

function closedIsland(grid: number[][]): number {
    let n = grid.length;
    let m = grid[0].length;
    let visited = new Array(n).fill(0).map(() => new Array(m).fill(0));
    let count = 0;

    for (let i = 0; i < m; i++) {
        if (grid[0][i] === 0 && !visited[0][i]) {
            bfs(0, i, grid, visited);
        }
        if (grid[n - 1][i] === 0 && !visited[n - 1][i]) {
            bfs(n - 1, i, grid, visited);
        }
    }
    for (let i = 0; i < n; i++) {
        if (grid[i][0] === 0 && !visited[i][0]) {
            bfs(i, 0, grid, visited);
        }
        if (grid[i][m - 1] === 0 && !visited[i][m - 1]) {
            bfs(i, m - 1, grid, visited);
        }
    }
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (!visited[i][j] && grid[i][j] === 0) {
                bfs(i, j, grid, visited);
                count++;
            }
        }
    }
    return count;
}