import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { DialogType } from '../models/models';
interface GenericDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  type: DialogType;
  itemName?: string;
}
export const GenericDialog: React.FC<GenericDialogProps> = ({ open, onClose, onConfirm, type, itemName }) => {
  // Configuração do título e conteúdo baseado no tipo de ação
  const getTitle = () => {
    switch (type) {
      case 'create':
        return 'Criar Novo Item';
      case 'update':
        return `Atualizar ${itemName}`;
      case 'delete':
        return `Deletar ${itemName}`;
      default:
        return 'Ação';
    }
  };

  const getContent = () => {
    switch (type) {
      case 'create':
        return 'Você está prestes a criar um novo item.';
      case 'update':
        return `Você está prestes a atualizar o item ${itemName}. Deseja continuar?`;
      case 'delete':
        return `Tem certeza que deseja excluir o item ${itemName}? Esta ação não pode ser desfeita.`;
      default:
        return '';
    }
  };

  const getConfirmText = () => {
    switch (type) {
      case 'create':
        return 'Criar';
      case 'update':
        return 'Atualizar';
      case 'delete':
        return 'Deletar';
      default:
        return '';
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{getTitle()}</DialogTitle>
      <DialogContent>
        {getContent()}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button
          onClick={() => {
            onConfirm();
            onClose();
          }}
          color="secondary"
        >
          {getConfirmText()}
        </Button>
      </DialogActions>
    </Dialog>
  );
};