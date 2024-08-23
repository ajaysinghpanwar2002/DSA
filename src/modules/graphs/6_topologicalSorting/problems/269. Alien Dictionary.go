package main

import (
	"fmt"
)

type Solution struct{}

// Topological sorting function
func (sol *Solution) topologicalSorting(numCourses int, adjacencyList [][]int) []int {
	result := []int{}
	inDegree := make([]int, numCourses)

	// Calculating the in-degree
	for i := 0; i < numCourses; i++ {
		for _, neighbor := range adjacencyList[i] {
			inDegree[neighbor]++
		}
	}

	// Queue to store vertices with 0 in-degree
	queue := []int{}
	for i := 0; i < numCourses; i++ {
		if inDegree[i] == 0 {
			queue = append(queue, i)
		}
	}

	// Process vertices in the queue
	for len(queue) > 0 {
		vertex := queue[0]
		queue = queue[1:]
		result = append(result, vertex)

		for _, neighbor := range adjacencyList[vertex] {
			inDegree[neighbor]--
			if inDegree[neighbor] == 0 {
				queue = append(queue, neighbor)
			}
		}
	}

	// Check for cycles
	if len(result) != numCourses {
		return []int{} // Invalid order
	}

	return result
}

// AlienOrder function to determine the order of letters
func (sol *Solution) alienOrder(words []string, N int, K int) string {
	adjacencyList := make([][]int, K)
	for i := 0; i < K; i++ {
		adjacencyList[i] = []int{}
	}

	for i := 0; i < N-1; i++ {
		s1 := words[i]
		s2 := words[i+1]
		minLen := min(len(s1), len(s2))

		for ptr := 0; ptr < minLen; ptr++ {
			if s1[ptr] != s2[ptr] {
				adjacencyList[s1[ptr]-'a'] = append(adjacencyList[s1[ptr]-'a'], int(s2[ptr]-'a'))
				break
			}
		}
	}

	result := sol.topologicalSorting(K, adjacencyList)
	if len(result) == 0 {
		return ""
	}

	ans := ""
	for _, vertex := range result {
		ans += string(rune(vertex + 'a'))
	}

	return ans
}

// Helper function to calculate the minimum of two integers
func min(a, b int) int {
	if a < b {
		return a
	}
	return b
}

func main() {
	sol := &Solution{}

	// Example 1
	words1 := []string{"wrt", "wrf", "er", "ett", "rftt"}
	N1 := len(words1)
	K1 := 5
	fmt.Println(sol.alienOrder(words1, N1, K1)) // Output: "wertf"

	// Example 2
	words2 := []string{"z", "x"}
	N2 := len(words2)
	K2 := 2
	fmt.Println(sol.alienOrder(words2, N2, K2)) // Output: "zx"
}
