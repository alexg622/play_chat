import React, { Component } from 'react';
import { Provider } from 'react-redux'
import store from './store/store'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import Home from './components/Home'
import Navbar from './components/Navbar'
import './App.css';

// store.dispatch(setCurrentUser(decoded))

class App extends Component {
  render() {
    window.store = store
    return (
      <Provider store={ store }>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={ Home }/>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
