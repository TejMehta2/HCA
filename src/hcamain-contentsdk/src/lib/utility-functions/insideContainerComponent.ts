export const insideContainerComponentParam = 'IsInsideContainerComponent';
export const insideContainerComponentValue = '1';

type ComponentPropsWithParams = {
  params?: Record<string, string>;
};

export const setInsideContainerComponentParam = <
  T extends ComponentPropsWithParams,
>(
  componentProps: T
): T => ({
  ...componentProps,
  params: {
    ...componentProps.params,
    [insideContainerComponentParam]: insideContainerComponentValue,
  },
});

export const isInsideContainerComponent = (params?: unknown): boolean => {
  if (!params || typeof params !== 'object') {
    return false;
  }

  return (
    (params as Record<string, unknown>)[insideContainerComponentParam] ===
    insideContainerComponentValue
  );
};
