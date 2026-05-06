import React from 'react';
import { TextBlockHeaderProps } from './TextBlockHeader.types';
import styles from './TextBlockHeader.module.scss';
import { generateHtmlSafeId } from '../../utility-functions';

const TextBlockHeader = (props: TextBlockHeaderProps): JSX.Element => {
  const { children, id, tableOfContentTitle } = props;

  let linkTableOfContentId;
  let linkTableOfContentTitle;

  if (tableOfContentTitle) {
    linkTableOfContentTitle = tableOfContentTitle;
    linkTableOfContentId = generateHtmlSafeId(tableOfContentTitle);
  }

  return (
    <div className={styles.wrapper} id={id}
      {...(tableOfContentTitle ? { 'data-subnav-link-title': linkTableOfContentTitle } : {})}
      {...(tableOfContentTitle ? { 'data-subnav-link-id': linkTableOfContentId } : {})}
    >
      {children}
    </div>
  );
};

export default TextBlockHeader;
