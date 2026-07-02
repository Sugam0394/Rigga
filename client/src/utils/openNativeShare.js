 export const openNativeShare = async ({
  message,
}) => {
  if (!navigator.share) {
    throw new Error(
      "Native sharing is not supported."
    );
  }

  await navigator.share({
    text: message,
  });
};