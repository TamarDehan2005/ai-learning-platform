import React from 'react';
import {
  AppBar, Toolbar, Typography, Box, Container, Avatar, Stack
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// כפתור עם אנימציות, טקסט ושחור
const AnimatedButton = ({ children, icon, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.07, backgroundColor: '#f0f0f0' }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '14px 26px',
      fontSize: '1.1rem',
      border: 'none',
      borderRadius: '10px',
      background: 'transparent',
      color: 'black',
      cursor: 'pointer',
      transition: 'all 0.2s ease-in-out',
    }}
  >
    {icon}
    {children}
  </motion.button>
);

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: `url('/Background.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
      }}
    >
      {/* סרגל ניווט */}
      <AppBar position="static" sx={{ backgroundColor: 'white' }} elevation={3}>
        <Toolbar sx={{ minHeight: 100 }}>
          <Stack direction="row" alignItems="center" spacing={2} sx={{ flexGrow: 1 }}>
            <Avatar
              alt="Logo"
              src="/logo.png"
              sx={{ width: 52, height: 52 }}
            />
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{ color: 'black' }}
            >
              GenLearn 
            </Typography>
          </Stack>

          <Stack direction="row" spacing={2}>
            <AnimatedButton icon={<InfoIcon />} onClick={() => navigate('/about')}>
              קצת עלינו
            </AnimatedButton>
            <AnimatedButton icon={<ContactMailIcon />} onClick={() => navigate('/contact')}>
              צור קשר
            </AnimatedButton>
            <AnimatedButton icon={<SlideshowIcon />} onClick={() => navigate('/demo')}>
              דוגמה לשימוש
            </AnimatedButton>
            <AnimatedButton icon={<LoginIcon />} onClick={() => navigate('/login')}>
              התחברות
            </AnimatedButton>
          </Stack>
        </Toolbar>
      </AppBar>

      {/* תוכן מרכזי */}
      <Container sx={{ mt: 12, textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Typography variant="h2" fontWeight="bold" gutterBottom>
           ⚪ AI Learn ⚪
          </Typography>
          <Typography variant="h5" mb={4}>
            מערכת הלימוד המתקדמת ביותר מבוססת בינה מלאכותית
          </Typography>
        </motion.div>
      </Container>
    </Box>
  );
};

export default HomePage;
