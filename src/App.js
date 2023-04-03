// @ts-nocheck
import { CircularProgress } from '@mui/material';
import axios from 'axios';
import Cardcomponent from 'Cardcomponent/Cardcomponent';
import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [searchitem, setSearchitem] = useState({ srchinput: '', searchtype: 'code', sorttype: '' })
  const [showndata, setshowndata] = useState({ data: [], loading: false })

  const handlesearchfilter = (item) => {
    setSearchitem(prev => ({ ...prev, ...item }));
  }

  const searchapi = async () => {
    setshowndata(prev => ({ ...prev, loading: true }))

    await axios.get(`https://api.github.com/search/${searchitem.searchtype}?q=${searchitem.srchinput}`).then(data => {

      data.data.items.forEach(elem => {
        axios.get(elem.repository_url).then(res => {
          setshowndata(prev => ({
            ...prev, data: [...prev.data, ({
              ...elem,
              reponame: res.data.name,
              description: res.data.description,
              language: res.data.language,
            })]
          }))
        });
      })
    });
  }

  return (
    <div className="App">
      <div className='filter_head_container'>
        <div className='filter_head'>
          <input placeholder='Please Enter Search Keyword Here' className='filter_head_inp' type='text' value={searchitem.srchinput} onChange={(e) => { handlesearchfilter({ srchinput: e.target.value }) }} />
          <div className='filter_searchtype'>
            <span>Search Type</span>
            <select value={searchitem.searchtype} onChange={(e) => handlesearchfilter({ searchtype: e.target.value })}>
              <option value='code' selected>code</option>
              <option value='commits'>commits</option>
              <option value='issues'>issues</option>
              <option value='labels'>labels</option>
              <option value='repositories'>repositories</option>
              <option value='topics'>topics</option>
              <option value='users'>users</option>
            </select>
          </div>
          <div className='filter_sorttype'>
            <span>Sort By</span>
            <select value={searchitem.sorttype} onChange={(e) => handlesearchfilter({ sorttype: e.target.value })}>
              <option value='stars' selected>stars</option>
              <option value='watchers_count'>Watchers Count</option>
              <option value='score'>Score</option>
              <option value='name'>Name</option>
              <option value='created_at'>Created At</option>
              <option value='updated_at'>Updated At</option>
            </select>
          </div>
        </div>
        <div>
          <button className='filter_head_btn' type='button' onClick={searchapi}>Search</button>
        </div>
      </div>
      <div className='filter_result'>
        {
          showndata.data.length > 0 ?
            showndata.data.map(elem => {
              return (
                <Cardcomponent elem={elem} />
              )
            }) : <div className='filter_loader'>{showndata.loading ? <CircularProgress /> : <></>}</div>
        }
      </div>
    </div>
  );
}

export default App;
