import { CONFIG } from '../config/constants.js';
import { DateTimeUtils } from './datetime.js';

export const Validator = {
  /**
   * Verifica se valor está vazio
   */
  isEmpty(value) {
    return !value || value.trim() === '';
  },

  /**
   * Valida nome (mínimo 3 caracteres)
   */
  isNameValid(name) {
    return name && name.trim().length >= 3;
  },

  /**
   * Validação completa do formulário
   */
  validateForm(dados) {
    const errors = {};
    
    // Nome
    if (this.isEmpty(dados.nome) || !this.isNameValid(dados.nome)) {
      errors.nome = "Nome deve ter pelo menos 3 caracteres";
    }
    
    // Serviço
    if (this.isEmpty(dados.servico)) {
      errors.servico = "Selecione um serviço";
    }
    
    // Data
    if (this.isEmpty(dados.data)) {
      errors.data = "Data é obrigatória";
    } else if (DateTimeUtils.isSunday(dados.data)) {
      errors.data = "Não atendemos aos domingos";
    } else if (dados.data < DateTimeUtils.getTodayISO()) {
      errors.data = "Data não pode ser no passado";
    }
    
    // Hora
    if (this.isEmpty(dados.hora)) {
      errors.hora = "Horário é obrigatório";
    } else if (!DateTimeUtils.isValidBusinessHour(dados.hora)) {
      errors.hora = "Fora do horário de atendimento";
    } else if (DateTimeUtils.isLunchTime(dados.hora)) {
      errors.hora = "Horário de almoço (12h-13h)";
    }
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }
};