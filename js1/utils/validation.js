export const Validator = {
  isEmpty(value) {
    return !value || value.trim() === '';
  },

  isNameValid(name) {
    return name.trim().length >= 3;
  },

  validateForm(dados) {
    const errors = {};
    
    if (this.isEmpty(dados.nome) || !this.isNameValid(dados.nome)) {
      errors.nome = "Nome deve ter pelo menos 3 caracteres";
    }
    
    if (this.isEmpty(dados.servico)) {
      errors.servico = "Selecione um serviço";
    }
    
    if (this.isEmpty(dados.data)) {
      errors.data = "Data é obrigatória";
    } else if (DateTimeUtils.isSunday(dados.data)) {
      errors.data = "Não atendemos aos domingos";
    } else if (dados.data < DateTimeUtils.getTodayISO()) {
      errors.data = "Data inválida";
    }
    
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