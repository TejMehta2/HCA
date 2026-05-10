'use client';

import {
  Field,
  RouteData,
  useSitecore,
  Text as JssText,
  RichText as JssRichText,
} from '@sitecore-content-sdk/nextjs';

type PageRouteMetadata = RouteData & {
  fields?: {
    EntityName?: Field<string>;
  };
};

interface JssTextWithEntityNameProps {
  field?: Field<string | undefined>;
  isRichText?: boolean;
}

const JssTextWithEntityName = (props: JssTextWithEntityNameProps) => {
  const { field, isRichText } = props;
  const { page } = useSitecore();
  const isExperienceEditor = page.mode.isEditing;
  const route = page.layout.sitecore.route as PageRouteMetadata | undefined;
  const entityName = route?.fields?.EntityName?.value;

  if (isExperienceEditor || !entityName || !field)
    return isRichText ? (
      <JssRichText field={field} />
    ) : (
      <JssText field={field} />
    );

  return (
    <span
      dangerouslySetInnerHTML={{
        __html: field?.value?.replaceAll(/{{EntityName}}/gm, entityName) || '',
      }}
    ></span>
  );
};

export default JssTextWithEntityName;
