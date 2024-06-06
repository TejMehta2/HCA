import {
  ImageFieldValue,
  Image as JssImage,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Image from 'next/image';

interface NextJssImageProps {
  field?: ImageFieldValue;
  editable?: boolean;
  next: typeof Image.arguments;
}

const NextJssImage = (props: NextJssImageProps) => {
  const { editable = true, next, field } = props;
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext.pageEditing;
  if (!field) return <></>;
  if (!editable || !isExperienceEditor)
    return <Image {...next} src={field.src} alt={field.alt} />;
  return (
    <JssImage
      field={{
        value: field,
        editable: editable,
      }}
    />
  );
};

export default NextJssImage;
