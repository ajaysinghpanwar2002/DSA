function canVisitAllRooms(rooms: number[][]): boolean {
    const roomLength = rooms.length;
    const visited = new Set();

    const queue = [];
    queue.push(0);
    visited.add(0);

    while (queue.length > 0) {
        const currentRoom = queue.shift();
        const keys = rooms[currentRoom];

        for (const key of keys) {
            if (!visited.has(key)) {
                queue.push(key);
                visited.add(key);
            }
        }
    }

    return visited.size === roomLength;
}
