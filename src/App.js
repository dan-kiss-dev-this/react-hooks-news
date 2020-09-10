import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [results, setResults] = useState([])
  const [query, setQuery] = useState('react hooks');
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const searchInputRef = useRef() //returns a ref object

  useEffect(() => {
    getResults()
    // .then(response => {
    //   setResults(response.data.hits)
    // })
  }, []);

  const getResults = async () => {
    setLoading(true)
    try {
      const response = await axios.get(
        `http://hn.algolia.com/api/v1/search?query=${query}`
      );
      setResults(response.data.hits)
    } catch (err) {
      setError(err)
    }

    setLoading(false)
  }

  const handleSearch = event => {
    event.preventDefault()
    getResults()
  }

  const handleClearSearch = () => {
    setQuery('')
    searchInputRef.current.focus();
  }

  return (
    <>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          onChange={event => setQuery(event.target.value)} value={query}
          ref={searchInputRef}
        />
        <button type="submit">Submit</button>
        <button type="button" onClick={handleClearSearch}>Clear</button>
      </form>
      {loading ? (
        <div>Loading results</div>
      ) : (<ul>
        {results.map((result, index) => (
          <li key={result.ObjectId}>
            <a href={result.url}>{result.title}</a>
          </li>
        ))}
      </ul>)}

      {error && <div>{error.message}</div>}
    </>
  );
}

export default App;
