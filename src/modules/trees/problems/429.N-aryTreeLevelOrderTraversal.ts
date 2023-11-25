/**
 * Definition for node.
 * class Node {
 *     val: number
 *     children: Node[]
 *     constructor(val?: number) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.children = []
 *     }
 * }
 */

function levelOrder(root: Node | null): number[][] {
    let output: number[][] = [];
    if (root === null) return output;

    let queue: (Node | undefined)[] = [];
    queue.push(root);

    while (queue.length > 0) {
        let levelSize = queue.length;
        let level: number[] = [];
        for (let i = 0; i < levelSize; i++) {
            let node = queue.shift();
            if (node) {
                for (let child of node.children) {
                    queue.push(child);
                }
                level.push(node.val);
            }
        }
        output.push(level);
    }
    return output;
};
