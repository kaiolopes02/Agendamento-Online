import { CONFIG } from './config/constants.js';
import { UI } from './modules/ui.js';
import { FormHandler } from './modules/formHandler.js';
import { DateTimeUtils } from './utils/datetime.js';

// Inicialização quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  UI.init();
  
  const form = document.querySelector(CONFIG.SELECTORES.FORM);
  if (form) {
    form.addEventListener('submit', (e) => FormHandler.handleSubmit(e));
  }
  
  // UX: desabilita horário se domingo for selecionado
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
  
  console.log('✅ Barber Shop App inicializado!');
});