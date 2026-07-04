 export const openNativeShare = async ({
  message,
}) => {
  if (navigator.share) {
    await navigator.share({
      text: message,
    });
    return;
  }

  const whatsappUrl =
    `https://wa.me/?text=${encodeURIComponent(message)}`;

  window.open(
    whatsappUrl,
    "_blank",
    "noopener,noreferrer"
  );
};