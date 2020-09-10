import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [results, setResults] = useState([])
  const [query, setQuery] = useState('react hooks');
  console.log(9, results, query)
  const searchInputRef = useRef() //returns a ref object

  useEffect(() => {
    getResults()
    // .then(response => {
    //   console.log(10, response.data)
    //   setResults(response.data.hits)
    //   console.log(13, results)
    // })
  }, []);

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

  const handleClearSearch = () => {
    setQuery('')
    searchInputRef.current.focus();
  }

  console.log(17, results)
  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          onChange={event => setQuery(event.target.value)} value={query}
          ref={searchInputRef}
        />
        <button type="submit">Submit</button>
        <button type="button" onClick={handleClearSearch}>Clear</button>
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
