class MaxHeap {
    heap: number[];
    constructor() {
        this.heap = [];
    }

    insert(value:number) {
        this.heap.push(value);
        this._heapifyUp(this.heap.length - 1);
    }

    extractMax() {
        if (this.heap.length === 0) {
            throw new Error("Heap is empty.");
        }
        const max = this.heap[0];
        this.heap[0] = this.heap[this.heap.length - 1];
        this.heap.pop();
        this._heapifyDown(0);
        return max;
    }

    peekMax() {
        if (this.heap.length === 0) {
            throw new Error("Heap is empty.");
        }
        return this.heap[0];
    }

    _heapifyUp(index:number) {
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[parentIndex] < this.heap[index]) {
                [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];
                index = parentIndex;
            } else {
                break;
            }
        }
    }

    _heapifyDown(index:number) {
        const size = this.heap.length;
        while (index < size) {
            const leftChildIndex = 2 * index + 1;
            const rightChildIndex = 2 * index + 2;
            let largestIndex = index;

            if (leftChildIndex < size && this.heap[leftChildIndex] > this.heap[largestIndex]) {
                largestIndex = leftChildIndex;
            }

            if (rightChildIndex < size && this.heap[rightChildIndex] > this.heap[largestIndex]) {
                largestIndex = rightChildIndex;
            }

            if (largestIndex !== index) {
                [this.heap[index], this.heap[largestIndex]] = [this.heap[largestIndex], this.heap[index]];
                index = largestIndex;
            } else {
                break;
            }
        }
    }
}

// Usage example
const maxHeap = new MaxHeap();
maxHeap.insert(20);
maxHeap.insert(10);
maxHeap.insert(5);
maxHeap.insert(30);
maxHeap.insert(8);
maxHeap.insert(7);

console.log("Max element:", maxHeap.peekMax()); // Output: 30

console.log("Extracting max element:", maxHeap.extractMax()); // Output: 30

console.log("Max element after extraction:", maxHeap.peekMax()); // Output: 20
