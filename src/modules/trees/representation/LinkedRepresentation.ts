export class TreeNode {
    left: TreeNode | null;
    right: TreeNode | null;
    data: number;
    constructor(data: number) {
        this.data = data;
        this.left = null;
        this.right = null
    }
}

let root = new TreeNode(10);
root.left = new TreeNode(5);
root.right = new TreeNode(20);
root.left.left = new TreeNode(3);
root.left.right = new TreeNode(8);
root.right.left = new TreeNode(15);
root.right.right = new TreeNode(25);

console.log("Root Node :", root.data);