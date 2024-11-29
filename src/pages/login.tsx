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
  InputAdornment
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface LoginProps {
  onToggleView: () => void;
}

interface RegisterProps {
  onToggleView: () => void;
}

export const Login: React.FC<LoginProps> = ({ onToggleView }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Tentativa de login:', { email, password });
  };
  const handleApi = () =>{
    const api = import.meta.env.VITE_REACT_APP_API_URL;
    console.log(api);
  }

  return (
    <Container 
      maxWidth="xs" 
      sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}
    >
      <Paper elevation={3} sx={{ padding: 3, width: '100%', maxWidth: 400 }}>
        <Typography component="h1" variant="h5" align="center" sx={{ mb: 2 }}>
          Entrar
        </Typography>
        <Box component="form" onSubmit={handleLogin} sx={{ width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="E-mail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Senha"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleApi}
          >
            Entrar
          </Button>
          <Typography variant="body2" align="center">
            Não tem uma conta? 
            <Link href="#" onClick={onToggleView} sx={{ ml: 1 }}>
              Cadastre-se
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export const Register: React.FC<RegisterProps> = ({ onToggleView }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.error('As senhas não correspondem');
      return;
    }
    console.log('Tentativa de cadastro:', { name, email, password });
  };

  return (
    <Container 
      maxWidth="xs" 
      sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}
    >
      <Paper elevation={3} sx={{ padding: 3, width: '100%', maxWidth: 400 }}>
        <Typography component="h1" variant="h5" align="center" sx={{ mb: 2 }}>
          Cadastro
        </Typography>
        <Box component="form" onSubmit={handleRegister} sx={{ width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Nome Completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="E-mail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Senha"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
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
                  <IconButton
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Cadastrar
          </Button>
          <Typography variant="body2" align="center">
            Já tem uma conta? 
            <Link href="#" onClick={onToggleView} sx={{ ml: 1 }}>
              Entrar
            </Link>
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