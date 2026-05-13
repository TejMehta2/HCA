import { ImageField, Field } from '@sitecore-content-sdk/nextjs';
import { ComponentWithContextProps } from 'lib/component-props';
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

export type LandingPageHeaderProps = ComponentWithContextProps & {
  params?: Params;
  fields?: {
    data?: {
      item?: Fields;
    };
  };
};
