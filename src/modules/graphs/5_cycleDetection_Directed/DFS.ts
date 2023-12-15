export class Solution {
    private dfsCheck(node: number, adj: number[][], visited: number[], pathVisited: number[]): boolean {
        visited[node] = 1;
        pathVisited[node] = 1;

        // traverse for adjacency nodes
        for (const neighbor of adj[node]) {
            // node is not visited
            if (!visited[neighbor]) {
                if (this.dfsCheck(neighbor, adj, visited, pathVisited) === true) return true;
            } else if (pathVisited[neighbor]) {// if the node has been previoulsy visited, but it has to be visited on the same path
                return true;
            }
        }


        pathVisited[node] = 0;
        return false;
    }
    public isCyclic(adj: number[][]) {
        let n = adj.length
        let visited = new Array(n).fill(0);
        let pathVisited = new Array(n).fill(0);

        for (let i = 0; i < n; i++) {
            if (!visited[i]) {
                if (this.dfsCheck(i, adj, visited, pathVisited) === true) return true;
            }
        }
        return false;
    }
}