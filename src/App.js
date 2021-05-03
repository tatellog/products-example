import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { SnackbarProvider } from 'notistack';

import  {Home}  from 'pages';

function App() {

  return (
    <ThemeProvider>
      <SnackbarProvider
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
      >
      <Suspense >
            <Router>
              <Switch>
                <Route path='/home'>
                <Home/>
                </Route>
              </Switch>
            </Router>
          </Suspense>
        
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
