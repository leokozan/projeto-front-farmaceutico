import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  CircularProgress,
  TextField,
  Box,
} from "@mui/material";
import axios from "axios"; // Para fazer as requisições HTTP

const ReceitaTable = () => {
  const [receitas, setReceitas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedReceita, setSelectedReceita] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginData, setLoginData] = useState({
    login: "",
    senha: "",
  });
  const [openLoginModal, setOpenLoginModal] = useState(false);

  // Função para buscar as receitas do backend
  const fetchReceitas = () => {
    setLoading(true);
    axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/receitas/listarReceitas`) // URL da API de receitas
      .then((response) => {
        setReceitas(response.data); // Atualiza o estado com os dados da API
        setLoading(false); // Finaliza o carregamento
      })
      .catch((error) => {
        console.error("Erro ao buscar receitas:", error);
        setLoading(false); // Finaliza o carregamento mesmo em caso de erro
      });
  };

  useEffect(() => {
      fetchReceitas();  
  }, [isAuthenticated]);

  const handleRowClick = (receita) => {
    setSelectedReceita(receita);
    setOpenLoginModal(true); // Abre o modal de login ao clicar na linha
  };

  const handleCloseLoginModal = () => {
    setOpenLoginModal(false);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedReceita(null);
  };

  const handleLoginChange = (event) => {
    const { name, value } = event.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleLoginSubmit = () => {
    axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/auth/verificarEnfermeiro`, loginData)
      .then((response) => {
        if (response.data.token) {  // Verificando se o token foi retornado
          const role = response.data.role; // Supondo que o backend retorne o papel na resposta
          if (role === "FARMACEUTICO") { // Verifica se a role é FARMACEUTICO (assumido como enfermeiro)
            setIsAuthenticated(true); // Define como autenticado
            setOpenLoginModal(false); // Fecha o modal de login
            setOpenModal(true); // Abre o modal de detalhes da receita
          } else {
            alert("Usuário não é um enfermeiro!");
          }
        } else {
          alert("Credenciais inválidas");
        }
      })
      .catch((error) => {
        console.error("Erro de login:", error);
        alert("Erro ao tentar fazer login");
      });
  };

  const handleDarBaixa = () => {
    alert("Receita dada baixa com sucesso!");
    handleCloseModal();
  };

  return (
    <div>
      {loading ? (
        <CircularProgress /> // Indicador de carregamento
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nome do Paciente</TableCell>
                <TableCell>Data de Nascimento</TableCell>
                <TableCell>Plano de Saúde</TableCell>
                <TableCell>Nome do Médico</TableCell>
                <TableCell>Nome do Medicamento</TableCell>
                <TableCell>Ver Detalhes</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {receitas.map((receita) => (
                <TableRow key={receita.id} hover onClick={() => handleRowClick(receita)}>
                  <TableCell>{receita.nomePaciente}</TableCell>
                  <TableCell>{receita.dataNascimento}</TableCell>
                  <TableCell>{receita.planoSaude}</TableCell>
                  <TableCell>{receita.nomeMedico}</TableCell>
                  <TableCell>{receita.nomeMedicamento}</TableCell>
                  <TableCell>
                    <TableSortLabel>+</TableSortLabel>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Modal de Login */}
      <Dialog open={openLoginModal} onClose={handleCloseLoginModal}>
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          <TextField
            label="Usuário"
            variant="outlined"
            fullWidth
            name="username"
            value={loginData.username}
            onChange={handleLoginChange}
            margin="normal"
          />
          <TextField
            label="Senha"
            variant="outlined"
            type="password"
            fullWidth
            name="password"
            value={loginData.password}
            onChange={handleLoginChange}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLoginSubmit} color="primary">
            Login
          </Button>
          <Button onClick={handleCloseLoginModal} color="secondary">
            Fechar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal de Detalhes da Receita */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Detalhes da Receita</DialogTitle>
        <DialogContent>
          {selectedReceita && (
            <div>
              <strong>Nome do Paciente:</strong> {selectedReceita.nomePaciente} <br />
              <strong>Data de Nascimento:</strong> {selectedReceita.dataNascimento} <br />
              <strong>CPF:</strong> {selectedReceita.cpf} <br />
              <strong>Plano de Saúde:</strong> {selectedReceita.planoSaude} <br />
              <strong>Nome do Médico:</strong> {selectedReceita.nomeMedico} <br />
              <strong>CRM:</strong> {selectedReceita.crm} <br />
              <strong>Nome do Medicamento:</strong> {selectedReceita.nomeMedicamento} <br />
              <strong>Dosagem:</strong> {selectedReceita.dosagem} <br />
              <strong>Quantidade:</strong> {selectedReceita.quantidade} <br />
              <strong>Via de Administração:</strong> {selectedReceita.viaAdministracao} <br />
              <strong>Observações:</strong> {selectedReceita.observacoes}
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDarBaixa} color="primary">
            Dar Baixa
          </Button>
          <Button onClick={handleCloseModal} color="secondary">
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ReceitaTable;
