import React, { useContext } from 'react';
import { LoginContext } from '../context/UserContext';
import MenuAppBar  from '../components/navbar'
import {Avatar, Box, Container, Divider, List, ListItem, Paper, Typography} from '@mui/material';
import { styled } from '@mui/material/styles';
import { textAlign } from '@mui/system';
export function UserData(){
    const {user, setUser} = useContext(LoginContext)
    if(user === null){
        setUser(JSON.parse(localStorage.getItem('user')))
    }
    function cnpjMask(user){
        const newCnpj = user.cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5")
        return newCnpj
    }
    const Root = styled('div')(({ theme }) => ({
        width: '100%',
        ...theme.typography.body2,
        '& > :not(style) + :not(style)': {
          marginTop: theme.spacing(2),
        },
      }));
    return(
        <div>
            <MenuAppBar/>
            <Paper sx={{maxWidth: 600, minWidth: 500, display: 'flex',
                    flexDirection: 'column', justifyContent:'center',
                    position: 'absolute', top: '40%', left: '50%', transform: 'translateY(-50%) translateX(-50%)'}}>
            <Container sx={{justifyContent: 'center'}}>
            <List>
                <Typography variant="h6" component="h5" sx={{textAlign: 'center'}}>Informações do usuário</Typography>   
                    <Divider/>
                        <ListItem sx={{display: 'flex', justifyContent: 'center'}}>
                            <Avatar  sx={{marginTop: 1, marginBottom: 1}}/>
                        </ListItem>
                    <Divider/>
                        <ListItem>
                            <Typography>Id: {user? user.id : 'Obtendo ID...'}</Typography>
                        </ListItem>
                    <Divider/>
                        <ListItem>
                            <Typography>Nome: {user? user.givenName : 'Obtendo nome...'}</Typography>
                        </ListItem>
                    <Divider/>
                        <ListItem>
                            <Typography>E-mail: {user? user.email : 'Obtendo email...'}</Typography>
                        </ListItem>  
                    <Divider/>
                        <ListItem>          
                            <Typography>CNPJ da empresa: {user? cnpjMask(user) : 'Obtendo CNPJ...'}</Typography>
                        </ListItem> 
                </List>
            </Container>
            </Paper>
 
        </div>
    )
}