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

function zigzagLevelOrder(root: TreeNode | null): number[][] {
    let output: number[][] = [];
    if (root === null) return output;

    let queue: (TreeNode | undefined)[] = [];
    queue.push(root);

    while (queue.length > 0) {
        let levelSize = queue.length;
        let level: number[] = [];
        for (let i = 0; i < levelSize; i++) {
            let node = queue.shift();
            if (node) {
                if (node.left) queue.push(node.left);
                if (node.right) queue.push(node.right);
                level.push(node.val);
            }
        }
        output.push(level);
    }

    for (let i = 0; i < output.length; i++) {
        if (i % 2 !== 0) { // odd level
            output[i].reverse();
        }
    }
    return output;
};