import {
  Field,
  useSitecoreContext,
  Text as JssText,
  RichText as JssRichText,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { PageRouteMetadata } from 'components/Metadata/Metadata';

interface JssTextWithEntityNameProps {
  field?: Field<string | undefined>;
  isRichText?: boolean;
}

const JssTextWithEntityName = (props: JssTextWithEntityNameProps) => {
  const { field, isRichText } = props;
  const { sitecoreContext } = useSitecoreContext();
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
