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

function buildTree(preorder: number[], inorder: number[]): TreeNode | null {
    if (!inorder.length) return null;

    let rootValue = preorder.shift() as number;
    let root = new TreeNode(rootValue);

    let index = inorder.indexOf(rootValue);

    root.left = buildTree(preorder, inorder.slice(0, index));
    root.right = buildTree(preorder, inorder.slice(index + 1));

    return root;
};

/**
Input: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
Output: [3,9,20,null,null,15,7]
 */