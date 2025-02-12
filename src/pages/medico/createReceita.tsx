import React, { useState } from 'react';
import { TextField, Button, Typography, Grid, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ReceitaForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nomePaciente: '',
    dataNascimento: '',
    cpf: '',
    planoSaude: '',
    nomeMedico: '',
    crm: '',
    nomeMedicamento: '',
    dosagem: '',
    quantidade: '',
    viaAdministracao: '',
    observacoes: ''
  });

  const [loginData, setLoginData] = useState({
    login: '',
    senha: ''
  });

  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleLoginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
  };

  const handleLoginSubmit = () => {
    axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/auth/login`, loginData)
      .then((response) => {
        console.log(response);
        if (response.data.role) {
          const role = response.data.role;
          if (role === 'MEDICO') {
            setIsAuthenticated(true);
            setOpenLoginModal(false);
            alert('Login realizado com sucesso!');
          } else {
            alert('Usuário não é um farmacêutico!');
          }
        } else {
          alert('Credenciais inválidas');
        }
      })
      .catch((error) => {
        console.error('Erro de login:', error);
        alert('Erro ao tentar fazer login');
      });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Verificar se o usuário está autenticado antes de enviar os dados da receita
    if (!isAuthenticated) {
      setOpenLoginModal(true);
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/receitas/cadastrarReceita`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert("Receita criada com sucesso!");
        navigate("/medico");
      } else {
        alert("Erro ao criar a receita.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3} sx={{ backgroundColor: 'white', padding: 3, borderRadius: 1, boxShadow: 3 }}>
        <Typography variant="h4" gutterBottom>
          Criar Receita
        </Typography>

        {/* Dados do Paciente */}
        <Grid item xs={12}>
          <Typography variant='h5'>Dados do Paciente</Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Nome do Paciente"
            name="nomePaciente"
            value={formData.nomePaciente}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            type="date"
            name="dataNascimento"
            value={formData.dataNascimento}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="CPF"
            name="cpf"
            value={formData.cpf}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Plano de Saúde"
            name="planoSaude"
            value={formData.planoSaude}
            onChange={handleChange}
            fullWidth
          />
        </Grid>

        {/* Dados do Médico */}
        <Grid item xs={12}>
          <Typography variant='h5'>Dados do Médico</Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Nome do Médico"
            name="nomeMedico"
            value={formData.nomeMedico}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="CRM"
            name="crm"
            value={formData.crm}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>

        {/* Dados do Medicamento */}
        <Grid item xs={12}>
          <Typography variant='h5'>Dados do Medicamento</Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Nome do Medicamento"
            name="nomeMedicamento"
            value={formData.nomeMedicamento}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label="Dosagem"
            name="dosagem"
            value={formData.dosagem}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label="Quantidade"
            name="quantidade"
            type="number"
            value={formData.quantidade}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Via de Administração"
            name="viaAdministracao"
            value={formData.viaAdministracao}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Observações"
            name="observacoes"
            value={formData.observacoes}
            onChange={handleChange}
            fullWidth
          />
        </Grid>

        {/* Botão de Submit */}
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Criar Receita
          </Button>
        </Grid>
      </Grid>

      {/* Modal de Login */}
      <Dialog open={openLoginModal} onClose={() => setOpenLoginModal(false)}>
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          <TextField
            label="Usuário"
            variant="outlined"
            fullWidth
            name="login"
            value={loginData.login}
            onChange={handleLoginChange}
            margin="normal"
          />
          <TextField
            label="Senha"
            variant="outlined"
            type="password"
            fullWidth
            name="senha"
            value={loginData.senha}
            onChange={handleLoginChange}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLoginSubmit} color="primary">
            Login
          </Button>
          <Button onClick={() => setOpenLoginModal(false)} color="secondary">
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  );
};

export default ReceitaForm;
