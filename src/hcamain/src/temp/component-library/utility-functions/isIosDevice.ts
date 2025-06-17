const isIosDevice = () => {
  if (typeof window !== 'undefined') {
    return /iPad|iPhone|iPod/.test(navigator?.userAgent);
  }
  return undefined;
};

export default isIosDevice;
