package main

import "fmt"

type TreeNode struct {
	left  *TreeNode
	right *TreeNode
	data  int
}

type DfsTraversal interface {
	inorderTraversal(root *TreeNode)
	preorderTraversal(root *TreeNode)
	postorderTraversal(root *TreeNode)
}

func NewTreeNode(data int) *TreeNode {
	return &TreeNode{data: data}
}

type Tree struct{}

func (t *Tree) inorderTraversal(root *TreeNode) {
	if root == nil {
		return
	}

	t.inorderTraversal(root.left)
	fmt.Println(root.data)
	t.inorderTraversal(root.right)
}

func (t *Tree) preorderTraversal(root *TreeNode) {
	if root == nil {
		return
	}

	fmt.Println(root.data)
	t.preorderTraversal(root.left)
	t.preorderTraversal(root.right)
}

func (t *Tree) postorderTraversal(root *TreeNode) {
	if root == nil {
		return
	}

	t.postorderTraversal(root.left)
	t.postorderTraversal(root.right)
	fmt.Println(root.data)
}

func main() {
	// Create nodes
	root := NewTreeNode(1)
	root.left = NewTreeNode(2)
	root.right = NewTreeNode(3)
	root.left.left = NewTreeNode(4)
	root.left.right = NewTreeNode(5)
	root.right.left = NewTreeNode(6)
	root.right.right = NewTreeNode(7)

	// Initialize the tree
	var tree DfsTraversal = &Tree{}

	// Perform different DFS traversals
	fmt.Println("Inorder Traversal:")
	tree.inorderTraversal(root)

	fmt.Println("Preorder Traversal:")
	tree.preorderTraversal(root)

	fmt.Println("Postorder Traversal:")
	tree.postorderTraversal(root)
}
