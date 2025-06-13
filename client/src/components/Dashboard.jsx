import React from 'react';
import { Box, Button, Typography, Container } from '@mui/material';
import HistoryIcon from '@mui/icons-material/History';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const options = [
  {
    label: 'הצג היסטוריה',
    icon: <HistoryIcon />,
    path: '/history',
    variant: 'outlined',
  },
  {
    label: 'שלח בקשה חדשה',
    icon: <AddCircleOutlineIcon />,
    path: '/new-prompt',
    variant: 'contained',
  },
];

export default function Dashboard() {
  const navigate = useNavigate();

  // משוך את המשתמש מהרדוקס
  const user = useSelector((state) => state.user);

  return (
    <Container maxWidth="sm" sx={{ mt: 8, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
         {user?.name || 'משתמש'} ,!ברוך הבא 
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          mt: 6,
        }}
      >
        {options.map(({ label, icon, path, variant }) => (
          <Button
            key={label}
            variant={variant}
            startIcon={icon}
            size="large"
            onClick={() => navigate(path)}
            sx={{
              fontWeight: 'bold',
              borderRadius: 3,
              textTransform: 'none',
              fontSize: '1.5rem',   // גודל טקסט גדול יותר
              height: 60,           // גובה הכפתור
              minWidth: '250px',    // רוחב מינימלי
              px: 4,                // ריפוד אופקי
            }}
          >
            {label}
          </Button>
        ))}
      </Box>
    </Container>
  );
}
