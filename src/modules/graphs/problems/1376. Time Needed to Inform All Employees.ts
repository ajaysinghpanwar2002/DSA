function DFS(adj: Map<number, number[]>, informTime: number[], current_employee: number, current_time: number, maxTime: number) {
    
}

function numOfMinutes(n: number, headID: number, manager: number[], informTime: number[]): number {
    const adj = new Map<number, number[]>();
    let maxTime = 0;

    // Construct the adjacency list
    for (let i = 0; i < manager.length; i++) {
        const employee_i = i;
        const manager_i = manager[i];

        if (manager_i === -1) continue;
        if (!adj.has(manager_i)) {
            adj.set(manager_i, []);
        }
        adj.get(manager_i)!.push(employee_i);
    }
    // Print the adjacency list
    console.log("Adjacency List:", adj);

    DFS(adj, informTime, headID, 0, maxTime);

    if (adj.has(headID)) {
        for (const employee of adj.get(headID)!) {
            DFS(adj, informTime, employee, 0 + informTime[headID], maxTime);
        }
    }
    return maxTime;
}

export { numOfMinutes };
