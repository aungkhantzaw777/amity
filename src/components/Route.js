import { useState } from 'react'
import './Route.css'
import FindCost from './FindCost'

function Route({
    towns
}) {
    const [getRoutes, setRoutes] = useState([])
    const [getRoute, setRoute] = useState()
    const [getAvaliableRoutes, setAvaliableRoutes] = useState([])
    const [getCost, setCost] = useState()
    const [isFinish, setFinish] = useState(false)

    const addRoute = () => {
        setRoutes(prev => {
            return [...prev, getRoute]
        })
        // setRoute('')
    }
    const addCost = () => {
        
        setAvaliableRoutes(prev => {
            return [...prev , {source: getRoutes[0], distination: getRoutes[1] ,cost: getCost}]
        })
        setRoutes([])
        
    }

    return (
        <div className='mt-2 wrap'>
            <div>
                <div>
                    {getAvaliableRoutes.map((r,i) => {
                        return (
                            <div key={i}>
                                {`${r.source} -> ${r.distination} cost : ${r.cost}`}
                            
                            </div>
                        )
                    })}
                    {
                        (getRoutes.length < 3 ) && getRoutes
                    }
                </div>
                <label>Route</label>
                <select onChange={e => setRoute(e.target.value)} >
                    <option>--- choose ---</option>
                    {
                        towns.map((t, i) => {
                            return (<option key={i} >{t.town}</option>)
                        })
                    }
                </select>
                {
                    getRoutes.length < 2 && (
                        <button onClick={addRoute   }>To</button>
                    )
                }
                {
                    getRoutes.length > 1 && (
                        <div>
                            <input type="text" value={getCost} onChange={e => setCost(e.target.value)} placeholder="cost" />
                            <button onClick={addCost} >add</button>
                        </div>
                    )
                }
                {
                    getAvaliableRoutes.length > 0
                    && (
                        <button onClick={() => setFinish(true)}>Finish</button>
                    )
                }
                {
                    // getAvaliableRoutes.length
                     isFinish && 
                    (
                        <FindCost routes={getAvaliableRoutes} towns={towns} />
                    )
                }
            </div>

        </div>
    )
}

export default Route