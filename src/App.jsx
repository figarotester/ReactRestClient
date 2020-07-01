import React from 'react';
import './App.css';
import Request from './components/request';
import Response from './components/response';
import Collections from './components/collections';


function App(){
  return(
    <div>
    <Request/>
    <Response/>
    <Collections/>
    </div>
  )
}

export default App;
