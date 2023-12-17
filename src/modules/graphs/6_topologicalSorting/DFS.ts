export class Solution {
    private DFS(node: number, visited: number[], stack: number[], adj: number[][]) {
        visited[node] = 1;
        for (const neighbor of adj[node]) {
            if (!visited[node]) this.DFS(neighbor, visited, stack, adj);
        }
        stack.push(node);
    }
    public topoSort(adj: number[][]): number[] {
        let n = adj.length;
        let visited = new Array(n).fill(0);
        let stack: number[] = [];

        for (let i = 0; i < n; i++) {
            if (!visited[i]) {
                this.DFS(i, visited, stack, adj);
            }
        }

        let ans = [];
        while (stack.length > 0) {
            ans.push(stack[stack.length - 1]);
            stack.pop();
        }
        return ans;
    }
}