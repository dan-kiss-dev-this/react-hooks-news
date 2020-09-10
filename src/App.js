import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';

function App() {
  const [results, setResults] = useState([])
  const [query, setQuery] = useState('react hooks');
  console.log(9, results, query)

  useEffect(() => {
    getResults()
    // .then(response => {
    //   console.log(10, response.data)
    //   setResults(response.data.hits)
    //   console.log(13, results)
    // })
  },[]);

  const getResults = async () => {
    const response = await axios.get(
      `http://hn.algolia.com/api/v1/search?query=${query}`
    );
    setResults(response.data.hits)
  }

  const handleSearch = event => {
    event.preventDefault()
    getResults()
  }

  console.log(17, results)
  return (
    <div>
      <form onSubmit={handleSearch}>
        <input type="text" onChange={event => setQuery(event.target.value)} value={query} />
        <button type="submit">Submit</button>
        <ul>
          {results.map((result, index) => (
            <li key={result.ObjectId}>
              <a href={result.url}>{result.title}</a>
            </li>
          ))}
        </ul>
      </form>
    </div>
  );
}

export default App;
