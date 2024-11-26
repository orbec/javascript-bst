import Tree from "./Tree.mjs";

const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
tree.log("array");
tree.buildTree();
tree.log("tree");
// tree.insert(tree.root, 42);
// tree.log("tree");
// tree.delete(tree.root, 42);
//tree.log("tree");
//tree.delete(tree.root, 8);
//tree.log("tree");

//console.log(tree.find(72).data);
// tree.levelOrder(tree.root, function () {
//   console.log(this.data);
// });
//tree.levelOrder(tree.root);
// tree.preOrder(tree.root, function () {
//   console.log(this.data);
// });
console.log(tree.isBalanced());
tree.insert(tree.root, 101);
tree.insert(tree.root, 102);
tree.insert(tree.root, 103);
tree.insert(tree.root, 104);
tree.insert(tree.root, 105);
tree.insert(tree.root, 106);
tree.insert(tree.root, 107);
tree.insert(tree.root, 108);
console.log(tree.isBalanced());
tree.log("tree");
tree.rebalance();
console.log(tree.isBalanced());
tree.log("tree");
console.log("***********************");
tree.levelOrder(tree.root, function () {
  console.log(this.data);
});
console.log("***********************");
tree.inOrder(tree.root, function () {
  console.log(this.data);
});
console.log("***********************");
tree.preOrder(tree.root, function () {
  console.log(this.data);
});
console.log("***********************");
tree.postOrder(tree.root, function () {
  console.log(this.data);
});
console.log("***********************");
