/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext } from 'react';
import Text from '../../foundation/Text/Text';
import SearchDropdownProps from './SearchDropdown.types';
import styles from './SearchDropdown.module.scss';
import Icons from '../../foundation/Icons/Icons';
import { TheBirthCompanyContext } from '../../context/theBirthCompanyContext';

const SearchDdropdown = (props: SearchDropdownProps): JSX.Element => {
  const { setSearchString, setKeywordId, setExtrasList } = useContext(
    TheBirthCompanyContext
  );
  const specialties = Object.values(props?.data[0]) || [];
  const conditionsProcedures = Object.values(props?.data[1]) || [];

  const handleClick = (name: string, id: string, extras: []) => {
    setSearchString(name);
    setKeywordId(id);
    setExtrasList(extras);

    props.setIsComponentVisible(false);
  };

  return (
    <div className={styles['search-dropdown']}>
      {/* results */}

      <div className={styles['search-dropdown-results']}>
        <div className={styles['search-dropdown-col']}>
          <div className={styles['search-dropdown-header']}>
            <Text tag="h2" variation="subheading-2">
              {props.dropdownColumn1Label || 'Gynaecological scans'}
            </Text>
          </div>
          <ul>
            {specialties.length > 0 &&
              specialties.map((item: any) => (
                <li
                  key={item.id}
                  aria-label="option"
                  onClick={() => handleClick(item.name, item.id, item.extras)}
                >
                  <span className={styles['search-dropdown-icon']}>
                    <Icons iconName="iconSearch" />
                  </span>
                  <Text tag="p" variation="body-medium">
                    {item.name}
                  </Text>
                </li>
              ))}
          </ul>
        </div>
        <div className={styles['search-dropdown-col']}>
          <div className={styles['search-dropdown-header']}>
            <Text tag="p" variation="subheading-2">
              {props.dropdownColumn2Label || 'Pregnancy scans'}
            </Text>
          </div>
          <ul>
            {conditionsProcedures.length > 0 &&
              conditionsProcedures.map((item: any) => (
                <li
                  key={item.id}
                  aria-label="option"
                  onClick={() => handleClick(item.name, item.id, item.extras)}
                >
                  <span className={styles['search-dropdown-icon']}>
                    <Icons iconName="iconSearch" />
                  </span>
                  <Text tag="p" variation="body-medium">
                    {item.name}
                  </Text>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SearchDdropdown;
