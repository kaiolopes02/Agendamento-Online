import { CONFIG } from '../config/constants.js';
import { UI } from './ui.js';
import { Validator } from '../utils/validation.js';
import { API } from '../utils/api.js';

export const FormHandler = {
  /**
   * Handler principal do submit
   */
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

    // Validações locais (Frontend)
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
      // 🔹 CORREÇÃO: Verifica disponibilidade usando a chave correta vinda da API
      const ocupados = await API.fetchOccupiedSlots();
      const jaExiste = ocupados.some(
        o => o.dataFormatada === dados.data && o.hora === dados.hora
      );

      if (jaExiste) {
        UI.showFeedback("⚠️ Horário já reservado! Escolha outro.", "error");
        UI.setLoading(false);
        return;
      }

      // Confirma agendamento
      await API.sendBooking(dados);
      
      UI.showFeedback("✅ Agendado com sucesso! 🎉", "success");
      UI.resetForm(e.target);
      
    } catch (error) {
      UI.showFeedback(`❌ Erro: ${error.message}`, "error");
    } finally {
      UI.setLoading(false);
    }
  }
};