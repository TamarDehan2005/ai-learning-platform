import React from 'react';
import { Card, CardContent, CardHeader, Typography, Box, Stack } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import HistoryIcon from '@mui/icons-material/History';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import SmartToyIcon from '@mui/icons-material/SmartToy';

const AboutUs = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f7fa',
        padding: 4,
        direction: 'rtl',
      }}
    >
      <Card sx={{ maxWidth: 800, borderRadius: 5, boxShadow: 6 }}>
        <CardHeader
          avatar={<SmartToyIcon color="primary" fontSize="large" />}
          title={<Typography variant="h4" fontWeight="bold">קצת עלינו</Typography>}
        />
        <CardContent>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            ברוכים הבאים למערכת הלימוד החדשנית שלנו! כאן תוכלו לבחור נושאי לימוד שמעניינים אתכם, לשאול שאלות, 
            לקבל תשובות חכמות ומעמיקות – וכל זה באמצעות בינה מלאכותית מתקדמת.
          </Typography>

          <Stack direction="row" spacing={3}>
            <Box sx={{ textAlign: 'center' }}>
              <SchoolIcon fontSize="large" color="secondary" />
              <Typography variant="h6" fontWeight="medium">בחרו נושאים</Typography>
              <Typography variant="body2" color="text.secondary">התאימו את הלמידה לתחומי העניין שלכם</Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <QuestionAnswerIcon fontSize="large" color="success" />
              <Typography variant="h6" fontWeight="medium">שאלו שאלות</Typography>
              <Typography variant="body2" color="text.secondary">קבלו מענה מדויק ומבוסס AI</Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <HistoryIcon fontSize="large" color="warning" />
              <Typography variant="h6" fontWeight="medium">צפו בהיסטוריה</Typography>
              <Typography variant="body2" color="text.secondary">חיזרו אחורה מתי שתרצו</Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <EmojiObjectsIcon fontSize="large" color="info" />
              <Typography variant="h6" fontWeight="medium">למידה חכמה</Typography>
              <Typography variant="body2" color="text.secondary">שדרגו את הידע שלכם בכיף ובקלות</Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AboutUs;
