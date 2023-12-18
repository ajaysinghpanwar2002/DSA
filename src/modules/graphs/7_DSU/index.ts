// Disjoint Set Union(DSU)
interface DSUType {
    parent: number[];
    rank: number[];
    find(x: number): number;
    union(x: number, y: number): void;
}

class DSU implements DSUType {
    parent: number[];
    rank: number[];

    constructor(size: number) {
        this.parent = new Array(size).fill(0).map((_, i) => i);
        this.rank = new Array(size).fill(0);
    }

    find(x: number): number {
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]);
        }
        return this.parent[x];
    }

    union(x: number, y: number): void {
        const rootX = this.find(x);
        const rootY = this.find(y);
        if (rootX === rootY) {
            return;
        }
        if (this.rank[rootX] < this.rank[rootY]) {
            this.parent[rootX] = rootY;
        } else if (this.rank[rootX] > this.rank[rootY]) {
            this.parent[rootY] = rootX;
        } else {
            this.parent[rootY] = rootX;
            this.rank[rootX]++;
        }
    }
}

const dsu: DSUType = new DSU(5);

dsu.union(0, 1);
dsu.union(2, 3);
dsu.union(3, 4);

console.log("Are 1 and 3 in the same set? " + (dsu.find(1) === dsu.find(3)));
console.log("Are 0 and 2 in the same set? " + (dsu.find(0) === dsu.find(2)));
