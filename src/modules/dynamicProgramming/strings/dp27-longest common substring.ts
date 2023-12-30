
function lcs(s1: string, s2: string) {
    const n = s1.length;
    const m = s2.length;

    // Initialize arrays 'prev' and 'cur' to store dynamic programming results, both initialized with 0
    const prev = new Array(m + 1).fill(0);
    const cur = new Array(m + 1).fill(0);

    // Initialize a variable 'ans' to store the length of the longest common substring
    let ans = 0;

    // Use nested loops to iterate through the characters of both strings
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= m; j++) {
            // If the characters match, update 'cur' and 'ans'
            if (s1[i - 1] === s2[j - 1]) {
                const val = 1 + prev[j - 1];
                cur[j] = val;
                ans = Math.max(ans, val);
            } else {
                // If characters don't match, set 'cur' to 0 for the current position
                cur[j] = 0;
            }
        }
        // Update 'prev' with the values of 'cur' for the next iteration
        prev.splice(0, m + 1, ...cur);
    }

    // 'ans' now contains the length of the longest common substring
    return ans;
}

// Main function
function main() {
    const s1 = "abcjklp";
    const s2 = "acjkp";

    // Call the lcs function and print the result
    console.log("The Length of Longest Common Substring is " + lcs(s1, s2));
}

// Call the main function to start the program
main();
