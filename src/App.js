import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';

function App() {
  const [results, setResults] = useState([])
  useEffect(() => {
    axios.get('http://hn.algolia.com/api/v1/search?query=reacthooks')
      .then(response => {
        console.log(10, response.data)
        setResults(response.data.hits)
        console.log(13, results)
      })
  }, []);

  console.log(17, results)
  return (
    <div>
      <ul>
        {results.map((result, index) => (
          <li key={result.ObjectId}>
            <a href={result.url}>{result.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
