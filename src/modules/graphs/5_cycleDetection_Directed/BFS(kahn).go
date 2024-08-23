package main

import "fmt"

// we'll use topo sort in this, because as we know it only work in the directed acyclic graph

// so the approach is simple for an graph(adj list) we'll try to make an topo sort array and if the len of topo array is equal to the total elements then there is no cycle else we have a cycle

type Graph struct {
	vertices      int
	adjacencyList [][]int
}

func newGraph(vertices int) *Graph {
	list := make([][]int, vertices)
	for i := range list {
		list[i] = make([]int, 0)
	}

	return &Graph{vertices: vertices, adjacencyList: list}
}

func (g *Graph) AddEdge(source, destination int) {
	g.adjacencyList[source] = append(g.adjacencyList[source], destination)
}

func (g *Graph) topologicalSort() int {
	count := 0
	inDegree := make([]int, g.vertices)

	for i := 0; i < g.vertices; i++ {
		for _, neighbor := range g.adjacencyList[i] {
			inDegree[neighbor]++
		}
	}

	queue := []int{}
	for i := 0; i < g.vertices; i++ {
		if inDegree[i] == 0 {
			queue = append(queue, i)
		}
	}

	for len(queue) > 0 {
		curr := queue[0]
		queue = queue[1:]

		count++

		for _, neighbor := range g.adjacencyList[curr] {
			inDegree[neighbor]--
			if inDegree[neighbor] == 0 {
				queue = append(queue, neighbor)
			}
		}
	}

	return count
}

func isCycleDirectedGraph(graph Graph, N int) bool {
	return graph.topologicalSort() != N
}

func main() {
	graph := newGraph(6)
	graph.AddEdge(5, 2)
	graph.AddEdge(5, 0)
	graph.AddEdge(4, 0)
	graph.AddEdge(4, 1)
	graph.AddEdge(2, 3)
	graph.AddEdge(3, 1)

	isCycle := isCycleDirectedGraph(*graph, 6)
	fmt.Println(isCycle)
}
