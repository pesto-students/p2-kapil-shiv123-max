// Question 7.1,7.2 and 7.3 covered in this file

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

// Creating a single linked list
function createLL(arr) {
  let head = new Node(arr[0]);
  let curr = head;
  for (let i = 1; i < arr.length; ++i) {
    curr.next = new Node(arr[i]);
    curr = curr.next;
  }
  return head;
}

// Traversing the Single Linked List
function traverseLL(head) {
  let curr = head;
  while (curr !== null) {
    console.log(curr.value);
    curr = curr.next;
  }
}

// 7.1 - Reverse The Linked List
function reverseLL(head) {
  let prev = null;
  let curr = head;
  let next = null;

  while (curr.next != null) {
    next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  curr.next = prev;
  head = curr;
  return head;
}

// 7.2 - Left Shift Linked List K times
function leftRotateLLKTimes(head, k) {
  if (k === 0) return head;

  let curr = head;
  let prev = null;

  while (k-- && curr !== null) {
    prev = curr;
    curr = curr.next;
  }

  if (!curr) return head;

  let newHead = curr;

  prev.next = null;
  while (curr.next) {
    curr = curr.next;
  }

  curr.next = head;
  return newHead;
}

// Creating a Loop for exercise 7.3
function createLoop(head) {
  let k = 3;
  let pivot = head;
  while (--k) {
    pivot = pivot.next;
  }

  let tail = pivot;
  while (tail.next !== null) {
    tail = tail.next;
  }
  tail.next = pivot;
}

// function loopTraversal(head) {
//   let k = 20;
//   let curr = head;
//   while (--k && curr) {
//     console.log(curr.value);
//     curr = curr.next;
//   }
// }

// 7.3 - Detect a loop in the linked list
function detectLoop(head) {
  let slow = head,
    fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;

    if (slow === fast) {
      return true; // loop exists
    }
  }
  return false; // no loop exists
}

// Code to test above functions
let head1 = createLL([2, 4, 7, 8, 9]);
// traverseLL(head1);

// let head2 = reverseLL(head1);
// traverseLL(head2); // 9,8,7,2,4

let head3 = leftRotateLLKTimes(head1, 3);
traverseLL(head3); // 8,9,2,4,7

// createLoop(head1);
// loopTraversal(head1);
// if (detectLoop(head1)) {
//   console.log("Loop is present");
// } else {
//   console.log("Loop is not present");
// }
