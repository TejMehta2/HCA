/* eslint-disable prettier/prettier */
import React from 'react';
import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import BlogContent from '@component-library/site-components/BlogContent/BlogContent';
import SitecoreSvg from 'src/jss-abstractions/SitecoreSvg/SitecoreSvg';
import Button from '@component-library/core-components/Button/Button';
import Icons from '@component-library/foundation/Icons/Icons';
import Container from '@component-library/foundation/Containers/Container';
import {
  JobDetailsHeaderProps,
  VacancyRoute,
} from 'components/JobDetailsHeader/JobDetailsHeader.types';
import { inPageNavGlobalStore } from 'src/context/inPageNavGlobalStorage';

export const Default = (props: JobDetailsHeaderProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const vacancydata = sitecoreContext.route as VacancyRoute | undefined;
  const data = vacancydata?.vacancy;

  if (sitecoreContext?.pageEditing) {
    return <div>Vacancy details</div>;
  }

  if (!data?.name) {
    return <></>;
  }

  const componentAnchorId = inPageNavGlobalStore.addItem(props?.params, '');
  const tableOfContentTitle = props?.params?.TableOfContentsLinkTitle;

  return (
    <BlogContent
      theme={props.params?.Theme || 'A-HCA-White'}
      id={componentAnchorId}
      {...(tableOfContentTitle && props?.params?.ExcludeFromTableOfContents !== '1' ? { tableOfContentTitle: tableOfContentTitle } : {})}
    >
      <div className="vacancy-rte">
        <SitecoreSvg>{data?.bodyPlain}</SitecoreSvg>
      </div>
      <Container marginTop="spacing-6" marginBottom="spacing-6">
        <Button variation={'full-dark'} size="large">
          <a href={data.applicationUrl}>
            <span>
              Apply <strong>now</strong>
            </span>
            <Icons iconName={'iconArrowRight'} />
          </a>
        </Button>
      </Container>
    </BlogContent>
  );
};
