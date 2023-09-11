import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import './index.css';
import Login from './pages/Login';
import Wallet from './pages/Wallet';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/carteira" component={ Wallet } />
      <CssBaseline />
    </Switch>

  );
}

export default App;
