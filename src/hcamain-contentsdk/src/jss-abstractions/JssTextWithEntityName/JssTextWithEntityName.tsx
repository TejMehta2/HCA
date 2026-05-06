import {
  Field,
  useSitecore,
  Text as JssText,
  RichText as JssRichText,
} from '@sitecore-content-sdk/nextjs';
import { PageRouteMetadata } from 'components/Metadata/Metadata';

interface JssTextWithEntityNameProps {
  field?: Field<string | undefined>;
  isRichText?: boolean;
}

const JssTextWithEntityName = (props: JssTextWithEntityNameProps) => {
  const { field, isRichText } = props;
  const { sitecoreContext } = useSitecore();
  const isExperienceEditor = sitecoreContext?.pageEditing;
  const route = sitecoreContext?.route as PageRouteMetadata;
  const entityName = route.fields?.EntityName?.value;

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
