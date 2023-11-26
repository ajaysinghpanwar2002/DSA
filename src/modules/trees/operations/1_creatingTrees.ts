class ArrayBinaryTree {
    arr: number[];
    constructor(values: number[]) {
        this.arr = values;
    }
    getRoot() {
        return this.arr[0];
    }
    getLeftChild(index: number) {
        const leftIndex = 2 * index + 1;
        if (leftIndex >= this.arr.length || this.arr[leftIndex] === -1) return -1;
        return this.arr[leftIndex];
    }
    getRightChild(index: number) {
        const rightIndex = 2 * index + 2;
        if (rightIndex >= this.arr.length || this.arr[rightIndex] === -1) return -1;
        return this.arr[rightIndex];
    }
}

const values = [10, 5, 20, 3, 8, 15, 25];
const tree = new ArrayBinaryTree(values);

console.log("Root:", tree.getRoot()); // Output: Root: 10
console.log("Left child of 5:", tree.getLeftChild(1)); // Output: Left child of 5: 3
console.log("Right child of 5:", tree.getRightChild(1)); // Output: Right child of 5: 8

export { }

