import React, { useState, useEffect } from 'react'

function App() {

  const [data, setData] = useState([{}])

  useEffect(() => {
    fetch("/prediction").then(
      res => res.json()
    ).then(
      data => {
        setData(data)
        console.log(data)
      }
    )
  }, [])

  return (
    <div className="EEG">
      <h1>Seizure Occurence Possibility: </h1>
      <p>{data.percentage_seizure_occurrence}%</p>
    </div>
  );
}

export default App;
