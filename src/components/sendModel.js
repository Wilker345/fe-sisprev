import { useState, useEffect, useContext } from 'react';
import { Button, Box, styled, TextField, Tooltip } from '@mui/material';
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Modal, Typography} from '@mui/material'
import '../Styles.css'
import { LoginContext } from '../context/UserContext';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

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

export default function SendModel({type, id}) {
  const {user, setUser} = useContext(LoginContext)
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [file, setFile] = useState(null)
  const handleUploadFile = (e) => setFile(e.target.files[0]);

  if(user === null){
    setUser(localStorage.getItem('user'))
  }
  const Input = styled('input')({
    display: 'none',
  });

  const sendFile = async (e) => {
    e.preventDefault()
    const dataForm = new FormData();

    if (file === null){
      alert('Sem arquivo!')
      return
    }
    
    dataForm.append('file', file);
    dataForm.append('id', id)
    dataForm.append('typefull', true)
    dataForm.append('increment', false)
    
    const urlName = `http://localhost:3002/companies/api/send_base` 
    const res = await fetch(urlName, { method: 'POST', body: dataForm,});
    alert('Arquivo enviado.')
    handleClose()
  };

  return (
    <div>
    <Button onClick={handleOpen} variant='contained' startIcon={<CloudUploadIcon/>}>Cadastrar dataset
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
    <Box className='fileForm' sx={style}>
    <Typography variant="h6" marginBottom={3}>Envio da base de dados</Typography>
        <label htmlFor="contained-button-file">
        <input type="file" onChange={handleUploadFile}></input>
        <br/>
        {file !== null? <Button  onClick={sendFile} variant="contained" component="span" sx={{marginTop: 2}}>Enviar</Button> : <></>}
      </label>
  </Box>
  </Modal>
  </Button>
  </div>
  );
}