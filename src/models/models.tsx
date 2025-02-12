export type User = {
    email:string,
    password:string,
    cargo:string
}

export type Paciente = {
    nome:string,
    data_nascimento:string,
    cpf:string,
    plano_saude?:string
}

export type Medico = {
    nome:string,
    CRM:string
}

export type Medicamento = {
    nome:string,
    dosagem:string,
    quantidade:number,
    via_admin:string,
    observacoes:string
}

export type Receita = {
    paciente:Paciente,
    medico:Medico,
    medicamento:Medicamento
}

export type DialogType = 'create' | 'update' | 'delete';
