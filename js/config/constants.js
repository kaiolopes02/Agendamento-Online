export const CONFIG = {
  API: {
    // ✅ URL limpa, sem espaços no final
    URL: "https://script.google.com/macros/s/AKfycby6LL_09VnY1wvUVLDEg3ICnchIXgPufRwErFoK1n2Cubp8LryTIRIRzaIKbg2C_465/exec".trim(),
    TIMEOUT: 15000 // 15 segundos
  },
  
  HORARIOS: {
    ABERTURA: "09:00",
    FECHAMENTO: "18:30",
    ALMOCO_INICIO: "12:00",
    ALMOCO_FIM: "13:00",
    INTERVALO_MINUTOS: 30
  },
  
  DIAS: {
    DOMINGO: 0
  },
  
  SELECTORES: {
    FORM: "#form-agendamento",
    BTN_ENVIAR: "#btn-enviar",
    FEEDBACK: "#form-feedback"
  },
  
  EMAILS: {
    DESTINO: "kaio.victor3002@gmail.com"
  }
};