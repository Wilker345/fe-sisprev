import React, { useState, useEffect, useContext } from "react"
import { useHistory } from 'react-router-dom'
import Axios from 'axios';
import { LoginContext } from '../context/UserContext';
import MenuAppBar  from '../components/navbar'
import {Typography, Box, Button, TextField} from '@mui/material';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '../Styles.css';

export function CreateAccount(){
    const {user, setUser} = useContext(LoginContext)
    const [cnpj, setCnpj] = useState(null)
    const[cnpjError, setCnpjError] = useState(false)

    const update = ()=>{
      Axios.get('http://localhost:3002/user').then(response => {
        localStorage.setItem('user', JSON.stringify(response.data))
        setUser( JSON.parse(localStorage.getItem('user') ))
      })
    }
 
    const handleSubmit = (e) =>{
        e.preventDefault()
        setCnpjError(false)
        if (!cnpj){
            setCnpjError(true)
            alert('CNPJ inválido.')
            return
        }
        if (cnpj.length !== 14 ){
            setCnpjError(true)
            alert('CNPJ inválido.')
            return
          }
        if ( cnpj === ''){
          setCnpjError(true)
          alert('CNPJ inválido.')
          return
        }    
        if (cnpj && user.cnpj === null){
          Axios.patch(`http://localhost:3002/user/patch/:${user.email}`, {
          email: user.email,
          cnpj: cnpj
          })
          .then(()=>{
            alert('O CNPJ inserido foi registrado.')
            setCnpjError(false)
            console.log(cnpj)
            update()
          })
          .catch(()=>{
            alert('O CNPJ inserido já está registrado em outro usuário.')
          })
          .finally((d) => {
            console.log(d)
          })
        }
        if (user.cnpj !== null){
          alert('Já existe um CNPJ registrado ao usuário. Caso deseje uma alteração, comunique-se com a administração do serviço pelos meios de contato oferecidos.')
          return
        
        }
      }

    return (
      <Box className="telaLogin">
        <Typography
        component="h2"
        variant="h4"
        >Cadastro de usuário
        </Typography>
          <TextField
          sx={{ marginTop: 2, marginBottom: 2, display: 'block'}} onChange={(e) => setCnpj(e.target.value)} fullWidth 
          label="E-mail" type='text' variant="outlined" required error={cnpjError}/>

          <TextField
          sx={{ marginTop: 2, marginBottom: 2, display: 'block'}} onChange={(e) => setCnpj(e.target.value)} fullWidth 
          label="Senha" type='text' variant="outlined" required error={cnpjError}/>

          <TextField
          sx={{ marginTop: 2, marginBottom: 2, display: 'block'}} onChange={(e) => setCnpj(e.target.value)} fullWidth 
          label="Nome da Empresa" type='text' variant="outlined" required error={cnpjError}/>

          <TextField
          sx={{ marginTop: 2, marginBottom: 2, display: 'block'}} onChange={(e) => setCnpj(e.target.value)} fullWidth 
          label="CNPJ" type='text' variant="outlined" required error={cnpjError}/>

          <TextField
          sx={{ marginTop: 2, marginBottom: 2, display: 'block'}} onChange={(e) => setCnpj(e.target.value)} fullWidth 
          label="Endereço" type='text' variant="outlined" required error={cnpjError}/>

          <Button sx={{ marginBottom: 1}} variant='contained' color="neutral">
            Enviar
          </Button>
        </Box>
    )
}
