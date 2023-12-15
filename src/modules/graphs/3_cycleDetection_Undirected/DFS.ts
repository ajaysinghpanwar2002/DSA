export class Solution {
    checkCycle(node: number, parent: number, adj: number[][], vis: number[]): boolean {
        vis[node] = 1;
        for (const neighbor of adj[node]) {
            if (!vis[neighbor]) {
                if (this.checkCycle(neighbor, node, adj, vis)) return true;
            } else if (neighbor !== parent) return true;
        }
        return false;
    }

    isCycle(Adj: number[][]) {
        const n = Adj.length;
        const visited = new Array(n).fill(0);
        for (let i = 0; i < n; i++) {
            if (!visited[i]) {
                if (this.checkCycle(i, -1, Adj, visited)) return true;
            }
        }
        return false;
    }
}