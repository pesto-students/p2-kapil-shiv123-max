function createIncrement() {
    let count = 0;
    function increment() {
       count++;
    }
    let message = `Count is ${count}`;
    function log()
    {
        console.log(message);
    }

    return [increment, log];
}

const [increment, log] = createIncrement();
increment();
increment();
increment();
log();

//EXPLANATION- 
// The output is "Count is 0". It is because when createIncrement() is called, it returns the increment and log functions and creates the message and count variables. As the message is declared in the parent(createStack) function, its value remains unchanged and it gets the count as 0 itself. To get the count as 3, we can move the message declaration inside the count function- in that way it will get the updated count during the time of execution.
// We can also say that there is no logic written in the code that changes the message string everytime the count is changed - so the message string is created exactly once in the starting and its value is never changed.

