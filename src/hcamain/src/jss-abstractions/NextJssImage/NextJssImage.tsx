import {
  ImageField,
  Image as JssImage,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Image from 'next/image';

interface NextJssImageProps {
  field?: ImageField;
  editable?: boolean;
  next: typeof Image.arguments;
}

const NextJssImage = (props: NextJssImageProps) => {
  const { editable = undefined, next, field } = props;
  const { sitecoreContext } = useSitecoreContext();
  const isExperienceEditor = sitecoreContext.pageEditing;
  if (isExperienceEditor) {
    const editableProp = typeof editable === 'boolean' ? { editable } : {};
    return <JssImage field={field} {...editableProp} />;
  }
  if (!field?.value?.src) return <></>;
  return <Image {...next} src={field.value.src} alt={field.value.alt || ''} />;
};

export default NextJssImage;
