package main

import "fmt"

type ArrayBinaryTree struct {
	arr []int
}

func NewArrayBinaryTree(values []int) *ArrayBinaryTree {
	return &ArrayBinaryTree{arr: values}
}

func (tree *ArrayBinaryTree) GetRoot() int {
	if len(tree.arr) > 0 {
		return tree.arr[0]
	}
	return -1
}

func (tree *ArrayBinaryTree) GetLeftChild(index int) int {
	leftIndex := 2*index + 1
	if leftIndex >= len(tree.arr) || tree.arr[leftIndex] == 0 {
		return -1
	}

	return tree.arr[leftIndex]
}

func (tree *ArrayBinaryTree) GetRightChild(index int) int {
	rightIndex := 2*index + 2
	if rightIndex >= len(tree.arr) || tree.arr[rightIndex] == 0 {
		return -1
	}

	return tree.arr[rightIndex]
}

func main() {
	values := []int{10, 5, 20, 3, 8, 15, 25}
	tree := NewArrayBinaryTree(values)

	fmt.Println("Root:", tree.GetRoot())                    // Output: Root: 10
	fmt.Println("Left child of 5:", tree.GetLeftChild(1))   // Output: Left child of 5: 3
	fmt.Println("Right child of 5:", tree.GetRightChild(1)) // Output: Right child of 5: 8
}
