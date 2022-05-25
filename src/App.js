import './App.css';
import { useEffect, useState } from 'react';
import {Graph} from './graph'
import Route from './components/Route';

function App() {
  const [getTowns, setTowns] = useState([])
  const [getTown, setTown] = useState('')
  const [getCost, setCost] = useState('')
  let graph = new Graph()

  const submit = () => {
    // console.log(useTowns([]))
    let town = getTown
    
    let checkDuplicate = getTowns.filter(t => t.town === town).length > 0

    if(!checkDuplicate){
      setTowns(prev => {
        return [...prev, {town}]
      })
    } else {
      alert('Town already exist')
    }

   
  }
  const printGraph = () => {
    getTowns.forEach(town => {
      graph.addVertex(town.town)
    })
    graph.printGraph()

  }

  // const routeCost = () => {
  //   return (
  //     <div>
  //       <h3>hey man </h3>
  //     </div>
  //   )
  // }
  
  return (
    <div className="App">

      <h1>Add Towns</h1>
      <ul>
        {
          getTowns.map((town,i) => {
            return <li key={i}>{town.town}  </li>
          })
        }
      </ul>
      <div>
        <label >town</label>
        <input type="text" onChange={(e) => setTown(e.target.value)} />
      </div>
      
      <button onClick={submit}>add Town</button>
      <button onClick={printGraph}>print</button>
      {
        getTowns.length > 1 && (<Route towns={getTowns} />)
      }
      {/* <Route /> */}
      {/* {
        getTowns.length > 1
        && (
          <div className='mt-2'>
            <div>
              <label>source</label>
              <select >
                {
                  getTowns.map((t,i) => {
                    return (<option key={i} >{ t.town }</option>)
                  })
                }
              </select>
            </div>
            <div>
              <label>destination</label>
              <select>
                {
                  getTowns.map((t,i) => {
                    return (<option key={i}>{ t.town }</option>)
                  })
                }
              </select>
            </div>
          </div>
        )
      } */}
      
    </div>
  );
}

export default App;
