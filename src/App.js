import React from 'react';
import { Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Wallet from './pages/Wallet/Wallet';
import './App.css';
import Background from './components/Background/Background';
import GlobalStyles from './helpers/style/Global.styles';

class App extends React.Component {
  render() {
    return (
      <>
        <GlobalStyles />

        <main>
          <Background />
          <Route exact path="/" component={Login} />
          <Route exact path="/carteira" component={Wallet} />
        </main>
      </>
    );
  }
}

export default App;
