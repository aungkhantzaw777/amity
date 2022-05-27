import { useState } from "react"
import { Form, Button, Card } from "react-bootstrap"

const Graph = require('graph-route-finder');

function FindRoutes({ towns, routes }) {
    const [getSource, setSource] = useState()
    const [getDistination, setDistination] = useState()
    const [getResult, setResult] = useState()
    const [isMax, setisMax] = useState(false)
    const [getMax, setMax] = useState(0)

    const add = () => {
        if (!getSource) {
            alert('please fill source route')
            return
        } else if (!getDistination) {
            alert('please fill to route')
            return
        }

        let vertex = towns.map(t => t.town)
        let objectTown = {}


        objectTown = Object.assign({}, vertex);
        const obj = vertex.reduce((accumulator, value) => {

            return { ...accumulator, [value]: {} };
        }, {});
        let graph = new Graph(obj)
        routes.forEach(r => {
            graph.set(r.source, r.distination, parseInt(r.cost))
        });
        // console.log(graph)

        let result
        
        if (isMax) {
            
            result = graph.findRoutes(getSource, getDistination, { stopLimit: getMax })
        } else {
            result = graph.findRoutes(getSource, getDistination)
        }
        console.log(result)

        if (parseInt(getMax) < result.length && isMax) {
            setResult(parseInt(getMax))
        } else {
            setResult(result.length)
        }

    }
    return (
        <Card className="mt-4">
            <Card.Header>

                <h1>Case 2 : find delivery routes</h1>
            </Card.Header>
            <Card.Body>

            
            <Form.Select onChange={e => setSource(e.target.value)}>
                <option>---choose---</option>
                {
                    towns.map((t, i) => {
                        return (
                            <option value={t.town}>{t.town}</option>
                        )
                    })
                }
            </Form.Select>
            To
            <Form.Select onChange={e => setDistination(e.target.value)}>
                <option>---choose---</option>
                {
                    towns.map((t, i) => {
                        return (
                            <option value={t.town}>{t.town}</option>
                        )
                    })
                }
            </Form.Select>
            {
                    isMax &&
                    (
                        <div>
                            <label>Maximum Route</label>
                            <Form.Control type="number" onChange={e => setMax(e.target.value)} min={0} />
                        </div>

                    )

                }
            <Card.Footer className="mt-3">
            <div>
                <h1>
                {getSource} {getDistination} result: {getResult}
                </h1>
            </div>
            </Card.Footer>
            </Card.Body>
            <Card.Footer className="d-flex justify-content-between">
            
                <Button onClick={add}>Find Route</Button>
       
           
                <Button onClick={() => setisMax(true)}>max </Button>
                {' '}
                
                <Button variant="danger" onClick={() => setisMax(false)}>clear max</Button>

          

            </Card.Footer>
        </Card>
    )
}

export default FindRoutes