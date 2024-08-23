package main

func isCycle(Adj [][]int) bool {
	n := len(Adj)
	visited := make([]bool, n)

	for i := 0; i < n; i++ {
		if !visited[i] {
			if checkCycleDFSRecursive(i, -1, Adj, visited) {
				return true
			}
		}
	}

	return false
}

func checkCycleDFSRecursive(start int, parent int, Adj [][]int, visited []bool) bool {
	visited[start] = true
	for _, neighbor := range Adj[start] {
		if !visited[neighbor] {
			if checkCycleDFSRecursive(neighbor, start, Adj, visited) {
				return true
			}
		} else if neighbor != parent {
			return true
		}
	}
	return false
}
