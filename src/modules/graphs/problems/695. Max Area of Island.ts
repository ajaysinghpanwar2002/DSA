function bfs(visited: number[][], grid: number[][], i: number, j: number) {
    visited[i][j] = 1;
    let area = 1;
    let queue = [];
    queue.push([[i, j], area]);

    while (queue.length > 0) {
        const [[row, column], area] = queue.shift();
        // calculate the neighbours 
        const neighbors = [
            { delRow: 1, delCol: 0 },
            { delRow: -1, delCol: 0 },
            { delRow: 0, delCol: 1 },
            { delRow: 0, delCol: -1 }
        ]
        for (const neighbor of neighbors) {
            const neighborRow = row + neighbor.delRow;
            const neighborColumn = column + neighbor.delCol;
            // apply some checks
            if (neighborRow > 0 && neighborRow < grid.length && neighborColumn > 0 && neighborColumn < grid[0].length && grid[neighborRow][neighborColumn] === 1 && visited[neighborRow][neighborColumn] === 0) {
                queue.push([[neighborRow, neighborColumn], area + 1])
            }

        }
    }
    return area;
}

function maxAreaOfIsland(grid: number[][]): number {
    let n = grid.length;
    let m = grid[0].length;
    let visited = new Array(n).fill(0).map(() => new Array(m).fill(0));
    const maxArea: number = 0;

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (!visited[i][j]) {
                let area = bfs(visited, grid, i, j);
                if(area > maxArea) maxArea = area; 
            }
        }
    }
    return maxArea;
};