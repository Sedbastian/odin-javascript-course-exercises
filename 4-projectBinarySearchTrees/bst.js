let sortFunctions = require("./sortFunctions");

let arreglo = sortFunctions.randomArray(20);
let tree = Tree([
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21
]);
tree.prettyPrint(tree.root);

console.log(tree.traverseBreathFirst());

function Node(data) {
  return {
    data,
    leftNode: null,
    rightNode: null
  };
}

function Tree(array) {
  function find(data, node) {
    if (node === undefined) {
      node = this.root;
    }
    const nodeData = node.data;
    if (data === nodeData) {
      return node;
    }
    if (data < nodeData) {
      if (node.leftNode === null) {
        return null;
      } else {
        return find(data, node.leftNode);
      }
    }
    if (data > nodeData) {
      if (node.rightNode === null) {
        return null;
      } else {
        return find(data, node.rightNode);
      }
    }
  }

  function findParent(data, childNode, parentNode, whichNode) {
    let node = childNode;
    if (node === undefined) {
      node = this.root;
    }
    let nodeData = node.data;
    if (data === nodeData) {
      return { parentNode, whichNode };
    }
    if (data < nodeData) {
      if (node.leftNode === null) {
        return null;
      } else {
        return findParent(data, node.leftNode, node, "leftNode");
      }
    }
    if (data > nodeData) {
      if (node.rightNode === null) {
        return null;
      } else {
        return findParent(data, node.rightNode, node, "rightNode");
      }
    }
  }

  function insertData(data, node) {
    if (node === undefined) {
      node = this.root;
    }
    const nodeData = node.data;

    if (data === nodeData) {
      return;
    }

    if (data < nodeData) {
      if (node.leftNode === null) {
        node.leftNode = Node(data);
      } else {
        insertData(data, node.leftNode);
      }
    }

    if (data > nodeData) {
      if (node.rightNode === null) {
        node.rightNode = Node(data);
      } else {
        insertData(data, node.rightNode);
      }
    }
  }

  function deleteData(data) {
    let foundNodes = findParent.call(this, data);

    if (foundNodes === null) {
      console.log("Data not in tree!");
      return null;
    }
    let parentNode;
    let whichNode;
    let node;
    // For shallow copies, it's important to understand that selectively changing
    // the value of a shared property of an existing element in an object is different
    // from assigning a completely new value to an existing element.

    if (foundNodes.parentNode === undefined) {
      parentNode = this;
      whichNode = "root";
      node = this.root;
    } else {
      parentNode = foundNodes.parentNode;
      whichNode = foundNodes.whichNode;
      node = foundNodes.parentNode[whichNode];
    }

    if (node.leftNode === null && node.rightNode === null) {
      parentNode[whichNode] = null;
      console.log(`Deleted Data ${data} was on a leaf node.`);
      return;
    }
    if (node.leftNode !== null && node.rightNode === null) {
      parentNode[whichNode] = node.leftNode;
      console.log(`Deleted Data ${data} had only one child.`);
      return;
    }
    if (node.leftNode === null && node.rightNode !== null) {
      parentNode[whichNode] = node.rightNode;
      console.log(`Deleted Data ${data} had only one child.`);
      return;
    }
    if (node.leftNode !== null && node.rightNode !== null) {
      if (node.rightNode.leftNode === null) {
        node.data = node.rightNode.data;
        node.rightNode = node.rightNode.rightNode;
      } else {
        let inorderSuccesor = node.rightNode;
        let inorderSuccesorParent;
        while (inorderSuccesor.leftNode !== null) {
          inorderSuccesorParent = inorderSuccesor;
          inorderSuccesor = inorderSuccesor.leftNode;
        }
        node.data = inorderSuccesor.data;
        inorderSuccesorParent.leftNode = inorderSuccesor.rightNode;
      }
      console.log(`Deleted Data ${data} had two childs.`);
    }
  }

  function levelOrder(fn) {}

  function traverseBreathFirst() {
    let breathedArray = [];
    let queue = [this.root];

    function traverseRecursive(breathedArray, queue) {
      if (queue.length === 0) {
        return breathedArray;
      }
     
      breathedArray.push(queue[0].data);
      if (queue[0].leftNode) {
        queue.push(queue[0].leftNode);
			}
			if (queue[0].rightNode) {
				queue.push(queue[0].rightNode);
			}
			queue.shift();
			
      return traverseRecursive(breathedArray, queue);
    }
    return traverseRecursive(breathedArray, queue);
  }

  function prettyPrint(node, prefix = "", isLeft = true) {
    if (node.rightNode !== null) {
      prettyPrint(
        node.rightNode,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.leftNode !== null) {
      prettyPrint(node.leftNode, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }

  return {
    root: buildTree(noContiguousReps(sortFunctions.sort(array))),
    find,
    findParent,
    insertData,
    deleteData,
    traverseBreathFirst,
    prettyPrint
  };
}

// array must be sorted and without repetitions.
function buildTree(array) {
  let rootNode;
  if (array.length === 1) {
    return Node(array[0]);
  } else {
    const mid = Math.floor((array.length - 1) / 2);
    rootNode = Node(array[mid]);
    // If array has 3 or more elements, then it is sliced. If not, leftNode will remain null.
    if (array.length > 2) {
      const leftArray = array.slice(0, mid);
      rootNode.leftNode = buildTree(leftArray);
    }
    // If array has 2 or more elements, then it is sliced. If not, rightNode will remain null.
    if (array.length > 1) {
      const rightArray = array.slice(mid + 1, array.length);
      rootNode.rightNode = buildTree(rightArray);
    }
  }
  return rootNode;
}

function noContiguousReps(orderedArray) {
  if (orderedArray.length > 1) {
    let noRep = [];
    noRep.push(orderedArray[0]);
    for (let index = 1; index < orderedArray.length; index++) {
      if (orderedArray[index - 1] !== orderedArray[index]) {
        noRep.push(orderedArray[index]);
      }
    }
    return noRep;
  }
}
