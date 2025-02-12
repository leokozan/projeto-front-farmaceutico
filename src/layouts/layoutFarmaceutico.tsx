import { Outlet, Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';

const LayoutFarmaceutico = () => {
  const navigate = useNavigate(); // Hook para navegação programática
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role'); 

    navigate('/');
  };
  return (
    <Box>
      {/* Header */}
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Meu App
          </Typography>
          <Button color="inherit" component={Link} to="/farmaceutico">Home</Button>
          <Button color="inherit" component={Link} to="/farmaceutico/receitas">Receitas</Button>
          <Button color="inherit" onClick={handleLogout}>Sair</Button> {/* Botão de Logout */}
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container sx={{ marginTop: 3 }}>
        <Outlet /> {/* O conteúdo da página será renderizado aqui */}
      </Container>
      {/* Footer */}
      <Box sx={{ backgroundColor: '#f8f8f8', padding: 2, marginTop: 3 }}>
        <Typography variant="body2" align="center">
          &copy; 2024 Meu App. Todos os direitos reservados.
        </Typography>
      </Box>
    </Box>
  );
};

export default LayoutFarmaceutico;
