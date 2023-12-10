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

function inorderTraversal(root:TreeNode|null):void{
    if(root === null) return;
    inorderTraversal(root.left)
    console.log(root.data)
    inorderTraversal(root.right)
}

function preorderTraversal(root:TreeNode|null):void{
    if(root === null) return;
    console.log(root.data)
    preorderTraversal(root.left)
    preorderTraversal(root.right)
}

function postorderTraversal(root:TreeNode|null):void{
    if(root === null) return;
    postorderTraversal(root.left)
    postorderTraversal(root.right)
    console.log(root.data)
}

let root = new TreeNode(10);
root.left = new TreeNode(5);
root.right = new TreeNode(20);
root.left.left = new TreeNode(3);
root.left.right = new TreeNode(8);
root.right.left = new TreeNode(15);
root.right.right = new TreeNode(25);

console.log("Inorder Traversal: ");
inorderTraversal(root);
console.log();

console.log("Preorder Traversal: ");
preorderTraversal(root);
console.log();

console.log("Postorder Traversal: ");
postorderTraversal(root);

export {}