import { useHistory } from 'react-router';
import React from "react";
import { useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import { LoginContext } from '../context/UserContext';
import {Typography, Container, Button, TextField, Box} from '@mui/material';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '../Styles.css';
import GoogleButton from 'react-google-button';
import {Checkbox, FormControlLabel} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { width } from '@mui/system';


export function Login (){
  const {user, setUser} = useContext(LoginContext)
  if (user === null){
    setUser(JSON.parse(localStorage.getItem('user')))
  }
  useEffect( () =>{
      Axios.get('http://localhost:3002/users/user').then(response => {
      try{
        localStorage.setItem('user', JSON.stringify(response.data))
        setUser(JSON.parse(localStorage.getItem('user')))
        } catch (e) {
        console.log('Usuário não encontrado', e)
        }
      }).catch( () => {
        console.error("Usuário não existe!");
    })
  }, []);

  const[email, setEmail] = useState('')
  const[pass, setPass] = useState('')

  const[emailError, setEmailError] = useState(false)
  const[passError, setPassError] = useState(false)

  const [checked, setChecked] = useState(false)
  const history = useHistory();

  const handleCheckChange = (event) => {
    setChecked(event.target.checked);
  };
  
  function aoCrud() {
    history.push('/table');
  };
  const googleLogin = async () => {
    const googleLoginURL = 'http://localhost:3002/users/auth/google'
    window.open(googleLoginURL, "_self")

  }

  const handleSubmit = (e) =>{
    e.preventDefault()
    setEmailError(false)
    setPassError(false)

    if ( email === ''){
      setEmailError(true)
    }
    if ( pass === ''){
      setPassError(true)
    }

    if (email && pass) {
      console.log(email, pass)

    }
  }
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
        main: '#64748B',
        contrastText: '#fff',
      },
    },
  });

  return(
    <Container>
    <form noValidate autoComplete="off" onSubmit={handleSubmit} className='telaLogin'>
    <Typography
    component="h1"
    variant="h5"
    >SISPREV
    </Typography>
      <TextField
      sx={{
        marginTop: 2,
        marginBottom: 2,
        display: 'block'
        }}
      onChange={(e) => setEmail(e.target.value)}
      fullWidth
      label="Email"
      type='text'
      variant="outlined"
      required
      error={emailError}
      />
      <TextField
      sx={{
        marginBottom: 2,
        display: 'block'
        }}
        onChange={(e) => setPass(e.target.value)}
      fullWidth
      label="Senha"
      type="password"
      variant="outlined"
      required
      error={passError}
      />
      <FormControlLabel
          label="Lembrar-me neste computador"
          control={
            <Checkbox checked={checked} onChange={handleCheckChange} inputProps={{ 'aria-label': 'controlled' }}/>
          }
          sx={{marginBottom: 2}}
          />
      <Button
      sx={{
        marginBottom: 2,
        }}
      variant='contained'
      className='botaoLogin'
      onClick={aoCrud}
      color="neutral"
      fullWidth
      >Entrar
      </Button>
      <Box marginBottom={2} marginTop={1}>
        <GoogleButton
        className='g-signin2'
        onClick={googleLogin}
        label="Entrar com o Google"
        type="light"
        marginBottom={2}
        >Entrar com Google
        </GoogleButton>
      </Box>
      <a href='/createAccount'> Não possui uma conta? Clique aqui para criar</a>
      <Typography marginTop={5} color="text.secondary">
        Copyright(c)
      </Typography>
      </form>
      </Container>
  )
}

