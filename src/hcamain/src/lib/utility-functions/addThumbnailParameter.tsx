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

export const upsertQuerystringParam = (
  url: string,
  queryStringParamName: string,
  paramValue: string
): string => {
  try {
    if (!url) return url;
    const parsedUrl = new URL(url);

    // Replaces existing param or adds a new one
    parsedUrl.searchParams.set(queryStringParamName, paramValue);

    return parsedUrl.toString();
  } catch (err) {
    process.env.NODE_ENV === 'development' && console.error(err);
    return url;
  }
};
