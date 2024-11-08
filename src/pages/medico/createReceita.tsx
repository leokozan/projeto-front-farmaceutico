import React, { useState } from 'react';
import { TextField, Button, Grid2, Typography } from '@mui/material';
import { Receita } from '../../models/models';

interface ReceitaFormProps {
}

const ReceitaForm: React.FC<ReceitaFormProps> = ({  }) => {
    const [formData, setFormData] = useState<Receita>({
    paciente: {
      nome: '',
      data_nascimento: '',
      cpf: '',
      plano_saude: ''
    },
    medico: {
      nome: '',
      CRM: '',
      assinatura_digital: ''
    },
    medicamento: {
      nome: '',
      dosagem: '',
      quantidade: 0,
      via_admin: '',
      observacoes: ''
    }
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | { name?: string | undefined; value: unknown; }>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name!]: value
    }));
  };
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid2 container spacing={3} sx={{backgroundColor:'white',padding:3,borderRadius:1,boxShadow:3}}>
        <Typography variant="h4" gutterBottom>
            Criar Receita
        </Typography>
        {/* Dados do Paciente */}
        <Grid2 size={{xs:12}}>
            <Typography variant='h5'>Dados do paciente</Typography>
        </Grid2>
        <Grid2 size={{xs:6}}>
          <TextField
            label="Nome do Paciente"
            name="paciente.nome"
            value={formData.paciente.nome}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid2>
        <Grid2 size={{xs:6}}>
            <TextField
            type='date'
            fullWidth/>
        </Grid2>
        <Grid2 size={{xs:6}}>
          <TextField
            label="CPF"
            name="paciente.cpf"
            value={formData.paciente.cpf}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid2>
        <Grid2 size={{xs:6}}>
          <TextField
            label="Plano de Saúde"
            name="paciente.plano_saude"
            value={formData.paciente.plano_saude}
            onChange={handleChange}
            fullWidth
          />
        </Grid2>
        <Grid2 size={{xs:12}}>
            <Typography variant='h5'>Dados do médico</Typography>
        </Grid2>
        {/* Dados do Médico */}
        <Grid2 size={{xs:6}}>
          <TextField
            label="Nome do Médico"
            name="medico.nome"
            value={formData.medico.nome}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid2>
        <Grid2 size={{xs:6}}>
          <TextField
            label="CRM"
            name="medico.CRM"
            value={formData.medico.CRM}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid2>
        <Grid2 size={{xs:6}}>
          <TextField
            label="Assinatura Digital"
            name="medico.assinatura_digital"
            value={formData.medico.assinatura_digital}
            onChange={handleChange}
            fullWidth
          />
        </Grid2>
        <Grid2 size={{xs:12}}>
            <Typography variant='h5'>Dados do medicamento</Typography>
        </Grid2>
        {/* Dados do Medicamento */}
        <Grid2 size={{xs:6}}>
          <TextField
            label="Nome do Medicamento"
            name="medicamento.nome"
            value={formData.medicamento.nome}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid2>
        <Grid2 size={{xs:3}}>
          <TextField
            label="Dosagem"
            name="medicamento.dosagem"
            value={formData.medicamento.dosagem}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid2>
        <Grid2 size={{xs:3}}>
          <TextField
            label="Quantidade"
            name="medicamento.quantidade"
            type="number"
            value={formData.medicamento.quantidade}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid2>
        <Grid2 size={{xs:6}}>
          <TextField
            label="Via de Administração"
            name="medicamento.via_admin"
            value={formData.medicamento.via_admin}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid2>
        <Grid2 size={{xs:6}}>
          <TextField
            label="Observações"
            name="medicamento.observacoes"
            value={formData.medicamento.observacoes}
            onChange={handleChange}
            fullWidth
          />
        </Grid2>

        {/* Botão de Submit */}
        <Grid2 size={{xs:12}}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Criar Receita
          </Button>
        </Grid2>
      </Grid2>
    </form>
  );
};

export default ReceitaForm;
