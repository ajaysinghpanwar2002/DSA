package main

import "fmt"

type TreeNode struct {
	data  int
	left  *TreeNode
	right *TreeNode
}

func NewTreeNode(data int) *TreeNode {
	return &TreeNode{
		data:  data,
		left:  nil,
		right: nil,
	}
}

func main() {
	root := NewTreeNode(10)
	root.left = NewTreeNode(5)
	root.right = NewTreeNode(20)
	root.left.left = NewTreeNode(3)
	root.left.right = NewTreeNode(8)
	root.right.left = NewTreeNode(15)
	root.right.right = NewTreeNode(25)

	// Print root node data
	fmt.Println("Root Node :", root.data)
}
