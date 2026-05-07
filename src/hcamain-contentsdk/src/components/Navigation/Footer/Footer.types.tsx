import {
  Item,
  LinkField,
  TextField,
  ComponentRendering,
  ImageField,
} from '@sitecore-content-sdk/nextjs';
import { CQCFieldsGraphQl } from 'components/Page Content/CQCRating/CQCRatingGraphQl.types';
import { DoctifyReviewsFieldsGraphQl } from 'components/Page Content/Doctify/DoctifyGraphQl.types';
import { ComponentWithContextProps } from 'lib/component-props';
import Params from 'src/types/params';

// We extend generated types from Leprechaun, and overwrite types which are not specific enough for integration, mostly generic Sitecore Item
// We mostly cast them as optional, because we are unsure
export type Link = {
  link?: {
    jsonValue: LinkField & {
      value?: string;
    };
  };
};
export type Profile = Item & {
  profileUrl?: TextField & {
    value?: string;
  };
  socialMediaProvider?: Item & {
    icon?: {
      targetItem?: {
        svgMarkup?: TextField;
      };
    };
  };
};
export type SocialMediaProfilesGroup = Item & {
  profiles?: { targetItems: Profile[] };
};
export type NavigationColumnsFolder = Item & {
  links?: { targetItems: Link[] };
  title?: TextField;
};

export interface Fields {
  data?: {
    item?: {
      id: string;
      bottomLineLinksFolder?: { targetItem: NavigationColumnsFolder };
      navigationColumnsFolders?: { targetItems: NavigationColumnsFolder[] };
      socialMediaProfilesGroup?: { targetItem: SocialMediaProfilesGroup };
      doctifyReviews?: { targetItem: DoctifyReviewsFieldsGraphQl };
      cqcStatus?: { targetItem?: CQCFieldsGraphQl };
      copyright?: TextField;
      contact?: { targetItem: ContactUnit };
      logo?: { jsonValue: ImageField };
    };
  };
}

export type FooterProps = ComponentWithContextProps & {
  params?: Params;
  fields?: Fields;
  rendering?: ComponentRendering & { params?: Params };
}

export interface ContactUnit {
  name: string;
  contactUnitName: StringValueField;
  telephoneNumber: { targetItems: TelephoneNumberItem[] };
}

export interface TelephoneNumberItem {
  internationPhoneNumber: StringValueField;
  phoneNumber: StringValueField;
  phoneNumberLabel: StringValueField;
}

export interface StringValueField {
  value: string;
}
