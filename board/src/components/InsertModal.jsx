
import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import addIcon from '../assets/icons/add.svg';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#f5f5f5',
  color: 'white',
  boxShadow: 24,
  borderRadius: 3,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  
};

export default function InsertModal({onTrigger}) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = useState('');
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const url = "http://localhost:8080/new"
  const reset = () => {
      setName('');
      setHeight(0);
      setWeight(0);
  };
  
  const handleOpen = () => {
    reset();
    setOpen(true);
  };

  const handleClose = () => {
      reset();
      setOpen(false);
  };


  const handleSubmit = (e) => {
      e.preventDefault();
      if (!name || !height || !weight) {
          alert('Please fill in all fields');
          return;
      }
      
      const newContestant = {name:name, length: height, weight: weight};
      // send data to server
      fetch(url, {
          method: "POST",
          headers: {
              "Content-Type": "application/x-www-form-urlencoded"
          },
          body: new URLSearchParams(newContestant)
      }).then(response => {
        if (!response.ok) {
            alert('Error: Contestant added');
        }
      })
      
      onTrigger();
      handleClose();
  };

  return (
    <div>
      <img src={addIcon} alt="" style={{width:'50px', height:'50px', cursor:'pointer'}} onClick={handleOpen}/>
      
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2" sx={{ marginBottom: '10px', color: 'black' }}>
            Enter New Contestant
          </Typography>
          
          <TextField 
            id="name-field" 
            label="Name" 
            variant="outlined"
            sx={{ color: 'white', width: '100%' }}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Box sx={{display: 'flex', justifyContent:'space-between', marginBlock:'15px'}}>
            <TextField 
              id="length-field" 
              label="Length" 
              variant="outlined" 
              type="number"
              sx={{ color: 'white', width: '48%' }}
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />

            <TextField 
              id="weight-field" 
              label="Weight" 
              variant="outlined" 
              type="number"
              sx={{ color: 'white', width: '48%' }}
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </Box>
          
          <Button 
            variant="contained"
            onClick={handleSubmit}>
              Create
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

