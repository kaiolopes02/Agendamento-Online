import { UI } from './ui.js';
import { API } from '../utils/api.js';
import { DateTimeUtils } from '../utils/datetime.js';
import { Validator } from '../utils/validation.js';

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
      Object.entries(validation.errors).forEach(([field, msg]) => UI.showFieldError(field, msg));
      return;
    }

    UI.setLoading(true);

    try {
      const ocupados = await API.fetchOccupiedSlots();
      
      const conflito = ocupados.find(o => 
        o.dataFormatada === dados.data && DateTimeUtils.isTooClose(o.hora, dados.hora)
      );

      if (conflito) {
        UI.showFeedback(`⚠️ Já existe um cliente agendado às ${conflito.hora}. Escolha outro horário com intervalo de 30 minutos no mínimo.`, "error");
        UI.setLoading(false);
        return;
      }

      await API.sendBooking(dados);
      UI.showFeedback("✅ Agendamento realizado com sucesso!", "success");
      UI.resetForm(e.target);
    } catch (error) {
      UI.showFeedback("❌ Erro ao conectar com o servidor.", "error");
    } finally {
      UI.setLoading(false);
    }
  }
};