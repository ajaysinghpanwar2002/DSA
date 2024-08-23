package main

import (
	"fmt"
	"sync"
)

type Graph struct {
	vertices      int
	adjacencyList [][]int
}

func newGraph(vertices int) *Graph {
	list := make([][]int, vertices)
	for i := range list {
		list[i] = make([]int, 0)
	}

	return &Graph{vertices: vertices, adjacencyList: list}
}

func (g *Graph) AddEdge(source, destination int) {
	g.adjacencyList[source] = append(g.adjacencyList[source], destination)
	g.adjacencyList[destination] = append(g.adjacencyList[destination], source) // for undirected graph
}

func (g *Graph) Bfs(start int) []int {
	visited := make([]bool, g.vertices)
	queue := []int{}

	output := []int{}

	queue = append(queue, start)
	visited[start] = true

	for len(queue) > 0 {
		curr := queue[0]
		queue = queue[1:]

		output = append(output, curr)

		for _, neighbor := range g.adjacencyList[curr] {
			if visited[neighbor] == false {
				visited[neighbor] = true
				queue = append(queue, neighbor)
			}
		}
	}

	return output
}

func (g *Graph) ConcurrentBFS(start int) []int {
	visited := make([]bool, g.vertices)
	output := []int{}
	var mu sync.Mutex
	var wg sync.WaitGroup

	queue := make(chan int, g.vertices)
	done := make(chan struct{})

	visited[start] = true
	queue <- start

	worker := func() {
		defer wg.Done()
		for {
			select {
			case node, ok := <-queue:
				if !ok {
					return
				}
				mu.Lock()
				output = append(output, node)
				mu.Unlock()

				for _, neighbor := range g.adjacencyList[node] {
					mu.Lock()
					if !visited[neighbor] {
						visited[neighbor] = true
						queue <- neighbor
					}
					mu.Unlock()
				}
			case <-done:
				return
			}
		}
	}

	numWorkers := 4
	for i := 0; i < numWorkers; i++ {
		wg.Add(1)
		go worker()
	}

	// Wait for the queue to be empty
	go func() {
		wg.Wait()
		close(queue)
	}()

	// Wait for all workers to finish
	go func() {
		wg.Wait()
		close(done)
	}()

	// Wait for the BFS to complete
	<-done

	return output
}

func main() {
	graph := newGraph(7)

	graph.AddEdge(0, 1)
	graph.AddEdge(0, 2)
	graph.AddEdge(1, 3)
	graph.AddEdge(1, 4)
	graph.AddEdge(2, 5)
	graph.AddEdge(2, 6)

	bfsTraversal := graph.Bfs(0)
	fmt.Println(bfsTraversal)
}
