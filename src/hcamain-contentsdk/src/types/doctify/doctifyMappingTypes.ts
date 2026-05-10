import { Field } from '@sitecore-content-sdk/nextjs';
import { SitecoreItem } from '../sitecore/sitecoreTypes';

export interface DoctifyMappedSitecoreItem extends SitecoreItem {
  doctifyPractice?: Field<string>;
  doctifyKeywordId?: Field<string>;
}

export interface DoctifyMappedSitecoreItemWithAncestors extends DoctifyMappedSitecoreItem {
  ancestors: DoctifyMappedSitecoreItem[];
}
