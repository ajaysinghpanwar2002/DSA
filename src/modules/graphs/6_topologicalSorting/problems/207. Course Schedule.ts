function canFinish(numCourses: number, prerequisites: number[][]): boolean {
    const result: number[] = [];
    const inDegree: number[] = new Array(numCourses).fill(0);

    // Calculate in-degrees
    for (let i = 0; i < numCourses; i++) {
        for (const neighbor of prerequisites[i]) {
            inDegree[neighbor]++;
        }
    }

    const queue: number[] = [];
    for (let i = 0; i < numCourses; i++) {
        if (inDegree[i] === 0) {
            queue.push(i);
        }
    }

    while (queue.length > 0) {
        const vertex = queue.shift() as number;
        result.push(vertex);

        for (const neighbor of prerequisites[vertex]) {
            if (--inDegree[neighbor] === 0) {
                queue.push(neighbor);
            }
        }
    }

    if (result.length === numCourses) return true;
    return false;
};