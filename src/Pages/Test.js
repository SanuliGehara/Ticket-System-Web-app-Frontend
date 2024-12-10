import React, { useState, useEffect } from "react";

//import React, { useState, useEffect } from 'react';

/*
const App = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Replace with your Spring Boot endpoint
    const url = 'http://localhost:8080/api/endpoint';
    
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => setData(data))
      .catch(err => setError(err));
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Data from Spring Boot REST API</h1>
      <ul>
        {data.map(item => (
          <li key={item.id}>{item.name}</li> // Customize based on your data structure
        ))}
      </ul>
    </div>
  );
};

export default App;
*/
// ----------------------------------------

const Test = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [output, setOutput] = useState(["Empty"]);

  // useEffect(() => {
  //   // Replace with your Spring Boot endpoint
  //   const url = "http://localhost:8080/configuration";

  //   fetch(url)
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }
  //       return response.json();
  //     })
  //     .then((data) => setData(data))
  //     .catch((err) => setError(err));
  // }, []);

  const handleSubmit = () => {
    console.log("Button submited");
    setOutput("Button clicked! new content");

    const url = "http://localhost:8080/configuration";

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setData(data))
      .catch((err) => setError(err));
  };

  if (error) {
    return <div>Error1: {error.message}</div>;
  }

  return (
    <div>
      <button
        type="submit"
        onClick={handleSubmit}
        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all"
      >
        Call backend
      </button>
      <br />
      <label>Output</label>
      <div>
        <label>{output}</label>
        <br />
        <label>Max Capacity: {data.maxTicketCapacity}</label>
      </div>
    </div>
  );
};

export default Test;
