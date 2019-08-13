import React, { Component } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import  PublicRoutes  from './router';
import Boot from "./redux/boot";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PublicRoutes/>
      </Provider>
    );
  }
}
Boot()
  .then(() => App())
  .catch(error => console.error(error));

export default App;
