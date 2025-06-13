import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../redux/userSlice'; // your Redux slice to save user info

export default function Signup() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const apiBase = process.env.REACT_APP_API_URL;

  const handleRegister = async () => {
    setError(null);

    if (!name.trim() || !phone.trim()) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const response = await fetch(`${apiBase}/api/users/register`, { 
       method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone: phone }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.message || 'Registration failed');
        return;
      }

      const userData = await response.json();
      dispatch(setUser(userData)); 
      navigate('/dashboard'); 

    } catch (err) {
      setError('Server error, please try again later');
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: 'auto',
        mt: 8,
        p: 4,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: '#f9f9f9',
      }}
    >
      <Typography variant="h5" component="h1" align="center" gutterBottom>
        <PersonAddIcon fontSize="large" sx={{ mr: 1, verticalAlign: 'middle' }} />
        Sign Up
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        fullWidth
        margin="normal"
        type="tel"
      />

      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 3 }}
        onClick={handleRegister}
      >
        Register
      </Button>
    </Box>
  );
}
