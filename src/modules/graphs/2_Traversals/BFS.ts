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

    bfs(start: number) {
        const visited = new Array(this.vertices).fill(false);
        const queue = [];
        visited[start] = true;
        queue.push(start);

        while (queue.length > 0) {
            const vertex = queue.shift();
            process.stdout.write(vertex + ' ');
            if (vertex === undefined) break;
            for (const neighbor of this.adjacencyList[vertex]) {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    queue.push(neighbor);
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

console.log("Breadth-First Traversal (starting from vertex 0):");
graph.bfs(0);

export { }