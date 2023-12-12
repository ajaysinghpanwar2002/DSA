/**
 * Cities: A, B, C, D, E
Routes:
A -> B
A -> C
B -> C
C -> D
D -> E
 */

class AdjacencyMatrices {
    public vertices: number;
    public matrix: number[][];
    constructor(vertices: number) {
        this.vertices = vertices;
        this.matrix = new Array(vertices).fill(0).map(() => new Array(vertices).fill(0))
    }
    addEdge(source: number, destination: number) {
        this.matrix[source][destination] = 1;
        this.matrix[destination][source] = 1;
    }
    displayMatrix() {
        for (let i = 0; i < this.vertices; i++) {
            console.log(this.matrix[i].join(' '));
        }
    }
}

const graph = new AdjacencyMatrices(5);

graph.addEdge(0, 1);
graph.addEdge(0, 2);
graph.addEdge(1, 3);
graph.addEdge(2, 4);

graph.displayMatrix();

export { }