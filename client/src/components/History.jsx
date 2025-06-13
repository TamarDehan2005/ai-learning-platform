import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  CircularProgress,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Box,
} from '@mui/material';
import HistoryIcon from '@mui/icons-material/History';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const apiBase = process.env.REACT_APP_API_URL;

const History = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // אם אין עדיין משתמש – נחכה
    if (!user || !user.id) {
      return;
    }

    const fetchHistory = async () => {
      try {
        const url = `${apiBase}/api/users/${user.id}/history`;
        console.log('📡 Fetching:', url);
        const response = await fetch(url);

        if (!response.ok) {
          const data = await response.json().catch(() => null);
          const message = data?.message || 'שגיאה בקבלת ההיסטוריה';
          setError(message);
          return;
        }

        const data = await response.json();
        setHistory(data);
      } catch (err) {
        console.error('❌ Fetch failed:', err);
        setError('שגיאה בשרת, נסה שוב מאוחר יותר');
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [user]);

  // אם המשתמש לא קיים בכלל – נשלח להתחברות
  useEffect(() => {
    if (user && user.id === null) {
      navigate('/login');
    }
  }, [user, navigate]);

  return (
    <Container component="main" maxWidth="md">
      <Paper elevation={3} sx={{ mt: 8, p: 4, borderRadius: 3 }}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Avatar sx={{ bgcolor: 'primary.main', mb: 2 }}>
            <HistoryIcon />
          </Avatar>
          <Typography component="h1" variant="h5" gutterBottom>
            היסטוריית בקשות
          </Typography>

          {loading ? (
            <CircularProgress sx={{ mt: 4 }} />
          ) : error ? (
            <Typography color="error" variant="body2" sx={{ mt: 2 }}>
              {error}
            </Typography>
          ) : history.length === 0 ? (
            <Typography variant="body1" sx={{ mt: 2 }}>
              אין היסטוריה להצגה כרגע.
            </Typography>
          ) : (
            <List sx={{ mt: 2, width: '100%' }}>
              {history.map((item, index) => (
                <ListItem key={index} alignItems="flex-start" divider>
                  <ListItemAvatar>
                    <Avatar>
                      <HistoryIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.prompt1}
                    secondary={new Date(item.createdAt).toLocaleString('he-IL')}
                  />
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default History;
