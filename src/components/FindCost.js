import { useState } from 'react'
import { Graph } from '../graph'
import { Form, Button, Card } from 'react-bootstrap'

function FindCost({ routes, towns }) {
    const [getPath, setPath] = useState([])
    const [getTown, setTown] = useState(towns[0].town)
    const [getResult, setResult] = useState()

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
        <Card className='mt-4'>
            <Card.Header>
                <h1>Case 1: Find Deliver Cost</h1>
            </Card.Header>
            <Card.Body>

                <div>{getPath}</div>

                <Form.Select onChange={changeTown}>
                    <option>--choose--</option>
                    {
                        towns.map((t, i) => {
                            return (<option value={t.town} key={i}>{t.town}</option>)
                        })
                    }
                </Form.Select>
                <Card.Footer className='mt-2'>

                    <div >
                        <h1 className='text-center '>
                        {getResult || 'Plase Choose Route'}
                        </h1>
                    </div>
                </Card.Footer>
            </Card.Body>
            <Card.Footer>
                <div class="mt-2 d-flex justify-content-between">
                    <Button className="mr-4" onClick={addPath}>To</Button>
                    {' '}
                    {
                        getPath.length > 1 &&
                        (
                            <Button onClick={calculateCost}>Deliver Cost</Button>
                        )
                    }
                    {' '}
                    <Button variant="danger" onClick={clearAll}>clear</Button>
                </div>

            </Card.Footer>

        </Card>
    )
}

export default FindCost