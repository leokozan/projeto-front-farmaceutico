import React, { useState ,FormEvent} from 'react';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
function LoginPage() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
  
    // Função de login
    const handleLogin = (e: FormEvent<HTMLFormElement>): void => {
        console.log('Login feito');
    };

  return (
    <Grid container>
        <Grid size={{xs:12}}>
            <Box padding={4} boxShadow={1} display={'flex'} flexDirection={'column'} alignItems={'center'}>
                <Typography variant="h5" component="h1" sx={{ marginBottom: 3 }}>
                Login - Farma
                </Typography>
                <Box>
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
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{ marginTop: 2 }}
                    color="primary"
                >
                    Entrar
                </Button>
                </Box>
                <Grid size={{xs:12}}>
                    <Typography variant="body2">
                    Esqueceu a senha?
                    </Typography>
                </Grid>
            </Box>
        </Grid>
    </Grid>
  );
}

export default LoginPage;
