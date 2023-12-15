function updateMatrix(mat: number[][]): number[][] {
    let n = mat.length;
    let m = mat[0].length;

    let visited = new Array(n).fill(0).map(() => new Array(m).fill(0));
    let distance = new Array(n).fill(0).map(() => new Array(m).fill(0));

    let queue: Array<[number[], number]> = []

    const neighbors: { delRow: number, delCol: number }[] = [
        { delRow: -1, delCol: 0 },
        { delRow: 1, delCol: 0 },
        { delRow: 0, delCol: -1 },
        { delRow: 0, delCol: 1 },
    ];

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (mat[i][j] === 0) {
                queue.push([[i, j], 0]);
                visited[i][j] = 1;
            } else {
                visited[i][j] = 0;
            }
        }
    }

    while (queue.length > 0) {
        
        let [[row, col], steps] = queue.shift();
        distance[row][col] = steps;

        for (const neighbor of neighbors) {
            let nrow: number = row + neighbor.delRow;
            let ncol: number = col + neighbor.delCol;
            if (nrow >= 0 && nrow < n && ncol >= 0 && ncol < m && visited[nrow][ncol] === 0) {
                visited[nrow][ncol] = 1;
                queue.push([[nrow, ncol], steps + 1]);
            }
        }
    }
    return distance;
};