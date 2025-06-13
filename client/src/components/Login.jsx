import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Avatar,
  Paper,
} from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../redux/userSlice';

const apiBase = process.env.REACT_APP_API_URL;

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('יש להזין שם מלא');
      return;
    }

    const phoneRegex = /^0\d{9}$/;
    if (!phoneRegex.test(phoneNumber)) {
      setError('מספר טלפון לא תקין. יש להזין 10 ספרות המתחילות ב-0');
      return;
    }

    try {
      const response = await fetch(`${apiBase}/api/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone: phoneNumber }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const errorMessage = errorData?.message || 'שגיאה באימות המשתמש';

        if (response.status === 404) {
          navigate('/signup', { state: { name, phoneNumber } });
          return;
        }

        setError(errorMessage);
        return;
      }

      const data = await response.json();
      if (data && data.id) {
        const user = { id: data.id, name, phoneNumber };
        dispatch(setUser(user));
        localStorage.setItem('user', JSON.stringify(user));

        if (name === 'Admin' && phoneNumber === '0000000000') {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      } else {
        setError('שגיאה באימות המשתמש');
      }
    } catch (err) {
      console.error(err);
      setError('שגיאה בשרת, נסה שוב מאוחר יותר');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ mt: 8, p: 4, borderRadius: 3 }}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Avatar sx={{ bgcolor: 'primary.main', mb: 2 }}>
            <LoginIcon />
          </Avatar>
          <Typography component="h1" variant="h5" gutterBottom>
            התחברות למערכת
          </Typography>
          <Box component="form" onSubmit={handleLogin} sx={{ mt: 1, width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="שם מלא"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="מספר טלפון"
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />

            {error && (
              <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                {error}
              </Typography>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              התחבר
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
