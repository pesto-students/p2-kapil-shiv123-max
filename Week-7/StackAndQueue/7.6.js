// Implementing queue using two stacks
class Queue {
  constructor() {
    this.stack1 = [];
    this.stack2 = [];
  }

  enqueue(x) {
    // Move all elements from stack1 to stack2
    while (this.stack1.length != 0) {
      this.stack2.push(this.stack1.pop());
    }

    // Push item into stack1
    this.stack1.push(x);

    // Push everything back to stack1
    while (this.stack2.length != 0) {
      this.stack1.push(this.stack2.pop());
    }
  }

  // Dequeue an item from the queue
  dequeue() {
    // If first stack is empty
    if (this.stack1.length == 0) {
      return -1;
    }

    // Return top of stack1
    let x = this.stack1[this.stack1.length - 1];
    this.stack1.pop();
    return x;
  }
}

function queryCaller(queryArray) {
  let i = 0;
  let q = new Queue();
  while (i < queryArray.length) {
    if (queryArray[i] === 1) {
      q.enqueue(queryArray[i + 1]);
      i += 2;
    } else if (queryArray[i] === 2) {
      console.log(q.dequeue());
      i += 1;
    }
  }
}

let query1 = [1, 2, 1, 3, 2, 1, 4, 2];
let query2 = [1, 2, 2, 2, 1, 4];
queryCaller(query1); // 2 3
queryCaller(query2); // 2 -1
