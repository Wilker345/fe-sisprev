import { useState, useEffect, useContext } from 'react';
import { Button, Box, styled, TextField } from '@mui/material';
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Modal, Checkbox, Typography } from '@mui/material'
import '../Styles.css'
import { LoginContext } from '../context/UserContext';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  p: 4,
  borderRadius: 4
};

export default function SendAccident({id}) {
  const {user, setUser} = useContext(LoginContext)
  const [file, setFile] = useState(null) 
  const typeFull = false
  const [IncrementFlag, setIncrementFlag] = useState(false)
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleUploadFile = (e) => setFile(e.target.files[0]);
  if(user === null){
    setUser(localStorage.getItem('user'))
  }
  const Input = styled('input')({
    display: 'none',
  });

  const handleCheckChange = (event) => {
    setIncrementFlag(event.target.checked);
  };

  const sendFile = async (e) => {
    e.preventDefault()
    const dataForm = new FormData();
    if (file === null){
      alert('Sem arquivo!')
      return
    }
    dataForm.append('file', file);
    dataForm.append('id', id)
    dataForm.append('typefull', typeFull)
    if (typeFull === false){
      dataForm.append('increment', IncrementFlag)
    }
    const urlName = `http://localhost:3002/base/registerIncrement`;
    const res = await fetch(urlName, { method: 'POST', body: dataForm,});
    alert('Arquivo enviado.')
    handleClose()
    setFile(null)
  };

  return (
    <div>
    <Button onClick={handleOpen} variant='contained' startIcon={<CloudUploadIcon/>}>Nova Predição
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        onBackdropClick={handleClose}
        >
    <Box className='fileForm' sx={style} >
    <Typography variant="h6" marginBottom={3}>Envio de dados para predição</Typography> 
    <input type="file" onChange={handleUploadFile}></input>
    {file !== null?
    <FormControlLabel
      label="Incrementar dataset com dados para predição"
      control={
        <Checkbox checked={IncrementFlag} onChange={handleCheckChange} inputProps={{ 'aria-label': 'controlled' }}/>
        }/>: <></>}
    <br/>
    {file !== null? <Button  onClick={sendFile} variant="contained" component="span" sx={{marginTop: 2}}>Enviar</Button> : <></>}
  </Box>
  </Modal>
  </Button>
  </div>
  );
}