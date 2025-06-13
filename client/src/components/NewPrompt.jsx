import React, { useEffect, useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useSelector } from 'react-redux';

const NewPrompt = () => {
  const user = useSelector((state) => state.user);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [filteredSubCategories, setFilteredSubCategories] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [promptText, setPromptText] = useState('');

  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingSubCategories, setLoadingSubCategories] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [responseText, setResponseText] = useState(''); // <-- הוספתי סטייט לתשובה מהשרת

  const apiBase = process.env.REACT_APP_API_URL;; // עדכן בהתאם לכתובת שלך

  useEffect(() => {
    // טען קטגוריות
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${apiBase}/api/categories`);
        if (!res.ok) throw new Error('שגיאה בטעינת הקטגוריות');
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingCategories(false);
      }
    };

    // טען תת קטגוריות
    const fetchSubCategories = async () => {
      try {
        const res = await fetch(`${apiBase}/api/subcategories`);
        if (!res.ok) throw new Error('שגיאה בטעינת תת-קטגוריות');
        const data = await res.json();
        setSubCategories(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingSubCategories(false);
      }
    };

    fetchCategories();
    fetchSubCategories();
  }, []);

  // סינון תת-קטגוריות לפי קטגוריה שנבחרה
  useEffect(() => {
    if (selectedCategory) {
      setFilteredSubCategories(
        subCategories.filter((sub) => sub.categoryId === selectedCategory)
      );
      setSelectedSubCategory(''); // מאפס תת קטגוריה אם הקטגוריה משתנה
    } else {
      setFilteredSubCategories([]);
      setSelectedSubCategory('');
    }
  }, [selectedCategory, subCategories]);

  const handleSubmit = async () => {
    setError('');
    setSuccessMsg('');
    setResponseText('');
    if (!selectedCategory || !selectedSubCategory || !promptText.trim()) {
      setError('אנא מלא את כל השדות');
      return;
    }
    setSending(true);
    try {
      // השם של הקטגוריה והתת קטגוריה (מניח שהאובייקטים ב-categories ו-subCategories כוללים שדות 'id' ו-'name')
      const categoryName = categories.find((c) => c.id === selectedCategory)?.name;
      const subCategoryName = filteredSubCategories.find((s) => s.id === selectedSubCategory)?.name;

      const response = await fetch(`${apiBase}/api/prompts/handle`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          UserId: user.id,
          CategoryName: categoryName,
          SubCategoryName: subCategoryName,
          PromptText: promptText.trim(),
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => null);
        throw new Error(errData?.error || 'שגיאה בשליחת הפרומפט');
      }

      const result = await response.json();

      setSuccessMsg('הפרומפט נשלח בהצלחה!');
      setResponseText(result.response || ''); // <-- שמירת התגובה מהשרת להצגה

      // איפוס שדות
      setPromptText('');
      setSelectedCategory('');
      setSelectedSubCategory('');
    } catch (err) {
      setError(err.message);
    } finally {
      setSending(false);
    }
  };

  if (loadingCategories || loadingSubCategories) {
    return (
      <Container sx={{ mt: 8, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h5" gutterBottom textAlign="center">
        🔵 רציתי לדעת 🔵
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {successMsg && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {successMsg}
          </Alert>
        )}

        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel id="category-label">בחר קטגוריה</InputLabel>
          <Select
            labelId="category-label"
            value={selectedCategory}
            label="בחר קטגוריה"
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ mb: 3 }} disabled={!selectedCategory || filteredSubCategories.length === 0}>
          <InputLabel id="subcategory-label">בחר תת קטגוריה</InputLabel>
          <Select
            labelId="subcategory-label"
            value={selectedSubCategory}
            label="בחר תת קטגוריה"
            onChange={(e) => setSelectedSubCategory(e.target.value)}
          >
            {filteredSubCategories.map((sub) => (
              <MenuItem key={sub.id} value={sub.id}>
                {sub.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="כתוב את השאלה שלך"
          multiline
          minRows={4}
          fullWidth
          value={promptText}
          onChange={(e) => setPromptText(e.target.value)}
          disabled={!selectedSubCategory}
          sx={{ mb: 3 }}
        />

        <Box textAlign="center">
          <Button variant="contained" onClick={handleSubmit} disabled={sending}>
            {sending ? 'שולח...' : 'שלח שאלה'}
          </Button>
        </Box>

        {/* הצגת התגובה מהשרת */}
        {responseText && (
          <Paper sx={{ mt: 3, p: 2, backgroundColor: '#f9f9f9', whiteSpace: 'pre-wrap' }}>
            <Typography variant="body1">{responseText}</Typography>
          </Paper>
        )}
      </Paper>
    </Container>
  );
};

export default NewPrompt;
