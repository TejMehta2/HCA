const ImageUrl = (
  abstractImageUrl: string,
  primaryImageUrl: string,
  imageUrl: string
) => {
  let cardImageSrc;

  if (abstractImageUrl) {
    cardImageSrc = abstractImageUrl;
  } else if (imageUrl) {
    cardImageSrc = imageUrl;
  } else if (primaryImageUrl) {
    cardImageSrc = primaryImageUrl;
  } else {
    cardImageSrc = undefined;
  }
  return cardImageSrc;
};

export default ImageUrl;
