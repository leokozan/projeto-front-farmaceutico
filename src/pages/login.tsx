import  { useState } from 'react';
import { TextField, Button, Typography, Box, Alert } from '@mui/material';
import { User } from '../models/models';
import Grid from '@mui/material/Grid2';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const users: User[] = [
    {
      email: 'medico@farma.com',
      password: 'admin123',
      cargo: 'medico',
    },
    {
      email: 'farmaceutico@farma.com',
      password: 'func123',
      cargo: 'farmaceutico',
    },
  ];

  const handleLogin = () => {
    if (!email || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }
    const user = users.find((u) => u.email === email && u.password === password);
    if (user) {
      navigate('/farmaceutico');
      setError('');
    } else {
      setError('Usuário ou senha inválidos.');
    }
  };

  return (
    <Grid container sx={{height:'100vh'}}>
      <Grid size={12} display={'flex'} justifyContent={'center'} alignItems={'center'}>
        <Box padding={4} boxShadow={1} display={'flex'} flexDirection={'column'} alignItems={'center'} bgcolor={'white'}>
            <Typography variant="h5" component="h1" sx={{ marginBottom: 3 }}>
            Login - Farma
            </Typography>
            <Box>
            {error && (
                <Alert severity="error" sx={{ marginTop: 2}}>
                {error}
                </Alert>
            )}
            <TextField
                label="Email"
                type="email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                required
            />
            <TextField
                label="Senha"
                type="password"
                variant="outlined"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                required
            />
            <Button
                variant="contained"
                fullWidth
                sx={{ marginTop: 2 }}
                color="primary"
                onClick={handleLogin}
            >
                Entrar
            </Button>
            </Box>
            <Grid size={12}>
            <Typography variant="body2">
                Esqueceu a senha?
            </Typography>
            </Grid>
        </Box>
      </Grid>
    </Grid>
  );
}
