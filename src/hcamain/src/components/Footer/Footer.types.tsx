import {
  Item,
  LinkField,
  TextField,
  ComponentRendering,
  ImageField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { FieldsGraphQl } from 'components/CQCRating/CQCRatingGraphQl.types';
import { DoctifyReviewsFieldsGraphQl } from 'components/Doctify/DoctifyGraphQl.types';
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
      cqcStatus?: { targetItem?: FieldsGraphQl };
      copyright?: TextField;
      contact?: { targetItem: ContactUnit };
      logo?: { jsonValue: ImageField };
    };
  };
}

export interface FooterProps {
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
