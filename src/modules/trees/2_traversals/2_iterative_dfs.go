package main

import "fmt"

type TreeNode struct {
	left  *TreeNode
	right *TreeNode
	data  int
}

func NewTreeNode(data int) *TreeNode {
	return &TreeNode{data: data}
}

type DfsTraversal interface {
	inorderTraversal(root *TreeNode)
	preorderTraversal(root *TreeNode)
	postorderTraversal(root *TreeNode)
}

type IterativeTreeTraversal struct{}

func (itt *IterativeTreeTraversal) inorderTraversal(root *TreeNode) {
	if root == nil {
		return
	}

	stack := []*TreeNode{}
	curr := root

	for curr != nil || len(stack) > 0 {
		for curr != nil {
			stack = append(stack, curr)
			curr = curr.left
		}
		curr = stack[len(stack)-1]
		// Pop the top item from the stack
		stack = stack[:len(stack)-1]
		fmt.Println(curr.data)
		curr = curr.right
	}
}

func (itt *IterativeTreeTraversal) preorderTraversal(root *TreeNode) {
	if root == nil {
		return
	}

	stack := []*TreeNode{}
	stack = append(stack, root)

	for len(stack) > 0 {
		curr := stack[len(stack)-1]
		// Pop the top item from the stack
		stack = stack[:len(stack)-1]
		fmt.Println(curr.data)
		if curr.right != nil {
			stack = append(stack, curr.right)
		}
		if curr.left != nil {
			stack = append(stack, curr.left)
		}
	}
}

func (itt *IterativeTreeTraversal) postorderTraversal(root *TreeNode) {
	if root == nil {
		return
	}

	stack := []*TreeNode{}
	var curr *TreeNode = root
	var prev *TreeNode

	for curr != nil || len(stack) > 0 {
		for curr != nil {
			stack = append(stack, curr)
			curr = curr.left
		}
		curr = stack[len(stack)-1]

		if curr.right == nil || curr.right == prev {
			fmt.Println(curr.data)
			stack = stack[:len(stack)-1]
			prev = curr
			curr = nil
		} else {
			curr = curr.right
		}
	}
}
