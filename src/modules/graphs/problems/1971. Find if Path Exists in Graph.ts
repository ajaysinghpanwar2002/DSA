function validPath(
    _: number,
    edges: number[][],
    source: number,
    destination: number
): boolean {
    if (source === destination) return true;

    const uf: { [vertice: number]: Set<number> } = {};
    for (const [u, v] of edges) {
        if (uf[u] == undefined) uf[u] = new Set<number>();
        if (uf[v] == undefined) uf[v] = new Set<number>();

        uf[u].add(v);
        uf[v].add(u);
    }

    const visited = new Set<number>();

    const dfs = (x: number, target: number): boolean => {
        if (visited.has(x) || !(x in uf)) return false;
        visited.add(x);
        const neighbours = uf[x];
        if (neighbours.has(target)) return true;
        return Array.from(neighbours).some((neighbour) => dfs(neighbour, target));
    };

    return dfs(source, destination);
}

/**
0 (Alice) -> 1 (Bob)
1 (Bob) -> 0 (Alice) | 2 (Charlie)
2 (Charlie) -> 1 (Bob) | 3 (David)
3 (David) -> 2 (Charlie) | 4 (Emma)
4 (Emma) -> 3 (David)
 */

class GraphAdjacencyList {
    public vertices: number;
    public list: number[][];
    constructor(vertices: number) {
        this.vertices = vertices;
        this.list = new Array(vertices).fill(null).map(() => new Array());
    }
    addEdge(source: number, destination: number) {
        this.list[source].push(destination);
        this.list[destination].push(source);
    }
}

const vertices = 5;
const graph = new GraphAdjacencyList(vertices);

graph.addEdge(0, 1);
graph.addEdge(0, 2);
graph.addEdge(1, 3);
graph.addEdge(2, 4);

export { }