// Mapping Binary tree to array

/**
 * To represent the binary tree in an array, we follow a specific mapping
 * 1) the root node is stored at index 0 in the array
 * 2) for any node at index i, it left child is stored at index 2*i+1, and the right child is stored at index 2*i+2
 * 3) if the node is not present, the array stores a special value (eg null,-1, or any senitel value)
 */

/**
 * example 
 *      10
       /  \
      5    20
     / \   / \
    3   8 15  25

    [10, 5, 20, 3, 8, 15, 25]

 */


class ArrayBinaryTree {
    private arr: number[]
    constructor(values: number[]) {
        this.arr = values
    }
    public getRoot(): number {
        return this.arr[0]
    }
    public getLeftChild(index: number): number {
        let leftIndex: number = 2 * index + 1
        if (leftIndex >= this.arr.length || this.arr[leftIndex] === null) return -1
        return this.arr[leftIndex]
    }
    public getRightChild(index: number): number {
        let rightIndex: number = 2 * index + 2
        if (rightIndex >= this.arr.length || this.arr[rightIndex] === null) return -1
        return this.arr[rightIndex]
    }
}

const values = [10, 5, 20, 3, 8, 15, 25];
const tree = new ArrayBinaryTree(values);

console.log("Root:", tree.getRoot()); // Output: Root: 10
console.log("Left child of 5:", tree.getLeftChild(1)); // Output: Left child of 5: 3
console.log("Right child of 5:", tree.getRightChild(1)); // Output: Right child of 5: 8

export{}