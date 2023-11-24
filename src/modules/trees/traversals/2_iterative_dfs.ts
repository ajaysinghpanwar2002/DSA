class TreeNode {
    left: TreeNode | null
    right: TreeNode | null
    data: number
    constructor(data: number) {
        this.data = data
        this.left = null
        this.right = null
    }
}

class IterativeTreeTraversal {
    public inorderTraversal(root: TreeNode | null): void {
        if (root === null) return;
        let stack: TreeNode[] = []
        let curr: TreeNode | null = root
        while (curr !== null || stack.length > 0) {
            while (curr !== null) {
                stack.push(curr)
                curr = curr.left
            }
            curr = stack.pop()!
            console.log(curr.data)
            curr = curr.right
        }
    }
    public preorderTraversal(root: TreeNode | null): void {
        if (root === null) return;
        let stack: TreeNode[] = []
        stack.push(root)
        while (stack.length > 0) {
            let curr: TreeNode | null = stack.pop()!
            console.log(curr.data);
            if (curr.right !== null) stack.push(curr.right)
            if (curr.left !== null) stack.push(curr.left)
        }
    }
    public postorderTraversal(root: TreeNode | null): void {
        if (root === null) return;
        let stack: TreeNode[] = []
        let curr: TreeNode | null = root
        let prev: TreeNode | null = null
        while (curr !== null || stack.length > 0) {
            while (curr !== null) {
                stack.push(curr)
                curr = curr.left
            }
            curr = stack[stack.length - 1]
            if (curr.right === null || curr.right === prev) {
                console.log(curr.data)
                stack.pop()
                prev = curr
                curr = null
            } else {
                curr = curr.right
            }
        }
    }
}