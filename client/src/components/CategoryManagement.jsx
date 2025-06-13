import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  TextField,
  Typography,
  Paper,
  Collapse,
  Tooltip,
  CircularProgress,
  Snackbar,
  Alert,
} from '@mui/material';

import CategoryIcon from '@mui/icons-material/Category';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

const apiBase = process.env.REACT_APP_API_URL;

const CategoriesAdmin = () => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [editingSubCategoryId, setEditingSubCategoryId] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newSubCategoryName, setNewSubCategoryName] = useState('');
  const [addSubCategoryFor, setAddSubCategoryFor] = useState(null);
  const [editCategoryName, setEditCategoryName] = useState('');
  const [editSubCategoryName, setEditSubCategoryName] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // טעינת קטגוריות ותת קטגוריות
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [catRes, subCatRes] = await Promise.all([
          fetch(`${apiBase}/api/categories`),
          fetch(`${apiBase}/api/subcategories`)
        ]);
        if (!catRes.ok || !subCatRes.ok) throw new Error('שגיאה בטעינת הנתונים');

        const catData = await catRes.json();
        const subCatData = await subCatRes.json();

        setCategories(catData);
        setSubCategories(subCatData);
        setError('');
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // עדכון קטגוריה
  const updateCategory = async (id, name) => {
    try {
      const res = await fetch(`${apiBase}/api/categories/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, name }),
      });
      if (!res.ok) throw new Error('שגיאה בעדכון קטגוריה');

      const updated = await res.json();
      setCategories((cats) => cats.map(cat => cat.id === id ? updated : cat));
      setEditingCategoryId(null);
      setSnackbar({ open: true, message: 'קטגוריה עודכנה בהצלחה', severity: 'success' });
    } catch {
      setSnackbar({ open: true, message: 'שגיאה בעדכון קטגוריה', severity: 'error' });
    }
  };

  const updateSubCategory = async (id, name) => {
  try {
    const subCategory = subCategories.find(sub => sub.id === id);
    if (!subCategory) throw new Error('תת קטגוריה לא נמצאה');

    const res = await fetch(`${apiBase}/api/subcategories/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, name, categoryId: subCategory.categoryId }),
    });

    if (!res.ok) throw new Error('שגיאה בעדכון תת קטגוריה');

    const updated = await res.json();
    setSubCategories((subs) => subs.map(sub => sub.id === id ? updated : sub));
    setEditingSubCategoryId(null);
    setSnackbar({ open: true, message: 'תת קטגוריה עודכנה בהצלחה', severity: 'success' });
  } catch {
    setSnackbar({ open: true, message: 'שגיאה בעדכון תת קטגוריה', severity: 'error' });
  }
};

  // מחיקת קטגוריה
  const deleteCategory = async (id) => {
    try {
      const res = await fetch(`${apiBase}/api/categories/${id}`, {
        method: 'DELETE',
      });
      if (res.status === 400) {
        const data = await res.json();
        throw new Error(data || 'לא ניתן למחוק קטגוריה עם תת קטגוריות');
      }
      if (!res.ok) throw new Error('שגיאה במחיקת קטגוריה');

      setCategories((cats) => cats.filter(cat => cat.id !== id));
      // גם מחיקת תתי קטגוריות של קטגוריה זו מהממשק
      setSubCategories((subs) => subs.filter(sub => sub.categoryId !== id));
      setSnackbar({ open: true, message: 'קטגוריה נמחקה בהצלחה', severity: 'success' });
    } catch (e) {
      setSnackbar({ open: true, message: e.message, severity: 'error' });
    }
  };

  // מחיקת תת קטגוריה
  const deleteSubCategory = async (id) => {
    try {
      const res = await fetch(`${apiBase}/api/subcategories/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('שגיאה במחיקת תת קטגוריה');

      setSubCategories((subs) => subs.filter(sub => sub.id !== id));
      setSnackbar({ open: true, message: 'תת קטגוריה נמחקה בהצלחה', severity: 'success' });
    } catch {
      setSnackbar({ open: true, message: 'שגיאה במחיקת תת קטגוריה', severity: 'error' });
    }
  };

  // הוספת קטגוריה חדשה
  const addCategory = async () => {
    if (!newCategoryName.trim()) return;
    try {
      const res = await fetch(`${apiBase}/api/categories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newCategoryName.trim() }),
      });
      if (res.status === 409) throw new Error('קטגוריה עם שם זה כבר קיימת');
      if (!res.ok) throw new Error('שגיאה ביצירת קטגוריה');

      const created = await res.json();
      setCategories((cats) => [...cats, created]);
      setNewCategoryName('');
      setSnackbar({ open: true, message: 'קטגוריה נוספה בהצלחה', severity: 'success' });
    } catch (e) {
      setSnackbar({ open: true, message: e.message, severity: 'error' });
    }
  };

  // הוספת תת קטגוריה חדשה
  const addSubCategory = async (categoryId) => {
    if (!newSubCategoryName.trim()) return;
    try {
      const res = await fetch(`${apiBase}/api/subcategories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newSubCategoryName.trim(), categoryId }),
      });
      if (!res.ok) throw new Error('שגיאה ביצירת תת קטגוריה');

      const created = await res.json();
      setSubCategories((subs) => [...subs, created]);
      setNewSubCategoryName('');
      setAddSubCategoryFor(null);
      setSnackbar({ open: true, message: 'תת קטגוריה נוספה בהצלחה', severity: 'success' });
    } catch {
      setSnackbar({ open: true, message: 'שגיאה ביצירת תת קטגוריה', severity: 'error' });
    }
  };

  // סידור תתי קטגוריות לפי קטגוריה
  const getSubCategoriesFor = (categoryId) =>
    subCategories.filter((sub) => sub.categoryId === categoryId);

  // ניהול סנackbar
  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

  if (loading) return (
    <Box display="flex" justifyContent="center" mt={6}>
      <CircularProgress />
    </Box>
  );

  if (error) return (
    <Box mt={6} textAlign="center">
      <Typography color="error" variant="h6">{error}</Typography>
    </Box>
  );

  return (
    <Container maxWidth="md" sx={{ mt: 6, mb: 6 }}>
      <Typography
  variant="h4"
  gutterBottom
  align="center"                     // ← שנה ל‑center כדי למרכז
  color = "primary" // ← צבע תכלת + הדגשה
>
  ניהול קטגוריות ותתי קטגוריות
</Typography>


      {/* הוספת קטגוריה חדשה */}
      <Paper sx={{ p: 2, mb: 4 }}>
        <Typography variant="h6" mb={1}>הוסף קטגוריה חדשה</Typography>
        <Box display="flex" gap={2}>
          <TextField
            fullWidth
            label="שם קטגוריה"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addCategory()}
          />
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddCircleOutlineIcon />}
            onClick={addCategory}
          >
            הוסף
          </Button>
        </Box>
      </Paper>

      <List>
        {categories.map((category) => {
          const subCats = getSubCategoriesFor(category.id);

          return (
            <Box key={category.id} mb={3} component={Paper} sx={{ p: 2 }}>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box display="flex" alignItems="center" gap={1}>
                  <CategoryIcon color="primary" />
                  {editingCategoryId === category.id ? (
                    <>
                      <TextField
                        size="small"
                        value={editCategoryName}
                        onChange={(e) => setEditCategoryName(e.target.value)}
                        onKeyDown={e => {
                          if (e.key === 'Enter') updateCategory(category.id, editCategoryName);
                          if (e.key === 'Escape') setEditingCategoryId(null);
                        }}
                        autoFocus
                      />
                      <IconButton
                        color="success"
                        onClick={() => updateCategory(category.id, editCategoryName)}
                      >
                        <SaveIcon />
                      </IconButton>
                      <IconButton color="error" onClick={() => setEditingCategoryId(null)}>
                        <CancelIcon />
                      </IconButton>
                    </>
                  ) : (
                    <>
                      <Typography variant="h6">{category.name}</Typography>
                      <Tooltip title="ערוך קטגוריה">
                        <IconButton
                          size="small"
                          onClick={() => {
                            setEditingCategoryId(category.id);
                            setEditCategoryName(category.name);
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="מחק קטגוריה">
                        <IconButton
                          size="small"
                          onClick={() => deleteCategory(category.id)}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </>
                  )}
                </Box>

                {/* כפתור הוספת תת קטגוריה */}
                <Button
                  size="small"
                  startIcon={<AddCircleOutlineIcon />}
                  onClick={() => setAddSubCategoryFor(addSubCategoryFor === category.id ? null : category.id)}
                >
                  הוסף תת קטגוריה
                </Button>
              </Box>

              {/* טופס הוספת תת קטגוריה */}
              <Collapse in={addSubCategoryFor === category.id} timeout="auto" unmountOnExit>
                <Box mt={1} display="flex" gap={1}>
                  <TextField
                    size="small"
                    placeholder="שם תת קטגוריה"
                    value={newSubCategoryName}
                    onChange={(e) => setNewSubCategoryName(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && addSubCategory(category.id)}
                    fullWidth
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => addSubCategory(category.id)}
                    startIcon={<AddCircleOutlineIcon />}
                  >
                    הוסף
                  </Button>
                </Box>
              </Collapse>

              <Divider sx={{ my: 2 }} />

              {/* רשימת תתי קטגוריות */}
              <List component="div" disablePadding>
                {subCats.length === 0 && (
                  <Typography variant="body2" color="text.secondary" sx={{ pl: 5 }}>
                    אין תת קטגוריות
                  </Typography>
                )}
                {subCats.map((subCat) => (
                  <ListItem
                    key={subCat.id}
                    sx={{ pl: 5 }}
                    secondaryAction={
                      editingSubCategoryId === subCat.id ? (
                        <>
                          <IconButton
                            edge="end"
                            color="success"
                            onClick={() => updateSubCategory(subCat.id, editSubCategoryName)}
                          >
                            <SaveIcon />
                          </IconButton>
                          <IconButton
                            edge="end"
                            color="error"
                            onClick={() => setEditingSubCategoryId(null)}
                          >
                            <CancelIcon />
                          </IconButton>
                        </>
                      ) : (
                        <>
                          <Tooltip title="ערוך תת קטגוריה">
                            <IconButton
                              edge="end"
                              onClick={() => {
                                setEditingSubCategoryId(subCat.id);
                                setEditSubCategoryName(subCat.name);
                              }}
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="מחק תת קטגוריה">
                            <IconButton edge="end" onClick={() => deleteSubCategory(subCat.id)}>
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </>
                      )
                    }
                  >
                    <ListItemIcon>
                      <SubdirectoryArrowRightIcon color="action" />
                    </ListItemIcon>
                    {editingSubCategoryId === subCat.id ? (
                      <TextField
                        size="small"
                        fullWidth
                        value={editSubCategoryName}
                        onChange={(e) => setEditSubCategoryName(e.target.value)}
                        onKeyDown={e => {
                          if (e.key === 'Enter') updateSubCategory(subCat.id, editSubCategoryName);
                          if (e.key === 'Escape') setEditingSubCategoryId(null);
                        }}
                        autoFocus
                      />
                    ) : (
                      <ListItemText primary={subCat.name} />
                    )}
                  </ListItem>
                ))}
              </List>
            </Box>
          );
        })}
      </List>

      {/* Snackbar להודעות */}
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

export default CategoriesAdmin;
