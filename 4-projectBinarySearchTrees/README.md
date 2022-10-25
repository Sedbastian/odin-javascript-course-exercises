# Binary Search Trees

## Links

- [Link to the Assignment](https://www.theodinproject.com/lessons/javascript-binary-search-trees)Link to the Assignment

## About

In this project, we learn about how to make a binary search tree. This data structure is where you take a group of data items and turn them into a tree full of nodes where each left node is “lower” than each right node. The tree starts with the “root node” and any node with no children is called a “leaf node”. I also learned about tree traversal algorithms like breadth-first and depth-first.

## binarySearchTree.js

binarySearchTree(array) returns the following methods:

    * `root: buildTree(array)` - Binary Search Tree object from array.

    * `buildTree(array)`, Sorts array, removes duplicates and returns BST object.

    * `prettyPrint(node)`, Prints BST in the console in a readable way.

    * `find(data)`, Returns the node holding data parameter.

    * `findParent(data)`, Returns the parentNode holding data parameter and on whichNode it is.

    * `insertData(data)`, Inserts a new node with the given value into the tree.

    * `deleteData(data)`, Removes the node holding the given value from the tree.

    * `traverseBreathFirst()`,  Returns array with data elements traversed Breath First.

    * `levelOrderBreathFirst(fnc)`, Traverses the tree in level order and yields each node to the provided function given as an argument.

    * `traverseInorderDF()`, Returns array with data elements traversed Inorder Depth First.

    * `inorderDepthFirst(fnc)`, Traverses the tree in order and yields each node to the provided function given as an argument.

    * `traversePreorderDF()`, Returns array with data elements traversed Preorder Depth First.

    * `preorderDepthFirst(fnc)`, Traverses the tree in preorder and yields each node to the provided function given as an argument.

    * `traversePostorderDF()`, Returns array with data elements traversed Postorder Depth First.

    * `postorderDepthFirst(fnc)`, Traverses the tree in postorder and yields each node to the provided function given as an argument.

    * `height`, Returns the height of a node -- defined as the longest path between the node and a leaf node.

    * `depth`, Returns the depth of a node -- defined as the distance between the node and the root.

    * `isBalanced`, Returns true/false based on whether or not the tree is balanced.

    * `reBalance`, Rebalances the tree.


    ## sortFunctions.js

    * `randomArray(length, maxValue)`, Returns random array.
    * `sort(array)`, Merge-Sorts array.
    * `noContiguousReps(orderedArray)`, Removes duplicates.


    ## bstTest.js

    Tests most of binarySearchTree functionality.
