// 8.1 Find maximum depth of Binary Tree
// 8.2 Validate a binary tree is BST or not
// 8.3 Print the level order traversal of a binary tree

// A class which represents a node of a binary tree
class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

/*
  In this function, we iterate the given array and assign odd positions to left
  and even positions to right by recursively calling the 'insertNodes' function.
*/
function insertNodes(i, arr) {
  let curr = null;
  if (i < arr.length) {
    if (arr[i] !== null) {
      curr = new TreeNode(arr[i]);
      curr.left = insertNodes(2 * i + 1, arr);
      curr.right = insertNodes(2 * i + 2, arr);
    }
  }
  return curr;
}

function createTree(arr) {
  return insertNodes(0, arr);
}

// Recursive function for inorder traversal of binary tree - in the order --> left, node, right
// Time Complexity - O(n)
function inorder(root) {
  if (root === null) {
    return [];
  }
  let leftSubTree = inorder(root.left);
  let rightSubTree = inorder(root.right);
  let answer = [...leftSubTree, root.value, ...rightSubTree];

  return answer;
}

// 8.1 Find maximum depth of Binary Tree
/*
  The Calculate Depth function which recursively goes to left and right of 
  the binary tree until it reaches null. From there, it returns 0. We calculate
  both leftHeight and rightHeight and add 1 while returning as we need to 
  consider the node that we are calling the recursive function for. Also,
  we return max of those two as trees can be of different heights on left and
  right and we want the maximum of them. 
*/
// Time Complexity - O(n) , Space Complexity - O(n)
function calculateDepth(root) {
  if (root === null) {
    return 0;
  }

  let leftHeight = calculateDepth(root.left);
  let rightHeight = calculateDepth(root.right);

  return Math.max(1 + leftHeight, 1 + rightHeight);
}

/*
  For level order traversal, we use a queue data straucture.
  Queue helps us to track all the nodes at a certain level.
  We push all children of a specific node into queue and 
  after that we print them at the top of while loop.
*/

// 8.3 Print the level order traversal of a binary tree
// Time Complexity - O(n) , Space Complexity - O(n)
function levelorder(root) {
  let queue = [];
  queue.push(root);
  while (queue.length !== 0) {
    let node = queue.shift();
    process.stdout.write(node.value.toString() + " ");
    if (node.left !== null) {
      queue.push(node.left);
    }
    if (node.right !== null) {
      queue.push(node.right);
    }
  }
}

/*
  In this function we are checking if the inorder traversal array 
  is sorted in increasing order or not. If yes, we return true. 
  Else, we return false.
*/
// 8.2 Validate a binary tree is BST or not
// Time Complexity - O(n) , Space Complexity - O(n)
function validateBST(inorderArray) {
  for (let i = 0; i < inorderArray.length; i++) {
    if (inorderArray[i] >= inorderArray[i + 1]) {
      return false;
    }
  }

  return true;
}

let arr1 = [3, 9, 20, null, null, 15, 7];
let arr2 = [2, 1, 3];
let root1 = createTree(arr1);
let root2 = createTree(arr2);

console.log(calculateDepth(root1)); // 3 is the max depth
console.log(calculateDepth(root2)); // 3 is the max depth
levelorder(root1); // 3 9 20 15 7
console.log();
levelorder(root2); // 5 1 4 3 6
console.log();
let inorderArray1 = inorder(root1);
let inorderArray2 = inorder(root2);
console.log(validateBST(inorderArray1)); // false
console.log(validateBST(inorderArray2)); // true
