package main

import "fmt"

type AdjacencyMatrices struct {
	vertices int
	matrix   [][]int
}

func newAdjacencyMatrices(vertices int) *AdjacencyMatrices {
	matrix := make([][]int, vertices)

	for i := range matrix {
		matrix[i] = make([]int, vertices)
	}

	return &AdjacencyMatrices{vertices: vertices, matrix: matrix}
}

func (am *AdjacencyMatrices) AddEdge(source, destination int) {
	if source >= am.vertices || destination >= am.vertices {
		fmt.Println("Error: Index out of bounds")
		return
	}
	am.matrix[source][destination] = 1
	am.matrix[destination][source] = 1
}

func (am *AdjacencyMatrices) displayMatrix() {
	for i := 0; i < am.vertices; i++ {
		fmt.Println(am.matrix[i])
	}
}

func main() {
	graph := newAdjacencyMatrices(5)

	graph.AddEdge(0, 1)
	graph.AddEdge(0, 2)
	graph.AddEdge(1, 3)
	graph.AddEdge(2, 4)

	graph.displayMatrix()
}
