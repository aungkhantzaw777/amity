import { useState } from "react"
const Graph = require('graph-route-finder');


function FindRoutes({towns, routes}) {
    const [getSource, setSource] = useState()
    const [getDistination, setDistination] = useState()
    const [getResult , setResult ] = useState()
    const [isMax, setisMax] = useState(false)
    const [getMax, setMax] = useState(0)

    const add = () => {
        if(!getSource){
            alert('please fill source route')
            return 
        }else if(!getDistination){
            alert('please fill to route')
            return 
        }

        let vertex = towns.map(t => t.town)
        let objectTown = {}

        
        objectTown = Object.assign({}, vertex);
        const obj = vertex.reduce((accumulator, value) => {
        
            return {...accumulator, [value]: {}};
          }, {});
        let graph = new Graph(obj)
        routes.forEach(r => {
            graph.set(r.source, r.distination, parseInt(r.cost))
        });
        console.log(graph)

        let result = graph.findRoutes(getSource,getDistination)
        console.log('result is', result)
        if(parseInt(getMax) < result) {
            setResult(parseInt(getMax))
        }else{
            setResult(result.length)
        }

    }
    return (
        <div>
            <h1>Case 2</h1>
            <div>
                {getSource} {getDistination} result: {getResult}
            </div>
            <select onChange={e => setSource(e.target.value)}>
                <option>---choose---</option> 
                {
                    towns.map((t,i) => {
                        return (
                            <option value={t.town}>{ t.town }</option>
                        )
                    })
                }
            </select>
            To
            <select onChange={e => setDistination(e.target.value)}>
                <option>---choose---</option> 
                {
                    towns.map((t,i) => {
                        return (
                            <option value={t.town}>{ t.town }</option>
                        )
                    })
                }
            </select>
            <div>
                <button onClick={add}>Find Route</button>
            </div>
            <div>
                <button onClick={() => setisMax(true)}>max </button>
                {
                    isMax &&
                    (
                        <input type="number" onChange={e => setMax(e.target.value)} min={0} />

                    )
                    
                }
                <button onClick={() => setisMax(false)}>clear max</button>
                
            </div>
        </div>
    )
}

export default FindRoutes