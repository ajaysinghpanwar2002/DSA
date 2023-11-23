/**
 * Monotonic stack is a data structure used in algorithms and data processing to solve problems related to finding the next greater or smaller element in an array. It is based on the stack data structure but with a special property that the elements in the stack are either strictly increasing or strictly decreasing.
 *
 * The monotonic stack can be used to efficiently solve a variety of problems, including finding the next greater element, next smaller element, and finding the nearest smaller or greater element on the left or right side of each element in an array.
 */

class MonotonicStack {
    nextGreaterElement(nums: number[]): number[] {
        const n = nums.length;
        const result = new Array(n).fill(-1);

        const stack: number[] = [];
        for (let i = 0; i < n; i++) {
            this.updateStack(stack, nums, result, i);
        }

        return result;
    }

    updateStack(stack: number[], nums: number[], result: number[], i: number): void {
        while (stack.length > 0 && nums[i] > nums[stack[stack.length - 1]]) {
            const poppedIndex = stack.pop();
            if (poppedIndex !== undefined) {
                result[poppedIndex] = nums[i];
            }
        }
        stack.push(i);
    }
}