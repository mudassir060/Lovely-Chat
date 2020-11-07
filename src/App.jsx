import React from 'react'
// import Home from './containers/Home/index'
import AppRouter from './config/router'

// import { render } from '@testing-library/react';
// import { Component } from 'react';
// import Child from './components/child';
// import reducer from './store/reducer/reducer';
// import{set_data} from './store/action';

class App extends React.Component {
  render(){
    return (
      <div>
          <AppRouter/>
      </div>
    );
  } 
}


export default App;
 