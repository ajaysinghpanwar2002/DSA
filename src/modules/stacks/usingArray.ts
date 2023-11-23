class ArrayStack {
    array: number[];
    top: number;
    capacity: number;

    constructor(public size: number) {
        this.array = new Array(size);
        this.top = -1;
        this.capacity = size;
    }

    isEmpty(): boolean {
        return this.top === -1;
    }

    isFull(): boolean {
        return this.top === this.capacity - 1;
    }

    /**
     * @push
     * Push: Inserting an element into the stack
     * The push operation adds an element to the top of the stack. It involves two main steps:
    -   Check if the stack is full (i.e., the array is already at its maximum capacity).
    -   If the stack is not full, increment the top variable and insert the new element at the corresponding index in the array.
     */
    push(element: number): void {
        if (this.isFull()) {
            console.log("Stack Overflow");
            return;
        }
        this.array[++this.top] = element;
    }

    /**
     * @pop 
     * Pop: Removing the top element from the stack
     * The pop operation removes the top element from the stack. It involves the following steps:
        - Check if the stack is empty (i.e., no elements are present).
        - If the stack is not empty, retrieve the element at the top index, decrement the top variable, and return the removed element.
     */
    pop(): number {
        if (this.isEmpty()) {
            console.log("Stack Underflow");
            return -1;
        }
        return this.array[this.top--];
    }

    /**
     * @peek
     * Peek: Returning the top element of the stack
     * The peek operation returns the top element of the stack. It involves the following steps:
        - Check if the stack is empty (i.e., no elements are present).
        - If the stack is not empty, retrieve the element at the top index and return it.
     */
    peek(): number {
        if (this.isEmpty()) {
            console.log("Stack Underflow");
            return -1;
        }
        return this.array[this.top];
    }

    display(): void {
        if (this.isEmpty()) {
            console.log("Stack is empty");
            return;
        }
        console.log("Stack elements are:");
        for (let i = this.top; i >= 0; i--) {
            console.log(this.array[i]);
        }
    }

}

let stack = new ArrayStack(5);

stack.push(1);
stack.push(2);
stack.push(3);
stack.push(4);
stack.push(5);

// Pop elements from the stack
console.log(stack.pop()); // Output: 5
console.log(stack.pop()); // Output: 4

// Peek the top element
console.log(stack.peek()); // Output: 3

// Check if the stack is empty
console.log(stack.isEmpty()); // Output: false

// Push more elements
stack.push(6);
stack.push(7);

stack.peek();
