let sortFunctions = require("./sortFunctions");

let arreglo = sortFunctions.randomArray(1);

console.log(noContiguousReps(sortFunctions.sort(arreglo)));
let tree = Tree(arreglo);
tree.prettyPrint(tree.root);

console.log(tree.height());
function Node(data) {
  return {
    data,
    leftNode: null,
    rightNode: null
  };
}

function Tree(array) {
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

  function levelOrder(fnc) {
    let breathedTree = traverseBreathFirst.call(this);
    let outputArray = [];
    if (fnc === undefined) {
      breathedTree.forEach(element => {
        outputArray.push(element);
      });
    } else {
      breathedTree.forEach(element => {
        outputArray.push(fnc(element));
      });
    }
    return outputArray;
  }

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

  function inorder(fnc) {
    let inorderTree = traverseInorder.call(this);
    let outputArray = [];
    if (fnc === undefined) {
      inorderTree.forEach(element => {
        outputArray.push(element);
      });
    } else {
      inorderTree.forEach(element => {
        outputArray.push(fnc(element));
      });
    }
    return outputArray;
  }

  function traverseInorder() {
    let inorderArray = [];
    let node = this.root;

    function traverseRecursive(node) {
      if (node === null) {
        return;
      }
      traverseRecursive(node.leftNode);
      inorderArray.push(node.data);
      traverseRecursive(node.rightNode);
    }
    traverseRecursive(node);
    return inorderArray;
  }

  function preorder(fnc) {
    let preorderTree = traversePreorder.call(this);
    let outputArray = [];
    if (fnc === undefined) {
      preorderTree.forEach(element => {
        outputArray.push(element);
      });
    } else {
      preorderTree.forEach(element => {
        outputArray.push(fnc(element));
      });
    }
    return outputArray;
  }

  function traversePreorder() {
    let preorderArray = [];
    let node = this.root;

    function traverseRecursive(node) {
      if (node === null) {
        return;
      }
      preorderArray.push(node.data);
      traverseRecursive(node.leftNode);
      traverseRecursive(node.rightNode);
    }
    traverseRecursive(node);
    return preorderArray;
  }

  function postorder(fnc) {
    let postorderTree = traversePostorder.call(this);
    let outputArray = [];
    if (fnc === undefined) {
      postorderTree.forEach(element => {
        outputArray.push(element);
      });
    } else {
      postorderTree.forEach(element => {
        outputArray.push(fnc(element));
      });
    }
    return outputArray;
  }

  function traversePostorder() {
    let postorderArray = [];
    let node = this.root;

    function traverseRecursive(node) {
      if (node === null) {
        return;
      }
      traverseRecursive(node.leftNode);
      traverseRecursive(node.rightNode);
      postorderArray.push(node.data);
    }
    traverseRecursive(node);
    return postorderArray;
  }

  function height(node) {
    if (node === null) {
      return 0;
    }
    let maxHeight = 0;
    
    function heightRecursive(node, acumHeight) {
      if (node === null) {
        if (acumHeight > maxHeight) {
          maxHeight = acumHeight;
        }
      } else {
        acumHeight++;
        heightRecursive(node.leftNode, acumHeight);
        heightRecursive(node.rightNode, acumHeight);
      }
      return maxHeight;
    }
    return heightRecursive(this.root, 0);
  }

  return {
    root: buildTree(noContiguousReps(sortFunctions.sort(array))),
    prettyPrint,
    find,
    findParent,
    insertData,
    deleteData,
    traverseBreathFirst,
    levelOrder,
    traverseInorder,
    inorder,
    traversePreorder,
    preorder,
    traversePostorder,
    height,
    postorder
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
  if (orderedArray.length >= 1) {
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
