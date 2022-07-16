// Next Greater ELement for each array element
function nextGreaterElement(arr, n) {
  let stack = [];
  let answer = [];
  stack.push(arr[0]);

  for (let i = 1; i < n; i++) {
    if (stack.length == 0) {
      stack.push(arr[i]);
      continue;
    }

    /* 
         Checking if current element is greater than stack top --
         if yes, we push the element into answer array and pop
         element from stack. We keep doing it until current element 
         is lesser than any value in stack.  
      */
    while (stack.length !== 0 && stack[stack.length - 1] < arr[i]) {
      answer.push(arr[i]);
      stack.pop();
    }
    stack.push(arr[i]); // pushing current element in stack for next iteration
  }

  // if iteration is done, leftover elements in stack would have -1 as next greater element.
  while (stack.length !== 0) {
    answer.push(-1);
    stack.pop();
  }

  return answer;
}

let arr = [11, 13, 21, 3];
let n = arr.length;
let answer = nextGreaterElement(arr, n);
console.log(answer); // 13 21 -1 -1
