import { Node_ } from "./graph";

/**
 *
 * @param {Node_} from
 */
const dijkstra = (from) => {
  //返回最小距离节点
  const getMinDistanceAndUnselectedNode = (distanceMap, selectedNodes) => {
    let minNode = null;

    return null;
  };
  const distanceMap = new Map();
  distanceMap.set(from, 0);
  const selectedNodes = new Set();
  const minNode = getMinDistanceAndUnselectedNode(distanceMap, selectedNodes);

  while (minNode !== null) {
    const distance = distanceMap.get(minNode);

    for (const edge of minNode.edges) {
      const toNode = edge.to;
      if (!distanceMap.has(toNode)) {
        distanceMap.set(toNode, distance + edge.weight);
      } else {
        distanceMap.set(
          toNode,
          Math.min(distanceMap.get(toNode), distance + edge.weight)
        );
      }
    }
    selectedNodes.add(minNode);
    minNode = getMinDistanceAndUnselectedNode(distanceMap, selectedNodes);
  }

  return distanceMap;
};
