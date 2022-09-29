import React from 'react';
import { Route } from 'react-router-dom';
import Login from './pages/Login';

class App extends React.Component {
  render() {
    return (
      <>
        <header>header</header>

        <main>
          <Route exact path="/" component={ Login } />
        </main>

        <footer>footer</footer>
      </>
    );
  }
}

export default App;
