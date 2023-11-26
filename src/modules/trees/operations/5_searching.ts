export class TreeNode {
    data: number
    left: TreeNode | null
    right: TreeNode | null
    constructor(data: number) {
        this.data = data
        this.left = null
        this.right = null
    }
}

class BinarySearchTree {
    root: TreeNode | null
    constructor() {
        this.root = null;
    }
    search(data: number): boolean {
        return this.searchRec(this.root, data);
    }
    searchRec(root: TreeNode | null, data: number): boolean {
        if (root === null) {
            return false;
        }
        if (data < root.data) {
            return this.searchRec(root.left, data);
        } else if (data > root.data) {
            return this.searchRec(root.right, data);
        } else {
            return true;
        }
    }
    insert(data: number) {
        this.root = this.insertRec(this.root, data);
    }
    insertRec(root: TreeNode | null, data: number): TreeNode {
        if (root === null) {
            root = new TreeNode(data);
            return root;
        }
        if (data < root.data) {
            root.left = this.insertRec(root.left, data);
        } else if (data > root.data) {
            root.right = this.insertRec(root.right, data);
        }
        return root;
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
            root.data = this.findMin(root.right);
            root.right = this.deleteRec(root.right, root.data);
        }
        return root;
    }
    findMin(root: TreeNode): number {
        let min = root.data;
        while (root.left !== null) {
            min = root.left.data;
            root = root.left;
        }
        return min;
    }
}


function createBinarySearchTree() {
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

const bst = createBinarySearchTree();
console.log(bst.search(5)); // true
