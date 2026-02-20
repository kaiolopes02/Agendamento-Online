export const DateTimeUtils = {
  getTodayISO() {
    return new Date().toISOString().split('T')[0];
  },

  isSunday(dateString) {
    return new Date(dateString + 'T00:00:00').getDay() === CONFIG.DIAS.DOMINGO;
  },

  isLunchTime(timeString) {
    const [h, m] = timeString.split(':').map(Number);
    const totalMin = h * 60 + m;
    const inicioAlmoco = this.timeToMinutes(CONFIG.HORARIOS.ALMOCO_INICIO);
    const fimAlmoco = this.timeToMinutes(CONFIG.HORARIOS.ALMOCO_FIM);
    return totalMin >= inicioAlmoco && totalMin < fimAlmoco;
  },

  timeToMinutes(time) {
    const [h, m] = time.split(':').map(Number);
    return h * 60 + m;
  },

  isValidBusinessHour(time) {
    const min = this.timeToMinutes(CONFIG.HORARIOS.ABERTURA);
    const max = this.timeToMinutes(CONFIG.HORARIOS.FECHAMENTO);
    const current = this.timeToMinutes(time);
    return current >= min && current <= max;
  }
};