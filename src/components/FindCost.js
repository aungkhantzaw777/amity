import { useState } from 'react'
import {Graph} from '../graph'

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
        <div>
            <h1>Case 1</h1>
            <div>{getPath}</div>
            <select onChange={changeTown}>
                <option>--choose--</option>
                {
                    towns.map((t,i) => {
                        return ( <option value={t.town} key={i}>{t.town}</option>  )
                    })
                }
            </select>
            <button onClick={addPath}>To</button>
            {
                getPath.length > 1 && 
                (
                    <button onClick={calculateCost}>Deliver Cost</button>
                )
            }
            <button onClick={clearAll}>clear</button>
            <div>{getResult}</div>
            
        </div>
    )
}

export default FindCost