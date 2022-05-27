import { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";

const Graph = require("graph-route-finder");

function FindRoutes({ towns, routes }) {
  const [getSource, setSource] = useState();
  const [getDistination, setDistination] = useState();
  const [getResult, setResult] = useState();
  const [isMax, setisMax] = useState(false);
  const [getMax, setMax] = useState(0);
  const [getMaxCost, setMaxCost] = useState()
  const [isMaxDeli, setIsMaxDeli] = useState(false)
  const [isSameRoute, setIsSameRoute] = useState(false)

  const add = () => {
    if (!getSource) {
      alert("please fill source route");
      return;
    } else if (!getDistination) {
      alert("please fill to route");
      return;
    }

    let vertex = towns.map((t) => t.town);
    let objectTown = {};

    objectTown = Object.assign({}, vertex);
    const obj = vertex.reduce((accumulator, value) => {
      return { ...accumulator, [value]: {} };
    }, {});
    let graph = new Graph(obj);
    routes.forEach((r) => {
      graph.set(r.source, r.distination, parseInt(r.cost));
    });
    // console.log(graph)

    let result;
    let properties = {};


    if (isMax) {
    //   result = graph.findRoutes(getSource, getDistination, {
    //     stopLimit: getMax,
    //   });
        properties = {...properties, routeLimit:getMax}
    } 
    if(isSameRoute) {
        properties = {...properties, pathReuseLimit: '1'}
        // result = graph.findRoutes(getSource, getDistination, {pathReuseLimit: '1'})
    }
    if(isMaxDeli){
        properties = {...properties, costLimit: getMax }
        // result = graph.findRoutes(getSource, getDistination, {pathReuseLimit: '1'})
    }

    result = graph.findRoutes(getSource, getDistination, properties)
            


    // else {
    //   result = graph.findRoutes(getSource, getDistination);
    // }
    console.log(result);
    setResult(result.length)

    // if (parseInt(getMax) < result.length && isMax) {
    //   setResult(parseInt(getMax));
    // }
    // else {
    //   setResult(result.length);
    // }
  };

  
  return (
    <Card className="mt-4">
      <Card.Header>
        <h1>Case 2 : Find delivery routes</h1>
      </Card.Header>
      <Card.Body>
        <Form.Select onChange={(e) => setSource(e.target.value)}>
          <option>---choose---</option>
          {towns.map((t, i) => {
            return <option value={t.town}>{t.town}</option>;
          })}
        </Form.Select>
        To
        <Form.Select onChange={(e) => setDistination(e.target.value)}>
          <option>---choose---</option>
          {towns.map((t, i) => {
            return <option value={t.town}>{t.town}</option>;
          })}
        </Form.Select>
        <Form className="mt-2">
          <Form.Check
            type="switch"
            checked={isMax}
            onChange={() => setisMax(!isMax)}
            label="Maximum routes"
          />
        </Form>
        {isMax && (
          <div>
            <label>Maximum Route</label>
            <Form.Control
              type="number"
              value={getMax}
              onChange={(e) => setMax(e.target.value)}
              min={0}
            />
          </div>
        )}

        <Form>
            <Form.Check 
            type="switch"
            label="Maximum Delivery Cost"
            checked={isMaxDeli}
            onChange={() => setIsMaxDeli(!isMaxDeli)}
            />
        </Form>
        {
            isMaxDeli && 
            (
                <Form>
                    <Form.Control
                    type="number"
                    placeholder="Maximum Delivery Cost"
                    min={0}
                    value={getMaxCost}
                    onChange={(e) => setMaxCost(e.target.value)}
                    />

                    
                </Form>
            )
        }
        <Form>
            <Form.Check 
            type="switch"
            checked={isSameRoute}
            label="Use Same Route"
            onChange={() => setIsSameRoute(!isSameRoute)}
            />
        </Form>
        

        <Card.Footer className="mt-3">
          <div>
            <h1>
              {getSource} {getDistination} result: {getResult}
            </h1>
          </div>
        </Card.Footer>
      </Card.Body>
      <Card.Footer className="d-flex justify-content-end">
        <Button onClick={add}>Find Route</Button>
      </Card.Footer>
    </Card>
  );
}

export default FindRoutes;
