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

    // Method to insert a node into the BST using an iterative approach
    insert(data: number) {
        const new_node = new TreeNode(data);
        if (this.root === null) {
            this.root = new_node;
            return;
        }
        let current = this.root;
        while (true) {
            if (data < current.data) {
                if (current.left === null) {
                    current.left = new_node;
                    break;
                } else {
                    current = current.left;
                }
            } else {
                if (current.right === null) {
                    current.right = new_node;
                    break;
                } else {
                    current = current.right;
                }
            }
        }
    }
    delete(data: number) {
        this.root = this.deleteRec(this.root, data);
    }
    deleteRec(root: TreeNode | null, data: number): TreeNode | null {
        if (root === null) {
            return null;
        }
        if (data < root.data) {
            root.left = this.deleteRec(root.left, data);
        } else if (data > root.data) {
            root.right = this.deleteRec(root.right, data);
        } else {
            if (root.left === null) {
                return root.right;
            } else if (root.right === null) {
                return root.left;
            }
            root.data = this.minValue(root.right);
            root.right = this.deleteRec(root.right, root.data);
        }
        return root;
    }
    minValue(root: TreeNode | null): number {
        let minv = root!.data;
        while (root!.left !== null) {
            minv = root!.left.data;
            root = root!.left;
        }
        return minv;
    }
    // Helper method to create a sample BST
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
bst.delete(7);
console.log("Sample Binary Search Tree with node 7 deleted:");