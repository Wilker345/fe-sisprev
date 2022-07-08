import React, {useState, useEffect, useContext, makeStyles} from 'react';
import Axios from 'axios'
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableFooter, Paper, IconButton, Box, Container, Typography, Button, Tooltip, Toolbar} from '@mui/material'
import MenuAppBar  from '../components/navbar'
import { LoginContext } from '../context/UserContext';
import { TableContext } from '../context/TableContext';
import { Grid } from '@mui/material'
import SendAccident from '../components/sendAccident'
import SendModel from '../components/sendModel'
import GetStatus from '../components/getStatus';

export default function Accidents() {
  const[listaEmpresas, setListaEmpresas] = useState([])
  const[listaAcidentes, setListaAcidentes] = useState([])
  const[listaDatasets, setListaDatasets] = useState([])
  const {user, setUser} = useContext(LoginContext)
  const [table, setTable] = useContext(TableContext)
  const [radio, setRadio] = useState('')
  const [treinamento, setTreinamento] = useState(false)
  const { DateTime } = require("luxon");

  useEffect(() => { 
    Axios.get("http://localhost:3002/companies").then((response)=>{
      setListaEmpresas(response.data.data)
    })
    Axios.get("http://localhost:3002/accidents").then((response)=>{
      setListaAcidentes(response.data.data)
    })
    Axios.get("http://localhost:3002/datasets").then((response)=>{
      setListaDatasets(response.data.data)
    })
    Axios.get('http://localhost:3002/user').then(response => {
      try{
        localStorage.setItem('user', JSON.stringify(response.data))
        setUser(JSON.parse(localStorage.getItem('user')))
        }catch (e) {
          console.log('Usuário não encontrado', e)
        }
    })
  }, [])
  useEffect(() => {
    if (table === 'treinamento'){
      setTreinamento(true)
    }
    if (table === 'predicao'){
      setTreinamento(false)
    }
   }, [table])

   const dateMask = (date) =>{
    const fDate = new Date(date)
    return(`${fDate.getDate()}/${fDate.getMonth() + 1}/${fDate.getFullYear()}`)
   }
   
  return (
    <Grid container
     sx={{marginTop: 11}}
     justifyContent="center"
     >
      <MenuAppBar/>
      <Grid item align="center"> 
      {treinamento? <Typography variant='h4' align='center' sx={{marginBottom: 15.85}}>Cadastro de Dataset</Typography> : <Typography variant='h4' align='center' sx={{marginBottom: 15.85}}>Predição de acidentes</Typography> }
      {treinamento? <></>: 
        <Grid item sx={{margin:2}}>
        <Box className='tabela' sx={{marginBottom: 2}}>
        </Box>
        <Box sx={{marginBottom: 2}}>   
        </Box>
        </Grid>
      }
      </Grid>
    <Grid container justifyContent="center">
      <Grid item md={7}>
      <Paper>
      <Box sx={{width: '100%' , display:'flex', justifyContent:'flex-end'}}>
          {treinamento? <SendModel/> : <SendAccident/>}
        </Box>
      <TableContainer>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            {treinamento? <TableCell>ID</TableCell> : <TableCell>Data do Upload</TableCell>}
            {treinamento? <TableCell>Data do Upload</TableCell> : <TableCell>Janela (Dias) </TableCell>}
            {treinamento? <TableCell>Janela (Dias)</TableCell> : <TableCell>Período</TableCell>}
            {treinamento? <TableCell>Período</TableCell> : <TableCell>Resultado</TableCell>}
            {treinamento? <TableCell>Tipo do Envio</TableCell> : <TableCell>Métricas</TableCell>}  
          </TableRow>
        </TableHead>
        <TableBody>
        {!treinamento? (listaAcidentes).map((acidente) => (
          <TableRow
              key={acidente.UploadDate}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {dateMask(acidente.UploadDate)}
              </TableCell>
              <TableCell >
                {acidente.Window}
              </TableCell>
              <TableCell>
               {acidente.Period}
              </TableCell>
              <TableCell>
                {acidente.Result}
              </TableCell>
              <TableCell>
                <GetStatus cnpj ={acidente.UploadDate} />
              </TableCell>
            </TableRow>
          )) :
          (listaDatasets).map((Dataset) => (
          <TableRow
              key={Dataset.ID}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {Dataset.ID}
              </TableCell>
              <TableCell >
                {dateMask(Dataset.UploadDate)}
              </TableCell>
              <TableCell >
                {Dataset.Window}
              </TableCell>
              <TableCell>
               {Dataset.Period}
              </TableCell>
              <TableCell>
                {Dataset.UploadType}
              </TableCell>
              <TableCell>
                {Dataset.Result}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer>
      </Paper>
      </Grid>
    </Grid>
    </Grid>
  );
}
