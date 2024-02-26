import {
  Field,
  ImageField,
  Item,
  LinkField,
} from '@sitecore-jss/sitecore-jss-nextjs';

type ExtendedLink = LinkField & {
  jsonValue: LinkField;
};
type ExtendedDate = Field<string> & {
  jsonValue: Item & Field<string>;
};
export interface MainNavigationTabChild {
  cta: ExtendedLink;
  mobileCtaText: Field<string>;
  description: Field<string>;
  title: Field<string>;
  variant: {
    targetItem: {
      value: Field<'single-narrow' | 'single-wide' | 'double' | 'single'>;
    };
  };
  template: {
    name:
      | 'Navigation Content Block'
      | 'Main Navigation Links List'
      | 'Navigation Blog Post Card';
  };
  date: ExtendedDate;
  tag: Field<string>;
  children: {
    results: {
      link: ExtendedLink;
    }[];
  };
}

export interface MainNavigationTab {
  hasChildren: boolean;
  tabCta: ExtendedLink;
  children: {
    results: MainNavigationTabChild[];
  };
  mobileTabCta: ExtendedLink;
  tabTitle: Field<string>;
}

export interface Fields {
  data: {
    item: {
      logo: ImageField;
      navigationTabs: {
        targetItems: MainNavigationTab[];
      };
      primaryComplementaryLinksFolder: {
        targetItem: {
          links: {
            targetItems: {
              link: ExtendedLink;
            }[];
          };
          title: Field<string>;
        };
      };
      secondaryComplementaryLinksFolder: {
        targetItem: {
          links: {
            targetItems: {
              link: ExtendedLink;
            }[];
          };
          title: Field<string>;
        };
      };
    };
  };
}

export interface MainNavigationProps {
  params: { [key: string]: string };
  fields: Fields;
}
