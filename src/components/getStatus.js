import React from 'react';
import {Box, Typography, Modal} from '@mui/material'
import { IconButton } from '@mui/material';
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import Axios from 'axios';

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

export default function GetStatus({cnpj}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  //endpoint get status pra puxar dados usando a key 'cnpj'

  return (
    <div>
    Exibir
      <IconButton onClick={handleOpen}>
      <LibraryBooksOutlinedIcon/>
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <Typography>Futuro status individual: {cnpj}</Typography>
        </Box>
      </Modal>
    </div>
  );
}
