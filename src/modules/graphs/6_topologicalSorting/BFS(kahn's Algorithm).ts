class Graph {
    private vertices: number;
    private adjacencyList: number[][];

    constructor(vertices: number) {
        this.vertices = vertices;
        this.adjacencyList = new Array(vertices).fill(null).map(() => []);
    }

    addEdge(source: number, destination: number): void {
        this.adjacencyList[source].push(destination);
    }

    topologicalSort(): number[] {
        const result: number[] = [];
        const inDegree: number[] = new Array(this.vertices).fill(0);

        // Calculate in-degrees
        for (let i = 0; i < this.vertices; i++) {
            for (const neighbor of this.adjacencyList[i]) {
                inDegree[neighbor]++;
            }
        }

        const queue: number[] = [];
        for (let i = 0; i < this.vertices; i++) {
            if (inDegree[i] === 0) {
                queue.push(i);
            }
        }

        while (queue.length > 0) {
            const vertex = queue.shift() as number;
            result.push(vertex);

            for (const neighbor of this.adjacencyList[vertex]) {
                if (--inDegree[neighbor] === 0) {
                    queue.push(neighbor);
                }
            }
        }

        return result;
    }
}

const vertices: number = 6;
const graph: Graph = new Graph(vertices);

graph.addEdge(5, 2);
graph.addEdge(5, 0);
graph.addEdge(4, 0);
graph.addEdge(4, 1);
graph.addEdge(2, 3);
graph.addEdge(3, 1);

console.log("Topological Sorting:");
const sorted: number[] = graph.topologicalSort();
console.log(sorted.join(" "));
