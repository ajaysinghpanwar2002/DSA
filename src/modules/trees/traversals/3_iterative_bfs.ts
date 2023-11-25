class TreeNode {
    data: number;
    left: TreeNode | null;
    right: TreeNode | null;
    constructor(data: number) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class LevelOrderTraversal {
    public levelOrderTraversal(root: TreeNode | null): void {
        if (root === null) return;
        let queue: TreeNode[] = [];
        queue.push(root);
        while (queue.length > 0) {
            let curr: TreeNode = queue.shift()!;
            console.log(curr.data);
            if (curr.left !== null) queue.push(curr.left);
            if (curr.right !== null) queue.push(curr.right);
        }
    }
}

const root = new TreeNode(10); // Create the root node with data 10
root.left = new TreeNode(5); // Create left child with data 5
root.right = new TreeNode(20); // Create right child with data 20
root.left.left = new TreeNode(3); // Create left child of left child with data 3
root.left.right = new TreeNode(8); // Create right child of left child with data 8
root.right.left = new TreeNode(15); // Create left child of right child with data 15
root.right.right = new TreeNode(25); // Create right child of right child with data 25

const traversal = new LevelOrderTraversal();

console.log("Level Order Traversal: ");
traversal.levelOrderTraversal(root); // Output: 10 5 20 3 8 15 25
