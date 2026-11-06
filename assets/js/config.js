/**
 * DREAMEXCH24 - Global Website Configuration
 * WhatsApp Number and Settings
 */
const CONFIG = {
  brandName: "DREAMEXCH24",
  tagline: "India's Most Trusted Cricket ID and Football ID Provider | Same Day Delivery Across India",
  
  // Configurable WhatsApp Details
  whatsappNumber: "9549376324",
  whatsappCountryCode: "91",
  get fullWhatsappNumber() {
    return this.whatsappCountryCode + this.whatsappNumber;
  },
  whatsappDisplay: "+91 9549376324",
  defaultInquiryMessage: "Hello DREAMEXCH24, I would like to get my verified Sports Exchange ID.",
  
  // Helper to generate WhatsApp URL with custom message
  getWhatsAppUrl(customMessage = null) {
    const text = encodeURIComponent(customMessage || this.defaultInquiryMessage);
    return `https://wa.me/${this.fullWhatsappNumber}?text=${text}`;
  },
  
  // Helpline and Support info
  helpline: "+91 9549376324",
  responseTime: "<60s",
  supportAvailability: "24/7 Match-Day Support Desk",
  
  // Social and External Links
  telegramUrl: "https://t.me/dreamexch24",
};

// Export to window
window.CONFIG = CONFIG;
