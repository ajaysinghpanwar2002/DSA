package main

import (
	"container/heap"
	"fmt"
	"math"
)

type Edge struct {
	destination int
	weight       int
}

type PriorityQueueItem struct {
	vertexID int
	weight   int
	index    int
}

type PriorityQueue []*PriorityQueueItem

func (pq PriorityQueue) Len() int { return len(pq) }

func (pq PriorityQueue) Less(i, j int) bool {
	if pq[i].weight == pq[j].weight {
		return pq[i].vertexID < pq[j].vertexID
	}
	return pq[i].weight < pq[j].weight
}

func (pq PriorityQueue) Swap(i, j int) {
	pq[i], pq[j] = pq[j], pq[i]
	pq[i].index = i
	pq[j].index = j
}

// Push adds an item to the priority queue
func (pq *PriorityQueue) Push(x interface{}) {
	n := len(*pq)
	item := x.(*PriorityQueueItem)
	item.index = n
	*pq = append(*pq, item)
}

// Pop removes and returns the item with the highest priority (lowest weight)
func (pq *PriorityQueue) Pop() interface{} {
	old := *pq
	n := len(old)
	item := old[n-1]
	item.index = -1 // for safety
	*pq = old[0 : n-1]
	return item
}

func printShortestPath(numNodes int, numEdges int, edges [][]int) []int {
	adjList := make([][]Edge, numNodes+1)

	// Build adjacency list
	for i := 0; i < numEdges; i++ {
		source, destination, weight := edges[i][0], edges[i][1], edges[i][2]
		adjList[source] = append(adjList[source], Edge{destination: destination, weight: weight})
	}

	// Initialize priority queue and distance arrays
	pq := &PriorityQueue{}
	heap.Init(pq)

	shortestDistances := make([]int, numNodes+1)
	parent := make([]int, numNodes+1)
	for i := range shortestDistances {
		shortestDistances[i] = math.MaxInt32
		parent[i] = -1
	}

	start := 1 // Starting node
	shortestDistances[start] = 0
	heap.Push(pq, &PriorityQueueItem{vertexID: start, weight: 0})

	for pq.Len() > 0 {
		item := heap.Pop(pq).(*PriorityQueueItem)
		currentVertex := item.vertexID

		// Process all adjacent nodes
		for _, edge := range adjList[currentVertex] {
			neighbor := edge.destination
			edgeWeight := edge.weight
			newDistance := shortestDistances[currentVertex] + edgeWeight

			if newDistance < shortestDistances[neighbor] {
				shortestDistances[neighbor] = newDistance
				parent[neighbor] = currentVertex
				heap.Push(pq, &PriorityQueueItem{vertexID: neighbor, weight: newDistance})
			}
		}
	}

	// Print the shortest distances
	for i := 1; i <= numNodes; i++ {
		if shortestDistances[i] == math.MaxInt32 {
			fmt.Printf("Node %d is unreachable\n", i)
		} else {
			fmt.Printf("Shortest distance from node %d to node %d is %d\n", start, i, shortestDistances[i])
		}
	}

	// Return shortest distances array (excluding the first element as node IDs start from 1)
	return shortestDistances[1:]
}

func main() {
	// Example usage
	numNodes := 5
	numEdges := 7
	edges := [][]int{
		{1, 2, 10},
		{1, 3, 3},
		{2, 3, 1},
		{2, 4, 2},
		{3, 2, 4},
		{3, 4, 8},
		{4, 5, 7},
	}

	shortestDistances := printShortestPath(numNodes, numEdges, edges)
	fmt.Println("Shortest distances:", shortestDistances)
}
