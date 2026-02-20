import { CONFIG } from './config/constants.js';
import { DateTimeUtils } from './utils/datetime.js';
import { Validator } from './utils/validation.js';
import { API } from './utils/api.js';
import { UI } from './modules/ui.js';
import { FormHandler } from './modules/formHandler.js';

// Expor globalmente para módulos que precisam (opcional)
globalThis.CONFIG = CONFIG;
globalThis.DateTimeUtils = DateTimeUtils;

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  UI.init();
  
  const form = document.querySelector(CONFIG.SELECTORES.FORM);
  if (form) {
    form.addEventListener('submit', (e) => FormHandler.handleSubmit(e));
  }
  
  // Melhora UX: atualiza horário disponível ao mudar data
  const inputDate = document.getElementById('data');
  const inputTime = document.getElementById('hora');
  
  inputDate?.addEventListener('change', () => {
    if (DateTimeUtils.isSunday(inputDate.value)) {
      inputTime.value = '';
      inputTime.disabled = true;
      UI.showFieldError('data', 'Não atendemos aos domingos');
    } else {
      inputTime.disabled = false;
      UI.showFieldError('data', '');
    }
  });
});