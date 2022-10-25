const sortFunctions = require("./sortFunctions");

function binarySearchTree(array) {
  function Node(data) {
    return {
      data,
      leftNode: null,
      rightNode: null
    };
  }
  // array will be first sorted and then without contiguous repetitions.
  function buildTree(array) {
    let sortedNoReps = sortFunctions.noContiguousReps(
      sortFunctions.sort(array)
    );
    let rootNode;
    if (sortedNoReps.length === 1) {
      return Node(sortedNoReps[0]);
    } else {
      const mid = Math.floor((sortedNoReps.length - 1) / 2);
      rootNode = Node(sortedNoReps[mid]);
      // If sortedNoReps has 3 or more elements, then it is sliced. If not, leftNode will remain null.
      if (sortedNoReps.length > 2) {
        const leftArray = sortedNoReps.slice(0, mid);
        rootNode.leftNode = buildTree(leftArray);
      }
      // If sortedNoReps has 2 or more elements, then it is sliced. If not, rightNode will remain null.
      if (sortedNoReps.length > 1) {
        const rightArray = sortedNoReps.slice(mid + 1, sortedNoReps.length);
        rootNode.rightNode = buildTree(rightArray);
      }
    }
    return rootNode;
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

  function find(data, node) {
    if (node === undefined) node = this.root;
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
    if (node === undefined) node = this.root;
    const nodeData = node.data;

    if (data === nodeData) return;
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

  function levelOrderBreathFirst(fnc) {
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
    function traverseRecursive(breathedArray, queue) {
      if (queue.length === 0) return breathedArray;
      breathedArray.push(queue[0].data);
      if (queue[0].leftNode) queue.push(queue[0].leftNode);
      if (queue[0].rightNode) queue.push(queue[0].rightNode);

      queue.shift();

      return traverseRecursive(breathedArray, queue);
    }
    let breathedArray = [];
    let queue = [this.root];

    return traverseRecursive(breathedArray, queue);
  }

  function inorderDepthFirst(fnc) {
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
  function traverseInorderDF() {
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

  function preorderDepthFirst(fnc) {
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
  function traversePreorderDF() {
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

  function postorderDepthFirst(fnc) {
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
  function traversePostorderDF() {
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
    if (node === undefined) {
      node = this.root;
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
    return heightRecursive(node, 0);
  }
  function depth(node) {
    return height.call(this, this.root) - height.call(this, node);
  }

  function isBalanced(node) {
    if (node === undefined) node = this.root;

    function traverse(node) {
      const diff =
        this.height.call(this, node.leftNode) -
        this.height.call(this, node.rightNode);
      if (diff < -1 || diff > 1) {
        return false;
      } else if (diff > -2 && diff < 2) {
        if (node.leftNode) {
          if (traverse.call(this, node.leftNode) === false) {
            return false;
          }
        }
        if (node.rightNode) {
          if (traverse.call(this, node.rightNode) === false) {
            return false;
          }
        }
      }
      return true;
    }
    return traverse.call(this, node);
  }
  function reBalance() {
    this.root = this.buildTree(this.traverseBreathFirst());
    return this.root;
  }

  return {
    root: buildTree(array),
    buildTree,
    prettyPrint,
    find,
    findParent,
    insertData,
    deleteData,
    traverseBreathFirst,
    levelOrderBreathFirst,
    traverseInorderDF,
    inorderDepthFirst,
    traversePreorderDF,
    preorderDepthFirst,
    traversePostorderDF,
    postorderDepthFirst,
    height,
    depth,
    isBalanced,
    reBalance
  };
}

module.exports = { binarySearchTree, sortFunctions };
