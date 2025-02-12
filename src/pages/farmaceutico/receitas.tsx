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
    setLoginData({
      login:'',
      senha:''
    });
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedReceita(null);
    setLoginData({
      login:'',
      senha:''
    });
  };

  const handleLoginChange = (event) => {
    const { name, value } = event.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleLoginSubmit = () => {
    axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/auth/login`, loginData)
      .then((response) => {
        console.log(response)
        if (response.data.role) { 
          const role = response.data.role; 
          if (role === "FARMACEUTICO") { 
            setIsAuthenticated(true);
            setOpenLoginModal(false);
            setOpenModal(true);
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

  const handleDarBaixa = async (event: React.FormEvent) => {
  
    try {
      // Definindo o ID da receita, isso pode vir de um estado ou prop
      const receitaId = 1; // Substitua por seu id dinâmico, se necessário
      
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/receitas/${receitaId}/baixada`, {
        method: 'PUT', // Mudando para PUT, pois é uma atualização
        headers: {
          'Content-Type': 'application/json', // Para enviar JSON
        },
      });
  
      if (response.ok) {
        const data = await response.json(); // Caso a resposta seja JSON
        alert("Receita dada baixa com sucesso!");
        handleCloseModal(); // Fecha o modal após o sucesso
      } else {
        alert("Erro ao dar baixa na receita");
      }
    } catch (error) {
      console.error("Erro ao dar baixa na receita:", error);
      alert("Erro ao tentar dar baixa");
    }
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
