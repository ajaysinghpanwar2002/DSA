function dfs(node: number, col: number, color: number[], adj: number[][]): boolean {
    color[start] = col;
    for (const neighbor of adj[node]) {
        if (color[neighbor] === -1) {
            if (dfs(neighbor, !col, color, adj) === false) return false;
        } else if ((color[neighbor] == col)) {
            return false;
        }
    }
    return true;
}

function isBipartite(graph: number[][]): boolean {
    let n: number = graph.length;
    let color: number[] = new Array(n).fill(-1);
    for (let i = 0; i < n; i++) {
        if (color[i] === -1) {
            if (!dfs(i, 0, graph, color)) {
                return false;
            }
        }
    }
    return true;
}

export { }