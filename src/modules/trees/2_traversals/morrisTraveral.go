package main

// type TreeNode struct {
// 	Val   int
// 	Left  *TreeNode
// 	Right *TreeNode
// }

// inorder traversal time: O(N) and space: O(1)
func morrisInorder(root *TreeNode) []int {
	var inorder []int
	curr := root

	for curr != nil {
		if curr.Left == nil {
			// no left itself the root.
			inorder = append(inorder, curr.Val)
			curr = curr.Right
		} else {
			// if there exist a left, then move to left and go to the right most guy.
			prev := curr.Left
			for prev.Right != nil && prev.Right != curr {
				prev = prev.Right
			}
			// so as now we went to the guy with extreme right, it can have two possibilites
			// 1. There is nothing on to the right of this guy
			// 2. There is a thread we created it will just help us understand that we already came to this path.
			if prev.Right == nil {
				// make a thread to curr as this guy is getting visited first time.
				prev.Right = curr
				// and move to the left side again.
				curr = curr.Left
			} else {
				// cut the thread
				prev.Right = nil
				inorder = append(inorder, curr.Val)
				// move to the right as we have alread went through the left.
				curr = curr.Right
			}
		}
	}

	return inorder
}
