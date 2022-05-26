const Graph = require('graph-route-finder');


const graph = new Graph({
    A: { B: 1, C: 4, D: 10 },
    B: { E: 3 },
    C: { D: 4, F: 2 },
    D: { E: 1 },
    E: { B: 3, A: 2 },
    F: { D: 1 },
  }); 

// const routes = graph.findRoutes('E', 'D', { stopLimit: 4 });
// const routes = graph.findRoutes('E', 'E');
const routes = graph.findRoutes('E', 'E',{ costLimit: 20, pathReuseLimit:'1' });
console.log(routes.length)
console.log(routes)