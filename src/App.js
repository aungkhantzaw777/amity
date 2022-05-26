import "./App.css";
import {  useState } from "react";
import { Graph } from "./graph";
import Route from "./components/Route";
import "bootstrap/dist/css/bootstrap.min.css";
import { Badge, Button, FormControl, InputGroup } from "react-bootstrap";

function App() {
  const [getTowns, setTowns] = useState([]);
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
      setTown('')
    } else {
      alert("Town already exist");
    }
  };
  

  function ListItem({ town }) {
    return <div className="px-4 py-1 border mb-2 rounded">{town}</div>;
  }

  return (
    <div className="App">
      <h1>Add Towns</h1>
      <div className="d-flex justify-content-center">
        {getTowns.map((town, i) => (
          <ListItem key={i} town={town.town} />
        ))}
      </div>
      <div className="d-flex justify-content-center" >
      <div className="w-50 d-flex justify-content-center">
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
          <Button onClick={submit} variant="outline-secondary" id="button-addon2">
            Add
          </Button>
        </InputGroup>
      </div>
        {/* <label>town</label>
        <input
          type="text"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              submit();
            }
          }}
          onChange={(e) => setTown(e.target.value)}
        /> */}
      </div>

      {/* <Button onClick={submit}>add Town</Button> */}
      {getTowns.length > 1 && <Route towns={getTowns} />}
      {/* <Route /> */}
    </div>
  );
}

export default App;
