package main

import (
	"math"
)

/* shortest path in the directed acyclic graphs with weights.
approach
	1. First we generate a toposort of the graph, So we have an topoArray(stack)
	2. We also will make a distance array with infinity as distance for every vertice
	3. And we keep iterating on the topoArray and exploring it's neighbors and updating the distance table
*/

type Solution struct{}

type Edge struct {
	destination int
	weight      int
}

func (s *Solution) topologicalSort(node int, adjList [][]Edge, visited []bool, stack *[]int) {
	visited[node] = true
	for _, neigbor := range adjList[node] {
		destination := neigbor.destination
		if !visited[destination] {
			s.topologicalSort(destination, adjList, visited, stack)
		}
	}
	*stack = append(*stack, node)
}

func (s *Solution) findShortestPath(numNodes int, numEdges int, edges [][]int) []int {
	// build adjacency list
	adjList := make([][]Edge, numNodes)

	for i := 0; i < numEdges; i++ {
		source, destination, weight := edges[i][0], edges[i][1], edges[i][2]
		adjList[source] = append(adjList[source], Edge{destination: destination, weight: weight})
	}

	// Topological sort
	visited := make([]bool, numNodes)
	stack := []int{}

	for i := 0; i < numNodes; i++ {
		if !visited[i] {
			s.topologicalSort(i, adjList, visited, &stack)
		}
	}

	// intialise distance
	distances := make([]int, numNodes)
	for i := range distances {
		distances[i] = math.MaxInt32
	}
	distances[0] = 0

	// process node in toplogical order
	for len(stack) > 0 {
		currentNode := stack[len(stack)-1]
		stack = stack[:len(stack)-1]

		for _, neighbor := range adjList[currentNode] {
			destination := neighbor.destination
			weight := neighbor.weight

			if distances[currentNode]+weight < distances[destination] {
				distances[destination] = weight + distances[currentNode]
			}
		}
	}

	// Replace the unreachable nodes with -1
	for i := range distances {
		if distances[i] == math.MaxInt32 {
			distances[i] = -1
		}
	}

	return distances
}

// func main() {
// 	numNodes, numEdges := 6, 7
// 	edges := [][]int{{0, 1, 2}, {0, 4, 1}, {4, 5, 4}, {4, 2, 2}, {1, 2, 3}, {2, 3, 6}, {5, 3, 1}}

// 	obj := Solution{}
// 	result := obj.findShortestPath(numNodes, numEdges, edges)

// 	fmt.Println(result)
// }
