import { CONFIG } from '../config/constants.js';

export const DateTimeUtils = {
  getTodayISO() {
    return new Date().toISOString().split('T')[0];
  },

  isSunday(dateString) {
    return new Date(dateString + 'T00:00:00').getDay() === CONFIG.DIAS.DOMINGO;
  },

  timeToMinutes(timeString) {
    if (!timeString) return 0;
    const match = String(timeString).match(/(\d{1,2}):(\d{2})/);
    if (!match) return 0;
    return parseInt(match[1], 10) * 60 + parseInt(match[2], 10);
  },

  isTooClose(horaExistente, horaNova) {
    const minEx = this.timeToMinutes(horaExistente);
    const minNv = this.timeToMinutes(horaNova);
    if (minEx === 0 || minNv === 0) return false;
    return Math.abs(minEx - minNv) < 30; // Trava de 30 minutos exatos
  },

  isValidBusinessHour(time) {
    const min = this.timeToMinutes(CONFIG.HORARIOS.ABERTURA);
    const max = this.timeToMinutes(CONFIG.HORARIOS.FECHAMENTO);
    const current = this.timeToMinutes(time);
    return current >= min && current <= max;
  },

  isLunchTime(timeString) {
    const current = this.timeToMinutes(timeString);
    const inicio = this.timeToMinutes(CONFIG.HORARIOS.ALMOCO_INICIO);
    const fim = this.timeToMinutes(CONFIG.HORARIOS.ALMOCO_FIM);
    return current >= inicio && current < fim;
  }
};