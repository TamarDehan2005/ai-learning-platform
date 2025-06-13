import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  CircularProgress,
  Box,
  Pagination,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

const apiBase = process.env.REACT_APP_API_URL;

export default function PromptManager() {
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const promptsPerPage = 10;

  useEffect(() => {
    axios
      .get(`${apiBase}/api/users/all-prompts`)
      .then((res) => {
        setPrompts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("שגיאה בשליפת פרומפטים", err);
        setLoading(false);
      });
  }, []);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const indexOfLastPrompt = page * promptsPerPage;
  const indexOfFirstPrompt = indexOfLastPrompt - promptsPerPage;
  const currentPrompts = prompts.slice(indexOfFirstPrompt, indexOfLastPrompt);
  const totalPages = Math.ceil(prompts.length / promptsPerPage);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md">
      <Typography
        variant="h4"
        align="center"
        gutterBottom
         color= "primary" 
      >
        ניהול בקשות
      </Typography>

      {prompts.length === 0 ? (
        <Typography variant="body1" align="center" color="text.secondary">
          אין בקשות להצגה.
        </Typography>
      ) : (
        <>
          <Grid container spacing={3} justifyContent="center">
            {currentPrompts.map((prompt) => (
              <Grid item xs={12} md={10} key={prompt.id}>
                <Card elevation={3}>
                  <CardContent>
                    <Box display="flex" justifyContent="space-between" mb={1}>
                      <Box display="flex" alignItems="center" gap={1}>
                        <PersonIcon color="action" />
                        <Typography variant="body1">
                          משתמש #{prompt.userId}
                        </Typography>
                      </Box>
                      <Box display="flex" alignItems="center" gap={1}>
                        <AccessTimeIcon color="action" />
                        <Typography variant="body1">
                          {new Date(prompt.createdAt).toLocaleString("he-IL")}
                        </Typography>
                      </Box>
                    </Box>
                    <Box display="flex" gap={1} alignItems="flex-start">
                      <ChatBubbleOutlineIcon color="primary" />
                      <Typography variant="h6" color="text.primary">
                        {prompt.prompt1}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Box display="flex" justifyContent="center" mt={4}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        </>
      )}
    </Container>
  );
}
