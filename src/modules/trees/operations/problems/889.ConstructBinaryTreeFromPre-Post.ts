/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

function constructFromPrePost(preorder: number[], postorder: number[]): TreeNode | null {
    if (!preorder.length || !postorder.length) return null;

    let root = new TreeNode(preorder[0]);
    if (preorder.length === 1) return root;

    let L = postorder.indexOf(preorder[1]) + 1;

    root.left = constructFromPrePost(preorder.slice(1, L + 1), postorder.slice(0, L));
    root.right = constructFromPrePost(preorder.slice(L + 1), postorder.slice(L, -1));

    return root;
};

/**
Input: preorder = [1,2,4,5,3,6,7], postorder = [4,5,2,6,7,3,1] 
Output: [1,2,3,4,5,6,7]
 */