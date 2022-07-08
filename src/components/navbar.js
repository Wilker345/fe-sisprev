import React, {useContext} from 'react';
import { LoginContext } from '../context/UserContext';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';
import {ListItem, ListItemIcon, ListItemText, Drawer, List, Divider, Avatar} from '@mui/material';
import AttachmentIcon from '@mui/icons-material/Attachment';
import LaptopChromebookIcon from '@mui/icons-material/LaptopChromebook';
import WorkIcon from '@mui/icons-material/Work';
import MenuIcon from '@mui/icons-material/Menu';
import { TableContext } from '../context/TableContext';

export default function MenuAppBar() {
  const {user, setUser} = useContext(LoginContext)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [table, setTable] = useContext(TableContext)
  const history = useHistory()

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const finishSession = () =>{
    Axios.get('http://localhost:3002/logout')
    setUser(null)
    localStorage.removeItem('user')
    handleClose()
  }
  
function SideMenu(){  
  
  const [state, setState] = React.useState({
      left: false
    });
    function settingPage(type){
      if(type ==='Predição'){
          setTable('predicao')
          history.push('/accidents')
      }
      if(type ==='Treinamento'){
          setTable('treinamento')
          history.push('/accidents')
      }
      if(type ==='Empresas'){
        history.push('/table')
    }
    }
    const toggleDrawer = (anchor, open) => (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
  
      setState({ ...state, [anchor]: open });
    };
  
    const list = (anchor) => (
      <Box
        sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
       <List button onClick={() => history.push('/userdata')}>
          <ListItem button sx={{display: 'box', justifyContent: 'center'}}>
            <Avatar/>
            <ListItem>
              {user? `${user.givenName}` : 'Obtendo informações do perfil...'}
            </ListItem>
          </ListItem>
       </List>
        <Divider />
        <List>
            <ListItem button onClick={() => settingPage('Predição')} key={'Predição'}>
              <ListItemIcon>
                  <AttachmentIcon /> 
              </ListItemIcon>
              <ListItemText primary={'Predição'} />
            </ListItem>
            <ListItem button onClick={() => settingPage('Treinamento')} key={'Treinamento'}>
              <ListItemIcon>
                <LaptopChromebookIcon />
              </ListItemIcon>
              <ListItemText primary={'Datasets'} />
            </ListItem>
            <ListItem button onClick={() => settingPage('Empresas')} key={'Empresas'}>
              <ListItemIcon>
                <WorkIcon />
              </ListItemIcon>
              <ListItemText primary={'Empresas'} />
            </ListItem>
        </List>
      </Box>
    );
  
    return (
      <div>
    {['left'].map((anchor) => (
      <React.Fragment key={anchor}>
        <IconButton color='white' onClick={toggleDrawer(anchor, true)}>
          <MenuIcon />
        </IconButton>
        <Drawer
          anchor={anchor}
          open={state[anchor]}
          onClose={toggleDrawer(anchor, false)}
          marginTop={30}
        >
          {list(anchor)}
        </Drawer>
      </React.Fragment>
    ))}
      </div>
    );
}


  return (
    <Box>
      <AppBar position="absolute" color="navbar" /*style={{zIndex:1301}}*/>
        <Toolbar>
        {user?
        <SideMenu />:
        <></>}
          <Typography color='white' variant="h6" component="div" marginLeft={2} >
            Sisprev
          </Typography>
          <Typography color='white.secondary' variant="h6" component="div" marginLeft={2}>
            Sistema de predição de acidentes de trabalho
          </Typography>
          <Box sx={{ flexGrow: 1 }}>
          </Box>
          {user? <MenuItem onClick={()=> finishSession()}>
            LOGOUT
            </MenuItem>:<></>
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
}