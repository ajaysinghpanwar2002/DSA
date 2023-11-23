class Nodes<T> {
    next: Nodes<T> | null;
    constructor(public data: T) {
        this.data = data;
        this.next = null;
    }
}

class LinkedListStack {
    top: Nodes<number> | null;
    constructor(){
        this.top = null;
    }
    isEmpty(): boolean {
        return this.top === null;
    }
    push(value: number) {
        const newNode = new Nodes(value);
        newNode.next = this.top;
        this.top = newNode;
    }
    pop(){
        if(this.isEmpty()){
            console.log('Stack is empty');
            return -1;
        }
        const value = this.top?.data ;
        this.top = this.top ? this.top.next : null;
        return value;
    }   
}

const linkedListStack = new LinkedListStack();

linkedListStack.push(1);
linkedListStack.push(2);
linkedListStack.push(3);
linkedListStack.push(4);

console.log(linkedListStack.pop());
console.log(linkedListStack.pop());

console.log(linkedListStack.isEmpty());

linkedListStack.push(5);
linkedListStack.push(6);

while (!linkedListStack.isEmpty()) {
    console.log(linkedListStack.pop());
}