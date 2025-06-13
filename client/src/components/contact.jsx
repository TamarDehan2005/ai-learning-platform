import React, { useState } from 'react';
import {
  Box,
  Card,
  Typography,
  Grid,
  TextField,
  Button,
  IconButton,
} from '@mui/material';
import {
  LocationOn,
  Email,
  Phone,
  AccessTime,
  Language,
  Facebook,
  LinkedIn,
  School,
  Send,
} from '@mui/icons-material';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (field) => (e) =>
    setFormData({ ...formData, [field]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <Box
      sx={{
        direction: 'rtl',
        py: 6,
        px: 2,
        bgcolor: '#f0f2f5',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Box sx={{ width: '100%', maxWidth: 800 }}>
        <Box textAlign="center" mb={5}>
          <School sx={{ fontSize: 60, color: 'primary.main' }} />
          <Typography variant="h4" fontWeight="bold">
          🔵  אני רוצה לפנות אליכם 🔵
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            מערכת לימוד מבוססת בינה מלאכותית – מכל מקום, בכל זמן
          </Typography>
        </Box>

        <Grid container spacing={3} justifyContent="center">
          {/* טופס שליחת הודעה – צר ושדות אחד מתחת לשני */}
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 3, height: '100%' }} elevation={3}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                שלחו לנו הודעה:
              </Typography>
              <Box component="form" onSubmit={handleSubmit} autoComplete="off">
                <Box mb={2}>
                  <TextField
                    fullWidth
                    label="שם מלא"
                    value={formData.name}
                    onChange={handleChange('name')}
                  />
                </Box>
                <Box mb={2}>
                  <TextField
                    fullWidth
                    label="כתובת אימייל"
                    value={formData.email}
                    onChange={handleChange('email')}
                  />
                </Box>
                <Box mb={2}>
                  <TextField
                    fullWidth
                    label="הודעה"
                    multiline
                    rows={4}
                    value={formData.message}
                    onChange={handleChange('message')}
                  />
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  endIcon={<Send />}
                  type="submit"
                  fullWidth
                >
                  שלח הודעה
                </Button>
              </Box>
            </Card>
          </Grid>

          {/* פרטי קשר – באותו גודל של הטופס */}
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 3, height: '100%' }} elevation={3}>
              <Box>
                <Box display="flex" alignItems="center" mb={2}>
                  <LocationOn color="primary" sx={{ ml: 1 }} />
                  <Typography>בכל מקום</Typography>
                </Box>
                <Box display="flex" alignItems="center" mb={2}>
                  <Email color="primary" sx={{ ml: 1 }} />
                  <Typography>Everywhere@gmail.com</Typography>
                </Box>
                <Box display="flex" alignItems="center" mb={2}>
                  <Phone color="primary" sx={{ ml: 1 }} />
                  <Typography>1700-000-000</Typography>
                </Box>
                <Box display="flex" alignItems="center" mb={2}>
                  <AccessTime color="primary" sx={{ ml: 1 }} />
                  <Typography>שעות פעילות: 24/7</Typography>
                </Box>
                <Box display="flex" alignItems="center" mb={2}>
                  <Language color="primary" sx={{ ml: 1 }} />
                  <Typography>www.AILearningWorld.org</Typography>
                </Box>
                <Box mt={2}>
                  <Typography>עקבו אחרינו:</Typography>
                  <Box>
                    <IconButton color="primary">
                      <LinkedIn />
                    </IconButton>
                    <IconButton color="primary">
                      <Facebook />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ContactUs;
