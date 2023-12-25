export function measureTime(func: Function, ...args: any[]): any {
    console.time(func.name);
    const result = func(...args);
    console.timeEnd(func.name);
    return result;
}