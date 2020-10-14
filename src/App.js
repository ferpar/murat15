import React, { useState } from "react";
import StackedBarChart from "./StackedBarChart"
import "./App.css";

const initialData = [
  {
    year: 1980,
    "🥑": 10,
    "🍌": 20,
    "🍆": 30
  },
  {
    year: 1990,
    "🥑": 20,
    "🍌": 40,
    "🍆": 60
  },
  {
    year: 2000,
    "🥑": 30,
    "🍌": 45,
    "🍆": 80
  },
  {
    year: 2010,
    "🥑": 40,
    "🍌": 60,
    "🍆": 100
  },
  {
    year: 2020,
    "🥑": 50,
    "🍌": 80,
    "🍆": 120
  }
]; 

const allKeys = ["🥑", "🍌", "🍆"];
const colors = {
  "🥑": "green",
  "🍌": "orange",
  "🍆": "purple"
}

function App() {
  const [data, setData] = useState(initialData)
  const [keys, setKeys] = useState(allKeys)

  return <React.Fragment>
      <h2>Stacked Bars with D3</h2>
      <StackedBarChart data={data} keys={keys} colors={colors}/>
      <br/>
      <div className="fields">
        {
        allKeys.map( key => ( 
          <div className="field" key={key}>
            <input 
              id={key}
              type="checkbox"
              checked={keys.includes(key)}
              onChange={ e => {
                if (e.target.checked) {
                  setKeys(Array.from(new Set([...keys, key])));
                } else {
                  setKeys(keys.filter( _key => _key != key));
                }
              }}
            />
            <label htmlFor={key} style={{color: colors[key]}}>
              {key}
            </label>
          </div>
          )
        )}
      </div>
    </React.Fragment>;
}

export default App;
