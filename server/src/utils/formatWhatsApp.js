export const formatWhatsAppNumber = (number) => {
  if (!number) throw new Error("Invalid number");

  let cleaned = number.replace(/^whatsapp:/, "").trim();

  if (!cleaned.startsWith("+")) {
    cleaned = "+" + cleaned;
  }

  if (!/^\+\d{10,15}$/.test(cleaned)) {
    throw new Error("Invalid phone format: " + cleaned);
  }

  return `whatsapp:${cleaned}`;
};