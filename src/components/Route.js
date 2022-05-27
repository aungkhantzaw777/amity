import { useState } from "react";
import "./Route.css";
import FindCost from "./FindCost";
import FindRoutes from "./FindRoutes";
import { Form, Button, Card, Table } from "react-bootstrap";
import db from "../db.json"

function Route({ towns }) {
  const [getRoutes, setRoutes] = useState([]);
  const [getRoute, setRoute] = useState();
  const [getAvaliableRoutes, setAvaliableRoutes] = useState(db.avaliableRotues);
  const [getCost, setCost] = useState(0);
  const [isFinish, setFinish] = useState(true);

  const addRoute = () => {
    setRoutes((prev) => {
      return [...prev, getRoute];
    });
    // setRoute('')
  };

  const handleCost = (e) => {

    setCost(e.target.value)
  }
  const addCost = () => {
    setAvaliableRoutes((prev) => {
      return [
        ...prev,
        { source: getRoutes[0], distination: getRoutes[1], cost: getCost },
      ];
    });
    setRoutes([]);
  };

  const removeAvaliable = (index) => {
    
    let result = getAvaliableRoutes.filter((val, i) => i !== index)
    setAvaliableRoutes(result)

  }

  const RouteItem = ({ source, distination, cost, index }) => {
    return (
      <tbody>
        <tr>
          <td>{source}</td>
          <td>{distination}</td>
          <td>{cost}</td>
          <td>
            <span onClick={() => removeAvaliable(index)} style={{cursor:'pointer', color: 'red'}} >

              &times;
            </span>
            </td>
        </tr>
      </tbody>
    )
  }


  const BodyItem = () => {
    return (

      <div>
        <div>
          <Table>
            <thead>
              <tr>
                <th>Source</th>
                <th>Distination</th>
                <th>Cost</th>
              </tr>
            </thead>
            {getAvaliableRoutes.map((r, i) => {
              return (
                <RouteItem source={r.source} distination={r.distination} cost={r.cost} index={i} />

              );
            })}
          </Table>
          {getRoutes.length < 3 && getRoutes}
        </div>
        {getRoutes.length < 2 && (
          <div class="d-flex">
            <Form.Select
              value={getRoute}
              onChange={(e) => setRoute(e.target.value)}
              aria-label="Default select example"
            >
              <option>--- choose ---</option>
              {towns.map((t, i) => {
                return <option key={i}>{t.town}</option>;
              })}
            </Form.Select>
            <div>
              <Button onClick={addRoute}>To</Button>
            </div>
          </div>
        )}
        {getRoutes.length > 1 && (
          <div>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Cost</Form.Label>
              <Form.Control
                type="text"
                value={getCost}
                onChange={handleCost}
              />
            </Form.Group>
            <Button onClick={addCost}>add cost</Button>
          </div>
        )}
      </div>
    )
  }

  return (
    <>
      <div className="col-6">
        <Card>
          <Card.Header>
            <h1>Create Route</h1>
          </Card.Header>
          <Card.Body>
            <BodyItem />
          </Card.Body>
        <Card.Footer className="d-flex justify-content-end">

          {getAvaliableRoutes.length > 0 && (
            <Button className="mt-3" onClick={() => setFinish(true)}>Finish</Button>
          )}
        </Card.Footer>
        </Card>



      </div>
      <div className="col-6">
        {isFinish && <FindCost routes={getAvaliableRoutes} towns={towns} />}
      </div>
      <div className="col-6">
        {isFinish && <FindRoutes routes={getAvaliableRoutes} towns={towns} />}
      </div>
    </>
  );
}

export default Route;
