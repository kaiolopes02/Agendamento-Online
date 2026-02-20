// ✅ Adicione estes imports no TOPO do arquivo
import { UI } from './ui.js';
import { Validator } from '../utils/validation.js';
import { API } from '../utils/api.js';
import { CONFIG } from '../config/constants.js';

export const FormHandler = {
  async handleSubmit(e) {
    e.preventDefault();
    
    UI.clearErrors();
    UI.clearFeedback();

    const dados = {
      nome: document.getElementById('nome').value.trim(),
      servico: document.getElementById('servico').value,
      data: document.getElementById('data').value,
      hora: document.getElementById('hora').value
    };

    const validation = Validator.validateForm(dados);
    if (!validation.isValid) {
      Object.entries(validation.errors).forEach(([field, msg]) => {
        UI.showFieldError(field, msg);
      });
      const firstError = Object.keys(validation.errors)[0];
      document.getElementById(firstError)?.focus();
      return;
    }

    UI.setLoading(true);

    try {
      const ocupados = await API.fetchOccupiedSlots();
      const jaExiste = ocupados.some(
        o => o.data === dados.data && o.hora === dados.hora
      );

      if (jaExiste) {
        UI.showFeedback("⚠️ Horário já reservado! Escolha outro.", "error");
        return;
      }

      await API.sendBooking(dados);
      UI.showFeedback("✅ Agendado com sucesso! 🎉", "success");
      UI.resetForm(e.target);
      
    } catch (err) {
      UI.showFeedback(`❌ ${err.message || "Erro de conexão. Tente novamente."}`, "error");
    } finally {
      UI.setLoading(false);
    }
  }
};