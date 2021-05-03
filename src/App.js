import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { SnackbarProvider } from 'notistack';

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
                <Route path='/feed'>
                  <h3>Hola Mundo</h3>
                </Route>
              </Switch>
            </Router>
          </Suspense>
        
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
