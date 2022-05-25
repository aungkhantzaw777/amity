import { useState } from 'react'
import {Graph} from '../graph'

function FindCost({routes, towns}) {
    // var graph = new Graph()
    const [getPath, setPath] = useState([])
    const [getTown, setTown] = useState(towns[0].town)

    const addPath = () => {
        setPath(prev => {
            return [...prev, getTown]
        })
    }
    const changeTown = (e) => {
        // alert(e.target.value)
        setTown(e.target.value)
    }

    return (
        <div>
            <h1>Case 1</h1>
            <div>{getPath}</div>
            <select value={getTown} onChange={changeTown}>
                {/* <option>--choose--</option> */}
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
                    <button>Deliver Cost</button>
                )
            }
        </div>
    )
}

export default FindCost