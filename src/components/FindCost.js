import { useState } from 'react'
import {Graph} from '../graph'
import {Form, Button} from 'react-bootstrap'

function FindCost({routes, towns}) {
    const [getPath, setPath] = useState([])
    const [getTown, setTown] = useState(towns[0].town)
    const [getResult , setResult] = useState()
    
    const addPath = () => {
        setPath(prev => {
            return [...prev, getTown]
        })
    }
    const changeTown = (e) => {
        // alert(e.target.value)
        setTown(e.target.value)
    }
    const clearAll = () => {
        setResult(null)
        setPath([])
    }
    
    const calculateCost = () => {
        var graph = new Graph()
        
        towns.forEach(town => {
            graph.addVertex(town.town)
        });
        routes.forEach(r => {
            graph.addEdge(r.source, r.distination, parseInt(r.cost))
        })

        let result = graph.findCost(getPath)
        // graph.printGraph()
        console.log(result)
        setResult(result)
    }

    return (
    <div className='mt-4'>
            <h1>Case 1</h1>
            <div>{getPath}</div>
            
            <Form.Select onChange={changeTown}>
                <option>--choose--</option>
                {
                    towns.map((t,i) => {
                        return ( <option value={t.town} key={i}>{t.town}</option>  )
                    })
                }
            </Form.Select>
            <div class="mt-2">
                <Button onClick={addPath}>To</Button>
                {
                    getPath.length > 1 &&
                    (
                        <Button onClick={calculateCost}>Deliver Cost</Button>
                    )
                }
                {' '}
                <Button variant="danger" variant="danger" onClick={clearAll}>clear</Button>
            </div>
            <div>{getResult}</div>
            
        </div>
    )
}

export default FindCost