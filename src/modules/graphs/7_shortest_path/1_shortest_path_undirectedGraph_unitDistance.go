package main

import "math"

/* shortest path in the unidirected graph with unit distances.

input: array [][]edges, source  (starting point)
output: distance array.
steps:
	1. We'll be creating a graph.
	2. Then we'll do an bfs trversal on the graph
	3. we'll be maintaining a distance array of no of vertices

	4. We initially mark the distance of source in the distance array as 0, and put that on the queue as [vertice, dist]
	5. Then we'll be just in the queue and keep exploring the children of 0 and calculate the distance of the child.
	6. We'll update the distance array with the new values, if we made an update to the distance tables, we'll push the vertice to the queue
*/

// we'll be implementing our own queue to improve the performance
type Queue struct {
	data  []*vertexDist
	front int
}

func (q *Queue) Enqueue(item *vertexDist) {
	q.data = append(q.data, item)
}

func (q *Queue) Dequeue() *vertexDist {
	if q.IsEmpty() {
		return nil
	}

	item := q.data[q.front]
	q.front++

	// Avoid memory leak by setting dequeued items to nil when they're no longer needed
	if q.front > len(q.data)/2 {
		// q.data = q.data[q.front:]
		q.data = append(q.data[:0], q.data[q.front:]...) // better performance as it reuses the existing slice capacity
		q.front = 0
	}

	return item
}

func (q *Queue) IsEmpty() bool {
	return q.front >= len(q.data)
}

type vertexDist struct {
	vertex   int
	distance int
}

type graph struct {
	vertices      int
	adjacencyList [][]int
}

func newGraph(vertices int) *graph {
	return &graph{
		vertices:      vertices,
		adjacencyList: make([][]int, vertices),
	}
}

func (g *graph) addEdge(source, destination int) {
	g.adjacencyList[source] = append(g.adjacencyList[source], destination)
	g.adjacencyList[destination] = append(g.adjacencyList[destination], source) // undirected graph
}

func shortestPath(edges [][]int, source int, countVertices int) []int {
	g := newGraph(countVertices)
	for _, edge := range edges {
		g.addEdge(edge[0], edge[1])
	}

	minDistFromSource := make([]int, g.vertices)
	for i := range minDistFromSource {
		minDistFromSource[i] = math.MaxInt32
	}
	minDistFromSource[source] = 0

	queue := &Queue{}
	queue.Enqueue(&vertexDist{vertex: source, distance: 0})

	// bfs traversal to compute the shortest
	for !queue.IsEmpty() {
		curr := queue.Dequeue()

		for _, neighbor := range g.adjacencyList[curr.vertex] {
			newDistance := curr.distance + 1

			if newDistance < minDistFromSource[neighbor] {
				minDistFromSource[neighbor] = newDistance
				queue.Enqueue(&vertexDist{vertex: neighbor, distance: newDistance})
			}
		}
	}

	return minDistFromSource
}
