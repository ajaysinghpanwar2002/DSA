package main

func dfs(node int, color []int, graph [][]int) bool {
	stack := []int{node}

	for len(stack) > 0 {
		curr := stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		color[node] = 0

		for _, neighbor := range graph[curr] {
			if color[neighbor] == -1 {
				// color the neighbor with opposite color
				color[neighbor] = 1 - color[curr]
				stack = append(stack, neighbor)
			} else if color[neighbor] == color[curr] {
				// If the neighbor has the same color, it's not bipartite
				return false
			}
		}
	}
	return true
}

func bfs(node int, color []int, graph [][]int) bool {
	queue := []int{node}
	color[node] = 0

	for len(queue) > 0 {
		curr := queue[0]
		queue = queue[1:]

		for _, neighbor := range graph[curr] {
			if color[neighbor] == -1 {
				color[neighbor] = 1 - color[curr]
				queue = append(queue, neighbor)
			} else if color[neighbor] == color[curr] {
				return false
			}
		}
	}
	return true
}

func isBipartite(graph [][]int) bool {
	color := make([]int, len(graph))
	for i := 0; i < len(graph); i++ {
		color[i] = -1
	}

	for i := 0; i < len(graph); i++ {
		if color[i] == -1 {
			if !dfs(i, color, graph) {
				return false
			}
		}
	}

	return true
}

func main() {
	// Example graph represented as an adjacency list
	graph := [][]int{
		{1, 3},
		{0, 2},
		{1, 3},
		{0, 2},
	}

	if isBipartite(graph) {
		println("The graph is bipartite")
	} else {
		println("The graph is not bipartite")
	}
}
