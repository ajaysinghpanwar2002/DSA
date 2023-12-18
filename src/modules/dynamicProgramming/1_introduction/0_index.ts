/**
1. Dynamic Programming
At its core, Dynamic Programming is a method for solving optimization problems by breaking them down into smaller subproblems and storing the solutions to these subproblems to avoid redundant calculations. It employs a "divide and conquer" approach, where the main problem is solved by combining solutions to subproblems in an optimal manner.

2. How Dynamic Programming Works
Dynamic Programming operates on the principle of optimal substructure and overlapping subproblems:

2.1 Optimal Substructure: The optimal solution to a problem contains optimal solutions to its subproblems. Solving these subproblems contributes to solving the main problem optimally.

2.2 Overlapping Subproblems: In many cases, the same subproblems are solved multiple times during the solution process. ynamic ProDgramming stores the solutions to these subproblems to avoid redundant calculations.

3. Types of Dynamic Programming Approaches
Dynamic Programming problems can be categorized into two main types:

3.1 Top-Down Approach (Memoization): In this approach, the problem is divided into subproblems, and their solutions are computed and stored. When a subproblem needs to be solved again, its solution is retrieved from the storage rather than recomputing it.

3.2 Bottom-Up Approach (Tabulation): In this approach, solutions to smaller subproblems are computed first and stored in a table. Larger problems are then solved using the solutions to these smaller subproblems.

4. Dynamic Programming Problems

Dynamic Programming is applied to a wide range of problems across various domains:

4.1 Fibonacci Sequence: Computing the nth Fibonacci number efficiently.

4.2 Knapsack Problem: Selecting items to maximize value within a weight constraint.

4.3 Longest Common Subsequence: Finding the longest common subsequence between two sequences.

4.4 Shortest Path Problems: Finding the shortest path between two vertices in a graph.

4.5 Coin Change Problem: Finding the minimum number of coins needed to make a certain value.

4.6 Matrix Chain Multiplication: Optimally multiplying a sequence of matrices.

4.7 Edit Distance: Finding the minimum number of operations to convert one string to another.

4.8 Subset Sum: Determining whether a subset of elements in an array sums up to a given value.


 */