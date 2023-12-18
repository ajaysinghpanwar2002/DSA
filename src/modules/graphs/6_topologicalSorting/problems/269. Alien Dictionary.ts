/**
Input:
[
    "wrt",
    "wrf",
    "er",
    "ett",
    "rftt"
]
Output: "wertf"

Input:
[
    "z",
    "x"
]
Output: "zx"

1. You may assume all letters are in lowercase.
2. You may assume that if a is a prefix of b, then a must appear before b in the given dictionary.
3. If the order is invalid, return an empty string.
4. There may be multiple valid order of letters, return any one of them is fine.
 */

export class Solution {
    private topologicalSorting(numCourses: number, adjacencyList: number[][]) {
        const result: number[] = [];
        const inDegree: number[] = new Array(numCourses).fill(0);

        // calculating the in-degree
        for (let i = 0; i < numCourses; i++) {
            for (const neighbor of adjacencyList[i]) {
                inDegree[neighbor]++;
            }
        }

        // In the starting there will always be some nodes, with indegree of zero(always)
        const queue: number[] = [];
        for (let i = 0; i < numCourses; i++) {
            if (inDegree[i] === 0) queue.push(i);
        }

        while (queue.length > 0) {
            const vertex = queue.shift() as number;
            result.push(vertex);

            for (const neighbor of adjacencyList[vertex]) {
                if (--inDegree[neighbor] === 0) {
                    queue.push(neighbor);
                }
            }
        }

        // Check for cycles (unreachable nodes)
        if (result.length !== numCourses) {
            return []; // or return an empty string as appropriate
        }

        return result;
    }

    // k : no of vertices
    // n : no of words
    public alienOrder(words: string[], N: number, K: number): string {
        let adjacencyList = new Array(K).fill(null).map(() => []);
        for (let i = 0; i < N - 1; i++) {
            let s1 = words[i];
            let s2 = words[i + 1];
            let len = Math.min(s1.length, s2.length);
            for (let ptr = 0; ptr < len; ptr++) {
                if (s1[ptr] !== s2[ptr]) {
                    adjacencyList[s1.charCodeAt(ptr) - 97].push(s2.charCodeAt(ptr) - 97);
                    break;
                }
            }
        }
        const result = this.topologicalSorting(K, adjacencyList);
        let ans = "";
        for (const vertex of result) {
            ans += String.fromCharCode(vertex + 97);
        }
        return ans;
    }
}
