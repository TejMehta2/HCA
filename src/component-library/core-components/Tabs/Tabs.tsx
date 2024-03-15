import React, {
  useId,
  useLayoutEffect,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Dimensions, TabsProps } from './Tabs.types';
import styles from './Tabs.module.scss';
import Icons from '../../foundation/Icons/Icons';
import Text from '../../foundation/Text/Text';
import useWindowWidth from '../../hooks/useWindowWidth';

// avoid useLayoutEffect when SSR pages https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85
export const useBrowserLayoutEffect =
  typeof window === 'undefined' ? useLayoutEffect : () => {};

// The Tabs component is designed to act as the controls for other components with conditionally visible content
const Tabs = (props: TabsProps): JSX.Element => {
  const { callback, tabs, contentVariation } = props;

  const isXl = useWindowWidth(1440);

  // Hooks
  const id = useId(); // Generate a unique ID for the form elements
  const [tabDimensions, setTabDimensions] = useState<Dimensions[]>([
    {
      offsetWidth: 0,
      offsetLeft: 0,
    },
  ]); // Store dimensions for each tab
  const [currentTabIndex, setCurrentTabIndex] = useState(0); // Track the currently selected tab, for styling purposes only

  const handleChange = (args: {
    name: string;
    value: string;
    label: string;
    index: number;
  }) => {
    setCurrentTabIndex(args.index);
    callback(args); // Call the callback prop
  };

  const refs = useRef<HTMLLabelElement[]>([]); // Keep track of tab labels, in order to store their dimensions

  useEffect(() => {
    // Store the dimensions from label elements on load
    const dimensions = refs?.current?.map((labelElement) => {
      return {
        offsetWidth: labelElement?.offsetWidth,
        offsetLeft: labelElement?.offsetLeft,
      };
    });
    setTabDimensions(dimensions);
  }, [refs, isXl]);

  return (
    <div
      className={[
        styles.wrapper,
        contentVariation && styles[contentVariation],
      ].join(' ')}
    >
      <fieldset
        style={{
          // consumed in the CSS to animate the background element
          ['--current-tab-offset-width' as string]: `${tabDimensions?.[currentTabIndex]?.offsetWidth}px`,
          ['--current-tab-offset-left' as string]: `${tabDimensions?.[currentTabIndex]?.offsetLeft}px`,
        }}
      >
        {tabs.map((tab, index) => {
          const composedChildId = `${id}-${index}`;
          const {
            ariaControls,
            icon,
            label = composedChildId,
            value = composedChildId,
            name = id,
          } = tab;
          return (
            <div key={composedChildId}>
              <input
                aria-controls={ariaControls}
                aria-label={label}
                defaultChecked={index === 0}
                id={composedChildId}
                name={name}
                onChange={() =>
                  handleChange({
                    name,
                    value,
                    label,
                    index,
                  })
                }
                type="radio"
                value={value}
              />
              <label
                ref={(element: HTMLLabelElement) =>
                  refs?.current?.push(element)
                }
                htmlFor={composedChildId}
              >
                {!!icon && typeof icon === 'string' ? (
                  <Icons iconName={icon} />
                ) : (
                  icon
                )}
                <Text tag="span" variation="body-bold-extra-large">
                  {label}
                </Text>
              </label>
            </div>
          );
        })}
      </fieldset>
    </div>
  );
};

export default Tabs;
