let d1 = -1;
let d2 = -1;
let dist = 0;

class Node {
    constructor(key) {
        this.left = null;
        this.right = null;
        this.key = key;
    }
}

// Returns level of key k if it is present
// in tree, otherwise returns -1
function findLevel(root, k, level) {

    // Base Case
    if (root == null) {
        return -1;
    }

    // If key is present at root, or in left
    // subtree or right subtree, return true;
    if (root.key == k) {
        return level;
    }

    let l = findLevel(root.left, k, level + 1);
    return (l != -1) ? l : findLevel(root.right, k, level + 1);
}

// This function returns pointer to LCA of
// two given values n1 and n2. It also sets
// d1, d2 and dist if one key is not ancestor of other
// d1 -. To store distance of n1 from root
// d2 -. To store distance of n2 from root
// lvl -. Level (or distance from root) of current node
// dist -. To store distance between n1 and n2
function findDistUtil(root, n1, n2, lvl) {

    // Base case
    if (root == null) {
        return null;
    }

    // If either n1 or n2 matches with root's
    // key, report the presence by returning
    // root (Note that if a key is ancestor of
    // other, then the ancestor key becomes LCA
    if (root.key == n1) {
        d1 = lvl;
        return root;
    }
    if (root.key == n2) {
        d2 = lvl;
        return root;
    }

    // Look for n1 and n2 in left and right subtrees
    let left_lca = findDistUtil(root.left, n1,
        n2, lvl + 1);
    let right_lca = findDistUtil(root.right, n1,
        n2, lvl + 1);

    // If both of the above calls return Non-null,
    // then one key is present in once subtree and
    // other is present in other, So this node is the LCA
    if (left_lca != null && right_lca != null) {
        dist = (d1 + d2) - 2 * lvl;
        return root;
    }

    // Otherwise check if left subtree
    // or right subtree is LCA
    return (left_lca != null) ? left_lca : right_lca;
}

// The main function that returns distance
// between n1 and n2. This function returns -1
// if either n1 or n2 is not present in
// Binary Tree.
function findDistance(root, n1, n2) {
    d1 = -1;
    d2 = -1;
    dist = 0;
    let lca = findDistUtil(root, n1, n2, 1);

    // If both n1 and n2 were present
    // in Binary Tree, return dist
    if (d1 != -1 && d2 != -1) {
        return dist;
    }

    // If n1 is ancestor of n2, consider
    // n1 as root and find level
    // of n2 in subtree rooted with n1
    if (d1 != -1) {
        dist = findLevel(lca, n2, 0);
        return dist;
    }

    // If n2 is ancestor of n1, consider
    // n2 as root and find level
    // of n1 in subtree rooted with n2
    if (d2 != -1) {
        dist = findLevel(lca, n1, 0);
        return dist;
    }
    return -1;
}

export {
    findDistUtil,
    findLevel,
    findDistance,
    Node
}