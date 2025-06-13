import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  IconButton,
  Paper,
  TextField,
  Typography,
  CircularProgress,
  Snackbar,
  Alert,
  Tooltip,
} from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import PersonIcon from '@mui/icons-material/Person';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const apiBase = process.env.REACT_APP_API_URL;


const UsersAdmin = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const [editingUserId, setEditingUserId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editPhone, setEditPhone] = useState('');

  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${apiBase}/api/users/all`);
        if (!res.ok) throw new Error('שגיאה בטעינת המשתמשים');
        const data = await res.json();
        setUsers(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const addUser = async () => {
    if (!newName.trim() || !newPhone.trim()) return;
    try {
      const res = await fetch(`${apiBase}/api/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newName.trim(), phone: newPhone.trim() })
      });
       if (!res.ok) throw new Error('שגיאה בהוספת משתמש');
      const created = await res.json();
      setUsers(u => [...u, created]);
      setNewName('');
      setNewPhone('');
      setSnackbar({ open: true, message: 'משתמש נוסף בהצלחה', severity: 'success' });
    } catch {
      setSnackbar({ open: true, message: 'שגיאה בהוספת משתמש', severity: 'error' });
    }
  };

  const updateUser = async (id) => {
    try {
      const res = await fetch(`${apiBase}/api/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, name: editName.trim(), phone: editPhone.trim() })
      });
      if (!res.ok) throw new Error();
      const updated = await res.json();
      setUsers(users.map(u => u.id === id ? updated : u));
      setEditingUserId(null);
      setSnackbar({ open: true, message: 'המשתמש עודכן בהצלחה', severity: 'success' });
    } catch {
      setSnackbar({ open: true, message: 'שגיאה בעדכון המשתמש', severity: 'error' });
    }
  };

  const deleteUser = async (id) => {
    try {
      const res = await fetch(`${apiBase}/api/users/delete/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      setUsers(users.filter(u => u.id !== id));
      setSnackbar({ open: true, message: 'המשתמש נמחק בהצלחה', severity: 'success' });
    } catch {
      setSnackbar({ open: true, message: 'שגיאה במחיקת המשתמש', severity: 'error' });
    }
  };

  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

  if (loading) return <Box mt={4} display="flex" justifyContent="center"><CircularProgress color="secondary" /></Box>;
  if (error) return <Typography color="error" align="center">{error}</Typography>;

  const textFieldStyle = {
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: 'purple',
      }
    },
    '& label.Mui-focused': {
      color: 'purple',
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom color="purple" align="center">
        ניהול משתמשים
      </Typography>

      <Paper sx={{ p: 2, mb: 3, backgroundColor: 'transparent', boxShadow: 'none' }}>
        <Typography variant="h6" color="purple">הוסף משתמש חדש</Typography>
        <Box display="flex" gap={2} mt={1} flexWrap="wrap">
          <TextField
            label="שם"
            fullWidth
            value={newName}
            onChange={e => setNewName(e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={textFieldStyle}
          />
          <TextField
            label="טלפון"
            fullWidth
            value={newPhone}
            onChange={e => setNewPhone(e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={textFieldStyle}
          />
          <Button
            variant="contained"
            color="secondary"
            startIcon={<AddCircleOutlineIcon />}
            onClick={addUser}
            sx={{ whiteSpace: 'nowrap' }}
          >
            הוסף
          </Button>
        </Box>
      </Paper>

      {users.map(user => (
        <Paper key={user.id} sx={{ mb: 2, p: 2, backgroundColor: editingUserId === user.id ? '#ede7f6' : 'white', boxShadow: 3 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={1}>
            <Box display="flex" alignItems="center" gap={1} flexGrow={1}>
              <PersonIcon color="secondary" />
              {editingUserId === user.id ? (
                <>
                  <TextField
                    label="שם"
                    size="small"
                    value={editName}
                    onChange={e => setEditName(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    sx={{ minWidth: 150, ...textFieldStyle }}
                  />
                  <TextField
                    label="טלפון"
                    size="small"
                    value={editPhone}
                    onChange={e => setEditPhone(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    sx={{ minWidth: 150, ...textFieldStyle }}
                  />
                  <IconButton color="success" onClick={() => updateUser(user.id)} aria-label="שמור">
                    <SaveIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => setEditingUserId(null)} aria-label="בטל">
                    <CancelIcon />
                  </IconButton>
                </>
              ) : (
                <>
                  <Typography variant="subtitle1" color="purple">{user.name}</Typography>
                  <Typography variant="body2" color="text.secondary">{user.phone}</Typography>
                </>
              )}
            </Box>
            {editingUserId !== user.id && (
              <Box>
                <Tooltip title="ערוך">
                  <IconButton onClick={() => {
                    setEditingUserId(user.id);
                    setEditName(user.name);
                    setEditPhone(user.phone);
                  }} color="secondary" aria-label="ערוך משתמש">
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="מחק">
                  <IconButton onClick={() => deleteUser(user.id)} color="error" aria-label="מחק משתמש">
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            )}
          </Box>
        </Paper>
      ))}

      <Typography variant="body2" color="purple" mt={2} align="center">
        ניהול משתמשים מתעדכן בזמן אמת.
      </Typography>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default UsersAdmin;
