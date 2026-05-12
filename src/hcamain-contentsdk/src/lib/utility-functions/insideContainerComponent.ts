export const insideContainerComponentParam = 'IsInsideContainerComponent';
export const insideContainerComponentValue = 'yes';

type ComponentPropsWithParams = {
  params?: Record<string, string>;
};

type ParamsWithInsideContainerComponent = {
  IsInsideContainerComponent?: string;
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

export const isInsideContainerComponent = (
  params?: ParamsWithInsideContainerComponent
): boolean =>
  params?.[insideContainerComponentParam] === insideContainerComponentValue;
