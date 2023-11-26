export class TreeNode {
    data: number;
    left: TreeNode | null;
    right: TreeNode | null;
    constructor(data: number) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    root: TreeNode | null;
    constructor() {
        this.root = null;
    }
    insert(data: number) {
        this.root = this.insertRecursive(this.root, data);
    }
    insertRecursive(root: TreeNode | null, data: number): TreeNode {
        if (root === null) {
            root = new TreeNode(data);
            return root;
        }
        if (data < root.data) {
            root.left = this.insertRecursive(root.left, data);
        } else if (data > root.data) {
            root.right = this.insertRecursive(root.right, data);
        }
        return root;
    }

    static createBinarySearchTree() {
        const bst = new BinarySearchTree();
        bst.insert(5);
        bst.insert(3);
        bst.insert(7);
        bst.insert(2);
        bst.insert(4);
        bst.insert(6);
        bst.insert(8);
        return bst;
    }
}

const bst = BinarySearchTree.createBinarySearchTree();
console.log("Sample Binary Search Tree has been created!",bst);