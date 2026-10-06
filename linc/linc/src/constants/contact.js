export const CONTACT = {
  whatsapp: "5521990274303",
  email: "",
  instagram: "",
};

export const getWhatsAppLink = (message = "") => {
  if (!CONTACT.whatsapp) {
    return "#contato";
  }

  const text = encodeURIComponent(message);

  return `https://wa.me/${CONTACT.whatsapp}?text=${text}`;
};