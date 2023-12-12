class Graph {
    public vertices: number;
    public adjacencyList: Array<Array<number>>;
    constructor(vertices: number) {
        this.vertices = vertices;
        this.adjacencyList = new Array(vertices).fill(null).map(() => []);
    }

    addEdge(source: number, destination: number) {
        this.adjacencyList[source].push(destination);
        this.adjacencyList[destination].push(source); // For undirected graphs
    }

    dfs(start: number) {
        const visited = new Array(this.vertices).fill(false);
        const stack = [];
        stack.push(start);

        while (stack.length > 0) {
            const vertex = stack.pop();
            if (vertex === undefined) break;
            if (!visited[vertex]) {
                process.stdout.write(vertex + ' ');
                visited[vertex] = true;

                for (const neighbor of this.adjacencyList[vertex]) {
                    if (!visited[neighbor]) {
                        stack.push(neighbor);
                    }
                }
            }
        }
    }
}

const vertices = 7;
const graph = new Graph(vertices);

graph.addEdge(0, 1);
graph.addEdge(0, 2);
graph.addEdge(1, 3);
graph.addEdge(1, 4);
graph.addEdge(2, 5);
graph.addEdge(2, 6);

console.log("Depth-First Traversal (starting from vertex 0):");
graph.dfs(0);

export { }