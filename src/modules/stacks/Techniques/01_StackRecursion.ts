/**
 * Using stack in recursion
 * Recursion is a powerful technique used in computer programming to solve complex problems by breaking them down into smaller, more manageable subproblems. However, recursive functions can consume a significant amount of memory, especially when dealing with large inputs or deep recursion levels. One way to mitigate this issue is to use an explicit stack data structure to mimic the call stack of recursive function calls.

* The call stack in Recursion
 * Before delving into using a stack in recursion, it is important to understand the concept of the call stack. When a function is called, a new frame is added to the call stack to keep track of the function's local variables, parameters, and return address. As the function executes, it may call other functions, and each new function call adds another frame to the stack. When a function completes its execution, its frame is removed from the stack, and control returns to the caller function.

* Recursive fucntions and memory consumption
 * Recursive functions are natural candidates for solving problems that exhibit a recursive structure. However, recursive functions can consume a large amount of memory when the recursion depth becomes significant. Each recursive function call adds a new frame to the call stack, and if the recursion depth is too deep, the stack may overflow, causing a stack overflow error.

* Using a stack to mimick memory consumption
 * To avoid the memory consumption associated with deep recursion, we can use an explicit stack data structure to mimic the behavior of the call stack. Instead of relying on the system's call stack, we maintain our own stack and explicitly manage the function calls and their associated data. This approach is known as using a stack in recursion or simulating recursion with a stack.
 */

/**
 * Using a Stack to Calculate Factorial
 */

function factorial(n: number): number {
    const stack = [];
    let result = 1;

    while (n > 0) {
        stack.push(n--);
    }
    while (stack.length > 0) {
        const value = stack.pop();
        if (value !== undefined) {
            result *= value;
        }
    }

    return result;
}

const n = 5;
const factorialValue = factorial(n);
console.log(`Factorial of ${n} is ${factorialValue}`);

export {}