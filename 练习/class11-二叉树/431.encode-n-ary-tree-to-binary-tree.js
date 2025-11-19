class Nodee {
  constructor(val, children = []) {
    this.val = val;
    this.children = children;
  }
}

class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class Codec {
  // Encodes an n-ary tree to a binary tree.
  encode(root) {
    if (root == null) return null;
    const head = new TreeNode(root.val);
    head.left = this._en(root.children);
    return head;
  }

  _en(children) {
    if (children.length == 0) return null;

    let head;
    let cur;

    for (let i = 0; i < children.length; i++) {
      const node = new TreeNode(children[i].val);
      if (head == null) {
        head = node;
      } else {
        cur.right = node;
      }

      cur = cur.right;
      cur.left = this._en(cur.children);
    }
    return head;
  }

  // Decodes a binary tree to an n-ary tree.
  decode(root) {
    if (root == null) return null;

    return new Nodee(root.val, this._de(root.left));
  }

  _de(node) {
    const children = [];

    while (node !== null) {
      const cur = new Nodee(node.val, this._de(node.left));
      children.push(cur);
      node = node.right;
    }

    return children;
  }
}

//examples
const codec = new Codec();
const nAryRoot = new Node(1, [
  new Node(2),
  new Node(3, [new Node(6), new Node(7)]),
  new Node(4),
  new Node(5),
]);

const binaryRoot = codec.encode(nAryRoot);
const decodedNAryRoot = codec.decode(binaryRoot);

console.log(JSON.stringify(nAryRoot));
console.log(JSON.stringify(binaryRoot));
