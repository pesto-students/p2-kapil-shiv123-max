function createStack() {
  const items = [];
  return {
    push: function push(item) {
      items.push(item);
      console.log(item + " pushed");
    },
    pop: function pop() {
      const popped = items.pop();
      console.log(popped + " popped");
      return popped;
    },
    print: function print() {
      items.forEach((item) => {
        console.log(item);
      });
    },
  };
}

const stack = createStack();

stack.push(10);
stack.push(20);
stack.push(30);
stack.push(40);
stack.push(50);

stack.pop();
stack.pop();

console.log(stack.items); // gives undefined

stack.print(); //prints all the items in the stack

// EXPLANATION - 
//Firstly, the items array was returned from the functiom itself and that was the reason due to which items array was accessible outside of the createStack function scope. I changed it and placed the items array inside function but did not return it. So, due to closure, we can only access items array inside of createStack function but nowhere outside it. Instaed, I created a print() function so that the user can see what items are there in the array without accessing it.