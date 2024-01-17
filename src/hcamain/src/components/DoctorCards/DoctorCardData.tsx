import { FilterField, ComponentRenderingDocCards } from './DoctorCards.types';
import {
  ComponentRendering,
  HtmlElementRendering,
} from '@sitecore-jss/sitecore-jss-nextjs';

export const fetchDoctorCardData = async (
  pageComponents: (ComponentRendering | HtmlElementRendering)[]
) => {
  //  loop through components on page and identify doctor cards component
  //  for the doctors card component get the custom filter values to append to the Doctify URL

  await Promise.all(
    pageComponents.map(async (component: ComponentRenderingDocCards) => {
      if (component.componentName === 'DoctorCards' && component.fields) {
        const customFilters: string[] = [];

        component.fields.CustomFilters.map((filter: FilterField) => {
          const customFilter = filter.fields.Filter.value;
          customFilters.push(customFilter);
        });

        const customFiltersParams = customFilters.join('&');
        const limit = component.fields.NumberOfCards.value;

        const res = await fetch(
          `${process.env.DOCTIFY_REQUEST_URL}?${customFiltersParams}&limit=${limit}`
        );

        const docitfyData = await res.json();

        return (component.fields.apiData = docitfyData);
      }
    })
  );
};
