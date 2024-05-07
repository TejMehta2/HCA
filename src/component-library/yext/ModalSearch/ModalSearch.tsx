import React, { forwardRef } from 'react';
import { ModalSearchProps } from './ModalSearch.types';
import styles from './ModalSearch.module.scss';
import Modals from '../../components/Modals/Modals';
import StyledYextSearchBar from '../StyledYextSearchBar/StyledYextSearchBar';
import { useSearchActions } from '@yext/search-headless-react';
import { useRouter } from 'next/router';
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
    ref?.current?.close();
    searchActions.executeUniversalQuery();
    router.replace(`${redirectUrl}?input=${query}`);
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
                      searchActions.setQuery(query);
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
