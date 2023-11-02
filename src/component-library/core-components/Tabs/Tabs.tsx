import React, {
  ChangeEvent,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { Dimensions, TabsProps } from './Tabs.types';
import styles from './Tabs.module.scss';
import Icons from '../../foundation/Icons/Icons';
import Text from '../../foundation/Text/Text';

// The Tabs component is designed to act as the controls for other components with conditionally visible content
const Tabs = (props: TabsProps): JSX.Element => {
  const { callback, theme = 'main-turquoise', tabs } = props;

  // Hooks
  const id = useId(); // Generate a unique ID for the form elements
  const [tabDimensions, setTabDimensions] = useState<Dimensions[]>([
    {
      offsetWidth: 0,
      offsetLeft: 0,
    },
  ]); // Store dimensions for each tab
  const [currentTabIndex, setCurrentTabIndex] = useState(0); // Track the currently selected tab, for styling purposes only

  const handleChange = (event: ChangeEvent<HTMLInputElement>, label, index) => {
    setCurrentTabIndex(index);
    callback(label); // Call the callback prop
  };

  const refs = useRef<HTMLLabelElement[]>([]); // Keep track of tab labels, in order to store their dimensions
  useLayoutEffect(() => {
    // Store the dimensions from label elements on load
    const dimensions = refs?.current?.map((labelElement) => {
      const { offsetWidth, offsetLeft } = labelElement;
      return { offsetWidth, offsetLeft };
    });
    setTabDimensions(dimensions);
  }, [refs]);

  return (
    <div className={styles.wrapper}>
      <fieldset
        style={{
          // consumed in the CSS to animate the background element
          ['--current-tab-offset-width' as string]: `${tabDimensions?.[currentTabIndex]?.offsetWidth}px`,
          ['--current-tab-offset-left' as string]: `${tabDimensions?.[currentTabIndex]?.offsetLeft}px`,
        }}
        className={styles[theme]}
      >
        {tabs.map((tab, index) => {
          const composedChildId = `${id}-${index}`;
          return (
            <div key={composedChildId}>
              <input
                aria-controls={tab.ariaControls}
                aria-label={tab.label}
                defaultChecked={index === 0}
                id={composedChildId}
                name={id}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  handleChange(event, tab.label, index)
                }
                type="radio"
                value={id}
              />
              <label
                ref={(element) => refs?.current?.push(element)}
                className={styles[theme]}
                htmlFor={composedChildId}
              >
                {!!tab.icon && <Icons iconName={tab.icon} />}
                <Text tag="span" variation="body-semi-bold-extra-large">
                  {tab.label}
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
