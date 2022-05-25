
class Graph {
  constructor() {
    this.adjacencyList = {};
  }
  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
  }
  addEdge(v1, v2, weight) {
    this.adjacencyList[v1].push({node:v2, weight: weight});
    // this.adjacencyList[v2].push({node:v1, weight: weight});
    // const sourceNode = this.addVertex(source);
    // const destinationNode = this.addVertex(destination);

    // sourceNode.addAdjacent(destinationNode);

    // if (this.edgeDirection === Graph.UNDIRECTED) {
    //   destinationNode.addAdjacent(sourceNode); // <3>
    // }

    // return [sourceNode, destinationNode];
  }
  removeEdge(v1, v2) {
    this.adjacencyList[v1] = this.adjacencyList[v1].filter((el) => el !== v2);
    this.adjacencyList[v2] = this.adjacencyList[v2].filter((el) => el !== v1);
  }
  removeVertex(vertex) {
    while (this.adjacencyList[vertex].length) {
      const adjacentVertex = this.adjacencyList[vertex].pop();
      this.removeEdge(vertex, adjacentVertex);
    }
    delete this.adjacencyList[vertex];
  }
  DepthFirst(start) {
    let stack = [start];
    let result = [];
    let visited = {};
    let currentElement;    visited[start] = true;

    while(stack.length) {
        currentElement = stack.pop();
        result.push(currentElement);    
        this.adjacencyList[currentElement].forEach(neighbor => {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                stack.push(neighbor);
            }
        })
    }
    
    return result;

  }
  printGraph() {
    // get all the vertices
    var get_keys = this.adjacencyList;
    console.log(get_keys)
    
  }
  findCost(Arr) {

    //check array
    if(!Array.isArray(Arr)) {
      return
    }

    if(Arr.length < 1) {
      return
    }
    var get_keys = this.adjacencyList;

    let sources = null
    let totalLength = []
    
    // let sources = get_keys[Arr[0]]
    let total = 0

    // calculate source and distination
    Arr.forEach((val, i) => {
      sources = get_keys[val]
      let distination = sources.find(v => v.node === Arr[i + 1])

      
      
      if(distination !== undefined) {
        total = total + distination.weight
      }
      else if(distination === undefined) {
        totalLength.push('not next route')
        return false
      } 
      
      
    })

    if(totalLength.length > 1) {
      return 'No Such Route'
    }else {
      return total
    }
    
  }
    
}

let g = new Graph()
var vertices = [ 'A', 'B', 'C', 'D', 'E', 'F' ];

for (var i = 0; i < vertices.length; i++) {
    g.addVertex(vertices[i]);
}

g.addEdge('A', 'B', 1);
g.addEdge('A', 'C', 4);
g.addEdge('A', 'D', 10);
g.addEdge('B', 'E', 3);
g.addEdge('C', 'D', 4);
g.addEdge('C', 'F', 2);
g.addEdge('D', 'E', 1);
g.addEdge('E', 'B', 3);
g.addEdge('E', 'A', 2);
g.addEdge('F', 'D', 1);

// g.findCost(['E', 'A', 'C', 'F'])
// g.findCost(['A', 'B', 'E'])
// g.findCost(['A', 'D'])
// let result = g.findCost(['A', 'D', 'F'])
// let result = g.findCost(['A', 'D'])
// console.log(result)
g.printGraph()

// export {
//     Graph
// }