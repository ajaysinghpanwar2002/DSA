package main

import "fmt"

type TreeNode struct {
	data  int
	left  *TreeNode
	right *TreeNode
}

func NewTreeNode(data int) *TreeNode {
	return &TreeNode{data: data}
}

type LevelOrderTraversal struct{}

func (lot *LevelOrderTraversal) breadthFirstSearch(root *TreeNode) {
	if root == nil {
		return
	}

	queue := []*TreeNode{}
	queue = append(queue, root)

	for len(queue) > 0 {
		var curr *TreeNode = queue[0]
		// removing the first element from the queue
		queue = queue[1:]
		fmt.Println(curr.data)
		if curr.left != nil {
			queue = append(queue, curr.left)
		}
		if curr.right != nil {
			queue = append(queue, curr.right)
		}
	}
}

func main() {
	// Create the tree
	root := NewTreeNode(10)
	root.left = NewTreeNode(5)
	root.right = NewTreeNode(20)
	root.left.left = NewTreeNode(3)
	root.left.right = NewTreeNode(6)
	root.right.left = NewTreeNode(16)
	root.right.right = NewTreeNode(61)

	traversal := &LevelOrderTraversal{}

	fmt.Println("Level Order Traversal: ")
	traversal.breadthFirstSearch(root)
}
