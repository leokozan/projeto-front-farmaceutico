import React, { useState } from 'react';
import { 
  Button, 
  TextField, 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Link, 
  IconButton, 
  InputAdornment,
  FormControlLabel,
  Checkbox,
  FormGroup
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';

interface LoginProps {
  onToggleView: () => void;
}

interface RegisterProps {
  onToggleView: () => void;
}

export const Login: React.FC<LoginProps> = ({ onToggleView }) => {
  const [login, setEmail] = useState('');
  const [senha, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ login, senha })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("role", data.role); // Guarda a role do usuário
            navigateBasedOnRole(data.role); // Redireciona para a tela correta
        } else {
            setError("Credenciais inválidas. Tente novamente.");
        }
    } catch (error) {
        console.error("Erro no login:", error);
        setError("Ocorreu um erro. Tente novamente.");
    }
  };
const navigateBasedOnRole = (role: string) => {
    if (role === "MEDICO") {
        window.location.href = "/medico";
    } else if (role === "FARMACEUTICO") {
        window.location.href = "/farmaceutico";
    } else {
        window.location.href = "/login";
    }
};
  return (
    <Container maxWidth="xs" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Paper elevation={3} sx={{ padding: 3, width: '100%', maxWidth: 400 }}>
        <Typography component="h1" variant="h5" align="center" sx={{ mb: 2 }}>Entrar</Typography>
        <Box component="form" onSubmit={handleLogin} sx={{ width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="E-mail"
            type="email"
            value={login}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Senha"
            type={showPassword ? 'text' : 'password'}
            value={senha}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          {error && <Typography color="error" variant="body2" align="center">{error}</Typography>}
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Entrar</Button>
          <Typography variant="body2" align="center">
            Não tem uma conta? 
            <Link href="#" onClick={onToggleView} sx={{ ml: 1 }}>Cadastre-se</Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};
export const Register: React.FC<RegisterProps> = ({ onToggleView }) => {
  const [login, setEmail] = useState('');
  const [senha, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isDoctor, setIsDoctor] = useState(false);
  const [isPharmacist, setIsPharmacist] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (senha !== confirmPassword) {
      setError('As senhas não correspondem');
      return;
    }
    try {
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/auth/register`, {
        login,
        senha,
        roles: isDoctor ? 'MEDICO' : isPharmacist ? 'FARMACEUTICO' : 'USER'
      });
      console.log(response.data);
    } catch (error) {
      setError('Erro ao registrar. Tente novamente.');
    }
  };

  return (
    <Container maxWidth="xs" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Paper elevation={3} sx={{ padding: 3, width: '100%', maxWidth: 400 }}>
        <Typography component="h1" variant="h5" align="center" sx={{ mb: 2 }}>Cadastro</Typography>
        <Box component="form" onSubmit={handleRegister} sx={{ width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="E-mail"
            type="email"
            value={login}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Senha"
            type={showPassword ? 'text' : 'password'}
            value={senha}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Confirmar Senha"
            type={showConfirmPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          {error && <Typography color="error" variant="body2" align="center">{error}</Typography>}
          <FormGroup sx={{ mt: 2 }}>
            <FormControlLabel
              control={<Checkbox checked={isDoctor} onChange={() => setIsDoctor(!isDoctor)} />}
              label="Médico"
            />
            <FormControlLabel
              control={<Checkbox checked={isPharmacist} onChange={() => setIsPharmacist(!isPharmacist)} />}
              label="Farmacêutico"
            />
          </FormGroup>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Cadastrar
          </Button>
          <Typography variant="body2" align="center">
            Já tem uma conta? 
            <Link href="#" onClick={onToggleView} sx={{ ml: 1 }}>Entrar</Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};


export const AuthContainer: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleView = () => {
    setIsLogin(!isLogin);
  };

  return isLogin 
    ? <Login onToggleView={toggleView} /> 
    : <Register onToggleView={toggleView} />;
};

export default AuthContainer;