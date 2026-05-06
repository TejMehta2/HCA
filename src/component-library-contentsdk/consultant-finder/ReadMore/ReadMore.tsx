/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useRef, type JSX } from 'react';
import { ReadMoreProps } from './ReadMore.types';
import styles from './ReadMore.module.scss';
import Icons from '../../foundation/Icons/Icons';
import TextLink from '../../core-components/TextLink/TextLink';

const ReadMore = (props: ReadMoreProps): JSX.Element => {
  const {
    children,
    tag = 'p',
    maxContent = 3,
    showLessText,
    showMoreText,
    iconShowLess,
    iconShowMore,
  } = props;
  const containerRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [paragraphs, setParagraphs] = useState<any>();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const paragraphs = container.getElementsByTagName(
      tag
    ) as HTMLCollectionOf<HTMLElement>;
    setParagraphs(paragraphs);

    if (paragraphs.length <= maxContent) {
      container.style.height = 'auto';
      container.style.overflow = 'auto';
    } else {
      let totalHeight = 0;
      for (let i = 0; i < maxContent + 1; i++) {
        totalHeight += paragraphs[i].offsetHeight;
      }
      container.style.height = `${totalHeight}px`;
      container.style.overflow = 'hidden';
    }
  }, [children, maxContent, tag]);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
    const container = containerRef.current;
    if (container && paragraphs) {
      if (!isExpanded) {
        container.style.height = 'auto';
        container.style.overflow = 'auto';
      } else {
        let totalHeight = 0;
        for (let i = 0; i < maxContent + 1; i++) {
          totalHeight += paragraphs[i].offsetHeight;
        }
        container.style.height = `${totalHeight}px`;
        container.style.overflow = 'hidden';
      }
    }
  };

  return (
    <div className={styles['read-more']}>
      <div ref={containerRef}>{children}</div>
      {paragraphs && paragraphs.length > maxContent && (
        <div className={styles['read-more-buttons']}>
          {!isExpanded && (
            <TextLink>
              <button onClick={toggleExpansion}>
                <span>{showMoreText}</span>
                {iconShowMore && (
                  <span
                    dangerouslySetInnerHTML={{ __html: iconShowMore }}
                  ></span>
                )}
                {!iconShowMore && <Icons iconName="iconPlus" />}
              </button>
            </TextLink>
          )}
          {isExpanded && (
            <TextLink>
              <button onClick={toggleExpansion}>
                <span>{showLessText}</span>
                {iconShowLess && (
                  <span
                    dangerouslySetInnerHTML={{ __html: iconShowLess }}
                  ></span>
                )}
                {!iconShowLess && <Icons iconName="iconMinus" />}
              </button>
            </TextLink>
          )}
        </div>
      )}
    </div>
  );
};

export default ReadMore;
