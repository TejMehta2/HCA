import { Theme } from '@component-library/foundation/Themes/Themes.types';
import {
  Field,
  ImageField,
  Item,
  LinkField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Params from 'src/types/params';

type ExtendedSvg = Field & {
  jsonValue?: {
    id?: string;
    url?: string;
    name?: string;
    displayName?: string;
    fields?: {
      SvgMarkup?: Field<string>;
    };
  };
};
type ExtendedLink = LinkField & {
  jsonValue?: LinkField;
};
type ExtendedDate = Field<string> & {
  jsonValue?: Item & Field<string>;
};
export interface MainNavigationTabChild {
  cta?: ExtendedLink;
  mobileCtaText?: Field<string>;
  description?: Field<string>;
  title?: Field<string>;
  variant?: {
    targetItem?: {
      value?: Field<'single-narrow' | 'single-wide' | 'double' | 'single'>;
    };
  };
  template?: {
    name:
    | 'Navigation Content Block'
    | 'Main Navigation Links List'
    | 'Navigation Blog Post Card';
  };
  date?: ExtendedDate;
  tag?: Field<string>;
  links?: {
    targetItems?: {
      link?: ExtendedLink;
    }[];
  };
  showOnMobile: {
    boolValue: boolean;
    value: '1' | '0';
  };
}

export interface MainNavigationTab {
  hasChildren?: boolean;
  tabCta?: ExtendedLink;
  children?: {
    results?: MainNavigationTabChild[];
  };
  mobileTabCta?: ExtendedLink;
  tabTitle?: Field<string>;
}

export interface PopularSearches {
  value?: string;
  jsonValue?: {
    id?: string;
    url?: string;
    name?: string;
    displayName?: string;
    fields?: {
      Text?: Field<string>;
    };
  }[];
  PopularSearch?: PopularSearch[];
}

export interface PopularSearch {
  text?: Field<string>;
  icon?: {
    Icon?: {
      svgMarkup?: Field<string>;
    };
  };
}

export interface Fields {
  data?: {
    item?: {
      logo?: { jsonValue: ImageField };
      darkLogo?: { jsonValue: ImageField };
      navigationTabs?: {
        targetItems?: MainNavigationTab[];
      };
      primaryComplementaryLinksFolder?: {
        targetItem?: {
          links?: {
            targetItems?: {
              link?: ExtendedLink;
            }[];
          };
          title?: Field<string>;
        };
      };
      secondaryComplementaryLinksFolder?: {
        targetItem?: {
          links?: {
            targetItems?: {
              link?: ExtendedLink;
            }[];
          };
          title?: Field<string>;
        };
      };
      searchModalConfigurationFolder?: {
        targetItem: {
          searchPlaceholder?: Field<string>;
          icon?: ExtendedSvg;
          popularSearchesLabel?: Field<string>;
          popularSearches?: PopularSearches;
          baseUrl?: ExtendedLink;
        };
      };
    };
  };
}

export interface MainNavigationParams extends Params {
  ThemeOpen?: Theme;
}

export interface MainNavigationProps {
  params?: MainNavigationParams;
  fields?: Fields;
}
