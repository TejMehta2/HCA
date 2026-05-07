import Button from '@component-library/core-components/Button/Button';
import Icons from '@component-library/foundation/Icons/Icons';
import { IconName } from '@component-library/foundation/Icons/icon-map.generated';
import {
  Link as JssLink,
  Text as JssText,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { Link, NavigationColumnsFolder, Profile } from './Footer.types';

// Reduce through an array of sitecore LinkField, to accumulate an array of sitecore JSS Link
export const linkReducer = (
  accumulator: JSX.Element[],
  current: Link,
  index: number
) =>
  current.link
    ? [...accumulator, <JssLink key={index} field={current.link?.jsonValue} />]
    : accumulator;

export const SocialMediaCta = (props: Profile) => (
  <Button key={props.id} size={'small'} variation={'social'}>
    <a
      href={props.profileUrl?.value}
      target={'blank'}
      rel={'noopener noreferrer'}
    >
      <Icons iconName={`icon${props.displayName}` as IconName} />
      <span className="sr-only">{props.displayName}</span>
    </a>
  </Button>
); // THINK - can this component be moved to a separate integration component template?

// Higher order function which currys the one-off social links to the columns mapper, so that we can place social links inside the first column
export const columnMapper =
  (socials?: JSX.Element[]) =>
  (linksColumn: NavigationColumnsFolder, index: number) => {
    const title = linksColumn.title ? (
      <JssText field={linksColumn.title} />
    ) : undefined;

    const links = linksColumn.links?.targetItems?.reduce(linkReducer, []);

    return {
      title,
      links,
      socials: index === 0 ? socials : undefined, // only show socials on first column of links
    };
  };
