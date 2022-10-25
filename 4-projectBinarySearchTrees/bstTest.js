const bst = require("./binarySearchTree");

// Create a binary search tree from an array of random numbers. 
const array = bst.sortFunctions.randomArray(20, 100);
let tree = bst.binarySearchTree(array);

tree.prettyPrint(tree.root);

// Confirm that the tree is balanced by calling isBalanced
console.log(`\nTree is balanced: ${tree.isBalanced()}`);

// Print out all elements in level, pre, post, and in order
console.log("\nElements in level order:");
console.log(tree.traverseBreathFirst());

console.log("\nElements in pre order:");
console.log(tree.traversePreorderDF());

console.log("\nElements in post order:");
console.log(tree.traversePostorderDF());

console.log("\nElements in order:");
console.log(tree.traverseInorderDF());

// Unbalance the tree by adding several numbers > 100
for (let index = 0; index < 150; index++) {
	const randomNumber = Math.floor(Math.random() * 200);
	tree.insertData(randomNumber);
}
tree.prettyPrint(tree.root);

// Confirm that the tree is unbalanced by calling isBalanced
console.log(`\nTree is balanced: ${tree.isBalanced()}`);

// Balance the tree by calling reBalance
tree.reBalance();
tree.prettyPrint(tree.root);

// Confirm that the tree is unbalanced by calling isBalanced
console.log(`\nTree is balanced: ${tree.isBalanced()}`);

// Print out all elements in level, pre, post, and in order
console.log("\nElements in level order:");
console.log(tree.traverseBreathFirst());

console.log("\nElements in pre order:");
console.log(tree.traversePreorderDF());

console.log("\nElements in post order:");
console.log(tree.traversePostorderDF());

console.log("\nElements in order:");
console.log(tree.traverseInorderDF());
