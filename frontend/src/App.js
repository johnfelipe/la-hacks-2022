import React, { useState, useEffect } from 'react'


function Indicator(props) {
  if (props.percentage_seizure_occurrence > 90) {
    return (
      <div className="EEG">
        <h1>Seizure Occurence Possibility: {props.percentage_seizure_occurrence}%</h1>
        <h1> ⚠️ Potential Epilepsy Caution </h1>
        <h3>This percentage indicates your potential danger of experiencing epileptic seizure based on your EEG data analyzed by our machine learning model.</h3>
      </div>
    )
  } else if (props.percentage_seizure_occurrence < 10) {
    return (
      <div className="EEG">
        <h1>Seizure Occurence Possibility: {props.percentage_seizure_occurrence}%</h1>
        <h1> ✅ No Potential Epilepsy </h1>
        <h3>This percentage indicates your potential danger of experiencing epileptic seizure based on your EEG data analyzed by our machine learning model.</h3>
      </div>
    )
  }
}

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
    <Indicator percentage_seizure_occurrence = {data.percentage_seizure_occurrence}/>
    // <div className="EEG">
      
    //   <h1> ✅ </h1>
    //   <h1>Seizure Occurence Possibility: {data.percentage_seizure_occurrence}%</h1>
    //   <h1> - </h1>
    //   <h3>This percentage indicates your potential danger of experiencing epileptic seizure based on your EEG data analyzed by our machine learning model.</h3>
    // </div>
  );
}

export default App;