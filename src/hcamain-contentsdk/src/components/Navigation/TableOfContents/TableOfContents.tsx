'use client';
import {
  Suspense,
  type JSX,
  useCallback,
  useEffect,
  useState,
} from 'react';
import Text from '@component-library/foundation/Text/Text';
import { Text as JssText } from '@sitecore-content-sdk/nextjs';
import JumpToLinks, {
  JumpToAnchor,
  JumpToTextLink,
} from '@component-library/site-components/JumpToLinks/JumpToLinks';
import Themes from '@component-library/foundation/Themes/Themes';
import Icons from '@component-library/foundation/Icons/Icons';
import {
  TableOfContentsProps,
  NavigableComponent,
} from './TableOfContents.types';
import { usePathname, useSearchParams } from 'next/navigation';
import { isInsideContainerComponent } from 'lib/utility-functions/insideContainerComponent';

interface TableOfContentsWithVariantProps extends TableOfContentsProps {
  variant: '' | 'stacked';
}

const DefaultContent = (
  props: TableOfContentsWithVariantProps
): JSX.Element => {
  const [components, setComponentsList] = useState<NavigableComponent[]>([]);

  const buildToC = useCallback(() => {
    const elements = document.querySelectorAll<HTMLElement>(
      '[data-subnav-link-title]'
    );

    const tocComponents: NavigableComponent[] = Array.from(elements).map(
      (el) => ({
        TableOfContentsLinkTitle: el.dataset.subnavLinkTitle || '',
        Id: el.dataset.subnavLinkId || el.id || '',
      })
    );

    setComponentsList(tocComponents);
  }, []);

  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      buildToC();
    });

    return () => cancelAnimationFrame(frame);
  }, [buildToC, pathname, searchParams]);

  const hasNoDatasource = !props.fields;

  if (props.variant === 'stacked') {
    return (
      <JumpToLinks
        variation={props.variant}
        isSticky={true}
        isInsideContainer={isInsideContainerComponent(props.params)}
        heading={
          hasNoDatasource ? (
            <Text variation="body-bold-large">Jump to</Text>
          ) : (
            <Text variation="body-bold-large">
              <JssText field={props.fields?.Title} />
            </Text>
          )
        }
      >
        {components.length > 0 &&
          components.map((item, index) => (
            <JumpToTextLink key={index}>
              <a href={'#' + item.Id}>
                <span>{item.TableOfContentsLinkTitle}</span>
              </a>
            </JumpToTextLink>
          ))}
      </JumpToLinks>
    );
  } else {
    return (
      <Themes theme={'A-HCA-White'} collapse={false}>
        <JumpToLinks
          isInsideContainer={isInsideContainerComponent(props.params)}
          heading={
            hasNoDatasource ? (
              <Text variation="body-medium-medium">Jump to</Text>
            ) : (
              <Text variation="body-medium-medium">
                <JssText field={props.fields?.Title} />
              </Text>
            )
          }
        >
          {components.length > 0 &&
            components.map((item, index) => (
              <JumpToAnchor key={index}>
                <a href={'#' + item.Id}>
                  <Icons iconName="iconArrowSmallDown" />
                  <span>{item.TableOfContentsLinkTitle}</span>
                </a>
              </JumpToAnchor>
            ))}
        </JumpToLinks>
      </Themes>
    );
  }
};

export const Default = (
  props: TableOfContentsWithVariantProps
): JSX.Element => (
  <Suspense fallback={null}>
    <DefaultContent {...props} />
  </Suspense>
);

export const Stacked = (props: TableOfContentsProps): JSX.Element => {
  return <Default {...props} variant={'stacked'} />;
};
