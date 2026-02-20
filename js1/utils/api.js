export const API = {
  async fetchOccupiedSlots() {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), CONFIG.API.TIMEOUT);
    
    try {
      const response = await fetch(CONFIG.API.URL, { signal: controller.signal });
      clearTimeout(timeout);
      
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error("Erro ao buscar agendamentos:", error);
      throw new Error("Falha ao consultar horários ocupados");
    }
  },

  async sendBooking(dados) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), CONFIG.API.TIMEOUT);
    
    try {
      const response = await fetch(CONFIG.API.URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados),
        signal: controller.signal
      });
      clearTimeout(timeout);
      
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return true;
    } catch (error) {
      console.error("Erro ao agendar:", error);
      throw new Error("Falha ao confirmar agendamento");
    }
  }
};