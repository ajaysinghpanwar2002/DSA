function BFS(image: number[][], i: number, j: number, color: number, visited: boolean[][]) {//
    let inititalColor = image[i][j];
    if (inititalColor === color) return; // termination, means it's already filled with the given color
    image[i][j] = color;// marking it as visited

    let queue = [];
    queue.push([i, j]);
    while (queue.length > 0) {
        const [row, col] = queue.shift() as number[];

        const neighbors: { delRow: number, delCol: number }[] = [
            { delRow: -1, delCol: 0 },
            { delRow: 1, delCol: 0 },
            { delRow: 0, delCol: -1 },
            { delRow: 0, delCol: 1 },
        ];

        for (const neighbor of neighbors) {
            let nrow = row + neighbor.delRow;
            let ncol = col + neighbor.delCol;
            // check if the neighbor is valid and it is not visited and it is of the same color          
            if (nrow >= 0 && nrow < image.length && ncol >= 0 && ncol < image[0].length && image[nrow][ncol] === inititalColor && image[nrow][ncol] !== color) {
                image[nrow][ncol] = color;
                visited[nrow][ncol] = true;
                queue.push([nrow, ncol]);
            }
        }
    }
}

function floodFill(image: number[][], sr: number, sc: number, color: number): number[][] {
    let ans = image.map(row => [...row]); // copy of image
    let visited: boolean[][] = new Array(image.length).fill(null).map(() => new Array(image[0].length).fill(false));

    for (let i = 0; i <= sr; i++) {
        for (let j = 0; j <= sc; j++) {
            if (!visited[i][j]) {
                BFS(ans, i, j, color, visited);
            }
        }
    }

    return ans;
};
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
/**
 * @param {number[][]} image
 * @param {number} sr
 * @param {number} sc
 * @param {number} color
 * @return {number[][]}
 */

const neighbors = [
    { delRow: -1, delCol: 0 },
    { delRow: 1, delCol: 0 },
    { delRow: 0, delCol: -1 },
    { delRow: 0, delCol: 1 },
];

let DFS = (row, col, ans, image, newColor) => {
    let n = image.length;
    let m = image[0].length;
    let initialColor = image[row][col];
    if (ans[row][col] === newColor) {
        return; 
    }
    ans[row][col] = newColor;
    for (const neighbor of neighbors) {
        let nrow = row + neighbor.delRow;
        let ncol = col + neighbor.delCol;
        if (nrow >= 0 && nrow < n && ncol >= 0 && ncol < m && initialColor === image[nrow][ncol]) {
            DFS(nrow,ncol,ans,image,newColor)
        }
    }
}

var floodFill = function (image, sr, sc, newColor) {
    let ans = image.map(row => [...row]);
    DFS(sr, sc, ans, image, newColor);
    return ans;
};