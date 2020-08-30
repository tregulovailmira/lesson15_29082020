class ListNode {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.length = 0;
    }

    addNode(value) {
        const node = new ListNode(value);

        if (this.length === 0) {
            this.head = node;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = node;
        }
        this.length++;
    }

    getNodeByIndex(index) {
        if (this.length === 0 || index < 0 || index > this.length) {
            throw new RangeError('Not in list');
        }

        let current = this.head;
        let count = 0;

        while (count < index) {
            current = current.next;
            count++;
        }
        return current;
    }
    
    [Symbol.iterator]() {
        return new LinkedListIterator(this);
    }
}

const list = new LinkedList();
list.addNode('test');
list.addNode('test2');
list.addNode('test3');

class LinkedListIterator {
    constructor(linkedList) {
        this.iterable = linkedList.head;
    }

    next() {
        if(this.iterable) {
            const value = this.iterable.value;
            this.iterable = this.iterable.next;
            return {
                value,
                done: false,
            };
        }
        return {done: true};
        // return {
        //     value: this.iterable[this.iteration++],
        //     done: this.iteration > this.iterable.length,
        // };
    }
}

const arr = [...list];

class Stack {
    constructor(maxSize = 1000) {
        if (typeof maxSize !== "number") {
            throw new TypeError("size must be a number");
        }
        if (maxSize < 1) {
            throw new RangeError("must be a positive number");
        }

        this._maxSize = maxSize;
        this._size = 0;
    }

    get maxSize() {
        return this._maxSize;
    }

    get isEmpty() {
        return this.size === 0;
    }

    get size() {
        return this._size;
    }

    set size(size) {
        this._size = size;
    }

    push(value) {
        if (this.size >= this.maxSize) {
            throw new RangeError("Stack overflow");
        }
        this[this.size++] = value;
        return this.size;
    }

    pop() {
        if (this.isEmpty) {
            return;
        }
        const deletedItem = this[this.size - 1];
        delete this[this.size - 1];
        this.size--;
        return deletedItem;
    }

    peek() {
        if (this.isEmpty) {
            return;
        }
        return this[this.size - 1];
    }
}

const stack = new Stack();

stack.push('test1');
stack.push('test2');
stack.push('test3');
stack.push('test4');

function reverse(string) {
    const stack = new Stack(string.length);
    let reverseString = [];
    for (let item of string) {
        stack.push(item);
    }
    for(let i = 0; i < string.length; i++) {
        reverseString.push(stack.pop());
    }
    return reverseString.join('');
}

console.log(checkBraces('()()()(())'))
function checkBraces(string) {
    const stack = new Stack();

    /*  if (string % 2 !== 0) {
       return false;
     } */
    for (const brace of string) {
        if (brace === "(") {
            stack.push(brace);
            continue;
        }

        if (brace === ")") {
            if (stack.isEmpty) {
                return false;
            }
            stack.pop();
        }
    }
    return stack.isEmpty;
}

class Queue{
    constructor(...args) {
        this._oldIndex = 0;
        this._newIndex = 0;

        for (let item of args) {
            this.push(item);
        }
    }

    get size() {
        return this._newIndex - this._oldIndex;
    }

    get oldIndex() {
        return this._oldIndex;
    }

    get newIndex() {
        return this._newIndex;
    }

    push(value) {
        this[this._newIndex++] = value;
        return this.size;
    }

    pop() {
        if (this.size === 0){
            return;
        }
        const deletedItem = this[this._oldIndex];
        delete this[this._oldIndex++];
        return deletedItem;
    }

    peek() {
        if (this.size === 0) {
            return;
        }
        return this[this._oldIndex];
    }
}

const q1 = new Queue('test1', 'test3', 'test5', 'test7', 'test9', 'test11');
// q1.push('test1');
// q1.push('test3');
// q1.push('test5');
// q1.push('test7');

const q2 = new Queue('test2', 'test4', 'test6', 'test8', 'test10');
// q2.push('test2');
// q2.push('test4');
// q2.push('test6');
// q2.push('test8');

function joinQueues(q1, q2) {
    const result = new Queue();
    if (q1.size === 0 || q2.size === 0) {
        throw new SyntaxError('Queue can not be empty!');
    }

    while (q1.size || q2.size) {
        if(q1.peek()) {
            result.push(q1.pop());
        }
        if(q2.peek()) {
            result.push(q2.pop());
        }
    }
    return result;
}