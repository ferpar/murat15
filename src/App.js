import React, { useState } from "react";
import TreeChart from "./TreeChart"
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


function App() {
  const [data, setData] = useState(initialData)

  return <React.Fragment>
    <br/>
    </React.Fragment>;
}

export default App;
