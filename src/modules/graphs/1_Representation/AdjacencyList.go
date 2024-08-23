package main

import "fmt"

// GraphAdjacencyList represents a graph using an adjacency list
type GraphAdjacencyList struct {
	vertices int
	list     [][]int
}

// NewGraph creates a new graph with the specified number of vertices
func NewGraph(vertices int) *GraphAdjacencyList {
	g := &GraphAdjacencyList{
		vertices: vertices,
		list:     make([][]int, vertices),
	}
	for i := range g.list {
		g.list[i] = []int{}
	}
	return g
}

// AddEdge adds an edge between the source and destination vertices
func (g *GraphAdjacencyList) AddEdge(source, destination int) {
	g.list[source] = append(g.list[source], destination)
	g.list[destination] = append(g.list[destination], source)
}

// DisplayGraph displays the adjacency list representation of the graph
func (g *GraphAdjacencyList) DisplayGraph() {
	for i := 0; i < g.vertices; i++ {
		fmt.Printf("%d -> %v\n", i, g.list[i])
	}
}

func main() {
	vertices := 5
	graph := NewGraph(vertices)

	graph.AddEdge(0, 1)
	graph.AddEdge(0, 2)
	graph.AddEdge(1, 3)
	graph.AddEdge(2, 4)

	graph.DisplayGraph()
}
