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
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

const apiBase = process.env.REACT_APP_API_URL;

export default function PromptManager() {
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom mt={4}>
        ניהול פרומפטים
      </Typography>

      {prompts.length === 0 ? (
        <Typography variant="body1" align="center" color="text.secondary">
          אין פרומפטים להצגה.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {prompts.map((prompt) => (
            <Grid item xs={12} key={prompt.id}>
              <Card elevation={3}>
                <CardContent>
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <PersonIcon color="action" />
                      <Typography variant="body2">
                        משתמש #{prompt.userId}
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1}>
                      <AccessTimeIcon color="action" />
                      <Typography variant="body2">
                        {new Date(prompt.createdAt).toLocaleString("he-IL")}
                      </Typography>
                    </Box>
                  </Box>
                  <Box display="flex" gap={1} alignItems="flex-start">
                    <ChatBubbleOutlineIcon color="primary" />
                    <Typography variant="body1" color="text.primary">
                      {prompt.prompt1}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
