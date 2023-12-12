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
    displayGraph(){
        for(let i=0; i<this.vertices; i++){
            console.log(i, '->', this.list[i].join(' '));
        }
    }
}

const vertices = 5;
const graph = new GraphAdjacencyList(vertices);

graph.addEdge(0, 1);
graph.addEdge(0, 2);
graph.addEdge(1, 3);
graph.addEdge(2, 4);

graph.displayGraph();

export { }