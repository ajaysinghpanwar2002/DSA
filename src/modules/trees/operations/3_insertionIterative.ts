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
        this.root = this.insertIterative(this.root, data);
    }
    insertIterative(root: TreeNode | null, data: number): TreeNode {
        if (root === null) {
            root = new TreeNode(data);
            return root;
        }
        let current = root;
        while (current !== null) {
            if (data < current.data) {
                if (current.left === null) {
                    current.left = new TreeNode(data);
                    break;
                } else {
                    current = current.left;
                }
            } else if (data > current.data) {
                if (current.right === null) {
                    current.right = new TreeNode(data);
                    break;
                } else {
                    current = current.right;
                }
            } else {
                break;
            }
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


// Main function to run the example
const bst = BinarySearchTree.createBinarySearchTree();
console.log("Sample Binary Search Tree has been created!");
