package main

import "fmt"

type Graph struct {
	vertices      int
	adjacencyList [][]int
}

func newGraph(vertices int) *Graph {
	List := make([][]int, vertices)
	for i := range List {
		List[i] = make([]int, 0)
	}

	return &Graph{
		vertices:      vertices,
		adjacencyList: List,
	}
}

func (g *Graph) AddEdge(source, destination int) {
	g.adjacencyList[source] = append(g.adjacencyList[source], destination)
}

func (g *Graph) topologicalSort() []int {
	result := []int{}
	inDegree := make([]int, g.vertices)

	// calculating indegrees
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

		result = append(result, curr)

		for _, neighbor := range g.adjacencyList[curr] {
			inDegree[neighbor]--
			if inDegree[neighbor] == 0 {
				queue = append(queue, neighbor)
			}
		}
	}

	return result
}

func main() {
	graph := newGraph(6)
	graph.AddEdge(5, 2)
	graph.AddEdge(5, 0)
	graph.AddEdge(4, 0)
	graph.AddEdge(4, 1)
	graph.AddEdge(2, 3)
	graph.AddEdge(3, 1)

	topoSort := graph.topologicalSort()
	fmt.Println(topoSort)
}
