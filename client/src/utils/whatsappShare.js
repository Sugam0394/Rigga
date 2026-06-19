export const openWhatsAppShare =
  ({
    phone,
    message,
  }) => {

    const encodedMessage =
      encodeURIComponent(
        message
      );

    const whatsappUrl =
      `https://wa.me/${phone}?text=${encodedMessage}`;

    window.open(
      whatsappUrl,
      "_blank"
    );
  };