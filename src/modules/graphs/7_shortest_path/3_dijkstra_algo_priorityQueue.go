package main

import (
	"container/heap"
	"fmt"
	"math"
)

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

func dijkstra(graph map[int]map[int]int, startVertex int) map[int]int {
	shortestDistances := make(map[int]int)
	pq := &PriorityQueue{}

	for vertex := range graph {
		shortestDistances[vertex] = math.MaxInt32
	}

	shortestDistances[startVertex] = 0

	heap.Push(pq, &PriorityQueueItem{vertexID: startVertex, weight: 0})

	for pq.Len() > 0 {
		item := heap.Pop(pq).(*PriorityQueueItem)
		currentVertex := item.vertexID

		// explore neighbors
		for neighbor, edgeWeight := range graph[currentVertex] {
			newDistance := shortestDistances[currentVertex] + edgeWeight
			if newDistance < shortestDistances[neighbor] {
				shortestDistances[neighbor] = newDistance
				heap.Push(pq, &PriorityQueueItem{vertexID: neighbor, weight: newDistance})
			}
		}
	}

	return shortestDistances
}

func main() {
	graph := map[int]map[int]int{
		0: {1: 4, 2: 1},
		1: {3: 1},
		2: {1: 2, 3: 5},
		3: {},
	}

	startVertex := 0
	distances := dijkstra(graph, startVertex)

	fmt.Println("Shortest distances from vertex", startVertex)
	for vertex, distance := range distances {
		fmt.Printf("Vertex %d: %d\n", vertex, distance)
	}
}
