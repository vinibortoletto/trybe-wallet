import React from 'react';
import { Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Wallet from './pages/Wallet/Wallet';
import GlobalStyles from './helpers/style/Global.styles';
import Footer from './components/Footer/Footer';

class App extends React.Component {
  render() {
    return (
      <>
        <GlobalStyles />

        <main>
          <Route exact path="/" component={Login} />
          <Route exact path="/carteira" component={Wallet} />
        </main>

        <Footer />
      </>
    );
  }
}

export default App;
