import { CONFIG } from '../config/constants.js';

export const API = {
  /**
   * ✅ GET - Busca horários já ocupados
   */
  async fetchOccupiedSlots() {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), CONFIG.API.TIMEOUT);
    
    try {
      const response = await fetch(CONFIG.API.URL, {
        method: 'GET',
        signal: controller.signal,
        cache: 'no-cache'
      });
      
      clearTimeout(timeout);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      
      const data = await response.json();
      return Array.isArray(data) ? data : [];
      
    } catch (error) {
      clearTimeout(timeout);
      console.error('❌ Erro ao buscar ocupados:', error);
      return []; // Retorna vazio para não travar o form
    }
  },

  /**
   * ✅ POST - Envia novo agendamento
   */
  async sendBooking(dados) {
    const response = await fetch(CONFIG.API.URL, {
      method: 'POST',
      // ✅ text/plain evita o erro de Preflight OPTIONS no Google Apps Script
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify(dados)
    });

    if (!response.ok) throw new Error('Falha ao enviar dados');
    return await response.json();
  },

  /**
   * ✅ Verifica se um horário específico está disponível
   */
  async isSlotAvailable(data, hora) {
    try {
      const ocupados = await this.fetchOccupiedSlots();
      // 🔹 CORREÇÃO: Ajustado para dataFormatada
      return !ocupados.some(o => o.dataFormatada === data && o.hora === hora);
    } catch (error) {
      return false;
    }
  }
};