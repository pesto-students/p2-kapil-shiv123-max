// 0 1 1 2 3 5 8
const Fib = (n) => ({
  [Symbol.iterator]() {
    let first = 0;
    let second = 1;
    let count = 1;
    return {
      next() {
        if (count <= n) {
          let nextTerm = count === 1 ? 0 : first + second;
          first = second;
          second = nextTerm;
          count++;
          return { value: nextTerm, done: false };
        } else {
          return { done: true };
        }
      },
    };
  },
});

console.log("Fibonacci Series is");
for (let num of Fib(7)) {
  console.log(num);
}
