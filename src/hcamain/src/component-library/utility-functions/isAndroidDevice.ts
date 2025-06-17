const isAndroidDevice = () => {
  if (typeof window !== 'undefined') {
    return /android/i.test(navigator?.userAgent);
  }
  return undefined;
};

export default isAndroidDevice;
