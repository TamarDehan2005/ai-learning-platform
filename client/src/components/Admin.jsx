import React from 'react';
import { Box, Button, Container, Typography, Paper, Avatar } from '@mui/material';
import CategoryIcon from '@mui/icons-material/Category';
import PeopleIcon from '@mui/icons-material/People';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
        <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
          <Avatar sx={{ bgcolor: 'primary.main', width: 64, height: 64, mb: 2 }}>
            <AdminPanelSettingsIcon fontSize="large" />
          </Avatar>
          <Typography variant="h4" component="h1" gutterBottom>
            פאנל ניהול
          </Typography>
          <Typography variant="body1" color="text.secondary" align="center">
            ברוך הבא למערכת הניהול. בחר פעולה:
          </Typography>
        </Box>

        <Box display="flex" flexDirection="column" gap={2}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<CategoryIcon />}
            fullWidth
            onClick={() => navigate('/admin/categories')}
          >
            ניהול קטגוריות
          </Button>

          <Button
            variant="contained"
            color="secondary"
            startIcon={<PeopleIcon />}
            fullWidth
            onClick={() => navigate('/admin/users')}
          >
            ניהול משתמשים
          </Button>

          <Button
            variant="contained"
            color="info"
            startIcon={<ChatBubbleIcon />}
            fullWidth
            onClick={() => navigate('/admin/prompts')}
          >
            ניהול בקשות
          </Button> 
        </Box>
      </Paper>
    </Container>
  );
};

export default Admin;
