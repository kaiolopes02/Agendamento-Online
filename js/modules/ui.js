import { CONFIG } from '../config/constants.js';
import { DateTimeUtils } from '../utils/datetime.js';

export const UI = {
  elements: {
    btn: null,
    btnText: null,
    btnLoader: null,
    feedback: null
  },

  init() {
    this.elements.btn = document.querySelector(CONFIG.SELECTORES.BTN_ENVIAR);
    this.elements.btnText = this.elements.btn?.querySelector('.btn-text');
    this.elements.btnLoader = this.elements.btn?.querySelector('.btn-loader');
    this.elements.feedback = document.querySelector(CONFIG.SELECTORES.FEEDBACK);
    
    const inputDate = document.getElementById('data');
    if (inputDate) {
      inputDate.min = DateTimeUtils.getTodayISO();
    }
  },

  setLoading(loading) {
    if (!this.elements.btn) return;
    this.elements.btn.disabled = loading;
    this.elements.btnText?.classList.toggle('hidden', loading);
    this.elements.btnLoader?.classList.toggle('hidden', !loading);
  },

  showFeedback(message, type = 'success') {
    if (!this.elements.feedback) return;
    this.elements.feedback.textContent = message;
    this.elements.feedback.className = `feedback ${type}`;
    this.elements.feedback.classList.remove('hidden');
    
    if (type === 'success') {
      setTimeout(() => this.elements.feedback.classList.add('hidden'), 5000);
    }
  },

  clearFeedback() {
    this.elements.feedback?.classList.add('hidden');
  },

  showFieldError(fieldId, message) {
    const errorEl = document.getElementById(`erro-${fieldId}`);
    if (errorEl) {
      errorEl.textContent = message;
    }
  },

  clearErrors() {
    // 🔹 CORREÇÃO: Garante a limpeza de todos os spans de erro
    document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');
  },

  resetForm(form) {
    if (form) {
      form.reset();
      this.init(); // Reinicializa data mínima
    }
    this.clearErrors();
  }
};