import { CONFIG } from '../config/constants.js';

export const DateTimeUtils = {
  /**
   * Retorna data de hoje em formato ISO (YYYY-MM-DD)
   */
  getTodayISO() {
    return new Date().toISOString().split('T')[0];
  },

  /**
   * Verifica se data é domingo
   */
  isSunday(dateString) {
    return new Date(dateString + 'T00:00:00').getDay() === CONFIG.DIAS.DOMINGO;
  },

  /**
   * Verifica se horário está no período de almoço
   */
  isLunchTime(timeString) {
    const [h, m] = timeString.split(':').map(Number);
    const totalMin = h * 60 + m;
    const inicioAlmoco = this.timeToMinutes(CONFIG.HORARIOS.ALMOCO_INICIO);
    const fimAlmoco = this.timeToMinutes(CONFIG.HORARIOS.ALMOCO_FIM);
    return totalMin >= inicioAlmoco && totalMin < fimAlmoco;
  },

  /**
   * Verifica se horário está dentro do expediente
   */
  isValidBusinessHour(time) {
    const min = this.timeToMinutes(CONFIG.HORARIOS.ABERTURA);
    const max = this.timeToMinutes(CONFIG.HORARIOS.FECHAMENTO);
    const current = this.timeToMinutes(time);
    return current >= min && current <= max;
  },

  /**
   * Converte HH:MM para minutos totais
   */
  timeToMinutes(time) {
    const [h, m] = time.split(':').map(Number);
    return h * 60 + m;
  },

  /**
   * Formata data para exibição (DD/MM/YYYY)
   */
  formatDateBR(dateString) {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  },

  /**
   * Formata hora para exibição (HH:MM)
   */
  formatTime(timeString) {
    const [h, m] = timeString.split(':');
    return `${h}:${m}`;
  }
};