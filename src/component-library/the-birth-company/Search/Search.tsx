/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { MouseEventHandler, useId, useState, useContext } from 'react';
import styles from './Search.module.scss';
import Icons from '../../foundation/Icons/Icons';
import useComponentVisible from '../../hooks/useComponentVisible';
import SearchProps, { TbcService } from './Search.types';
import SearchDdropdown from './SearchDropwdown';
import { TheBirthCompanyContext } from '../../context/theBirthCompanyContext';
import TextLink from '../../core-components/TextLink/TextLink';

const Search = (props: SearchProps): JSX.Element => {
  const { searchString, setSearchString, setKeywordId, setExtrasList } =
    useContext(TheBirthCompanyContext);
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);
  const [data, setData] = useState<any[]>([]);
  const searchId = useId();

  const fullData: any = [
    [...props.dropdownColumn1List],
    [...props.dropdownColumn2List],
  ];

  const handlePopularSearch = () => {
    setIsComponentVisible(true);
    setData(fullData);
  };

  const handleClose = () => {
    setSearchString('');
    setKeywordId('0');
    setExtrasList([]);
    setIsComponentVisible(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsComponentVisible(true);
    setExtrasList([]);

    setSearchString(e.target.value);
    setKeywordId('0');

    /* Filter dropdown list based on user input */
    if (e.target.value.trim().length > 0) {
      const filteredData: any[] = [];
      fullData.forEach((subData: TbcService[]) => {
        const filteredSubData = subData.filter((item) => {
          return item.name.toLowerCase().includes(e.target.value.toLowerCase());
        });

        filteredData.push(filteredSubData);
      });

      setData(filteredData);
    } else if (e.target.value.trim().length === 0) {
      handlePopularSearch();
    }
  };

  const handleOnClick: MouseEventHandler<HTMLInputElement> = (e) => {
    if ((e.target as HTMLInputElement).value.trim().length === 0) {
      handlePopularSearch();
    }
  };

  return (
    <div className={styles['search']}>
      <div ref={ref} className={styles['search-searchbar']}>
        <label htmlFor={searchId}>
          <input
            id={searchId}
            type="text"
            placeholder={props.placeholder}
            onChange={handleChange}
            onClick={handleOnClick}
            value={searchString}
          />
        </label>
        {isComponentVisible && (
          <SearchDdropdown
            data={data}
            setIsComponentVisible={setIsComponentVisible}
            dropdownColumn1Label={props.dropdownColumn1Label}
            dropdownColumn2Label={props.dropdownColumn2Label}
          />
        )}
        <span className={styles['search-icon']}>
          <Icons iconName="iconSearch" />
        </span>
        <div className={styles['search-close-btn']}>
          {searchString !== '' && (
            <TextLink>
              <button onClick={handleClose}>
                <Icons iconName="iconCross" />
              </button>
            </TextLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
