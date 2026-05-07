import React, { forwardRef, type JSX } from 'react';
import { ModalSearchProps } from './ModalSearch.types';
import styles from './ModalSearch.module.scss';
import Modals from '../../components/Modals/Modals';
import StyledYextSearchBar from '../StyledYextSearchBar/StyledYextSearchBar';
import { useSearchActions } from '@yext/search-headless-react';
import { useRouter } from 'next/navigation';
import Button from '../../core-components/Button/Button';

const ModalSearch = (
  props: ModalSearchProps,
  ref: React.MutableRefObject<HTMLDialogElement | null>
): JSX.Element => {
  const {
    defaultOpen = false,
    suggestions,
    id,
    placeholder,
    subheading,
    redirectUrl = '/',
  } = props;
  const searchActions = useSearchActions();
  const router = useRouter();

  const triggerSearch = (query: string) => {
    searchActions.setQuery(query);
    if (!query.length) {
      const inputElement = ref?.current?.querySelector(
        '[class*="StyledYextSearchBar_input-element"]'
      ) as HTMLInputElement;
      inputElement?.focus?.();
      return;
    }

    searchActions.executeUniversalQuery();

    try {
      router.replace(redirectUrl);
      ref?.current?.close();
    } catch (error) {
      console.error('Failed to change route:', error);
    }
  };

  return (
    <>
      <Modals id={id} ref={ref} defaultOpen={defaultOpen}>
        <div className={styles.wrapper}>
          <div className={styles.search}>
            <StyledYextSearchBar
              onSearch={({ query = '' }) => {
                triggerSearch(query);
              }}
              placeholder={placeholder}
            />
          </div>
          {subheading && <div className={styles.subheading}>{subheading}</div>}
          {suggestions && (
            <div className={styles.suggestions}>
              {suggestions.map(({ icon, text, query = '' }, index) => (
                <Button key={index} size={'small'} variation={'filter'}>
                  <button
                    onClick={() => {
                      triggerSearch(query);
                    }}
                  >
                    {icon}
                    {text}
                  </button>
                </Button>
              ))}
            </div>
          )}
        </div>
      </Modals>
    </>
  );
};

export default forwardRef(ModalSearch);
