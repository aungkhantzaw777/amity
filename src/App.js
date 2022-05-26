import "./App.css";
import { useState } from "react";
import { Graph } from "./graph";
import Route from "./components/Route";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Button, FormControl, InputGroup } from "react-bootstrap";
import db from "./db.json"

function App() {
  const [getTowns, setTowns] = useState(db.Towns);
  const [getTown, setTown] = useState("");
  const [getCost, setCost] = useState("");
  let graph = new Graph();

  const submit = () => {
    // console.log(useTowns([]))
    let town = getTown;

    let checkDuplicate = getTowns.filter((t) => t.town === town).length > 0;

    if (!checkDuplicate) {
      setTowns((prev) => {
        return [...prev, { town }];
      });
      setTown("");
    } else {
      alert("Town already exist");
    }
  };

  function ListItem({ town }) {
    return <div className="px-4 py-1 border mb-2 rounded">{town}</div>;
  }

  function RoutePlaceholder() {
    return (
      <div class="col-6">
        <Card>
          <Card.Body>
            <div className="py-3 d-flex align-item-center justify-content-center">
              <h2>Please Add Township first</h2>
            </div>
          </Card.Body>
        </Card>
      </div>
    )
  }

  return (
    <div className="mt-3 container">
      <div className="row">
        <div className="col-6">
          <Card>
            <Card.Header>
              <h1>Add Towns</h1>
            </Card.Header>

            <Card.Body>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Town"
                  aria-label="Town"
                  aria-describedby="basic-addon2"
                  value={getTown}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      submit();
                    }
                  }}
                  onChange={(e) => setTown(e.target.value)}
                />
                <Button
                  onClick={submit}
                  variant="outline-secondary"
                  id="button-addon2"
                >
                  Add
                </Button>
              </InputGroup>

              <div className="d-flex mt-2 flex-column justify-content-center">
                {getTowns.map((town, i) => (
                  <ListItem key={i} town={town.town} />
                ))}
              </div>
            </Card.Body>
          </Card>
        </div>
        {/* <div className="col-6"> */}

          {
            getTowns.length > 1
            ? <Route towns={getTowns} />
            : <RoutePlaceholder />
          }
        {/* </div> */}
      </div>
    </div>
  );
}

export default App;
