import { DateTimeUtils } from './datetime.js';
import { CONFIG } from '../config/constants.js';

export const Validator = {
  validateForm(dados) {
    const errors = {};
    
    if (!dados.nome || dados.nome.length < 3) errors.nome = "Nome muito curto";
    if (!dados.servico) errors.servico = "Escolha um serviço";
    
    if (!dados.data) {
      errors.data = "Data obrigatória";
    } else if (DateTimeUtils.isSunday(dados.data)) {
      errors.data = "Não abrimos aos domingos";
    }

    if (!dados.hora) {
      errors.hora = "Hora obrigatória";
    } else if (!DateTimeUtils.isValidBusinessHour(dados.hora)) {
      errors.hora = "Fora do horário de expediente";
    } else if (DateTimeUtils.isLunchTime(dados.hora)) {
      errors.hora = "Horário de almoço";
    }

    return { isValid: Object.keys(errors).length === 0, errors };
  }
};