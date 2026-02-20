export const CONFIG = {
  API: {
    // ✅ URL limpa, sem espaços no final
    URL: "https://script.google.com/macros/s/AKfycbz1WyJF7xshtNARetx__uZ6enPXXWS3i9k0BkbscvUMZNrzEOqk9E9WQSms0OYPhQEJ/exec".trim(),
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