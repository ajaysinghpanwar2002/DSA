class Solution {
    detect(src: number, adj: number[][], vis: number[]): boolean {
        vis[src] = 1; // make it visited
        const queue: [number, number][] = [];
        queue.push([src, -1]); // storing [value,previous]

        while (queue.length > 0) {
            const [node, parent] = queue.shift()!;

            for (const neighbor of adj[node]) {
                if (!vis[neighbor]) {
                    vis[neighbor] = 1;
                    queue.push([neighbor, node]);
                } else if (parent !== neighbor) {
                    return true;
                }
            }
        }
        return false;
    }

    isCycle(adj: number[][]): boolean {
        const n = adj.length;
        const visited: number[] = new Array(n).fill(0); // visited matrix 

        for (let i = 0; i < n; i++) {
            if (!visited[i]) {
                if (this.detect(i, adj, visited)) return true; // if any one is the component found with a cycle, it has a cycle
            }
        }
        return false;
    }
}

export { }