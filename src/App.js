import './App.css';
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

import Search from './Pages/Search';
function App() {
  return (
    <div className="App">
      <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Search/>
      </Container>
    </React.Fragment>
    
    </div>
  );
}

export default App;
