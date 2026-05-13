import { ImageField, Field } from '@sitecore-jss/sitecore-jss-nextjs';
import { ContactUnitFields } from 'src/jss-abstractions/OpeningHoursTextFormatting/OpeningHours.types';
import Params from 'src/types/params';

export interface Fields {
  logo?: {
    jsonValue?: ImageField;
  };
  text?: {
    jsonValue?: Field<string>;
  };
  anyQuestionsText?: {
    jsonValue?: Field<string>;
  };
  contactUnit?: {
    contactUnitList: ContactUnitFields;
  };
}

export type LandingPageHeaderProps = {
  params?: Params;
  fields?: {
    data?: {
      item?: Fields;
    };
  };
};
