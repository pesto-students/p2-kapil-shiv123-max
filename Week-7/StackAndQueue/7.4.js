// Parentheses Checker
function validParentheses(inputStr) {
  let stack = [];
  for (let i = 0; i < inputStr.length; i++) {
    // If we encounter opening brackets, we simply push them into stack
    if (inputStr[i] == "(" || inputStr[i] == "{" || inputStr[i] == "[") {
      stack.push(inputStr[i]);
    } else {
      /*
         In else, we check two things - we check for corresponding closing
         brackets for opening brackets pushed into the stack. If they don't
         match, we return false. Else we pop out the closing bracket as 
         it was a valid pair.
        */
      if (
        stack.length === 0 ||
        (stack[stack.length - 1] === "(" && inputStr[i] !== ")") ||
        (stack[stack.length - 1] === "{" && inputStr[i] !== "}") ||
        (stack[stack.length - 1] === "[" && inputStr[i] !== "]")
      ) {
        return false;
      } else {
        stack.pop();
      }
    }
  }
  // We return like this as some elements might be left in stack after string iteration
  return stack.length === 0 ? true : false;
}

console.log(validParentheses("{()}")); // true
console.log(validParentheses("{(]}")); // false
