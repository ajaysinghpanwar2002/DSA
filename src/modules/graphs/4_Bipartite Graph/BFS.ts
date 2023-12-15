function check(start: number, adj: number[][], color: number[]): boolean {
    let queue: number[] = [];
    queue.push(start);
    color[start] = 0;

    while (queue.length > 0) {
        let node: number | undefined = queue.shift();
        if (node !== undefined) {
            for (let neighbor of adj[node]) {
                if (color[neighbor] === -1) {
                    color[neighbor] = color[node] === 0 ? 1 : 0;
                    queue.push(neighbor);
                } else if (color[neighbor] === color[node]) {
                    return false; // neighbor is having the same color as the node
                }
            }
        }
    }
    return true;
}

function isBipartite(graph: number[][]): boolean {
    let n: number = graph.length;
    let color: number[] = new Array(n).fill(-1);
    for (let i = 0; i < n; i++) {
        if (color[i] === -1) {
            if (!check(i, graph, color)) {
                return false;
            }
        }
    }
    return true;
}

export { check, isBipartite }