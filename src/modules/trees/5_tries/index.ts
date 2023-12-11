// Trie Data Structure

export class TrieNode {
    children: (TrieNode | null)[];
    isEndOfWord: boolean;
    constructor() {
        this.children = new Array(26).fill(null);
        this.isEndOfWord = false;
    }
}

class Trie {
    root: TrieNode;
    constructor() {
        this.root = new TrieNode();
    }

    insert(word: string) {
        let current: TrieNode = this.root;
        for (let i = 0; i < word.length; i++) {
            let index = word.charCodeAt(0) - 'a'.charCodeAt(0);
            if (!current.children[index]) {
                current.children[index] = new TrieNode();
            }
            current = current.children[index] as TrieNode;
        }
        current.isEndOfWord = true;
    }

    search(word: string) {
        let current: TrieNode = this.root;
        for (let i = 0; i < word.length; i++) {
            let index = word.charCodeAt(0) - 'a'.charCodeAt(0);
            if (!current.children[index]) {
                return false;
            }
            current = current.children[index] as TrieNode;
        }
        return current.isEndOfWord;
    }

    prefixSearch(prefix: string) {
        let current: TrieNode = this.root;
        for (let i = 0; i < prefix.length; i++) {
            let index = prefix.charCodeAt(0) - 'a'.charCodeAt(0);
            if (!current.children[index]) {
                return [];
            }
            current = current.children[index] as TrieNode;
        }
        const result: string[] = [];
        this.getwords(current, prefix, result);
        return result;
    }

    getwords(node: TrieNode, prefix: string, result: string[]) {
        if (node.isEndOfWord) {
            result.push(prefix);
        }
        for (let i = 0; i < node.children.length; i++) {
            if (node.children[i]) {
                this.getwords(node.children[i] as TrieNode, prefix + String.fromCharCode(i + 'a'.charCodeAt(0)), result);
            }
        }
    }

    deleteWord(word: string) {
        return this.deleteRec(this.root, word, 0);
    }

    deleteRec(node: TrieNode, word: string, index: number) {
        if (index === word.length) {
            if (!node.isEndOfWord) {
                return false; // Word not found
            }
            node.isEndOfWord = false;
            return this.isEmptyNode(node);
        }

        const ch = word.charAt(index);
        const charIndex = ch.charCodeAt(0) - 'a'.charCodeAt(0);
        const child = node.children[charIndex];

        if (!child) {
            return false; // Word not found
        }

        const shouldDeleteChild = this.deleteRec(child, word, index + 1);
        if (shouldDeleteChild) {
            node.children[charIndex] = null;
            return this.isEmptyNode(node);
        }

        return false;
    }

    isEmptyNode(node: TrieNode) {
        for (const child of node.children) {
            if (child) {
                return false;
            }
        }
        return true;
    }
}

function main() {
    const trie = new Trie();

    // Inserting words into the trie
    trie.insert("apple");
    trie.insert("banana");
    trie.insert("orange");
    trie.insert("grape");

    // Searching for words in the trie
    console.log("Is 'apple' present in the trie? " + trie.search("apple")); // Should return true
    console.log("Is 'orange' present in the trie? " + trie.search("orange")); // Should return true
    console.log("Is 'pear' present in the trie? " + trie.search("pear")); // Should return false
    console.log("Is 'grapefruit' present in the trie? " + trie.search("grapefruit")); // Should return false

    // Deleting words from the trie
    trie.deleteWord("apple");
    trie.deleteWord("orange");

    console.log("Is 'apple' present in the trie after deletion? " + trie.search("apple")); // Should return false
    console.log("Is 'orange' present in the trie after deletion? " + trie.search("orange")); // Should return false
}

main()