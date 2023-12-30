function longestCommonSubsequence(text1: string, text2: string): number {
    let n = text1.length;
    let m = text2.length;
    let dp = new Array(n).fill(-1).map(() => new Array(m).fill(-1));

    return longestCommonSubsequenceUtil(text1, text2, n - 1, m - 1, dp);
};

function longestCommonSubsequenceUtil(s1: string, s2: string, ind1: number, ind2: number, dp: number[][]): number {
    if (ind1 < 0 || ind2 < 0) return 0;

    if (dp[ind1][ind2] !== -1) return dp[ind1][ind2];

    if (s1[ind1] === s2[ind2]) return dp[ind1][ind2] = 1 + longestCommonSubsequenceUtil(s1, s2, ind1 - 1, ind2 - 1, dp);
    else return dp[ind1][ind2] = Math.max(longestCommonSubsequenceUtil(s1, s2, ind1, ind2 - 1, dp), longestCommonSubsequenceUtil(s1, s2, ind1 - 1, ind2, dp))
}


function longestPalindromeSubseq(s: string): number {
    let t: string = s.split("").reverse().join("");
    return longestCommonSubsequence(s, t);
};

export { }