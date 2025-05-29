export const addThumbnailParameter = (image?: string) => {
  try {
    if (!image) return image;
    const imageUrl = new URL(image);
    const urlSearchParams = new URLSearchParams(imageUrl.search);
    urlSearchParams.set('t', 'cardthumbnail');
    imageUrl.search = urlSearchParams.toString();
    return imageUrl.href;
  } catch (err) {
    process.env.NODE_ENV === 'development' && console.error(err);
    return image;
  }
};
