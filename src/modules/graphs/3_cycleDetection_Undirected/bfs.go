package main

type relation struct {
	node   int
	parent int
}

/*
@approach
1. We'll start a bfs traversal on the graph and we keep exploring
*/
func checkCycle(src int, adj [][]int, visited []bool) bool {
	visited[src] = true
	queue := []*relation{}
	queue = append(queue, &relation{node: src, parent: -1})

	for len(queue) > 0 {
		curr := queue[0]
		queue = queue[1:]

		for _, neighbor := range adj[curr.node] {
			if !visited[neighbor] {
				visited[neighbor] = true
				queue = append(queue, &relation{node: neighbor, parent: curr.node})
			} else if curr.parent != neighbor {
				// if it is already visited and it's not even the parent
				return true
			}
		}
	}
	return false
}

func isCycle(adj [][]int) bool {
	n := len(adj)
	visited := make([]bool, n)

	for i := 0; i < n; i++ {
		if !visited[i] {
			if checkCycle(i, adj, visited) {
				return true
			}
		}
	}
	return false
}
