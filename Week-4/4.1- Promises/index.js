const getNumber = () => {
  const randomNumber = Math.floor(Math.random() * 1000);
  console.log("Random number is:", randomNumber);
  if (randomNumber % 5 == 0) {
    return true;
  } else {
    return false;
  }
};

const PENDING = 0;
const FULFILLED = 1;
const REJECTED = 2;

function MyPromise(executor) {
  let state = PENDING;
  let value = null;
  let handlers = [];
  let catchers = [];

  function resolve(val) {
    if (state !== PENDING) return;
    value = val;
    state = FULFILLED;

    handlers.forEach((callback) => callback(value));
  }

  function reject(val) {
    if (state !== PENDING) return;
    value = val;
    state = REJECTED;

    catchers.forEach((callback) => callback(value));
  }

  this.then = function (successCallback) {
    if (state === FULFILLED) {
      successCallback(value);
    } else {
      handlers.push(successCallback);
    }
    return this;
  };

  this.catch = function (failureCallback) {
    if (state === REJECTED) {
      failureCallback(value);
    } else {
      catchers.push(failureCallback);
    }
    return this;
  };

  executor(resolve, reject);
}

const p = new MyPromise((resolve, reject) => {
  getNumber()
    ? setTimeout(() => {
        reject("Divisible by 5");
      }, 2000)
    : setTimeout(() => {
        resolve("Not Divisible by 5");
      }, 3000);
});

p.then((val) => console.log("Fulfilled ->", val)).catch((err) =>
  console.log("Rejected ->", err)
);
