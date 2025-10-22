/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext } from 'react';
import Text from '../../foundation/Text/Text';
import SearchDropdownProps from './SearchDropdown.types';
import styles from './SearchDropdown.module.scss';
import Icons from '../../foundation/Icons/Icons';
import { TheBirthCompanyContext } from '../../context/theBirthCompanyContext';
import { TbcDropdownColumn, TbcServiceExtra } from './Search.types';

const SearchDropdown = (props: SearchDropdownProps): JSX.Element => {
  const { setSearchString, setKeywordId, setExtrasList } = useContext(
    TheBirthCompanyContext
  );
  const column1Data = Object.values(props?.data[0]) || [];
  const column2Data = Object.values(props?.data[1]) || [];

  const handleClick = (name: string, id: string, extras: TbcServiceExtra[]) => {
    setSearchString(name);
    setKeywordId(id);
    setExtrasList(extras);

    props.setIsComponentVisible(false);
  };

  const displayData = (columnData: TbcDropdownColumn[]) => {
    return columnData.map((item: TbcDropdownColumn, index) => (
      <React.Fragment key={index}>
        {item.title && item.scans.length > 0 && (
          <div className={styles['search-dropdown-sub-header']}>
            <Text tag="h4" variation="subheading-2">
              {item.title}
            </Text>
          </div>
        )}
        <ul>
          {item.scans.length > 0 &&
            item.scans.map((scan) => (
              <li key={scan.id} aria-label="option">
                <button
                  onClick={() =>
                    handleClick(scan.name, scan.id, scan.extras || [])
                  }
                >
                  <span className={styles['search-dropdown-icon']}>
                    <Icons iconName="iconSearch" />
                  </span>
                  <Text tag="p" variation="body-medium">
                    {scan.name}
                  </Text>
                </button>
              </li>
            ))}
        </ul>
      </React.Fragment>
    ));
  };

  return (
    <div className={styles['search-dropdown']}>
      {/* results */}

      <div className={styles['search-dropdown-results']}>
        {column1Data[0].scans.length === 0 &&
          column2Data[0].scans.length === 0 && (
            <Text tag="p" variation="body-large">
              {'No matches found, please try typing something else.'}
            </Text>
          )}

        {column1Data[0].scans.length > 0 && (
          <div className={styles['search-dropdown-col']}>
            <div className={styles['search-dropdown-header']}>
              <Text tag="h2" variation="subheading-2">
                {props.dropdownColumn1Label || 'Gynaecological scans'}
              </Text>
            </div>
            {displayData(column1Data)}
          </div>
        )}
        {column2Data[0].scans.length > 0 && (
          <div className={styles['search-dropdown-col']}>
            <div className={styles['search-dropdown-header']}>
              <Text tag="p" variation="subheading-2">
                {props.dropdownColumn2Label || 'Pregnancy scans'}
              </Text>
            </div>
            {displayData(column2Data)}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchDropdown;
