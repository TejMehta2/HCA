import { Navigation } from '.GeneratedTypeScriptModel/Project.HCA.model';
import {
  Item,
  LinkField,
  TextField,
  ComponentRendering,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { Fields as CQCFields } from 'components/CQCRating/CQCRating.types';
import { DoctifyReviewsFields } from 'components/Doctify/Doctify.types';
import Params from 'src/types/params';

// We extend generated types from Leprechaun, and overwrite types which are not specific enough for integration, mostly generic Sitecore Item
// We mostly cast them as optional, because we are unsure
export type Link = Item & {
  fields?: {
    Link?: LinkField & {
      value?: string;
    };
  };
};
export type Profile = Item & {
  fields?: {
    ProfileUrl?: TextField & {
      value?: string;
    };
    SocialMediaProvider?: Item & {
      fields?: {
        Icon?: unknown; // THINK - renders as ID string in props, why
      };
    };
  };
};
export type SocialMediaProfilesGroup = Item & {
  fields?: {
    Profiles?: Profile[];
  };
};
export type NavigationColumnsFolder = Item & {
  fields?: {
    Links?: Link[];
    Title?: TextField;
  };
};
export type BottomLineLinksFolder = Item & {
  fields?: {
    Links?: Link[];
  };
};
export type Fields = Navigation.Footer['fields'] & {
  BottomLineLinksFolder?: BottomLineLinksFolder;
  NavigationColumnsFolders?: NavigationColumnsFolder[];
  SocialMediaProfilesGroup?: SocialMediaProfilesGroup;
  DoctifyReviews?: DoctifyReviewsFields;
  CqcStatus?: { fields?: CQCFields };
};

export type FooterProps = Navigation.Footer & {
  params?: Params;
  rendering?: ComponentRendering & { params?: Params };
  fields?: Fields;
};
