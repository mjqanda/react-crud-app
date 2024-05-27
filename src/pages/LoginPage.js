import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, Grid } from '@mui/material';
import { signIn } from '../api/ApiService';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signIn(username, password);
      const { success, message, token } = response.data;
      if (success) { // Authentication successful
        localStorage.setItem('token', token);
        navigate('/dashboard');
      } else {
        setError(message);
      }
    } catch (error) {
      console.error('Error signing in:', error);
      setError('An error occurred during authentication');
    }
  };

  return (
    <Container component="main" maxWidth="xs" style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div>
        <Typography variant="h5">Login</Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="username"
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="password"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
          {error && <Typography variant="body2" color="error">{error}</Typography>}
        </form>
      </div>
    </Container>
  );
};

export default LoginPage;
