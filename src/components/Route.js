import { useState } from "react";
import "./Route.css";
import FindCost from "./FindCost";
import FindRoutes from "./FindRoutes";
import { Form, Button } from "react-bootstrap";

function Route({ towns }) {
  const [getRoutes, setRoutes] = useState([]);
  const [getRoute, setRoute] = useState();
  const [getAvaliableRoutes, setAvaliableRoutes] = useState([]);
  const [getCost, setCost] = useState();
  const [isFinish, setFinish] = useState(false);

  const addRoute = () => {
    setRoutes((prev) => {
      return [...prev, getRoute];
    });
    // setRoute('')
  };
  const addCost = () => {
    setAvaliableRoutes((prev) => {
      return [
        ...prev,
        { source: getRoutes[0], distination: getRoutes[1], cost: getCost },
      ];
    });
    setRoutes([]);
  };

  return (
    <div className="mt-2 wrap">
      <div>
        <div>
          {getAvaliableRoutes.map((r, i) => {
            return (
              <div key={i}>
                {`${r.source} -> ${r.distination} cost : ${r.cost}`}
              </div>
            );
          })}
          {getRoutes.length < 3 && getRoutes}
        </div>
        {getRoutes.length < 2 && (
          <div class="d-flex">
            <Form.Select
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
            {/* <input
              type="text"
              value={getCost}
              onChange={(e) => setCost(e.target.value)}
              placeholder="cost"
            /> */}
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Cost</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setCost(e.target.value)}
              />
            </Form.Group>
            <Button onClick={addCost}>add cost</Button>
          </div>
        )}
        {getAvaliableRoutes.length > 0 && (
          <Button className="mt-3" onClick={() => setFinish(true)}>Finish</Button>
        )}
      </div>
      <div className="row">
        <div className="col-6">
          {isFinish && <FindCost routes={getAvaliableRoutes} towns={towns} />}
        </div>
        <div className="col-6">
          {isFinish && <FindRoutes routes={getAvaliableRoutes} towns={towns} />}
        </div>
      </div>
      
    </div>
  );
}

export default Route;
