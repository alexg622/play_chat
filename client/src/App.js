import React, { Component } from 'react';
import { Provider } from 'react-redux'
import store from './store/store'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import Home from './components/Home'
import Modal from './components/modal'
import { setCurrentUser } from './actions/userActions'
import Navbar from './components/Navbar'
import './App.css';


if(localStorage.signedIn === "True") {
  localStorage.conversations = JSON.stringify({})
  store.dispatch(setCurrentUser({
    username: localStorage.username,
    id: localStorage.userId,
    conversations: JSON.parse(localStorage.conversations)
  }))
}

class App extends Component {
  render() {
    window.store = store
    return (
      <Provider store={ store }>
        <Router>
          <div className="App">
            <Modal />
            <Navbar />
            <Route exact path="/" component={ Home }/>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
