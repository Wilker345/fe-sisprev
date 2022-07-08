import { BrowserRouter, Route } from 'react-router-dom';
import { Login } from './pages/login';
import GridTable from './pages/table';
import { LoginContext } from './context/UserContext';
import { TableContext } from './context/TableContext';
import { useState } from 'react';
import axios from 'axios';
import { UserData } from './pages/userData';
import ProtectedRouteA from './functions/protectedRouteA'
import ProtectedRouteB from './functions/protectedRouteB'
import ProtectedRouteC from './functions/protectedRouteC'
import { AddInfo } from './pages/addInfo';
import {ApiTest} from "./pages/apiTest"
import Accidents from "./pages/accidents"
import { CreateAccount } from './pages/createAccount';
import { createTheme, ThemeProvider } from '@mui/material/styles';
axios.defaults.withCredentials = true;

function App() {
  const [user, setUser] = useState(null)
  const[table, setTable] = useState('predicao')
  const theme = createTheme({
    status: {
      danger: '#e53e3e',
    },
    palette: {
      primary: {
        main: '#0971f1',
        darker: '#053e85',
      },
      neutral: {
        main: '#E0E0E0',
        contrastText: '#000000 ',
      },
      navbar: {
        main: '#3F51B5',
        contrastText: '#fff',
      },
      white: {
        main: '#fff',
        secondary: '#c5c2dd'
      }
    },
  });
  // eslint-disable-next-line no-unused-vars
  return (
    <LoginContext.Provider value={{ user, setUser }}>
    <TableContext.Provider value={[table, setTable]}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <ProtectedRouteC exact path="/"  component={Login} />
        <ProtectedRouteC exact path="/createAccount"  component={CreateAccount} />
        <ProtectedRouteA exact path="/table" component={GridTable} />
        <ProtectedRouteA exact path="/userdata" component={UserData} />
        <ProtectedRouteA exact path="/apitest" component={ApiTest} />
        <ProtectedRouteA exact path="/accidents" component={Accidents} />
        <ProtectedRouteB exact path="/addinfo" component={AddInfo}/>
      </BrowserRouter>
    </ThemeProvider>
    </TableContext.Provider>
    </LoginContext.Provider> 
  );
}

export default App;
