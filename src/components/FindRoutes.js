import { useState } from "react"
import {Form, Button} from "react-bootstrap"

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

        let result 
        if (isMax) {
            result = graph.findRoutes(getSource,getDistination, {costLimit : getMax})
        }else {
            result = graph.findRoutes(getSource,getDistination)
        }
        
        if(parseInt(getMax) < result) {
            setResult(parseInt(getMax))
        }else{
            setResult(result.length)
        }

    }
    return (
        <div className="mt-4">
            <h1>Case 2</h1>
            <div>
                {getSource} {getDistination} result: {getResult}
            </div>
            <Form.Select onChange={e => setSource(e.target.value)}>
                <option>---choose---</option> 
                {
                    towns.map((t,i) => {
                        return (
                            <option value={t.town}>{ t.town }</option>
                        )
                    })
                }
            </Form.Select>
            To
            <Form.Select onChange={e => setDistination(e.target.value)}>
                <option>---choose---</option> 
                {
                    towns.map((t,i) => {
                        return (
                            <option value={t.town}>{ t.town }</option>
                        )
                    })
                }
            </Form.Select>
            <div className="mt-4">
                <Button onClick={add}>Find Route</Button>
            </div>
            <div className="mt-2">
                <Button onClick={() => setisMax(true)}>max </Button>
                {' '}
                {
                    isMax &&
                    (
                        <Form.Control type="number" onChange={e => setMax(e.target.value)} min={0} />

                    )
                    
                }
                <Button variant="danger" onClick={() => setisMax(false)}>clear max</Button>
                
            </div>
        </div>
    )
}

export default FindRoutes