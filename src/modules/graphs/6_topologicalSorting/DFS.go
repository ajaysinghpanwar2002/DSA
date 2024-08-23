package main

import "fmt"

// Linear ordering of vertices such that if there is an edge between u and v, u appears before v in that ordering.

// Direct Acylic graph only

type Solution struct{}

func (s Solution) DFS(start int, visited []bool, stack *[]int, adj [][]int) {
	visited[start] = true
	for _, neighbor := range adj[start] {
		if !visited[start] {
			s.DFS(neighbor, visited, stack, adj)
		}
		*stack = append(*stack, start)
	}
}

func (s Solution) topoSort(adj [][]int) []int {
	n := len(adj)
	visited := make([]bool, n)
	stack := []int{}

	for i := 0; i < n; i++ {
		if !visited[i] {
			s.DFS(i, visited, &stack, adj)
		}
	}

	// Reverse the stack to get the topological order
	for i, j := 0, len(stack)-1; i < j; i, j = i+1, j-1 {
		stack[i], stack[j] = stack[j], stack[i]
	}
	return stack
}

func main() {
	adj := [][]int{
		{2, 3}, // Edges from vertex 0
		{3},    // Edges from vertex 1
		{},     // Edges from vertex 2
		{1},    // Edges from vertex 3
	}
	solution := Solution{}
	order := solution.topoSort(adj)
	fmt.Println(order) // Output should be in topological order
}
