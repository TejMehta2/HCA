import {
  type ImageField,
  Image as JssImage,
  type Page,
} from '@sitecore-content-sdk/nextjs';
import Image, { type ImageProps } from 'next/image';

interface NextJssImageProps {
  field?: ImageField;
  editable?: boolean;
  isEditing?: boolean;
  page?: Page;
  next: Omit<ImageProps, 'src' | 'alt'>;
}

const NextJssImage = (props: NextJssImageProps) => {
  const { editable = undefined, isEditing, next, field, page } = props;
  const isExperienceEditor = isEditing ?? page?.mode.isEditing ?? false;

  if (isExperienceEditor) {
    const editableProp = typeof editable === 'boolean' ? { editable } : {};
    return <JssImage field={field} {...editableProp} />;
  }
  if (!field?.value?.src) return <></>;
  return <Image {...next} src={field.value.src} alt={field.value.alt || ''} />;
};

export default NextJssImage;
