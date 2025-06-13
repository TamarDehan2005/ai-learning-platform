import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Stack,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const steps = [
  {
    label: 'שלב ראשון: בחירת קטגוריה',
    imgSrc: '/step1.png',
  },
  {
    label: 'שלב שני: בחירת תת קטגוריה',
    imgSrc: '/step2.png',
  },
  {
    label: 'שלב שלישי: שתף אותנו מה ברצונך לדעת',
    imgSrc: '/step3.png',
  },
  {
    label: 'שלב רביעי: קבל את התשובה',
    imgSrc: '/step4.png',
  },
];

const DemoSlider = () => {
  const [index, setIndex] = useState(0);
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  const visibleCount = 2;

  const handlePrev = () => {
    setIndex((prev) => Math.max(prev - visibleCount, 0));
  };

  const handleNext = () => {
    setIndex((prev) =>
      Math.min(prev + visibleCount, steps.length - visibleCount)
    );
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', mt: 6, direction: 'rtl', px: 2 }}>
      <Typography variant="h4" fontWeight="bold" mb={4} textAlign="center">
      🔵 שניה, לפני שמתחילים 🔵
      </Typography>

      <Stack direction="row" alignItems="center" justifyContent="center" spacing={2}>
        <IconButton onClick={handlePrev} disabled={index === 0}>
          <ArrowForwardIosIcon />
        </IconButton>

        {steps.slice(index, index + visibleCount).map(({ label, imgSrc }, i) => (
          <Box
            key={i}
            sx={{
              width: isSmall ? '80vw' : 480,
              mx: 1,
            }}
          >
            {/* כיתוב עדין */}
            <Box
              sx={{
                mb: 1,
                px: 2,
                py: 1,
                bgcolor: 'rgba(255, 255, 255, 0.7)',
                borderRadius: '16px',
                fontSize: '0.85rem',
                fontWeight: 500,
                textAlign: 'center',
                border: '1px solid #e0e0e0',
                color: '#333',
                backdropFilter: 'blur(3px)',
              }}
            >
              {label}
            </Box>

            {/* תמונה */}
            <Box
              sx={{
                height: isSmall ? 220 : 320,
                borderRadius: 3,
                overflow: 'hidden',
                boxShadow: 4,
                position: 'relative',
                cursor: 'pointer',
                '&:hover .overlay': {
                  opacity: 0.35,
                },
              }}
            >
              <Box
                component="img"
                src={imgSrc}
                alt={label}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
              {/* שכבת hover כהה */}
              <Box
                className="overlay"
                sx={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  bottom: 0,
                  left: 0,
                  bgcolor: 'black',
                  opacity: 0,
                  transition: 'opacity 0.3s',
                }}
              />
            </Box>
          </Box>
        ))}

        <IconButton
          onClick={handleNext}
          disabled={index >= steps.length - visibleCount}
        >
          <ArrowBackIosNewIcon />
        </IconButton>
      </Stack>
    </Box>
  );
};

export default DemoSlider;
