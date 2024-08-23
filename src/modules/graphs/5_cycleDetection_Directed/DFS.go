package main

import "fmt"

type StackItem struct {
	node  int
	start bool
}

type Solution struct{}

func (s *Solution) isCyclicUtil(node int, adj [][]int, visited []int, pathVisited []int) bool {
	stack := []StackItem{{node, true}}

	for len(stack) > 0 {
		current := stack[len(stack)-1]
		stack = stack[:len(stack)-1]

		if current.start {
			visited[current.node] = 1
			pathVisited[current.node] = 1

			// Add a marker to reset pathVisited after exploring the node
			stack = append(stack, StackItem{current.node, false})

			// Add all adjacent nodes to the stack for DFS
			for _, neighbor := range adj[current.node] {
				if visited[neighbor] == 0 {
					stack = append(stack, StackItem{neighbor, true})
				} else if pathVisited[neighbor] == 1 {
					return true
				}
			}
		} else {
			pathVisited[current.node] = 0
		}
	}

	return false
}

func (s *Solution) isCyclic(adj [][]int) bool {
	n := len(adj)
	visited := make([]int, n)
	pathVisited := make([]int, n)

	for i := 0; i < n; i++ {
		if visited[i] == 0 {
			if s.isCyclicUtil(i, adj, visited, pathVisited) {
				return true
			}
		}
	}
	return false
}

func main() {
	s := &Solution{}
	adj := [][]int{
		{1},
		{2},
		{3},
		{4},
		{0},
	}

	fmt.Println(s.isCyclic(adj)) // Output: true
}
