package main

import "fmt"

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
	g.adjacencyList[destination] = append(g.adjacencyList[destination], source) // as we have undirected graph
}

func (g *Graph) Dfs(start int) []int {
	visited := make([]bool, g.vertices)
	stack := []int{}

	output := []int{}

	stack = append(stack, start)

	for len(stack) > 0 {
		curr := stack[len(stack)-1]
		stack = stack[:len(stack)-1]

		if !visited[curr] {
			output = append(output, curr)
			visited[curr] = true

			for _, neighbor := range g.adjacencyList[curr] {
				if !visited[neighbor] {
					stack = append(stack, neighbor)
				}
			}
		}
	}

	return output
}

func main() {
	graph := newGraph(7)

	graph.AddEdge(0, 1)
	graph.AddEdge(0, 2)
	graph.AddEdge(1, 3)
	graph.AddEdge(1, 4)
	graph.AddEdge(2, 5)
	graph.AddEdge(2, 6)

	dfsTraversal := graph.Dfs(0)
	fmt.Println(dfsTraversal)
}
