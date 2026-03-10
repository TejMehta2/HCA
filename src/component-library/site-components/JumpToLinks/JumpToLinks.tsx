import React, { useCallback, useEffect, useRef } from 'react';
import { JumpToLinkProps, JumpToLinksProps } from './JumpToLinks.types';
import styles from './JumpToLinks.module.scss';
import Button from '../../core-components/Button/Button';
import TextLink from '../../core-components/TextLink/TextLink';
import Modals from '../../components/Modals/Modals';
import Icons from '../../foundation/Icons/Icons';
import { useColumnSplitterContext } from '../../context/columnSplitterContext';

export const JumpToLink = (props: JumpToLinkProps): JSX.Element => {
  const { children } = props;
  return <li className={styles.link}>{children}</li>;
};

export const JumpToTextLink = (props: JumpToLinkProps): JSX.Element => {
  const { children } = props;
  return (
    <li>
      <TextLink>{children}</TextLink>
    </li>
  );
};

export const JumpToAnchor = (props: JumpToLinkProps): JSX.Element => {
  const { children } = props;
  return (
    <li className={styles.anchor}>
      <Button size={'small'} variation={'jump-to'}>
        {children}
      </Button>
    </li>
  );
};

const JumpToLinks = (props: JumpToLinksProps): JSX.Element | null => {
  const columnContext = useColumnSplitterContext();
  const hasMultipleColumns = columnContext?.hasMultipleColumns ?? false;
  const {
    children,
    heading,
    variation,
    isSticky,
    mobileHeading = 'On this page',
  } = props;
  const rootRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const hasChildren = React.Children.toArray(children).length > 0;

  const setHighlighted = useCallback((anchor: HTMLAnchorElement) => {
    if (!rootRef.current) return;
    const allAnchors = rootRef.current.querySelectorAll('a');
    allAnchors.forEach((a) => a.classList.remove(styles.highlighted));
    const matching = rootRef.current.querySelectorAll(
      `a[href="${anchor.getAttribute('href')}"]`
    );
    matching.forEach((a) => a.classList.add(styles.highlighted));
  }, []);

  useEffect(() => {
    if (!isSticky || !rootRef.current) return;
    const themeWrapper = rootRef.current.closest(
      '[data-theme]'
    ) as HTMLElement | null;
    if (!themeWrapper) return;
    const previousHeight = themeWrapper.style.height;
    themeWrapper.style.height = '100%';
    return () => {
      themeWrapper.style.height = previousHeight;
    };
  }, [isSticky]);

  useEffect(() => {
    if (!rootRef.current) return;
    const anchors = Array.from(
      rootRef.current.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')
    ).filter((a) => a.getAttribute('href') !== '#');

    if (!anchors.length) return;

    const uniqueHrefs = [
      ...new Set(anchors.map((a) => a.getAttribute('href'))),
    ];
    const sections = uniqueHrefs
      .map((href) => document.querySelector(href!))
      .filter(Boolean) as HTMLElement[];

    if (!sections.length) return;

    setHighlighted(anchors[0]);

    let clickCooldown: ReturnType<typeof setTimeout> | null = null;

    const handleClick = (e: Event) => {
      const anchor = (e.currentTarget as HTMLElement).closest('a');
      if (anchor) {
        setHighlighted(anchor);
        if (clickCooldown) clearTimeout(clickCooldown);
        clickCooldown = setTimeout(() => {
          clickCooldown = null;
        }, 800);
      }
    };
    anchors.forEach((a) => a.addEventListener('click', handleClick));

    const visibleSections = new Map<string, IntersectionObserverEntry>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleSections.set(entry.target.id, entry);
          } else {
            visibleSections.delete(entry.target.id);
          }
        });

        if (!visibleSections.size || clickCooldown) return;

        let topSection: string | null = null;
        let topOffset = Infinity;
        visibleSections.forEach((entry, id) => {
          if (entry.boundingClientRect.top < topOffset) {
            topOffset = entry.boundingClientRect.top;
            topSection = id;
          }
        });

        if (topSection) {
          const match = anchors.find(
            (a) => a.getAttribute('href') === `#${topSection}`
          );
          if (match) setHighlighted(match);
        }
      },
      { threshold: 0, rootMargin: '0px 0px -60% 0px' }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
      if (clickCooldown) clearTimeout(clickCooldown);
      anchors.forEach((a) => a.removeEventListener('click', handleClick));
    };
  }, [children, setHighlighted]);

  if (!hasChildren) return null;

  return (
    <div
      ref={rootRef}
      className={[
        styles.wrapper,
        variation && styles[variation],
        isSticky && styles.sticky,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {mobileHeading && (
        <>
          <div className={!hasMultipleColumns ? styles.container : undefined}>
            <div className={styles.mobileTriggerWrapper}>
              <button
                type="button"
                className={styles.mobileTrigger}
                onClick={() => dialogRef.current?.showModal()}
              >
                <span>{mobileHeading}</span>
                <Icons iconName="iconChevronDown" />
              </button>
            </div>
          </div>
          <Modals ref={dialogRef} variation="full">
            <div className={styles.container}>
              {heading && <div className={styles.heading}>{heading}</div>}
              {children && (
                <ul
                  className={styles.children}
                  onClick={() => dialogRef.current?.close()}
                >
                  {children}
                </ul>
              )}
            </div>
          </Modals>
        </>
      )}
      <div className={styles.desktopContent}>
        <div
          className={`${styles['container-all']} ${hasMultipleColumns ? '' : styles.container}`}
        >
          {heading && <div className={styles.heading}>{heading}</div>}
          {children && <ul className={styles.children}>{children}</ul>}
        </div>
      </div>
    </div>
  );
};

export default JumpToLinks;
