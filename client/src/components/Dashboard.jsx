import React from 'react';
import { Box, Button, Typography, Container } from '@mui/material';
import HistoryIcon from '@mui/icons-material/History';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useNavigate } from 'react-router-dom';

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

  return (
    <Container maxWidth="sm" sx={{ mt: 8, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        ברוך/ה הבא ללוח התלמיד
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
            }}
          >
            {label}
          </Button>
        ))}
      </Box>
    </Container>
  );
}
