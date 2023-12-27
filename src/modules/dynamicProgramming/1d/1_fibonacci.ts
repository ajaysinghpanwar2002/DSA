// overlapping subproblems -> Memoization -> tend to store the value of subproblems in some map/ table
let number = 10;

// Memoization (Top down, answer to base case)
function Reursivefibonacci(n: number): number {
    let dp = new Array(n + 1).fill(-1);

    if (n <= 1) return n;

    if (dp[n] !== -1) return dp[n];
    return dp[n] = Reursivefibonacci(n - 1) + Reursivefibonacci(n - 2);
}

const Reursivefibonaccioutput = Reursivefibonacci(number);
console.log("Reursivefibonaccioutput : ", Reursivefibonaccioutput);
/**
 * Time: O(n)
 * Space: O(n) + O(n) 
 */


// tabulation (Bottom-up, base case to required)
function Tabulationfibonacci(n: number): number {
    let dp = new Array(n + 1).fill(-1);
    dp[0] = 0;
    dp[1] = 1;

    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp[n];
}

const TabulationfibonacciOutput = Tabulationfibonacci(number);
console.log("TabulationfibonacciOutput : ", TabulationfibonacciOutput);
/**
 * Time: O(n)
 * Space: O(n) 
 */


// optimising the tabulation to Space: O(1)
function OptimisedTabulationfibonacci(n: number): number {
    let prev1 = 1;
    let prev2 = 0;
    for (let i = 2; i <= n; i++) {
        let curi = prev1 + prev2
        prev2 = prev1;
        prev1 = curi;
    }
    return prev1
}

const OptimisedTabulationfibonacciOutput = OptimisedTabulationfibonacci(number);
console.log("OptimisedTabulationfibonacciOutput : ", OptimisedTabulationfibonacciOutput);
/**
 * Time: O(n)
 * Space: O(1) 
 */


export { }