import React from 'react';
import './App.css';
import { useFetchPosts } from './customHooks/api-hooks';
import { APIData, FetchAppState } from './types';
import APIDataItem from './components/APIDataItem';

function App() {

  const [data, fetchAppState, fetchData]  = useFetchPosts();
  return (
    <div className="container">
      <h1>Trajector Coding Challenge</h1>
      {fetchAppState === FetchAppState.DEFAULT && (
        <>
          <p>Click the button to fetch data from a sample API</p>
          <button onClick={fetchData}>Fetch Sample Data</button>
        </>
      )}
      {fetchAppState === FetchAppState.LOADING && <p>Fetching API Data...</p>}
      {fetchAppState === FetchAppState.ERROR && (
        <>
          <p>Oops! Something went wrong. Please try again.</p>
          <button onClick={fetchData}>Fetch Sample Data</button>
        </>
      )}
      {fetchAppState === FetchAppState.SUCCESS && (
       <APIDataItem data={data}/>
      )}
    </div>
  );
}

export default App;
