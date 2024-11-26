import Node from "./Node.mjs";

export default class Tree {
  #root;
  #array;

  constructor(array) {
    const arr = this.removeDuplicates(array);
    arr.sort((a, b) => a - b);
    this.#array = arr;
  }

  buildTree() {
    this.#root = this.buildBST(this.#array, 0, this.#array.length - 1);
  }

  buildBST(arr, start, end) {
    if (start > end) return;
    const mid = Math.floor((end + start) / 2);
    const root = new Node(arr[mid]);
    root.left = this.buildBST(arr, start, mid - 1);
    root.right = this.buildBST(arr, mid + 1, end);

    return root;
  }

  removeDuplicates(arr) {
    return [...new Set(arr)];
  }

  log(option = "array") {
    if (option === "array") {
      console.log(this.#array);
    } else {
      this.prettyPrint(this.#root);
    }
  }

  prettyPrint(node, prefix = "", isLeft = true) {
    if (!node) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }

  get root() {
    return this.#root;
  }

  insert(node, key) {
    if (!node) {
      return new Node(key);
    }
    if (node.data === key) {
      return node;
    }

    if (node.data > key) {
      node.left = this.insert(node.left, key);
    }
    if (node.data < key) {
      node.right = this.insert(node.right, key);
    }
    return node;
  }

  getSuccesor(node) {
    node = node.right;
    while (node && node.left) {
      node = node.left;
    }
    return node;
  }

  delete(node, key) {
    if (!node) {
      return node;
    }

    if (node.data > key) {
      node.left = this.delete(node.left, key);
    } else if (node.data < key) {
      node.right = this.delete(node.right, key);
    } else {
      if (!node.left) {
        return node.right;
      }
      if (!node.right) {
        return node.left;
      }

      const succ = this.getSuccesor(node);
      node.data = succ.data;
      node.right = this.delete(node.right, succ.data);
    }
    return node;
  }

  findKey(node, key) {
    while (node) {
      if (node.data > key) {
        return this.findKey(node.left, key);
      } else if (node.data < key) {
        return this.findKey(node.right, key);
      } else {
        return node;
      }
    }
  }

  find(key) {
    return this.findKey(this.#root, key);
  }

  levelOrder(node, callback) {
    if (!this.#root) {
      return this.#root;
    }
    const queue = [];
    queue.push(this.#root);

    while (queue.length !== 0) {
      const current = queue.shift();
      if (callback && typeof callback === "function") {
        callback.call(current);
      } else {
        throw Error("no callback provided or it is not a function");
      }
      if (current.left) {
        queue.push(current.left);
      }
      if (current.right) {
        queue.push(current.right);
      }
    }
  }

  preOrder(node, callback) {
    if (!node) {
      return node;
    }
    if (callback && typeof callback === "function") {
      callback.call(node);
    } else {
      throw Error("no callback provided or it is not a function");
    }

    this.preOrder(node.left, callback);
    this.preOrder(node.right, callback);
  }

  inOrder(node, callback) {
    if (!node) {
      return node;
    }
    this.inOrder(node.left, callback);
    if (callback && typeof callback === "function") {
      callback.call(node);
    } else {
      throw Error("no callback provided or it is not a function");
    }
    this.inOrder(node.right, callback);
  }

  postOrder(node, callback) {
    if (!node) {
      return node;
    }

    if (callback && typeof callback === "function") {
      callback.call(node);
    } else {
      throw Error("no callback provided or it is not a function");
    }
    this.postOrder(node.right, callback);
    this.postOrder(node.left, callback);
  }

  height(node) {
    if (!node) {
      return -1;
    }
    const lHeight = this.height(node.left);
    const rHeight = this.height(node.right);

    return Math.max(lHeight, rHeight) + 1;
  }

  depth(node) {
    return this.findDepth(this.#root, node);
  }

  findDepth(nodeA, nodeB) {
    if (!nodeA) {
      return -1;
    }
    let dist = -1;
    if (
      nodeA.data === nodeB.data ||
      (dist = this.findDepth(nodeA.left, nodeB)) >= 0 ||
      (dist = this.findDepth(nodeA.right, nodeB)) >= 0
    ) {
      return dist + 1;
    }

    return dist;
  }

  isBalanced() {
    return (
      Math.abs(this.height(this.#root.left) - this.height(this.#root.right)) <=
      1
    );
  }

  rebalance() {
    let arr = [];
    this.preOrder(this.#root, function () {
      arr.push(this.data);
    });
    arr = this.removeDuplicates(arr);
    arr.sort((a, b) => a - b);
    this.#array = arr;
    this.buildTree();
  }
}
