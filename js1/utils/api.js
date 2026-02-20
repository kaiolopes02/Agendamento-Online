import { CONFIG } from '../config/constants.js';

export const API = {
  /**
   * ✅ GET - Busca horários já ocupados
   * @returns {Promise<Array>} Lista de agendamentos {data, hora}
   */
  async fetchOccupiedSlots() {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), CONFIG.API.TIMEOUT);
    
    try {
      const response = await fetch(CONFIG.API.URL, {
        method: 'GET',
        signal: controller.signal,
        // ✅ Sem headers customizados = sem preflight OPTIONS
        cache: 'no-cache'
      });
      
      clearTimeout(timeout);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      // ✅ Garante que é um array (caso a API retorne erro em formato diferente)
      if (!Array.isArray(data)) {
        console.warn('⚠️ API retornou formato inesperado:', data);
        return [];
      }
      
      return data;
      
    } catch (error) {
      clearTimeout(timeout);
      
      if (error.name === 'AbortError') {
        console.error('⏱️ Timeout na requisição GET');
        throw new Error('Tempo esgotado ao consultar horários');
      }
      
      console.error('❌ Erro ao buscar agendamentos:', error);
      throw new Error('Falha ao consultar horários ocupados');
    }
  },

  /**
   * ✅ POST - Envia novo agendamento
   * @param {Object} dados - {nome, servico, data, hora}
   * @returns {Promise<Object>} Resposta da API
   */
  async sendBooking(dados) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), CONFIG.API.TIMEOUT);
    
    try {
      // ✅ Valida dados antes de enviar
      if (!dados.nome || !dados.servico || !dados.data || !dados.hora) {
        throw new Error('Dados incompletos para agendamento');
      }
      
      const response = await fetch(CONFIG.API.URL, {
        method: 'POST',
        signal: controller.signal,
        // ✅ text/plain evita preflight OPTIONS problemático no GAS
        headers: { 
          'Content-Type': 'text/plain'
        },
        body: JSON.stringify(dados)
      });
      
      clearTimeout(timeout);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const result = await response.json();
      
      // ✅ Verifica se a API retornou sucesso
      if (result.result !== 'success' && !result.success) {
        throw new Error(result.message || 'Erro ao confirmar agendamento');
      }
      
      console.log('✅ Agendamento confirmado:', result);
      return result;
      
    } catch (error) {
      clearTimeout(timeout);
      
      if (error.name === 'AbortError') {
        console.error('⏱️ Timeout na requisição POST');
        throw new Error('Tempo esgotado ao enviar agendamento');
      }
      
      console.error('❌ Erro ao agendar:', error);
      throw new Error('Falha ao confirmar agendamento. Tente novamente.');
    }
  },

  /**
   * ✅ GET - Cancela agendamento por ID
   * @param {string} cancelId - ID único do agendamento
   * @returns {Promise<string>} Mensagem de confirmação
   */
  async cancelBooking(cancelId) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), CONFIG.API.TIMEOUT);
    
    try {
      const url = `${CONFIG.API.URL}?cancelar=${encodeURIComponent(cancelId)}`;
      
      const response = await fetch(url, {
        method: 'GET',
        signal: controller.signal,
        cache: 'no-cache'
      });
      
      clearTimeout(timeout);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const text = await response.text();
      console.log('✅ Cancelamento:', text);
      return text;
      
    } catch (error) {
      clearTimeout(timeout);
      console.error('❌ Erro ao cancelar:', error);
      throw new Error('Falha ao cancelar agendamento');
    }
  },

  /**
   * ✅ Verifica se um horário específico está disponível
   * @param {string} data - YYYY-MM-DD
   * @param {string} hora - HH:MM
   * @returns {Promise<boolean>} true = disponível
   */
  async isSlotAvailable(data, hora) {
    try {
      const ocupados = await this.fetchOccupiedSlots();
      return !ocupados.some(o => o.data === data && o.hora === hora);
    } catch (error) {
      console.error('Erro ao verificar disponibilidade:', error);
      return false; // Falha segura: assume indisponível
    }
  }
};